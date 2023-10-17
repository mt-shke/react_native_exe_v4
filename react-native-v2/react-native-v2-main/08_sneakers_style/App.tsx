import {
    FlatList,
    ListRenderItem,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import Card from "./src/components/Card";
import PRODUITS from "./data";
import { IProduct, IProductProps } from "./src/interfaces";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "./src/components/Searchbar";
import { useState } from "react";
import { colors } from "./src/globals";

export default function App() {
    const allProducts: IProduct[] = PRODUITS as IProduct[];
    const [search, setSearch] = useState<string>("");
    const emptySearch = search.trim() === "";

    const filteredProduct: IProduct[] = allProducts.filter(
        (product) =>
            (!emptySearch &&
                product.title
                    .toLowerCase()
                    .includes(search.toLowerCase().trim())) ||
            (!emptySearch &&
                product.brand
                    .toLowerCase()
                    .includes(search.toLowerCase().trim()))
    );

    const productsToRender = !search.length ? allProducts : filteredProduct;
    // const productsToRender = [allProducts[0]];

    // Using FlatList
    const Item = ({ product }: IProductProps) => {
        return <Card product={product} />;
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Searchbar setSearch={setSearch} />

                {/* Using ScrollView  */}
                <ScrollView>
                    <View style={styles.containerSV}>
                        {productsToRender.map((product, index) => (
                            <Card product={product} key={index} />
                        ))}
                    </View>
                </ScrollView>

                {/* Using FlatList  */}
                {/* <FlatList
                    style={styles.containerFL}
                    initialNumToRender={10}
                    numColumns={2}
                    // horizontal={true}
                    data={productsToRender}
                    renderItem={({ item }) => <Item product={item} />}
                    // keyExtractor={(item) => item.id}
                    // extraData={productsToRender}
                /> */}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    containerSV: {
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    containerFL: {
        width: "100%",
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 20,
    },
});
