import { StyleSheet } from "react-native";
import COLORS from "../../constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  inputGroup: {
    gap: hp("3%"),
  },
  datePicker: {
    backgroundColor: COLORS.bagie,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "absolute",
    zIndex: 9999,
    top: hp("9%"),
    width: wp("80%"),
  },
  searchBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.mainPink,
    paddingVertical: hp("1%"),
    width: wp("30%"),
    borderRadius: wp("15%"),
  },
});
export default styles;
