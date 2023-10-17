import { View, Text, StyleSheet, Image } from "react-native";
import { IProductProps } from "../interfaces";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { useEffect } from "react";
import { useAssets } from "expo-asset";

// Testing with dynamic url
const AltCardBody: React.FC<IProductProps> = ({ product }) => {
    // const [imgUrl, setImgUrl] = useState<any>(null);
    // const url = "../../../assets/icon.png";
    // const url = "./ok.txt";
    // const newPath = require(product.photo);
    // const [assets, error] = useAssets([
    //     require("../assets/img/1.png"),
    //     require("../assets/img/2.png"),
    // ]);
    // console.log(assets);

    const getInfo = async (url: string) => {
        const dir = FileSystem.documentDirectory;
        // const assetsUri = await Asset.fromModule(require(".assets/img/1.png"))
        //     .uri;

        // await FileSystem.makeDirectoryAsync(assetsUri + "");
        // const infos = await FileSystem.readDirectoryAsync("" + dir);
        // const infos = await FileSystem.getInfoAsync(url);
        // infos.forEach((file) => console.log("File:", file));
        // console.log(assetsUri);
    };

    // useEffect(() => {
    //     getInfo(url);
    // }, []);

    // const getFile = async (path: string) => {
    //     try {
    //         const imgResumable = FileSystem.createDownloadResumable(
    //             "http://techslides.com/demos/sample-videos/small.mp4",
    //             FileSystem.documentDirectory + "small.mp4",
    //             {}
    //             // callback
    //         );

    //         const img = await imgResumable.downloadAsync();
    //     } catch (error) {
    //         return null;
    //     }
    // };

    // const downloadImage = async () => {
    //     try {
    //         let result = await FileSystem.downloadAsync(
    //             "https://i.ytimg.com/vi/K4zm30yeHHE/maxresdefault.jpg",
    //             FileSystem.documentDirectory + "spider.jpg"
    //         );
    //         setImgUrl(result.uri);

    //         const fileInfo = await FileSystem.getInfoAsync(result.uri);

    //         if (fileInfo.exists) {
    //             let fileString = await FileSystem.readAsStringAsync(
    //                 result.uri,
    //                 { encoding: FileSystem.EncodingType.Base64 }
    //             );
    //             let base64String = "data:image/jpg;base64" + fileString;
    //         }
    //     } catch (error) {
    //         console.warn(error);
    //     }
    // };

    // const img = getFile(product.photo);

    return (
        <View style={styles.container}>
            <Image source={product.photo} style={styles.img} />
            <View style={styles.containerText}>
                <Text
                    numberOfLines={1}
                    style={styles.title}
                >{`${product.title}`}</Text>
                <Text
                    style={styles.desc}
                    ellipsizeMode={"tail"}
                    numberOfLines={3}
                >{`${product.desc}`}</Text>
            </View>
        </View>
    );
};

export default AltCardBody;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "80%",
        overflow: "hidden",
    },
    containerText: {
        width: "100%",
        alignItems: "flex-start",
        paddingHorizontal: 4,
    },
    img: {
        resizeMode: "contain",
        width: "100%",
        height: "55%",
        // position: "relative",
        // left: -40
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    desc: {
        fontSize: 14,
    },
});
