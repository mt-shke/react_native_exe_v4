import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { ScrollView, StyleSheet } from "react-native";
import CustomCard from "./CustomCard";
import data from "../data.json";

const HomeRoute = () => (
    <ScrollView>
        <Text style={styles.title}>Home</Text>
        {data.map((elem, index) => (
            <CustomCard data={elem} key={index} />
        ))}
    </ScrollView>
);

const HistoryRoute = () => (
    <ScrollView>
        <Text style={styles.title}>History</Text>
    </ScrollView>
);
const AddRoute = () => (
    <ScrollView>
        <Text style={styles.title}>Add</Text>
    </ScrollView>
);

const SettingsRoute = () => (
    <ScrollView>
        <Text style={styles.title}>Settings</Text>
    </ScrollView>
);

const BottomNav = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "home", title: "Home", icon: "home" },
        { key: "history", title: "History", icon: "history" },
        { key: "add", title: "Add", icon: "plus-box" },
        { key: "settings", title: "Settings", icon: "account-settings" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        history: HistoryRoute,
        add: AddRoute,
        settings: SettingsRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default BottomNav;

const styles = StyleSheet.create({
    title: {
        padding: 20,
        fontSize: 28,
        fontWeight: "bold",
    },
});
