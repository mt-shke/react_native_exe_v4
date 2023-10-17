import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";
import ServiceView from "../components/services/ServiceView";
import { colors } from "../global/colors";
import { StyleSheet } from "react-native";
import data from "../data.json";

const ServicesScreen = (props) => {
    const [index, setIndex] = useState(0);
    const tabItems = data[0].services.map((service) => service.name);

    return (
        <>
            <Tab
                containerStyle={styles.containerStyle}
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: colors.white,
                    height: 0,
                    color: colors.black,
                }}
                variant="primary"
            >
                {/* Render the Top tab items  */}
                {tabItems.map((item, index) => (
                    <Tab.Item
                        key={index}
                        title={item}
                        titleStyle={styles.btnTitle}
                        icon={false}
                    />
                ))}
            </Tab>

            {/* Render the view for each tab  */}
            <TabView value={index} onChange={setIndex} animationType="spring">
                {data[0].services.map((service, index) => (
                    <ServiceView
                        key={index}
                        name={service.name}
                        content={service.content}
                    />
                ))}
            </TabView>
        </>
    );
};

export default ServicesScreen;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: colors.black,
    },
    btnTitle: {
        fontSize: 11,
        paddingHorizontal: 0,
    },
});
