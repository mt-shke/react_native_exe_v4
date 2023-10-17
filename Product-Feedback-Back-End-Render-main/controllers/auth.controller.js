const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const UserModel = require("../models/user.model");
const {
    sendUserVerificationEmail,
    attachCookiesToResponse,
    createToken,
    removeCookies,
} = require("../utils");
const crypto = require("crypto");
const TokenModel = require("../models/token.model");

// Register new account
const register = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
        res.status(StatusCodes.OK).json({
            success: false,
            message: "Requiered fields missing",
        });
        return;
        // throw new CustomError.BadRequestError("Requiered fields missing");
    }
    const user = await UserModel.findOne({ email });

    if (!!user) {
        // TODO : find a solution for this client error handler: not receiving error message
        res.status(StatusCodes.OK).json({
            success: false,
            message: "This email is already in use",
        });
        return;
        // throw new CustomError.BadRequestError("This email is already in use");
    }

    // const isFirstAccount = (await UserModel.countDocuments({})) === 0;

    const verificationToken = crypto.randomBytes(50).toString("hex");

    const newUser = await UserModel.create({
        email,
        password,
        username,
        verificationToken,
        // role: isFirstAccount ? "admin" : "user",
    });

    if (!newUser) {
        throw new CustomError.BadRequestError("Account creation impossible");
    }

    await sendUserVerificationEmail({
        email: newUser.email,
        verificationToken: newUser.verificationToken,
    });
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message:
            "Account created successfully! Please check your email and activate your account!",
        verificationToken,
    });
};

// Verifiy Email account
const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body;
    if (!verificationToken || !email) {
        throw new CustomError("Token and password invalids");
    }

    const user = await UserModel.findOne({ email });

    if (user.isVerified) {
        return res
            .status(StatusCodes.OK)
            .json({ message: "Email already verified! ", success: true });
    }

    if (user.verificationToken !== verificationToken) {
        throw new CustomError.UnauthenticatedError("Token invalid");
    }

    user.verificationToken = "";
    user.isVerified = true;
    user.verified = new Date(Date.now());
    user.save();
    return res
        .status(StatusCodes.OK)
        .json({ message: "Email verified successfully! ", success: true });
};

// Login function
const login = async (req, res) => {
    const protocol = req.protocol;
    const hostname = req.hostname;
    const origin = req.get("origin");
    const forwardedHost = req.get("x-forwarded-host");
    const forwardedProtocol = req.get("x-forwarded-proto");

    // return res.status(200).json({ protocol, host, origin, forwardedHost, forwardedProtocol });

    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError(
            "Please enter a valid email and password"
        );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        // Email is not in DB
        throw new CustomError.UnauthenticatedError(
            "Please enter a valid email and password"
        );
    }
    if (!user.isVerified) {
        // Email exist in DB but user did not verify its account yet
        throw new CustomError.UnauthenticatedError(
            "Please validate your account"
        );
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
        throw new CustomError.UnauthenticatedError("Password invalid");
    }

    const tokenUser = createToken(user);
    let refreshToken = "";

    const existingToken = await TokenModel.findOne({
        userId: tokenUser.userId,
    });

    if (existingToken) {
        const { isValid } = existingToken;
        if (!isValid) {
            // true by default, but if user does unauthorized action, it can be turned false
            throw new CustomError.UnauthenticatedError("Token is invalid");
        }

        refreshToken = existingToken.refreshToken;

        attachCookiesToResponse({ res, user: tokenUser, refreshToken });

        return res.status(StatusCodes.OK).json({
            user: tokenUser,
            success: true,
            message: "User logged in",
        });
    }

    refreshToken = crypto.randomBytes(50).toString("hex");

    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };
    await TokenModel.create(userToken);

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    return res.status(StatusCodes.OK).json({
        user: tokenUser,
        success: true,
        message: "User now logged in",
    });
};

// Logout function
const logout = async (req, res) => {
    await TokenModel.findOneAndDelete({ user: req.user.userId });
    removeCookies({ res });
    res.status(StatusCodes.OK).json({
        success: true,
        message: "User now logged out!",
    });
};

const verifyUserCookie = async (req, res) => {
    const { userId, email } = req.user;

    if (!userId || !email) {
        throw new CustomError.UnauthenticatedError(
            "No user, or cookies invalids"
        );
    }
    return res.status(StatusCodes.OK).json({
        user: req.user,
        success: true,
        message: "User cookie verified",
    });
};

module.exports = { register, login, verifyEmail, logout, verifyUserCookie };
