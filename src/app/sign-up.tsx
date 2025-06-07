import { Text, View } from "@/components/Themed"; // Placeholder, replace with Tamagui components later
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function SignUpScreen() {
	const router = useRouter();

	// Placeholder state and functions
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");

	const handleSignUp = () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		console.log("Attempting to sign up with:", name, email, password);
		// TODO: Implement actual sign-up logic
		// On successful sign-up, navigate to the main app or sign-in
		// router.replace('/(auth)/home');
	};

	const navigateToSignIn = () => {
		router.push("/sign-in");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create Account</Text>
			<TextInput
				style={styles.input}
				placeholder="Full Name"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			<TouchableOpacity style={styles.button} onPress={handleSignUp}>
				<Text style={styles.buttonText}>Sign Up</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={navigateToSignIn}>
				<Text style={styles.linkText}>Already have an account? Sign In</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 15,
		marginBottom: 15,
		fontSize: 16,
	},
	button: {
		width: "100%",
		height: 50,
		backgroundColor: "#007AFF", // Example blue color
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	linkText: {
		color: "#007AFF",
		fontSize: 16,
	},
});
