import { View, Text } from "react-native";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../constants/color";
import iconMapper from "../../constants/iconMapper";
import { PieChart } from "react-native-gifted-charts";

const PieChartIcon = ({ icon, iconWidth, iconHeight, data, label }) => {
  return (
    <View
      style={{
        paddingVertical: hp("2.4%"),
        paddingHorizontal: wp("7%"),
        backgroundColor: COLORS.darkGreen,
        borderRadius: "30%",
      }}
    >
      <PieChart
        donut
        innerRadius={wp("13%")}
        radius={wp("14%")}
        innerCircleColor={COLORS.darkGreen}
        data={data}
        centerLabelComponent={() => {
          return (
            <Image
              source={iconMapper[icon]}
              style={{ width: iconWidth, height: iconHeight }}
            ></Image>
          );
        }}
      />
      <Text
        style={{
          textAlign: "center",
          marginTop: 8,
          color: COLORS.bagie,
          fontSize: hp("1.8%"),
          fontWeight: 600,
        }}
      >
        {label}
      </Text>
    </View>
  );
};
export default PieChartIcon;
