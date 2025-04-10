import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStyles from "../../assets/styles/home.styles";
import SafeScreen from "@/components/SafeScreen";
import { Image } from "expo-image";
import COLORS from "@/constants/color";
import ProgressBar from "../../components/ProgressBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Home() {
  return (
    <SafeScreen>
      <View style={HomeStyles.container}>
        {/* HEADER */}
        <View style={HomeStyles.header}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Hi, Welcome Back
            </Text>
            <Text style={{ fontSize: 14 }}>Good Morning</Text>
          </View>
          <Ionicons name="notifications" size={24} color="black" />
        </View>
        {/* TOTAL */}
        <View style={HomeStyles.totalContainer}>
          {/* Total Balance */}
          <View>
            <View style={HomeStyles.totalHeader}>
              <Image
                source={require("../../assets/images/Income.svg")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={HomeStyles.text}>Total Balance</Text>
            </View>
            <Text style={[HomeStyles.boldText, { marginTop: 2 }]}>
              $7,783.00
            </Text>
          </View>
          <View
            style={{ width: 2, height: 44, backgroundColor: COLORS.lightGreen }}
          ></View>
          {/* Total Expense */}
          <View>
            <View style={HomeStyles.totalHeader}>
              <Image
                source={require("../../assets/images/Expense.svg")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={HomeStyles.text}>Total Expense</Text>
            </View>
            <Text
              style={[
                HomeStyles.boldText,
                { marginTop: 2, color: COLORS.darkGreen },
              ]}
            >
              -$1.187.40
            </Text>
          </View>
        </View>
        {/* PROGRESS BAR */}
        <ProgressBar percentage={30} amount={20000} />

        {/* CHECK TEXT */}
        <View
          style={[
            HomeStyles.totalContainer,
            { marginTop: wp("4%"), justifyContent: "flex-start", gap: 10 },
          ]}
        >
          <Image
            source={require("../../assets/images/check.png")}
            style={{ width: 12, height: 12 }}
          />
          <Text style={{ fontSize: 15 }}>
            30% of your expenses, looks good.
          </Text>
        </View>

        {/* CARD */}
        <View style={HomeStyles.card}></View>
      </View>
    </SafeScreen>
  );
}
