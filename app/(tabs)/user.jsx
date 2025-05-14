import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Link, router, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import AnalysisStyles from "@/assets/styles/analysis.styles";
import LoginStyle from "@/assets/styles/login.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Avatar from "../../components/Profile/Avatar";
import iconMapper from "@/constants/iconMapper";

const ButtonTag = ({ icon, label, widthIcon, heightIcon, onPressFunc }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: wp("4%"),
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.deepPink,
          height: hp("7%"),
          width: wp("16%"),
          borderRadius: wp("6%"),
        }}
        onPress={onPressFunc}
      >
        <Image
          source={iconMapper[icon]}
          style={{ width: widthIcon, height: heightIcon, margin: "auto" }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: wp("5%"), fontWeight: 500 }}>{label}</Text>
    </View>
  );
};

export default function User() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  return (
    <SafeScreen>
      <View style={AnalysisStyles.container}>
        {/* HEADER */}
        <View style={AnalysisStyles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Profile</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>
        <View style={{ position: "relative", top: hp("3%"), zIndex: 99 }}>
          <Avatar isEdit={false} name="John Smith" ID="25030024" />
        </View>
        {/* CARD */}
        <View
          style={[
            LoginStyle.card,
            {
              marginTop: 0,
              paddingTop: 0,
              position: "absolute",
              top: hp("15%"),
              right: 0,
              left: 0,
            },
          ]}
        >
          <ScrollView
            scrollEventThrottle={5}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: hp("15%") }}
            contentContainerStyle={{
              paddingBottom: hp("20%"),
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
          >
            <View className="flex flex-col gap-8">
              <ButtonTag
                icon="profile"
                label="Edit Profile"
                widthIcon={wp("7%")}
                heightIcon={wp("8%")}
                onPressFunc={() =>
                  router.push("/(screens)/Profile/editProfile")
                }
              />
              <ButtonTag
                icon="security"
                label="Security"
                widthIcon={wp("7%")}
                heightIcon={wp("8%")}
                onPressFunc={() =>
                  router.push("/(screens)/Profile/Security/Security")
                }
              />
              <ButtonTag
                icon="setting"
                label="Setting"
                widthIcon={wp("7%")}
                heightIcon={wp("8%")}
              />
              <ButtonTag
                icon="help"
                label="Help"
                widthIcon={wp("8%")}
                heightIcon={wp("8%")}
              />
              <ButtonTag
                icon="logout"
                label="Logout"
                widthIcon={wp("5%")}
                heightIcon={wp("8%")}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeScreen>
  );
}
