import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";

const ProgressBar = ({ percentage = 30, amount = 20000 }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { flex: percentage }]}>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
      <View style={[styles.remaining, { flex: 100 - percentage }]}>
        <Text style={styles.amountText}>
          ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 999,
    overflow: "hidden",
    height: 30,
    backgroundColor: COLORS.textPrimary,
    marginHorizontal: wp("12%"),
    marginTop: wp("4%"),
  },
  fill: {
    justifyContent: "center",
    alignItems: "center",
  },
  remaining: {
    backgroundColor: COLORS.greenWhite,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
  },
  percentageText: {
    color: "#fff",
    fontWeight: "500",
  },
  amountText: {
    color: "#11292c",
    fontWeight: "600",
    fontStyle: "italic",
  },
});
