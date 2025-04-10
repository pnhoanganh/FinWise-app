import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@react-navigation/elements";
import COLORS from "../constants/color";
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BottomNavBar = ({ state, descriptors, navigation }) => {
  const getIconByName = ({ routeName, focused }) => {
    const iconSize = 24;
    const activeColor = COLORS.letterAndIcon; // active
    const inactiveColor = "gray"; // active

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
      case "catogory":
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
      width: "85%",
      backgroundColor: COLORS.lightGreen,
      alignSelf: "center",
      position: "absolute",
      bottom: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      shadowColor: "gray",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      paddingVertical: 16,
      paddingHorizontal: 18,
    },
    tabItem: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      paddingHorizontal: "5%",
      borderRadius: 50,
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
