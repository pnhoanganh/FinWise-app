import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LoginStyle from "@/assets/styles/login.styles";
import { Image } from "expo-image";
import COLORS from "@/constants/color";
import SafeScreen from "@/components/SafeScreen";
import { useRouter } from "expo-router";
import "@expo/match-media";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const onBoardingB = () => {
  const router = useRouter();
  return (
    <SafeScreen>
      <View style={LoginStyle.container}>
        <Text
          style={[
            LoginStyle.header,
            { textAlign: "center", marginVertical: hp("5%") },
          ]}
        >
          Are you ready to take control of your finaces?
        </Text>
        <View
          style={[
            LoginStyle.card,
            {
              marginTop: hp("5%"),
            },
          ]}
        >
          <View
            style={{
              marginHorizontal: "auto",
              marginTop: hp("8%"),
            }}
          >
            <Image
              source={require("../../../assets/images/onBoardingB.png")}
              style={{
                width: wp("70%"),
                height: hp("30%"),
                marginBottom: hp("6%"),
              }}
            />
            <TouchableOpacity onPress={() => router.navigate("(tabs)")}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: wp("7%"),
                  fontWeight: 700,
                }}
              >
                Next
              </Text>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
                justifyContent: "center",
                marginTop: hp("3%"),
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  borderWidth: 2,
                  borderColor: COLORS.textPrimary,
                }}
              ></View>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  backgroundColor: COLORS.mainPink,
                }}
              ></View>
            </View>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default onBoardingB;
