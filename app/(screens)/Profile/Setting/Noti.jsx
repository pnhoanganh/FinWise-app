import { Text, View, Switch, ScrollView, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useNavigation } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import { useState, useRef } from "react";

const settings = [
  "General Notification",
  "Sound",
  "Sound Call",
  "Vibrate",
  "Transaction Update",
  "Expense Reminder",
  "Budget Notifications",
  "Low Balance Alerts",
];

export default function NotiSettingScreen() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [switchStates, setSwitchStates] = useState(
    Object.fromEntries(settings.map((item) => [item, false]))
  );

  const toggleSwitch = (key) => {
    setSwitchStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Notification Settings
            </Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>

        {/* CARD */}
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp("20%"),
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
          style={[Styles.card, { paddingTop: hp("5%") }]}
        >
          {settings.map((item) => (
            <View
              key={item}
              className="flex flex-row justify-between"
              style={{ marginTop: hp("3%") }}
            >
              <Text className="text-xl">{item}</Text>
              <Switch
                onValueChange={() => toggleSwitch(item)}
                value={switchStates[item]}
                trackColor={{ false: "#767577", true: COLORS.mainPink }}
                thumbColor={switchStates[item] ? COLORS.bagie : "#f4f3f4"}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
