// styles/login.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.mainPink,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: COLORS.greenWhite,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  header: {
    fontSize: 35,
    fontWeight: "600",
    color: COLORS.textPrimary,
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 35,
  },
  title: {
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
    marginTop: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlign: "center",
    margin: hp("2%"),
    fontWeight: "600",
  },
  thinText: {
    fontWeight: "300",
  },
  largeText: {
    fontWeight: "600",
    fontSize: 24,
  },
  form: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: hp("2%"),
  },
  formContainer: {
    marginBottom: hp("1%"),
  },
  inputGroup: {
    marginBottom: hp("2%"),
  },
  label: {
    fontSize: hp("2%"),
    marginBottom: 8,
    marginLeft: 8,
    color: COLORS.textPrimary,
    fontWeight: "400",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGreen,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGreen,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    height: hp("5%"),
    color: COLORS.textPrimary,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("3%"),
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
