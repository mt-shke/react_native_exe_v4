import HomeView from "../components/home/HomeView";
import { HomeScreenProps } from "../types";

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
    return <HomeView navigation={navigation} route={route} />;
};

export default HomeScreen;
