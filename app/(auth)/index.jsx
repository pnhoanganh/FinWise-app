import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import LoginStyle from "../../assets/styles/login.styles";
import { Image } from "expo-image";
import COLORS from "../../constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeScreen from "../../components/SafeScreen";
import { useRouter, Link } from "expo-router";
import "@expo/match-media";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeScreen>
      <View style={LoginStyle.container}>
        <Text style={[LoginStyle.header, { textAlign: "center" }]}>
          Welcome
        </Text>
        <View style={LoginStyle.card}>
          {/* FORM */}
          <View style={[{ paddingTop: hp("5%") }, LoginStyle.formContainer]}>
            {/* Email */}
            <View style={LoginStyle.inputGroup}>
              <Text style={LoginStyle.label}>Username or Email</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your usename or email"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>

            {/* Password */}
            <View style={LoginStyle.inputGroup}>
              <Text style={LoginStyle.label}>Password</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  secureTextEntry={!showPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="black"
                  onPress={toggleShowPassword}
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
              onPress={() => {
                router.navigate("/(screens)/OnBoarding/OnBoardingA");
              }}
            >
              <Text style={LoginStyle.buttonText}>Log In</Text>
            </TouchableOpacity>
            <Link href="/(auth)/forgot" style={LoginStyle.subtitle}>
              Forgot Password?
            </Link>

            <TouchableOpacity
              style={[
                LoginStyle.button,
                {
                  backgroundColor: COLORS.lightGreen,
                  width: 200,
                  height: 45,
                  borderRadius: 30,
                  marginTop: 0,
                },
              ]}
              onPress={() => router.navigate("/(auth)/signup")}
            >
              <Text style={LoginStyle.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={LoginStyle.title}>
              Use <Text style={{ color: COLORS.deepPink }}>Fingerprint</Text> To
              Access
            </Text>
            <View style={{ marginTop: hp("1%") }}>
              <Text style={LoginStyle.thinText}>or sign up with</Text>
              <View
                style={{
                  marginTop: 12,
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
            <Text style={[LoginStyle.thinText, { marginTop: 12 }]}>
              Don’t have an account?{" "}
              <Link href="/(auth)/signup" style={{ color: COLORS.deepPink }}>
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}
