import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../global/globalStyles";

const AboutUsContainer = ({ aboutRef }) => {
    return (
        <View style={styles.containerAboutUs}>
            <Text
                ref={aboutRef}
                style={[styles.aboutTitle, globalStyles.bigTitle]}
            >{`Dream Travel`}</Text>
            <Text style={[globalStyles.paragraph]}>
                {`Welcome to the world of Dreams where all your travel dreams come true! Do you always dream about perfect holiday? But you are confused where to get the best cheap deals for your holidays or business trips? Then Dream World travel is the right choice for you! If you wish to travel far and fast like travel light, pack your entire wish and take off all your troubles. Yes! Dream world travel makes your dream come true Dream world travel is an autonomous and privately owned travel agency that has grown to become a foremost UK board service designed to deliver wide-range travel management that brings on quality, worth for money and customer care amenities founded in UNITED KINGDOM.
`}
            </Text>
            <Text style={[globalStyles.paragraph]}>
                {`Dream World provides the wide range of international and domestic accommodation even for the solo traveler. Dream world gives you the chance of choosing best flights, air cargo and hotel services. Dream world travel makes sure that your travel experience is accommodated well with our best ever services and facilities in competitive prices. Dream world travel is a group of skilled and dedicated travel professionals who are available to assist your travel management on every stop of your voyage. Dream world travel happily ensure you about the best holiday locations whether you are searching for your honeymoon, family trip , business trip or fun filled solo holidays. Dream world travel opens a voice, melody and color for your eyes to see the paths of adventures. So experience the cultures and different people and different destinations across the sphere via Dream World Travel.`}
            </Text>
        </View>
    );
};

export default AboutUsContainer;

const styles = StyleSheet.create({
    containerAboutUs: {
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    aboutTitle: {
        textAlign: "center",
        width: "100%",
        justifyContent: "center",
    },
});
