import { useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import LoginStyle from "../../assets/styles/login.styles";
import { Image } from "expo-image";
import COLORS from "../../constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeScreen from "../../components/SafeScreen";
import { Link } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import "@expo/match-media";

export default function SignUp() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <SafeScreen>
      <View style={LoginStyle.container}>
        <Text style={[LoginStyle.header, { textAlign: "center" }]}>
          Create Account
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
          <View style={[{ paddingTop: 12 }]}>
            {/* Full Name */}
            <View style={{ marginBottom: 8 }}>
              <Text style={LoginStyle.label}>Full Name</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your full name"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>
            {/* Email */}
            <View style={{ marginBottom: 12 }}>
              <Text style={LoginStyle.label}>Email</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your Email"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>
            {/* Moblie Phone */}
            <View style={{ marginBottom: 12 }}>
              <Text style={LoginStyle.label}>Moblie Phone</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your moblie phone"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>

            {/* Date of Birth */}
            <View style={{ marginBottom: 12 }}>
              <Text style={LoginStyle.label}>Date of Birth</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your birthday"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>

            {/* Password */}
            <View style={{ marginBottom: 12 }}>
              <Text style={LoginStyle.label}>Password</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <Ionicons name="eye-off-outline" size={24} color="black" />
              </View>
            </View>
            {/* Confirm Password */}
            <View style={{ marginBottom: 12 }}>
              <Text style={LoginStyle.label}>Confirm Password</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <Ionicons name="eye-off-outline" size={24} color="black" />
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                textAlign: "center",
                width: wp("61%"),
                fontSize: hp("1.8%"),
              }}
            >
              By continuing, you agree to{" "}
              <Text style={{ fontWeight: "600" }}>Terms of Use</Text> and{" "}
              <Text style={{ fontWeight: "600" }}>Privacy Policy</Text>.
            </Text>
            <TouchableOpacity
              style={[
                LoginStyle.button,
                {
                  backgroundColor: COLORS.mainPink,
                  width: wp("50%"),
                  height: hp("5%"),
                  borderRadius: 30,
                },
              ]}
            >
              <Text style={[LoginStyle.buttonText]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: "center", marginTop: 10, fontWeight: 300 }}>
            Already have an account?{" "}
            <Link href="/(auth)" style={{ color: COLORS.deepPink }}>
              Log In
            </Link>
          </Text>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
