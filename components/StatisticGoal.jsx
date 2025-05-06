import { View, Text } from "react-native";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../constants/color";
import PieChartIcon from "./Char/PieChartIcon";
import ProgressBar from "./Char/ProgressBar";
import AnalysisStyles from "@/assets/styles/analysis.styles";

const CalculatePercentage = (goal, saved) => {
  if (
    goal <= 0 ||
    saved < 0 ||
    !Number.isFinite(saved) ||
    !Number.isFinite(goal)
  ) {
    return 0;
  }

  const percentage = (saved / goal) * 100;
  return Math.min(100, Math.max(0, Math.round(percentage)));
};

const StatisticGoal = ({ goal, saved, icon, iconWidth, iconHeight, label }) => {
  const percentage = CalculatePercentage(goal, saved);

  const pieData = [
    { value: percentage, color: "#EBA0C9" },
    { value: 100 - percentage, color: "#FFFDEC" },
  ];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: wp("8%"),
        }}
      >
        {/* GOAL STATISTIC */}
        <View>
          <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <Image
              source={require("../assets/images/Income.svg")}
              style={{
                width: wp("2.5%"),
                height: wp("2.5%"),
                marginTop: 2,
              }}
            />
            <View>
              <Text>Goal</Text>
              <Text style={{ fontSize: 22, fontWeight: "700" }}>
                ${goal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              marginTop: hp("3.5%"),
            }}
          >
            <Image
              source={require("../assets/images/Expense.svg")}
              style={{
                width: wp("2.5%"),
                height: wp("2.5%"),
                marginTop: 2,
              }}
            />
            <View>
              <Text>Amount Saved</Text>
              <Text
                style={{
                  color: COLORS.deepPink,
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                ${saved.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <PieChartIcon
            data={pieData}
            icon={icon}
            iconWidth={iconWidth}
            iconHeight={iconHeight}
            label={label}
          />
        </View>
      </View>
      <View style={{ width: wp("100%"), marginTop: hp("2%") }}>
        <ProgressBar
          percentage={percentage}
          amount={goal}
          bg={COLORS.mainPink}
        />
        {/* CHECK TEXT */}
        <View
          style={[
            AnalysisStyles.totalContainer,
            {
              marginTop: hp("1%"),
              justifyContent: "flex-start",
              gap: wp("2%"),
            },
          ]}
        >
          <Image
            source={require("../assets/images/check.png")}
            style={{ width: 12, height: 12 }}
          />
          <Text style={{ fontSize: 15 }}>
            30% of your expenses, looks good.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StatisticGoal;
