import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { users } from "../../../../data";
import CustomButton from "../../../components/UI/CustomButton";
import CustomInput from "../../../components/UI/CustomInput";
import { colors, globalStyles } from "../../../globals";
import { ICredentials, IData } from "../../../ts/interfaces";
// import { RootstackParamList } from "../../../ts/types";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";

const SignInForm: React.FC = (props) => {
    // const navigation =
    //     useNavigation<
    //         NativeStackNavigationProp<RootstackParamList, "SignInScreen">
    //     >();

    const [credentials, setCredentials] = useState<ICredentials>({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState<string>("");

    const updateData = (data: IData) => {
        const inputId = Object.keys(data)[0];
        const inputValue = Object.values(data)[0];
        const newData = { ...credentials, [inputId]: inputValue };
        setCredentials(newData);
    };

    const checkUser = (credentials: ICredentials) => {
        const foundUser = users.find(
            (user) => user.email === credentials?.email.trim()
        );
        if (!foundUser) {
            setMessage("Email invalide");
            return;
        }

        const passwordsMatch =
            foundUser.password === credentials?.password.trim();
        if (!passwordsMatch) {
            setMessage("Mot de passe incorrect");
            return;
        }

        setMessage("Credentials Ok!");
    };

    return (
        <View style={styles.form}>
            <CustomInput
                inputId="email"
                label="Email"
                value={credentials.email}
                updateData={updateData}
                validationType="change"
            />
            <CustomInput
                inputId="password"
                type="password"
                label="Mot de passe"
                value={credentials.password}
                updateData={updateData}
                validationType="change"
            />
            <TouchableOpacity onPress={() => checkUser(credentials)}>
                <View style={styles.containerBtn}>
                    <CustomButton textContent="Connection" />
                </View>
            </TouchableOpacity>
            {message ? (
                <View style={styles.containerError}>
                    <Text
                        style={{
                            ...styles.errorMsg,
                            color:
                                message === "Credentials Ok!"
                                    ? colors.green
                                    : colors.orange,
                        }}
                    >
                        {message}
                    </Text>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

export default SignInForm;

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 14,
    },
    containerBtn: {
        width: 240,
        alignSelf: "center",
        marginTop: 40,
    },
    containerError: {
        position: "absolute",
        top: -60,
        alignSelf: "center",
    },
    errorMsg: {
        color: colors.orange,
        fontSize: globalStyles.fontSize,
    },
});
