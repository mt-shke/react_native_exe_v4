import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomCard = ({ data }) => {
    return (
        <Card style={styles.card} elevation={10}>
            <TopContainer data={data} />
            <BottomContainer data={data} />
        </Card>
    );
};

export default CustomCard;

const TopContainer = ({ data }) => {
    const img =
        data.type === "Marche à pied"
            ? "https://cache.magazine-avantages.fr/data/photo/w1000_ci/1jv/marche-a-pied-poifs-minceur-maigrir.webp"
            : "https://www.numerama.com/wp-content/uploads/2021/10/velo-pure-2-2048x1152.jpg?resize=512,288";

    return (
        <Card.Content style={styles.containerTop}>
            <Card.Content style={styles.containerTitle}>
                <Paragraph style={styles.date}>{data.date}</Paragraph>
                <Title style={styles.type}>{data.type}</Title>
            </Card.Content>
            {/* image  */}
            <Card.Cover style={styles.cover} source={{ uri: img }} />
        </Card.Content>
    );
};

const BottomContainer = ({ data }) => {
    const hours = Math.floor(data.length / 60);
    const minutes = data.length % 60;

    return (
        <Card.Content style={styles.containerBot}>
            {/* left container  */}
            <Card.Content style={styles.containerData}>
                <Title style={styles.title}>Distance</Title>
                <Paragraph style={styles.text}>{data.distance} Km</Paragraph>
            </Card.Content>
            {/* right container */}
            <Card.Content style={styles.containerData}>
                <Title style={styles.title}>Durée</Title>
                <Paragraph
                    style={styles.text}
                >{`${hours}h${minutes}mn`}</Paragraph>
            </Card.Content>
        </Card.Content>
    );
};

// https://github.com/callstack/react-native-paper/blob/main/src/components/Card/CardContent.tsx#L93

const styles = StyleSheet.create({
    card: {
        marginVertical: 18,
        marginHorizontal: 12,
        paddingTop: 0,
        borderColor: "black",
        borderWidth: 1,
        overflow: "hidden",
    },

    // Top Container
    containerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 0,
        paddingTop: 0,
    },
    containerTitle: {
        backgroundColor: "white",
        marginTop: 14,
    },
    date: {
        fontSize: 20,
        color: "#4d4d4d",
    },
    type: {
        fontWeight: "bold",
        fontSize: 20,
    },
    cover: {
        width: "40%",
        aspectRatio: 5 / 3,
        margin: 14,
        borderColor: "black",
        borderWidth: 1,
    },

    // Bottom container
    containerBot: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 4,
    },
    containerData: {
        backgroundColor: "white",
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 18,
        height: 28,
        justifyContent: "center",
        paddingVertical: 0,
        marginVertical: 0,
    },
    text: {
        color: "#4d4d4d",
        paddingVertical: 0,
        marginVertical: 0,
    },
});
