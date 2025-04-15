import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import HomeStyles from "../../assets/styles/home.styles";
import SafeScreen from "@/components/SafeScreen";
import ProgressBar from "../../components/ProgressBar";
import TransactionItem from "@/components/TransactionItem";

export default function Home() {
  // TABS DATA
  const [activeTab, setActiveTab] = useState("daily");
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
  ];

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

  // TRANSACTION DATA
  const transactionData = {
    daily: [
      {
        icon: require("@/assets/images/market.svg"),
        widthIcon: wp("5%"),
        heightIcon: wp("8%"),
        title: "Coffee",
        date: "09:00 - April 15",
        frequency: "Daily",
        amount: "-$5.00",
      },
      {
        icon: require("@/assets/images/Food.svg"),
        widthIcon: wp("6.5%"),
        heightIcon: wp("11%"),
        title: "Snacks",
        date: "11:30 - April 15",
        frequency: "Daily",
        amount: "-$3.50",
      },
    ],
    weekly: [
      {
        icon: require("@/assets/images/Salary.svg"),
        widthIcon: wp("7%"),
        heightIcon: wp("7%"),
        title: "Freelance",
        date: "10:00 - April 14",
        frequency: "Weekly",
        amount: "$500.00",
      },
      {
        icon: require("@/assets/images/market.svg"),
        widthIcon: wp("5%"),
        heightIcon: wp("8%"),
        title: "Groceries",
        date: "17:00 - April 12",
        frequency: "Pantry",
        amount: "-$60.00",
      },
    ],
    monthly: [
      {
        icon: require("@/assets/images/Salary.svg"),
        widthIcon: wp("7%"),
        heightIcon: wp("7%"),
        title: "Salary",
        date: "18:27 - April 30",
        frequency: "Monthly",
        amount: "$4,000.00",
      },
      {
        icon: require("@/assets/images/market.svg"),
        widthIcon: wp("5%"),
        heightIcon: wp("8%"),
        title: "Groceries",
        date: "17:00 - April 24",
        frequency: "Pantry",
        amount: "-$100.00",
      },
      {
        icon: require("@/assets/images/rent.svg"),
        widthIcon: wp("8%"),
        heightIcon: wp("7%"),
        title: "Rent",
        date: "8:30 - April 15",
        frequency: "Rent",
        amount: "-$674.40",
      },
    ],
  };

  // FINANCE DATA
  const financeData = {
    totalBalance: 7783.0,
    totalExpense: 1187.4,
  };

  return (
    <SafeScreen>
      <ScrollView>
        <View style={HomeStyles.container}>
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
            {/* MENU */}
            <View style={HomeStyles.menuGroup}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    HomeStyles.menuItem,
                    {
                      backgroundColor:
                        activeTab === tab.id
                          ? COLORS.mainPink
                          : COLORS.lightGray,
                    },
                  ]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Text style={HomeStyles.menuText}> {tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* TRASACTION ITEM */}
            <View style={HomeStyles.transactionGroup}>
              {transactionData[activeTab].map((item, index) => (
                <TransactionItem
                  key={index}
                  icon={item.icon}
                  widthIcon={item.widthIcon}
                  heightIcon={item.heightIcon}
                  title={item.title}
                  date={item.date}
                  frequency={item.frequency}
                  amount={item.amount}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
