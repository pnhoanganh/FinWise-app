import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import HomeStyles from "../../assets/styles/home.styles";
import AnalysisStyles from "@/assets/styles/analysis.styles";
import SafeScreen from "@/components/SafeScreen";
import ProgressBar from "../../components/Char/ProgressBar";
import TransactionItem from "@/components/TransactionItem";
import transactionData from "../../assets/data/transactions.json";

export default function Home() {
  // TABS DATA
  const [activeTab, setActiveTab] = useState("daily");
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
  ];
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    setTransaction(transactionData);
  }, []);

  const renderItem = (item, index) => (
    <TransactionItem
      key={item.id || `${item.title}-${item.date}-${index}`}
      icon={item.icon}
      widthIcon={wp(`${item.widthIcon}%`)}
      heightIcon={wp(`${item.heightIcon}%`)}
      title={item.title}
      date={item.date}
      frequency={item.frequency}
      amount={item.amount}
    />
  );

  // Function to calculate income and expense for a given period
  const IncomeAndExpenseWeek = (data, period = "weekly") => {
    let income = 0;
    let expense = 0;

    const transactions = data[period] || [];

    transactions.forEach((item) => {
      const amountStr = item.amount?.replace("$", "") || "0";
      const amount = parseFloat(amountStr);

      if (isNaN(amount)) return;

      if (amount > 0) {
        income += amount;
      } else {
        expense += Math.abs(amount);
      }
    });

    return { income, expense };
  };

  // Calculate weekly income and expense
  const { income: weeklyIncome, expense: weeklyExpense } = IncomeAndExpenseWeek(
    transaction,
    "weekly"
  );
  // HEADER DATA
  /**
   * Automatic timeGreeting
   */
  const automaticTime = () => {
    const hours = new Date().getHours();

    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const headerData = {
    greeting: "Hi, Welcome Back",
    timeGreeting: automaticTime(),
  };

  // FINANCE DATA
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
        <View style={HomeStyles.header}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              {headerData.greeting}
            </Text>
            <Text style={{ fontSize: 14 }}>{headerData.timeGreeting}</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
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
            HomeStyles.totalContainer,
            { marginTop: wp("4%"), justifyContent: "flex-start", gap: 10 },
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
                  <Text style={HomeStyles.value}>
                    $
                    {weeklyIncome.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
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
                  <Text style={HomeStyles.negativeValue}>
                    -$
                    {weeklyExpense.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* MENU */}
          <View style={HomeStyles.menuGroup}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  HomeStyles.menuItem,
                  {
                    backgroundColor:
                      activeTab === tab.id ? COLORS.mainPink : COLORS.lightGray,
                  },
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={HomeStyles.menuText}> {tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* TRASACTION ITEM */}
          <View style={{ marginHorizontal: "auto", marginTop: hp("1%") }}>
            {transaction[activeTab]?.length > 0 ? (
              transaction[activeTab].map((item, index) =>
                renderItem(item, index)
              )
            ) : (
              <Text className=" mt-10 text-xl font-medium">
                No transactions available
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
