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

  // AVATAR IMAGE
  const [selectedImg, setSelectedImg] = useState(null);
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
          <Avatar
            isEdit={true}
            name="John Smith"
            ID="25030024"
            onImagePicked={(uri) => setSelectedImg(uri)}
            imageUri={selectedImg}
          />
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
            style={{ marginTop: hp("16%") }}
            contentContainerStyle={{
              paddingBottom: hp("20%"),
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
          >
            <Text
              className="font-semibold"
              style={{ fontSize: wp("6%"), marginBottom: hp("2.5%") }}
            >
              Account Settings
            </Text>
            <View style={{ display: "flex", gap: hp("2%") }}>
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
              <View
                className="flex flex-row justify-between"
                style={{ marginTop: hp("3%") }}
              >
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
                Update Profile
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeScreen>
  );
};
export default EditProfile;
