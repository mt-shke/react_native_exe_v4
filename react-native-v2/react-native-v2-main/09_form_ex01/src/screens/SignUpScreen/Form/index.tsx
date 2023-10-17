import {
    View,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import CustomButton from "../../../components/UI/CustomButton";
import CustomInput from "../../../components/UI/CustomInput";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../../globals";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SignUpStackParamList } from "../../../ts/types";
import { useEffect, useState } from "react";
import { IData, IFormData } from "../../../ts/interfaces";
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
} from "../../../utils";
import { defaultFormData } from "../../../../data";
import { LinearGradient } from "expo-linear-gradient";

const SignUpForm: React.FC = (props) => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<SignUpStackParamList, "SignUpScreen">
        >();
    const route =
        useRoute<RouteProp<SignUpStackParamList, "SignUpEndScreen">>();
    const routeFormData = route.params?.formData;
    const [formData, setFormData] = useState<IFormData>(
        routeFormData ?? defaultFormData
    );

    const formIsValid =
        validateEmail(formData.email) &&
        validatePasswordConfirmation(
            formData.password,
            formData.passwordConfirmation
        );

    useEffect(() => {}, [formIsValid]);

    const updateData = (data: IData) => {
        const inputId = Object.keys(data)[0];
        const inputValue = Object.values(data)[0];
        const newData = { ...formData, [inputId]: inputValue };
        setFormData(newData);
    };

    const nextButtonHandler = () => {
        if (!formIsValid) {
            setFormData(formData);
            return;
        }
        navigation.navigate("SignUpEndScreen", {
            formData,
        });
    };

    let button = (
        <TouchableOpacity onPress={nextButtonHandler}>
            <CustomButton color="white" textContent="Valider" />
        </TouchableOpacity>
    );

    if (formIsValid) {
        button = (
            <TouchableOpacity onPress={nextButtonHandler}>
                <CustomButton textContent="Suivant">
                    <MaterialCommunityIcons
                        name="arrow-right-thin"
                        size={20}
                        color={colors.black}
                    />
                </CustomButton>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.form}>
            <CustomInput
                inputId="email"
                label="Email"
                value={formData.email}
                updateData={updateData}
                validate={(val: string) => validateEmail(val)}
            />

            <CustomInput
                inputId="password"
                type="password"
                value={formData.password}
                label="Mot de passe"
                updateData={updateData}
                validate={(val: string) => validatePassword(val)}
            />
            <CustomInput
                inputId="passwordConfirmation"
                type="password"
                value={formData.passwordConfirmation}
                label="Confirmation du mot de passe"
                updateData={updateData}
                validate={(val: string) =>
                    validatePasswordConfirmation(val, formData.password)
                }
            />
            <View style={styles.containerBtn}>{button}</View>
        </View>
    );
};

export default SignUpForm;

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 14,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    containerBtn: {
        width: 150,
        alignSelf: "center",
        marginTop: 40,
    },
    bg: {
        height: 300,
        width: "100%",
    },
    overlay: {
        height: "100%",
        width: "100%",
    },
});
