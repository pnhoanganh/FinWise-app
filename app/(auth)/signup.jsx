import { useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import LoginStyle from "@/assets/styles/login.styles";
import COLORS from "@/constants/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import SafeScreen from "@/components/SafeScreen";
import { Link } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import "@expo/match-media";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Image } from "expo-image";
import searchStyles from "@/assets/styles/searchAnalysis";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";

export default function SignUp() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { visibility, toggleSetVisibility } = usePasswordVisibility();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const toggleDatepicker = () => {
    setShow(!show);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatepicker();
    }
  };
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
            <View style={{ marginBottom: 16 }}>
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
            <View style={{ marginBottom: 16 }}>
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
            <View style={{ marginBottom: 16 }}>
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
            <View style={{ marginBottom: 16 }}>
              <Text style={LoginStyle.label}>Date of Birth</Text>
              <View style={[LoginStyle.inputContainer]}>
                <TextInput
                  style={[
                    LoginStyle.input,
                    { flex: 1 },
                    show && { borderColor: COLORS.deepPink },
                  ]}
                  placeholder="Select date"
                  placeholderTextColor={COLORS.textSecondary}
                  editable={false}
                  value={format(date, "EEE, dd MMM yyyy")}
                  onPressIn={toggleDatepicker}
                />

                <TouchableOpacity
                  style={{
                    width: wp("8%"),
                    height: wp("8%"),
                    backgroundColor: COLORS.mainPink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                  onPress={toggleDatepicker}
                >
                  <Image
                    source={require("@/assets/images/calender.svg")}
                    style={{ width: 18, height: 16 }}
                  />
                </TouchableOpacity>
              </View>
              {show && (
                <View style={searchStyles.datePicker}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    is24Hour={true}
                    onChange={onChange}
                    style={{ width: "100%" }}
                  />
                </View>
              )}
            </View>

            {/* Password */}
            <View style={{ marginBottom: 16 }}>
              <Text style={LoginStyle.label}>Password</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  secureTextEntry={!visibility.newPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <Ionicons
                  name={
                    visibility.newPassword ? "eye-off-outline" : "eye-outline"
                  }
                  size={24}
                  color="black"
                  onPress={() => toggleSetVisibility("newPassword")}
                />
              </View>
            </View>
            {/* Confirm Password */}
            <View style={{ marginBottom: 16 }}>
              <Text style={LoginStyle.label}>Confirm Password</Text>
              <View style={LoginStyle.inputContainer}>
                <TextInput
                  style={LoginStyle.input}
                  secureTextEntry={!visibility.confirm}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <Ionicons
                  name={visibility.confirm ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="black"
                  onPress={() => toggleSetVisibility("confirm")}
                />
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
