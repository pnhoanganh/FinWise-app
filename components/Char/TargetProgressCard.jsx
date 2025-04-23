import { PieChart } from "react-native-gifted-charts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import { Text, View } from "react-native";

export default function TargetProgressCard({ percentage, title, pieData }) {
  return (
    <View
      style={{
        alignItems: "center",
        paddingVertical: wp("4%"),
        paddingHorizontal: wp("5%"),
        gap: wp("2%"),
      }}
    >
      <View>
        <PieChart
          donut
          innerRadius={hp("6%")}
          radius={hp("7%")}
          innerCircleColor={COLORS.mainPink}
          data={pieData}
          centerLabelComponent={() => {
            return <Text style={{ fontSize: wp("4%") }}>{percentage}%</Text>;
          }}
        />
      </View>
      <Text style={{ fontSize: wp("4%") }}>{title}</Text>
    </View>
  );
}
