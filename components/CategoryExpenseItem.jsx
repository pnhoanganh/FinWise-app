import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import iconMapper from "@/constants/iconMapper";

const CategoryExpenseItem = ({
  icon,
  widthIcon,
  heightIcon,
  title,
  date,
  amount,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", width: wp("45%") }}
      >
        {/* Left Icon */}
        <View style={[styles.iconWrapper]}>
          <Image
            source={iconMapper[icon]}
            style={{ width: widthIcon, height: heightIcon }}
          />
        </View>

        {/* Title + Date */}
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      {/* Amount */}
      <View style={styles.right}>
        <Text style={[styles.amount, { color: COLORS.textPrimary }]}>
          {amount}
        </Text>
      </View>
    </View>
  );
};

export default CategoryExpenseItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: wp("3%"),
    width: "100%",
  },
  iconWrapper: {
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("3%"),
    backgroundColor: COLORS.deepPink,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#0D1C1F",
  },
  date: {
    fontSize: wp("3%"),
    color: "#6C8A73",
    marginTop: 2,
  },
  center: {
    paddingHorizontal: wp("2%"),
  },
  frequency: {
    fontSize: wp("3.5%"),
    color: "#0D1C1F",
    width: wp("15%"),
    textAlign: "center",
  },
  right: {
    paddingLeft: wp("2%"),
  },
  amount: {
    fontSize: wp("4%"),
    fontWeight: "700",
    color: "#0D1C1F",
  },
});
