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
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import TransactionItem from "@/components/TransactionItem";

const calculateTotals = (data) => {
  let totalIncome = 0;
  let totalExpense = 0;

  data.sumary.forEach((group) => {
    group.transaction.forEach((transaction) => {
      let amountStr = transaction.amount.replace("$", "").replace(",", "");
      const amount = parseFloat(amountStr);

      if (isNaN(amount)) {
        console.warn(`Invalid amount detected: ${transaction.amount}`);
        return;
      }

      if (amount > 0) {
        totalIncome += amount;
      } else {
        totalExpense += Math.abs(amount);
      }
    });
  });

  const totalBalance = totalIncome - totalExpense;

  return {
    totalBalance: totalBalance.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }),
    totalIncome: totalIncome.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }),
    totalExpense: totalExpense.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }),
  };
};

// Filter income transactions (positive amounts)
const getIncomeTransactions = (sumary) => {
  const incomeGroups = {};

  sumary.forEach((group) => {
    const incomeTransactions = group.transaction.filter((t) => {
      const amount = parseFloat(t.amount.replace("$", "").replace(",", ""));
      return amount > 0;
    });

    if (incomeTransactions.length > 0) {
      incomeGroups[group.month] = {
        month: group.month,
        transaction: incomeTransactions,
      };
    }
  });

  return Object.values(incomeGroups);
};

// Filter expense transactions (negative amounts)
const getExpenseTransactions = (sumary) => {
  const expenseGroups = {};

  sumary.forEach((group) => {
    const expenseTransactions = group.transaction.filter((t) => {
      const amount = parseFloat(t.amount.replace("$", "").replace(",", ""));
      return amount < 0;
    });

    if (expenseTransactions.length > 0) {
      expenseGroups[group.month] = {
        month: group.month,
        transaction: expenseTransactions,
      };
    }
  });

  return Object.values(expenseGroups);
};

