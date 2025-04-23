import { PieChart } from "react-native-gifted-charts";
import { Text, View } from "react-native";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const renderLegend = (text, color) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 12,
      }}
    >
      <View
        style={{
          height: 18,
          width: 18,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: color || "white",
        }}
      />
      <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
        {text || ""}
      </Text>
    </View>
  );
};

export default function PieChartFocusOnPress({ data }) {
  if (!data || !Array.isArray(data)) return [];
  return (
    <View style={{ marginTop: hp("1%"), alignItems: "center" }}>
      <PieChart
        donut
        showText
        textColor="black"
        innerRadius={wp("10%")}
        radius={wp("30%")}
        showTextBackground
        textBackgroundColor="transparent"
        textBackgroundRadius={22}
        data={data}
        focusOnPress
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: 20,
          paddingHorizontal: wp("5%"),
        }}
      >
        {data.map((item, index) => (
          <View key={index}>{renderLegend(item.label, item.color)}</View>
        ))}
      </View>
    </View>
  );
}
