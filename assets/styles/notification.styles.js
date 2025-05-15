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
    fontWeight: 600,
  },
  boldText: {
    fontWeight: "700",
    fontSize: 24,
  },
  card: {
    borderRadius: 66,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: COLORS.greenWhite,
    height: hp("90%"),
    marginTop: wp("8%"),
  },
});
export default styles;