export default function Transaction() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState("sumary");

  const transactionData = {
    sumary: [
      {
        month: "April",
        transaction: [
          {
            icon: require("@/assets/images/market.svg"),
            widthIcon: wp("5%"),
            heightIcon: wp("8%"),
            title: "Coffee",
            date: "09:00 - April 15",
            frequency: "Monthly",
            amount: "-$500",
          },
          {
            icon: require("@/assets/images/Food.svg"),
            widthIcon: wp("6.5%"),
            heightIcon: wp("11%"),
            title: "Snacks",
            date: "11:30 - April 15",
            frequency: "Monthly",
            amount: "-$100",
          },
          {
            icon: require("@/assets/images/Salary.svg"),
            widthIcon: wp("7%"),
            heightIcon: wp("7%"),
            title: "Freelance",
            date: "10:00 - April 14",
            frequency: "Monthly",
            amount: "$20,000",
          },
          {
            icon: require("@/assets/images/market.svg"),
            widthIcon: wp("5%"),
            heightIcon: wp("8%"),
            title: "Groceries",
            date: "17:00 - April 12",
            frequency: "Pantry",
            amount: "-$1600",
          },
          {
            icon: require("@/assets/images/transport.svg"),
            widthIcon: wp("8%"),
            heightIcon: wp("8%"),
            title: "Transport",
            date: "09:00 - April 15",
            frequency: "Daily",
            amount: "-$150",
          },
        ],
      },
      {
        month: "March",
        transaction: [
          {
            icon: require("@/assets/images/transport.svg"),
            widthIcon: wp("8%"),
            heightIcon: wp("8%"),
            title: "Transport",
            date: "09:00 - March 15",
            frequency: "Monthly",
            amount: "-$155",
          },
          {
            icon: require("@/assets/images/Food.svg"),
            widthIcon: wp("6.5%"),
            heightIcon: wp("11%"),
            title: "Snacks",
            date: "11:30 - March 15",
            frequency: "Monthly",
            amount: "-$300",
          },
          {
            icon: require("@/assets/images/Salary.svg"),
            widthIcon: wp("7%"),
            heightIcon: wp("7%"),
            title: "Freelance",
            date: "10:00 - March 14",
            frequency: "Monthly",
            amount: "$15,500",
          },
        ],
      },
    ],
  };

  const calculateData = calculateTotals(transactionData);
  const incomeData = getIncomeTransactions(transactionData.sumary);
  const expenseData = getExpenseTransactions(transactionData.sumary);

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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Transaction</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>

        <View className="mt-9 mx-auto">
          <TouchableOpacity
            onPress={() => {
              setActiveTab("sumary");
            }}
            style={{ width: wp("80%") }}
            className={`flex justify-center items-center rounded-xl py-3 bg-${
              activeTab === "sumary" ? "darkGreen" : "greenWhite"
            }`}
          >
            <Text
              className={`text-s text-${
                activeTab === "sumary" ? "bagie" : "primary"
              }`}
            >
              Total Balance
            </Text>
            <Text
              className={`font-bold text-2xl text-${
                activeTab === "sumary" ? "bagie" : "primary"
              }`}
            >
              ${calculateData.totalBalance}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row mt-4 justify-between">
            {/* INCOME */}
            <TouchableOpacity
              onPress={() => {
                setActiveTab("incomeTab");
              }}
              className={`flex justify-center items-center py-4 px-6 rounded-xl min-w-[135px] gap-1 bg-${
                activeTab === "sumary"
                  ? "greenWhite"
                  : activeTab === "incomeTab"
                  ? "darkGreen"
                  : "greenWhite"
              } text-white`}
            >
              <Image
                source={
                  activeTab === "incomeTab"
                    ? require("../../assets/images/incomeWhite.svg")
                    : require("../../assets/images/incomePink.svg")
                }
                style={{ width: 20, height: 20 }}
              />
              <Text
                className={`text-${
                  activeTab === "incomeTab" ? "bagie" : "black"
                }`}
              >
                Income
              </Text>
              <Text
                className={`font-semibold text-2xl text-${
                  activeTab === "incomeTab" ? "bagie" : "deepPink"
                }`}
              >
                ${calculateData.totalIncome}
              </Text>
            </TouchableOpacity>
            {/* EXPENSE */}
            <TouchableOpacity
              onPress={() => {
                setActiveTab("expenseTab");
              }}
              className={`flex justify-center items-center py-4 px-6 rounded-xl min-w-[135px] gap-1 bg-${
                activeTab === "sumary"
                  ? "greenWhite"
                  : activeTab === "expenseTab"
                  ? "darkGreen"
                  : "greenWhite"
              }`}
            >
              <Image
                source={
                  activeTab === "expenseTab"
                    ? require("../../assets/images/expenseWhite.svg")
                    : require("../../assets/images/expensesGreen.svg")
                }
                style={{ width: 20, height: 20 }}
              />
              <Text
                className={`text-${
                  activeTab === "expenseTab" ? "bagie" : "black"
                }`}
              >
                Expense
              </Text>
              <Text
                className={`font-semibold text-2xl text-${
                  activeTab === "expenseTab" ? "bagie" : "darkGreen"
                }`}
              >
                ${calculateData.totalExpense}
              </Text>
            </TouchableOpacity>
          </View>
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
          <TouchableOpacity
            style={{
              width: wp("10%"),
              height: wp("9%"),
              backgroundColor: COLORS.mainPink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 10,
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
          <View>
            {activeTab === "sumary"
              ? transactionData.sumary.map((group, index) => (
                  <View key={index}>
                    <Text className="font-medium text-lg">{group.month}</Text>
                    <View className="my-4">
                      {group.transaction.map((transactionData, index) => (
                        <TransactionItem
                          key={index}
                          icon={transactionData.icon}
                          widthIcon={transactionData.widthIcon}
                          heightIcon={transactionData.heightIcon}
                          title={transactionData.title}
                          date={transactionData.date}
                          frequency={transactionData.frequency}
                          amount={transactionData.amount}
                        />
                      ))}
                    </View>
                  </View>
                ))
              : activeTab === "incomeTab"
              ? incomeData.map((group, index) => (
                  <View key={index}>
                    <Text className="font-medium text-lg">{group.month}</Text>
                    <View className="my-4">
                      {group.transaction.map((transactionData, index) => (
                        <TransactionItem
                          key={index}
                          icon={transactionData.icon}
                          widthIcon={transactionData.widthIcon}
                          heightIcon={transactionData.heightIcon}
                          title={transactionData.title}
                          date={transactionData.date}
                          frequency={transactionData.frequency}
                          amount={transactionData.amount}
                        />
                      ))}
                    </View>
                  </View>
                ))
              : expenseData.map((group, index) => (
                  <View key={index}>
                    <Text className="font-medium text-lg">{group.month}</Text>
                    <View className="my-4">
                      {group.transaction.map((transactionData, index) => (
                        <TransactionItem
                          key={index}
                          icon={transactionData.icon}
                          widthIcon={transactionData.widthIcon}
                          heightIcon={transactionData.heightIcon}
                          title={transactionData.title}
                          date={transactionData.date}
                          frequency={transactionData.frequency}
                          amount={transactionData.amount}
                        />
                      ))}
                    </View>
                  </View>
                ))}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
