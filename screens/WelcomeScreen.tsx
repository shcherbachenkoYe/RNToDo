import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.rootContainer}>
      <Image source={require("../assets/to-do.png")} style={styles.image} />
      <Text style={styles.title}>Get Organized Your Life</Text>
      <Text style={styles.subTitle}>
        To-do is a simple and effective to-do list and task manager app witch
        helps you manage time.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          Get Started
        </Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
