import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@react-navigation/elements";
import COLORS from "../constants/color";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BottomNavBar = ({ state, descriptors, navigation }) => {
  const getIconByName = ({ routeName, focused }) => {
    const iconSize = 24;
    const activeColor = COLORS.letterAndIcon; // active
    const inactiveColor = COLORS.bagie; // active

    switch (routeName) {
      case "index":
        return (
          <FontAwesome
            name="home"
            size={iconSize}
            color={focused ? activeColor : inactiveColor}
          />
        );
      case "analysis":
        return (
          <MaterialCommunityIcons
            name="google-analytics"
            size={iconSize}
            color={focused ? activeColor : inactiveColor}
          />
        );
      case "transaction":
        return (
          <FontAwesome5
            name="exchange-alt"
            size={23}
            color={focused ? activeColor : inactiveColor}
          />
        );
      case "categories":
        return (
          <AntDesign
            name="tags"
            size={25}
            color={focused ? activeColor : inactiveColor}
          />
        );
      case "user":
        return (
          <FontAwesome
            name="user"
            size={iconSize}
            color={focused ? activeColor : inactiveColor}
          />
        );
      default:
        return null;
    }
  };
  const styles = StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      width: "100%",
      height: "10%",
      backgroundColor: COLORS.darkGreen,
      alignSelf: "center",
      position: "absolute",
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      shadowColor: "gray",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    tabItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: wp("4%"),
      paddingVertical: "3%",
      borderRadius: wp("12%") / 2,
    },
    tabTitle: {
      marginLeft: 8,
      fontWeight: 500,
    },
  });

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? COLORS.mainPink : "transparent" },
            ]}
          >
            {getIconByName({
              routeName: route.name,
              focused: isFocused,
            })}
            {isFocused && <Text style={styles.tabTitle}>{label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavBar;
