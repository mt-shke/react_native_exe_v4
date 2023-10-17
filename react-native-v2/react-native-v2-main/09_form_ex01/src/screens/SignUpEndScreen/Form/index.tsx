import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../../components/UI/CustomButton";
import CustomInput from "../../../components/UI/CustomInput";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootstackParamList, SignUpStackParamList } from "../../../ts/types";
import SelectInputCivility from "../../../components/UI/SelectInputCivility";
import { IData, IFormData } from "../../../ts/interfaces";
import { useEffect, useState } from "react";
import {
    validateBirthDate,
    validateCivility,
    validateEmail,
    validateName,
    validatePasswordConfirmation,
} from "../../../utils";
import DateInput from "../../../components/UI/DateInput";

const SignUpEndForm: React.FC = (props) => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootstackParamList, "SignUpStack">
        >();
    const route =
        useRoute<RouteProp<SignUpStackParamList, "SignUpEndScreen">>();
    const routeFormData = route.params.formData;
    const [formData, setFormData] = useState<IFormData>(routeFormData);

    useEffect(() => {}, [formData]);

    const updateData = (data: IData) => {
        const inputId = Object.keys(data)[0];
        const inputValue = Object.values(data)[0];
        const newData = { ...formData, [inputId]: inputValue.toString() };
        setFormData(newData);
    };

    const formIsValid =
        validateEmail(formData.email) &&
        validatePasswordConfirmation(
            formData.password,
            formData.passwordConfirmation
        ) &&
        validateName(formData.firstname) &&
        validateName(formData.lastname) &&
        validateCivility(formData.civility) &&
        validateBirthDate(formData.birthDate);

    return (
        <View style={styles.form}>
            <SelectInputCivility
                updateData={updateData}
                value={formData.civility}
            />
            <CustomInput
                inputId="firstname"
                label="Prénom"
                value={formData.firstname}
                updateData={updateData}
                validate={(val: string) => validateName(val)}
            />
            <CustomInput
                inputId="lastname"
                label="Prénom"
                value={formData.lastname}
                updateData={updateData}
                validate={(val: string) => validateName(val)}
            />

            <DateInput
                inputId="birthDate"
                label="Date de naissance"
                value={formData.birthDate}
                updateData={updateData}
            />
            <View style={styles.containerBtn}>
                {formIsValid && (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.replace("SuccessScreen", { formData })
                        }
                    >
                        <CustomButton textContent="Terminer" />
                    </TouchableOpacity>
                )}
                {!formIsValid && (
                    <TouchableOpacity onPress={() => {}}>
                        <CustomButton color="white" textContent="Valider" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SignUpEndForm;

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 14,
    },
    containerBtn: {
        width: 150,
        alignSelf: "center",
        marginTop: 40,
    },
});
