import { useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import LoginStyle from "@/assets/styles/login.styles";
import { Image } from "expo-image";
import COLORS from "@/constants/color";
import SafeScreen from "@/components/SafeScreen";
import { useRouter, Link } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function ForgotPassword() {
  const router = useRouter();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <SafeScreen>
      <View style={LoginStyle.container}>
        <Text style={[LoginStyle.header, { textAlign: "center" }]}>
          Forgot Password
        </Text>
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[LoginStyle.card, { maxHeight: undefined }]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* FORM */}
          <View style={[{ paddingTop: hp("5%") }, LoginStyle.formContainer]}>
            <View style={{ marginBottom: hp("8%"), gap: hp("2%") }}>
              <Text style={LoginStyle.largeText}>Reset Password?</Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </Text>
            </View>
            {/* Email */}
            <View style={LoginStyle.inputGroup}>
              <Text style={LoginStyle.label}>Enter email address</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="example@example.com"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
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
            >
              <Text style={LoginStyle.buttonText}>Next Step</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                LoginStyle.button,
                {
                  backgroundColor: COLORS.lightGreen,
                  width: 200,
                  height: 45,
                  borderRadius: 30,
                  marginTop: hp("2%"),
                },
              ]}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={LoginStyle.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 28 }}>
              <Text style={LoginStyle.thinText}>or sign up with</Text>
              <View
                style={{
                  marginTop: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Image
                  source={require("../../assets/images/Facebook.svg")}
                  style={{ width: 32, height: 32 }}
                ></Image>
                <Image
                  source={require("../../assets/images/Google.svg")}
                  style={{ width: 32, height: 32 }}
                ></Image>
              </View>
            </View>
            <Text style={[LoginStyle.thinText, { marginTop: 20 }]}>
              Don’t have an account?{" "}
              <Link href="/(auth)/signup" style={{ color: COLORS.deepPink }}>
                Sign Up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}

export default ForgotPassword;
