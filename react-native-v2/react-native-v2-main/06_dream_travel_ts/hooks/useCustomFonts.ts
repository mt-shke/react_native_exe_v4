import { useFonts } from "expo-font";

const useCustomFont = () => {
    let [fontsLoaded] = useFonts({
        "Playfair-Display": require("../assets/fonts/Playfair-Display.ttf"),
        "Playfair-Display-Bold": require("../assets/fonts/Playfair-Display-Bold.ttf"),
        "Readex-Pro": require("../assets/fonts/Readex-Pro.ttf"),
        "Readex-Pro-Bold": require("../assets/fonts/Readex-Pro-Bold.ttf"),
        "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
        "Raleway-Bold": require("../assets/fonts/Raleway-Bold.ttf"),
        "Raleway-SemiBold": require("../assets/fonts/Raleway-SemiBold.ttf"),
    });

    return fontsLoaded;
};

export default useCustomFont;
