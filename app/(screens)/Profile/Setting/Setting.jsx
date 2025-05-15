import { Text, View, Animated, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router, useNavigation } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";

export default function SettingScreen() {
  const navigation = useNavigation();
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Security</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>

        {/* CARD */}
        <View style={[Styles.card, { paddingTop: hp("5%") }]}>
          <TouchableOpacity
            onPress={() => {
              router.push("(screens)/Profile/Setting/Noti");
            }}
            className="flex flex-row justify-between py-6 "
          >
            <View className="flex flex-row gap-8 items-center">
              <View
                style={{
                  backgroundColor: COLORS.mainPink,
                  borderRadius: "90%",
                  width: wp("10%"),
                  height: hp("5%"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("@/assets/images/noti.svg")}
                  style={{
                    width: wp("4%"),
                    height: wp("5%"),
                  }}
                />
              </View>

              <Text className="text-xl">Notification Settings</Text>
            </View>

            <MaterialIcons name="navigate-next" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("(screens)/Profile/Setting/ChangePass");
            }}
            className="flex flex-row justify-between py-6 "
          >
            <View className="flex flex-row gap-8 items-center">
              <View
                style={{
                  backgroundColor: COLORS.mainPink,
                  borderRadius: "90%",
                  width: wp("10%"),
                  height: hp("5%"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/images/password.svg")}
                  style={{
                    width: wp("6%"),
                    height: wp("3%"),
                  }}
                />
              </View>

              <Text className="text-xl">Password Settings</Text>
            </View>

            <MaterialIcons name="navigate-next" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("(screens)/Profile/Setting/DelAccount");
            }}
            className="flex flex-row justify-between py-6 "
          >
            <View className="flex flex-row gap-8 items-center">
              <View
                style={{
                  backgroundColor: COLORS.mainPink,
                  borderRadius: "90%",
                  width: wp("10%"),
                  height: hp("5%"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("@/assets/images/userDark.svg")}
                  style={{
                    width: wp("4%"),
                    height: wp("5%"),
                  }}
                />
              </View>

              <Text className="text-xl">Delete Account</Text>
            </View>

            <MaterialIcons name="navigate-next" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
