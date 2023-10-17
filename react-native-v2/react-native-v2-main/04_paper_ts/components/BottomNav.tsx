import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BottomNavigation } from "react-native-paper";

interface IRoute {}

const HomeRoute: React.FC<{}> = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
    </View>
);

const MusicRoute = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Music</Text>
    </View>
);

const AlbumsRoute = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Albums</Text>
    </View>
);

const RecentsRoute = () => (
    <View style={styles.container}>
        <Text style={styles.title}>Recents</Text>
    </View>
);

const BottomNav = () => {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: "home", title: "Home", icon: "home" },
        { key: "music", title: "Music", icon: "music" },
        { key: "albums", title: "Albums", icon: "album" },
        { key: "recents", title: "Recents", icon: "history" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        music: MusicRoute,
        albums: AlbumsRoute,
        recents: RecentsRoute,
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
    container: { flex: 1, backgroundColor: "blue" },
    title: {
        flex: 1,
        backgroundColor: "lightgrey",
    },
});
