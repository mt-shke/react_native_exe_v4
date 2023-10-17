import { View } from "react-native";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";

const Form = (props) => {
    return (
        <View>
            <CustomInput label="Firstname Lastname" inputId="name" />
            <CustomInput label="Email Address" inputId="email" />
            <CustomInput label="Phone Number" inputId="phone" />
            <CustomInput
                label="Preferred Contact Method"
                inputId="contact-method"
            />
            <CustomInput
                label="Your dream vacation"
                inputId="message"
                textarea={true}
            />
            <CustomButton textContent={"Submit"} />
        </View>
    );
};
export default Form;
