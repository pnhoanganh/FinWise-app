import { Text, View, ScrollView } from "react-native";
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
      <ScrollView>
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
              style={{
                width: 2,
                height: 44,
                backgroundColor: COLORS.lightGreen,
                borderRadius: 2,
              }}
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
          <View style={HomeStyles.card}>
            <View style={HomeStyles.box}>
              {/* Left: Circular progress with icon */}
              <View style={HomeStyles.leftSection}>
                {/* Placeholder for ring */}
                <View style={HomeStyles.outerRing}>
                  {/* Nửa trái border */}
                  <View style={HomeStyles.leftBorder} />
                  {/* Nửa phải border */}
                  <View style={HomeStyles.rightBorder} />

                  {/* Vòng tròn nhỏ ở giữa (mặt nạ che viền) */}
                  <View style={HomeStyles.innerRing}>
                    <Image
                      source={require("@/assets/images/Car.svg")}
                      style={{ width: wp("10%"), height: wp("6%") }}
                    />
                  </View>
                </View>

                <Text style={HomeStyles.goalText}>Savings{"\n"}On Goals</Text>
              </View>

              {/* Right: Revenue and Food info */}
              <View style={HomeStyles.rightSection}>
                {/* Revenue */}
                <View style={HomeStyles.item}>
                  <Image
                    source={require("@/assets/images/Salary.svg")}
                    style={{ width: wp("8%"), height: wp("7.4%") }}
                  />
                  <View>
                    <Text style={HomeStyles.label}>Revenue Last Week</Text>
                    <Text style={HomeStyles.value}>$4.000.00</Text>
                  </View>
                </View>

                <View style={HomeStyles.divider} />

                {/* Food */}
                <View style={HomeStyles.item}>
                  <Image
                    source={require("@/assets/images/Food.svg")}
                    style={{ width: wp("6.5%"), height: wp("11%") }}
                  />
                  <View>
                    <Text style={HomeStyles.label}>Food Last Week</Text>
                    <Text style={HomeStyles.negativeValue}>-$100.00</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
