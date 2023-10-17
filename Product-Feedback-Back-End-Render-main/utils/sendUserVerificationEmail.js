const sendEmail = require("./sendEmail");

const sendUserVerificationEmail = async ({ email, verificationToken }) => {
    const domain = process.env.DOMAIN || "https://fm.pfeedback.micheltcha.com";

    // TODO : check for html and why sendgrid do not deliver email

    const emailTitle = "Verify your account for pfeedback.micheltcha.com";
    const html = `<p>Welcome to pfeedback.micheltcha.com</p>
    <p>Please click the following link to activate your account on pfeedback.micheltcha.com: <a href="${domain}/new-account/verify-email?token=${verificationToken}&email=${email}">Confirm email</a> </p>
    <p>Please do not respond to this email</p>`;

    const info = await sendEmail({ email, emailTitle, html });

    return info;
};

module.exports = sendUserVerificationEmail;
