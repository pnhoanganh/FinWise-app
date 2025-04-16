import { useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { Link, router, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import AnalysisStyles from "@/assets/styles/analysis.styles";
import ProgressBar from "@/components/ProgressBar";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BarChart, PieChart } from "react-native-gifted-charts";

const CategoryProgressCard = ({ percentage, title, pieData }) => {
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
};

export default function Analysis() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("daily");
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  // DATA
  const barChartData = {
    daily: [
      { value: 2500, frontColor: COLORS.deepPink, spacing: 6, label: "Mon" },
      { value: 4000, frontColor: COLORS.bagie },
      { value: 5000, frontColor: COLORS.deepPink, spacing: 6, label: "Tue" },
      { value: 3000, frontColor: COLORS.bagie },
      { value: 4500, frontColor: COLORS.deepPink, spacing: 6, label: "Wed" },
      { value: 4000, frontColor: COLORS.bagie },
      { value: 2000, frontColor: COLORS.deepPink, spacing: 6, label: "Thu" },
      { value: 3500, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Fri" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Sat" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Sun" },
      { value: 2800, frontColor: COLORS.bagie },
    ],
    weekly: [
      { value: 8000, frontColor: COLORS.deepPink, spacing: 6, label: "1st" },
      { value: 7000, frontColor: COLORS.bagie },
      { value: 7500, frontColor: COLORS.deepPink, spacing: 6, label: "2nd" },
      { value: 6000, frontColor: COLORS.bagie },
      { value: 9500, frontColor: COLORS.deepPink, spacing: 6, label: "3rd" },
      { value: 8000, frontColor: COLORS.bagie },
      { value: 12000, frontColor: COLORS.deepPink, spacing: 6, label: "4th" },
      { value: 10000, frontColor: COLORS.bagie },
    ],
    monthly: [
      { value: 10000, frontColor: COLORS.deepPink, spacing: 6, label: "Jan" },
      { value: 9000, frontColor: COLORS.bagie },
      { value: 10500, frontColor: COLORS.deepPink, spacing: 6, label: "Feb" },
      { value: 8500, frontColor: COLORS.bagie },
      { value: 13500, frontColor: COLORS.deepPink, spacing: 6, label: "Mar" },
      { value: 12000, frontColor: COLORS.bagie },
      { value: 12000, frontColor: COLORS.deepPink, spacing: 6, label: "Apr" },
      { value: 13500, frontColor: COLORS.bagie },
      { value: 13000, frontColor: COLORS.deepPink, spacing: 6, label: "May" },
      { value: 12000, frontColor: COLORS.bagie },
      { value: 13000, frontColor: COLORS.deepPink, spacing: 6, label: "Jun" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Jul" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Aug" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Sep" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Oct" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Nov" },
      { value: 2800, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "Dec" },
      { value: 2800, frontColor: COLORS.bagie },
    ],
    yearly: [
      { value: 2500, frontColor: COLORS.deepPink, spacing: 6, label: "2019" },
      { value: 2400, frontColor: COLORS.bagie },
      { value: 3500, frontColor: COLORS.deepPink, spacing: 6, label: "2020" },
      { value: 3000, frontColor: COLORS.bagie },
      { value: 4500, frontColor: COLORS.deepPink, spacing: 6, label: "2021" },
      { value: 4000, frontColor: COLORS.bagie },
      { value: 2000, frontColor: COLORS.deepPink, spacing: 6, label: "2022" },
      { value: 3500, frontColor: COLORS.bagie },
      { value: 3000, frontColor: COLORS.deepPink, spacing: 6, label: "2023" },
      { value: 2800, frontColor: COLORS.bagie },
    ],
  };

  // CALCULATE INCOME AND EXPENSE
  let totalIncome = 0;
  let totalExpense = 0;

  barChartData[activeTab].forEach((item) => {
    if (item.frontColor === COLORS.deepPink) {
      totalIncome += item.value;
    } else if (item.frontColor === COLORS.bagie) {
      totalExpense += item.value;
    }
  });

  const financeData = {
    totalBalance: 7783.0,
    totalExpense: 1187.4,
    percentageOfExpenses: 30,
  };

  const pieData = [];

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <SafeScreen>
      <View style={AnalysisStyles.container}>
        {/* HEADER */}
        <View style={AnalysisStyles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Analysis</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>

        {/* TOTAL */}
        <View style={AnalysisStyles.totalContainer}>
          <View>
            <View style={AnalysisStyles.totalHeader}>
              <Image
                source={require("../../assets/images/Income.svg")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={AnalysisStyles.text}>Total Balance</Text>
            </View>
            <Text style={[AnalysisStyles.boldText, { marginTop: 2 }]}>
              $
              {financeData.totalBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View
            style={{
              width: 2,
              height: 44,
              backgroundColor: COLORS.lightGreen,
              borderRadius: 2,
            }}
          />
          <View>
            <View style={AnalysisStyles.totalHeader}>
              <Image
                source={require("../../assets/images/Expense.svg")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={AnalysisStyles.text}>Total Expense</Text>
            </View>
            <Text
              style={[
                AnalysisStyles.boldText,
                { marginTop: 2, color: COLORS.darkGreen },
              ]}
            >
              -$
              {financeData.totalExpense.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        {/* PROGRESS BAR */}
        <ProgressBar percentage={30} amount={20000} />

        {/* CHECK TEXT */}
        <View
          style={[
            AnalysisStyles.totalContainer,
            {
              marginTop: hp("2%"),
              justifyContent: "flex-start",
              gap: wp("2%"),
            },
          ]}
        >
          <Image
            source={require("../../assets/images/check.png")}
            style={{ width: 12, height: 12 }}
          />
          <Text style={{ fontSize: 15 }}>
            {financeData.percentageOfExpenses}% of your expenses, looks good.
          </Text>
        </View>

        {/* CARD */}
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[AnalysisStyles.card, { maxHeight: undefined }]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* MENU */}
          <View style={AnalysisStyles.menuGroup}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  AnalysisStyles.menuItem,
                  {
                    backgroundColor:
                      activeTab === tab.id ? COLORS.mainPink : COLORS.lightGray,
                  },
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={AnalysisStyles.menuText}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* BOX ANALYSIS */}
          <View style={[AnalysisStyles.box, { height: undefined }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.bagie,
                  fontSize: wp("4%"),
                  fontWeight: "600",
                }}
              >
                Income & Expenses
              </Text>
              <View style={{ flexDirection: "row", gap: wp("2%") }}>
                <TouchableOpacity
                  style={{
                    width: wp("8%"),
                    height: wp("8%"),
                    backgroundColor: COLORS.mainPink,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    router.navigate("/(screens)/searchAnalysis");
                  }}
                >
                  <Image
                    source={require("../../assets/images/find.png")}
                    style={{
                      width: 16,
                      height: 16,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: wp("8%"),
                    height: wp("8%"),
                    backgroundColor: COLORS.mainPink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                  onPress={() => {
                    router.navigate("/(screens)/calenderAnlysis");
                  }}
                >
                  <Image
                    source={require("../../assets/images/calender.svg")}
                    style={{ width: 18, height: 16 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {barChartData[activeTab]?.length ? (
              <View style={{ alignItems: "center", width: wp("80%") }}>
                <BarChart
                  data={barChartData[activeTab]}
                  barWidth={wp("2.2%")}
                  height={hp("18%")}
                  width={wp("54%")}
                  initialSpacing={16}
                  spacing={24}
                  barBorderRadius={4}
                  yAxisThickness={0}
                  xAxisColor={COLORS.bagie}
                  yAxisTextStyle={{ color: COLORS.bagie }}
                  noOfSections={4}
                  maxValue={15000}
                  stepValue={5000}
                  yAxisLabelTexts={["0", "5k", "10k", "15k"]}
                  labelWidth={30}
                  xAxisLabelTextStyle={{
                    color: COLORS.bagie,
                    textAlign: "center",
                  }}
                  xAxisType="solid"
                />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: wp("5%"),
                  height: hp("38%"),
                  color: COLORS.bagie,
                  textAlign: "center",
                }}
              >
                No data available
              </Text>
            )}
          </View>

          {/* INCOME - EXPENSE */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginVertical: hp("4%"),
            }}
          >
            <View style={{ alignItems: "center", gap: wp("1%") }}>
              <Image
                source={require("../../assets/images/incomePink.svg")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={AnalysisStyles.text}>Income</Text>
              <Text
                style={{
                  fontSize: wp("5%"),
                  fontWeight: "700",
                  color: COLORS.deepPink,
                }}
              >
                $
                {totalIncome.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={{ alignItems: "center", gap: wp("1%") }}>
              <Image
                source={require("../../assets/images/expensesGreen.svg")}
                style={{ width: 30, height: 30 }}
              />
              <Text style={AnalysisStyles.text}>Expense</Text>
              <Text
                style={{
                  fontSize: wp("5%"),
                  fontWeight: "700",
                  color: COLORS.darkGreen,
                }}
              >
                $
                {totalExpense.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>

          {/* TARGET */}
          <View
            style={{ display: "flex", flexDirection: "column", gap: hp("2%") }}
          >
            <Text style={{ fontSize: hp("2%") }}>My targets</Text>
            <View style={AnalysisStyles.categoryChartGroup}>
              <View style={AnalysisStyles.categoryChart}>
                <CategoryProgressCard
                  percentage={30}
                  title="Travel"
                  pieData={[
                    { value: 30, color: COLORS.darkGreen },
                    { value: 70, color: COLORS.greenWhite },
                  ]}
                />
              </View>
              <View style={AnalysisStyles.categoryChart}>
                <CategoryProgressCard
                  percentage={40}
                  title="Food"
                  pieData={[
                    { value: 40, color: COLORS.darkGreen },
                    { value: 60, color: COLORS.greenWhite },
                  ]}
                />
              </View>
              <View style={AnalysisStyles.categoryChart}>
                <CategoryProgressCard
                  percentage={50}
                  title="Enducation"
                  pieData={[
                    { value: 50, color: COLORS.darkGreen },
                    { value: 50, color: COLORS.greenWhite },
                  ]}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
