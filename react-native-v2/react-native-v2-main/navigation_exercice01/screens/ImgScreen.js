import { View, Image, StyleSheet, SafeAreaView } from "react-native";

const ImgScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.screenContainer}>
                <Image
                    style={styles.img}
                    source={{
                        uri: "https://cursus.edu/storage/thumbnails/INkezMyT0LWTsAUYgH8258YXUIMwsmSoldVFA4I9.jpeg",
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default ImgScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
        marginTop: 50,
    },
    img: {
        padding: 20,
        alignSelf: "center",
        width: "80%",
        height: 300,
    },
});
