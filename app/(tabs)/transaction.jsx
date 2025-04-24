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
import transactionData from "../../assets/data/transactionData/monthlyTransaction.json";

const calculateTotals = (transactionData) => {
  let totalIncome = 0;
  let totalExpense = 0;

  // Check if transactionData and sumary exist
  if (
    !transactionData ||
    !transactionData.sumary ||
    !Array.isArray(transactionData.sumary)
  ) {
    console.warn("Invalid transaction data or sumary not found");
    return {
      totalBalance: "0.00",
      totalIncome: "0.00",
      totalExpense: "0.00",
    };
  }

  transactionData.sumary.forEach((group) => {
    if (group.transaction && Array.isArray(group.transaction)) {
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
    }
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
  if (!sumary || !Array.isArray(sumary)) return [];

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
  if (!sumary || !Array.isArray(sumary)) return [];

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
  const [transaction, setTransaction] = useState(
    transactionData || { sumary: [] }
  );

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

  const calculateData = calculateTotals(transaction);
  const incomeData = getIncomeTransactions(transaction.sumary || []);
  const expenseData = getExpenseTransactions(transaction.sumary || []);

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
            onPress={() => setActiveTab("sumary")}
            style={{
              width: wp("80%"),
              height: hp("8%"),
              backgroundColor:
                activeTab === "sumary" ? COLORS.darkGreen : COLORS.greenWhite,
            }}
            className="flex justify-center items-center rounded-xl py-3 "
          >
            <Text
              style={{
                color:
                  activeTab === "summary"
                    ? COLORS.lightGreen
                    : COLORS.textPrimary,
              }}
              className="text-s"
            >
              Total Balance
            </Text>
            <Text
              style={{
                color:
                  activeTab === "summary"
                    ? COLORS.lightGreen
                    : COLORS.textPrimary,
              }}
              className="font-bold text-2xl"
            >
              ${calculateData.totalBalance}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row mt-4 justify-between">
            {/* INCOME */}
            <TouchableOpacity
              onPress={() => setActiveTab("incomeTab")}
              style={{
                width: wp("36%"),
                backgroundColor:
                  activeTab === "incomeTab"
                    ? COLORS.darkGreen
                    : COLORS.greenWhite,
              }}
              className="flex justify-center items-center py-4 px-6 rounded-xl min-w-[135px] gap-1"
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
                style={{
                  color:
                    activeTab === "incomeTab"
                      ? COLORS.lightGreen
                      : COLORS.textPrimary,
                }}
              >
                Income
              </Text>
              <Text
                style={{
                  color:
                    activeTab === "incomeTab"
                      ? COLORS.lightGreen
                      : COLORS.textPrimary,
                }}
                className="font-semibold text-2xl"
              >
                ${calculateData.totalIncome}
              </Text>
            </TouchableOpacity>
            {/* EXPENSE */}
            <TouchableOpacity
              onPress={() => setActiveTab("expenseTab")}
              style={{
                width: wp("36%"),
                backgroundColor:
                  activeTab === "expenseTab"
                    ? COLORS.darkGreen
                    : COLORS.greenWhite,
              }}
              className="flex justify-center items-center py-4 px-6 rounded-xl min-w-[135px] gap-1"
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
                style={{
                  color:
                    activeTab === "expenseTab"
                      ? COLORS.lightGreen
                      : COLORS.textPrimary,
                }}
              >
                Expense
              </Text>
              <Text
                style={{
                  color:
                    activeTab === "expenseTab"
                      ? COLORS.lightGreen
                      : COLORS.textPrimary,
                }}
                className="font-semibold text-2xl"
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
            onPress={() => router.navigate("/(screens)/calendarAnlysis")}
          >
            <Image
              source={require("../../assets/images/calender.svg")}
              style={{ width: 18, height: 16 }}
            />
          </TouchableOpacity>
          <View>
            {activeTab === "sumary" ? (
              Array.isArray(transaction.sumary) &&
              transaction.sumary.length > 0 ? (
                transaction.sumary.map((group, index) => (
                  <View key={index}>
                    <Text className="font-medium text-lg">{group.month}</Text>
                    <View className="my-4">
                      {group.transaction.map((transactionData, index) =>
                        renderItem(transactionData, index)
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: hp("3%"),
                    fontWeight: 600,
                    marginTop: hp("15%"),
                  }}
                >
                  No transactions available
                </Text>
              )
            ) : activeTab === "incomeTab" ? (
              incomeData.length > 0 ? (
                incomeData.map((group, index) => (
                  <View key={index}>
                    <Text className="font-medium text-lg">{group.month}</Text>
                    <View className="my-4">
                      {group.transaction.map((transactionData, index) =>
                        renderItem(transactionData, index)
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: hp("3%"),
                    fontWeight: 600,
                    marginTop: hp("15%"),
                  }}
                >
                  No income transactions available
                </Text>
              )
            ) : expenseData.length > 0 ? (
              expenseData.map((group, index) => (
                <View key={index}>
                  <Text className="font-medium text-lg">{group.month}</Text>
                  <View className="my-4">
                    {group.transaction.map((transactionData, index) =>
                      renderItem(transactionData, index)
                    )}
                  </View>
                </View>
              ))
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: hp("3%"),
                  fontWeight: 600,
                  marginTop: hp("15%"),
                }}
              >
                No expense transactions available
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
