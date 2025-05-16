import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, useNavigation } from "expo-router";
import Styles from "@/assets/styles/notification.styles";
import LoginStyle from "@/assets/styles/login.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";

export default function ChangePinScreen() {
  const navigation = useNavigation();
  const { visibility, toggleSetVisibility } = usePasswordVisibility();
  return (
    <SafeScreen>
      <View style={Styles.container}>
        {/* HEADER */}
        <View style={Styles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Change Pin</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>

        {/* CARD */}
        <View style={[Styles.card, { paddingTop: hp("8%"), gap: hp("3%") }]}>
          <View style={LoginStyle.inputGroup}>
            <Text style={LoginStyle.label}>Current Pin</Text>
            <View style={LoginStyle.inputContainer}>
              <TextInput
                style={LoginStyle.input}
                secureTextEntry={!visibility.password}
                placeholder="Enter your pin"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Ionicons
                name={visibility.password ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="black"
                onPress={() => toggleSetVisibility("password")}
              />
            </View>
          </View>
          <View style={LoginStyle.inputGroup}>
            <Text style={LoginStyle.label}>New Pin</Text>
            <View style={LoginStyle.inputContainer}>
              <TextInput
                style={LoginStyle.input}
                secureTextEntry={!visibility.newPassword}
                placeholder="Enter your pin"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Ionicons
                name={
                  visibility.newPassword ? "eye-outline" : "eye-off-outline"
                }
                size={24}
                color="black"
                onPress={() => toggleSetVisibility("newPassword")}
              />
            </View>
          </View>
          <View style={LoginStyle.inputGroup}>
            <Text style={LoginStyle.label}>Confirm New Pin</Text>
            <View style={LoginStyle.inputContainer}>
              <TextInput
                style={LoginStyle.input}
                secureTextEntry={!visibility.confirm}
                placeholder="Enter your pin"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Ionicons
                name={visibility.confirm ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="black"
                onPress={() => toggleSetVisibility("confirm")}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              marginTop: hp("3%"),
              backgroundColor: COLORS.darkGreen,
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("7%"),
              borderRadius: wp("7%"),
            }}
            onPress={() => {}}
          >
            <Text
              style={{ color: COLORS.bagie, fontWeight: 500, fontSize: 18 }}
            >
              Change Pin
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
