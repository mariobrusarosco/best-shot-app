import "./global.css";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// import { FlatList } from "react-native/types_generated/index";

const _TOURNAMENTS = [
	{
		label: "World Cup 2026",
		slug: "world-cup-2026",
	},
	{
		label: "Copa America 2026",
		slug: "copa-america-2026",
	},
	{
		label: "Euro 2026",
		slug: "euro-2026",
	},
];

export default function App() {
	return (
		<View style={styles.container}>
			<Text>BEST SHOT!</Text>

			{/* <FlatList
				data={_TOURNAMENTS}
				renderItem={({ item }: { item: { label: string; slug: string } }) => (
					<Text>{item.label}</Text>
				)}
				keyExtractor={(item: { slug: string }) => item.slug}
			/> */}

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
