import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/color";
import { Image } from "expo-image";
import SafeScreen from "../SafeScreen";

function LaunchA() {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logoFinWise-dark.svg")}
          style={styles.img}
        ></Image>
        <Text style={styles.text}> FinWise</Text>
      </View>
    </SafeScreen>
  );
}

export default LaunchA;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.mainPink,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  img: {
    width: "110",
    height: "120",
  },
  text: {
    color: COLORS.white,
    fontSize: 53,
    fontWeight: "700",
  },
});
