import { useState, useRef, useEffect } from "react";
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
import ProgressBar from "@/components/Char/ProgressBar";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BarChart } from "react-native-gifted-charts";
import barChartData from "@/assets/data/analysisData/barChartData.json";
import pieChartData from "@/assets/data/analysisData/targetPieChartData.json";
import TargetProgressCard from "@/components/Char/TargetProgressCard";

export default function Analysis() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("daily");
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  const [pieChart, setPieChart] = useState([]);
  useEffect(() => {
    setPieChart(pieChartData.categoryProgressData);
  });

  const [chartData, setCharData] = useState([]);
  useEffect(() => {
    setCharData(barChartData[activeTab]);
  }, [activeTab]);

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
                onPress={() => {
                  setActiveTab(tab.id);
                  setCharData(barChartData[tab.id]);
                }}
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
                    router.navigate("/(screens)/calendarAnalysis");
                  }}
                >
                  <Image
                    source={require("../../assets/images/calender.svg")}
                    style={{ width: 18, height: 16 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {chartData.length ? (
              <View style={{ alignItems: "center", width: wp("80%") }}>
                <BarChart
                  data={chartData}
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
              {pieChart.length > 0 ? (
                pieChart.map((item, index) => (
                  <View
                    key={item.id || `${item.title}-${index}`}
                    style={AnalysisStyles.categoryChart}
                  >
                    <TargetProgressCard
                      percentage={item.percentage}
                      title={item.title}
                      pieData={item.pieData}
                    />
                  </View>
                ))
              ) : (
                <Text>No target data available</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
