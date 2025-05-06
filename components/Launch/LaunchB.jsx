import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../constants/color";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import SafeScreen from "../SafeScreen";
import LoginStyle from "../../assets/styles/login.styles";

function LaunchB() {
  const router = useRouter();
  return (
    <>
      <SafeScreen backgroundColor={COLORS.greenWhite}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/logoFinWise-pink.svg")}
            style={styles.img}
          />
          <Text style={styles.title}>Fin Wise</Text>
          <Text style={{ textAlign: "center", fontWeight: "300" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </Text>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <TouchableOpacity
              style={[
                LoginStyle.button,
                {
                  backgroundColor: COLORS.mainPink,
                  width: 200,
                  height: 45,
                  borderRadius: 30,
                },
              ]}
              onPress={() => router.navigate("/(auth)")}
            >
              <Text style={LoginStyle.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                LoginStyle.button,
                {
                  backgroundColor: COLORS.lightGreen,
                  width: 200,
                  height: 45,
                  borderRadius: 30,
                },
              ]}
              onPress={() => router.navigate("/(auth)/signup")}
            >
              <Text style={LoginStyle.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Link href="/(auth)/forgot" style={LoginStyle.subtitle}>
              Forgot Password?
            </Link>
          </View>
        </View>
      </SafeScreen>
    </>
  );
}

export default LaunchB;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingVertical: 16,
    paddingHorizontal: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 110,
    height: 120,
    marginBottom: 10,
  },
  title: {
    color: COLORS.deepPink,
    fontSize: 53,
    fontWeight: "700",
    marginBottom: 4,
  },
});
