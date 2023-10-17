import { IData, userCivilityType } from "../../ts/interfaces";
import CustomSelectInput from "./CustomSelectInput";

interface ISelectInputCivilityProps {
    updateData: (val: IData) => void;
    value: string;
}

const SelectInputCivility: React.FC<ISelectInputCivilityProps> = ({
    updateData,
    value,
}) => {
    return (
        <CustomSelectInput
            updateData={updateData}
            inputId="civility"
            options={["Monsieur", "Madame", "Mademoiselle"]}
            label={"Civilité"}
            placeholder={"Choisissez votre civilité"}
            value={value}
        />
    );
};

export default SelectInputCivility;
