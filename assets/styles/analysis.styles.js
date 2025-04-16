import { StyleSheet } from "react-native";
import COLORS from "../../constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("3%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp("10%"),
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
    gap: wp("1%"),
    alignItems: "center",
  },
  totalContainer: {
    marginHorizontal: wp("14%"),
    marginTop: hp("4%"),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    borderRadius: 66,
    padding: wp("8%"),
    marginVertical: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.greenWhite,
    marginTop: hp("2%"),
  },
  box: {
    backgroundColor: COLORS.darkGreen,
    width: wp("84%"),
    borderRadius: 31,
    gap: hp("3%"),
    marginTop: hp("3%"),
    padding: wp("5%"),
  },
  menuGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGreen,
    padding: wp("2%"),
    width: wp("84%"),
    borderRadius: "8%",
  },
  menuItem: {
    padding: wp("4%"),
    borderRadius: "30%",
  },
  menuText: {
    color: COLORS.black,
    fontSize: wp("4%"),
  },
  categoryChartGroup: {
    display: "flex",
    flexDirection: "row",
    gap: wp("3%"),
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  categoryChart: {
    backgroundColor: COLORS.mainPink,
    borderRadius: wp("50%") / 5,
  },
});

export default styles;
