import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Switch,
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
import Avatar from "@/components/Profile/Avatar";
import iconMapper from "@/constants/iconMapper";

const EditProfile = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  // SWITCH
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const [isEnabledTheme, setIsEnabledTheme] = useState(false);
  const toggleSwitchTheme = () => {
    setIsEnabledTheme((previousState) => !previousState);
  };

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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Edit My Profile
            </Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>
        <View style={{ position: "relative", top: hp("3%"), zIndex: 99 }}>
          <Avatar isEdit={true} name="John Smith" ID="25030024" />
        </View>
        {/* CARD */}
        <View
          // scrollEventThrottle={5}
          // showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={false}
          style={[
            LoginStyle.card,
            {
              maxHeight: undefined,
              marginTop: 0,
              paddingTop: 0,
              position: "absolute",
              top: hp("15%"),
              right: 0,
              left: 0,
            },
          ]}
          // contentContainerStyle={{
          //   paddingBottom: hp("0%"),
          // }}
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          //   { useNativeDriver: false }
          // )}
        >
          <View
            style={{ marginTop: hp("15%"), display: "flex", gap: hp("3.5%") }}
          >
            <Text className=" text-2xl font-semibold">Account Settings</Text>
            <View style={{ display: "flex", gap: hp("3%") }}>
              <View>
                <Text className=" text-xl">Username</Text>
                <View
                  style={[
                    LoginStyle.inputContainer,
                    {
                      marginTop: hp("1%"),
                      borderRadius: hp("5%") / 2,
                      backgroundColor: "transparent",
                      borderWidth: 0.5,
                      borderColor: "gray",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <TextInput
                    style={LoginStyle.input}
                    placeholder="Write your name..."
                  ></TextInput>
                </View>
              </View>
              <View>
                <Text className=" text-xl">Phone</Text>
                <View
                  style={[
                    LoginStyle.inputContainer,
                    {
                      marginTop: hp("1%"),
                      borderRadius: hp("5%") / 2,
                      backgroundColor: "transparent",
                      borderWidth: 0.5,
                      borderColor: "gray",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <TextInput
                    style={LoginStyle.input}
                    placeholder="Write your phone number..."
                  ></TextInput>
                </View>
              </View>
              <View>
                <Text className=" text-xl">Email</Text>
                <View
                  style={[
                    LoginStyle.inputContainer,
                    {
                      marginTop: hp("1%"),
                      borderRadius: hp("5%") / 2,
                      backgroundColor: "transparent",
                      borderWidth: 0.5,
                      borderColor: "gray",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <TextInput
                    style={LoginStyle.input}
                    placeholder="Write your email..."
                  ></TextInput>
                </View>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xl">Push notifications</Text>
                <Switch
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  trackColor={{ false: "#767577", true: COLORS.mainPink }}
                  thumbColor={isEnabled ? COLORS.bagie : "#f4f3f4"}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xl">Turn Dark Theme</Text>
                <Switch
                  onValueChange={toggleSwitchTheme}
                  value={isEnabledTheme}
                  trackColor={{ false: "#767577", true: COLORS.mainPink }}
                  thumbColor={isEnabledTheme ? COLORS.bagie : "#f4f3f4"}
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default EditProfile;
