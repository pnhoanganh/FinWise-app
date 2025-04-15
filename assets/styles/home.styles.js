import { StyleSheet } from "react-native";
import COLORS from "../../constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: hp("3%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50,
    marginHorizontal: wp("14%"),
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "700",
    fontSize: 24,
  },
  totalHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  totalContainer: {
    marginHorizontal: wp("14%"),
    marginTop: wp("8%"),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    borderRadius: 66,
    padding: wp("6%"),
    marginVertical: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.greenWhite,
    height: "100%",
    marginTop: wp("8%"),
    alignItems: "center",
  },
  box: {
    backgroundColor: COLORS.darkGreen,
    width: wp("85%"),
    height: wp("40%"),
    borderRadius: 31,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: wp("5%"),
    justifyContent: "space-between",
  },
  leftSection: {
    alignItems: "center",
    flex: 1,
    paddingLeft: wp("8%"),
  },
  outerRing: {
    width: wp("22%"),
    height: wp("22%"),
    borderRadius: wp("22%") / 2,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  leftBorder: {
    position: "absolute",
    left: 0,
    width: "50%",
    height: "100%",
    backgroundColor: "#F1FFF3",
    opacity: 0.64,
  },

  rightBorder: {
    position: "absolute",
    right: 0,
    width: "50%",
    height: "100%",
    backgroundColor: COLORS.deepPink,
  },

  innerRing: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("20%") / 2,
    backgroundColor: COLORS.darkGreen,
    justifyContent: "center",
    alignItems: "center",
  },

  goalText: {
    color: COLORS.bagie,
    textAlign: "center",
    marginTop: 10,
    fontSize: wp("3%"),
    fontWeight: "600",
  },
  rightSection: {
    flex: 2,
    paddingLeft: wp("5%"),
    borderLeftWidth: 2,
    borderColor: COLORS.greenWhite,
    marginRight: wp("5%"),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  label: {
    color: COLORS.bagie,
    fontSize: wp("3%"),
    fontWeight: "500",
  },
  value: {
    color: COLORS.mainPink,
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  negativeValue: {
    color: COLORS.mainPink,
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  divider: {
    height: 2,
    width: wp("40%"),
    backgroundColor: "#fff",
    marginVertical: wp("3%"),
    borderRadius: 2,
  },
  menuGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGreen,
    padding: wp("2%"),
    width: wp("90%"),
    borderRadius: "8%",
    marginTop: wp("7%"),
    alignItems: "center",
  },
  menuItem: {
    padding: wp("4%"),
    borderRadius: "25%",
  },
  menuText: {
    color: COLORS.black,
    fontSize: wp("4%"),
  },
  transactionGroup: {
    display: "flex",
    width: wp("95%"),
    alignItems: "center",
  },
});
export default styles;
