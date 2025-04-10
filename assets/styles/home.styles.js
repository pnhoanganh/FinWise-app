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
    justifyContent: "space-around",
    alignItems: "center",
    gap: 50,
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
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 199,
    overflow: "hidden",
    marginHorizontal: wp("14%"),
    width: wp("70"),
    paddingHorizontal: 5,
    height: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  progressFill: {
    backgroundColor: COLORS.textPrimary,
    color: COLORS.white,
    width: "30%",
  },
  card: {
    borderRadius: 66,
    padding: 20,
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
});
export default styles;
