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
    padding: wp("8%"),
    marginVertical: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.greenWhite,
    height: "100%",
    marginTop: wp("8%"),
  },
  box: {
    backgroundColor: COLORS.darkGreen,
    width: wp("85%"),
    height: wp("60%"),
    borderRadius: 31,
    gap: wp("5%"),
    marginTop: wp("5%"),
    padding: wp("5%"),
  },

  menuGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGreen,
    padding: wp("2%"),
    width: wp("85%"),
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
});
export default styles;
