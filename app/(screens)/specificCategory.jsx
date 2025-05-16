import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { Link, useLocalSearchParams, useNavigation, router } from "expo-router";
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
import data from "@/assets/data/categoriesData/allExpenses.json";
import CategoryExpenseItem from "@/components/CategoryExpenseItem";
import LoginStyles from "@/assets/styles/login.styles";

export default function SpecificCategory() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams();
  const [expensesData, setExpensesData] = useState();
  useEffect(() => {
    setExpensesData(data);
  }, []);

  const renderItem = (item, index) => (
    <CategoryExpenseItem
      key={item.id || `${item.title}-${item.date}-${index}`}
      icon={item.icon}
      widthIcon={wp(`${item.widthIcon}%`)}
      heightIcon={wp(`${item.heightIcon}%`)}
      title={item.title}
      date={item.date}
      amount={`-$${Math.abs(item.amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`}
    />
  );

  const financeData = {
    totalBalance: 7783.0,
    totalExpense: 1187.4,
    percentageOfExpenses: 30,
  };
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>{id}</Text>
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
          style={[
            LoginStyles.card,
            { maxHeight: undefined, marginTop: hp("3%") },
          ]}
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
            onPress={() => router.navigate("/(screens)/calendarAnalysis")}
          >
            <Image
              source={require("../../assets/images/calender.svg")}
              style={{ width: 18, height: 16 }}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 3 }}>
            {expensesData && expensesData[id] && expensesData[id].length > 0 ? (
              expensesData[id].map((group, index) => (
                <View key={index}>
                  <Text className="font-medium text-lg">{group.month}</Text>
                  <View style={{ marginTop: hp("2%") }} className="my-5">
                    {group.transaction.map((item, index) =>
                      renderItem(item, index)
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
            )}
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              marginTop: 8,
              backgroundColor: COLORS.darkGreen,
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("7%"),
              borderRadius: wp("7%"),
            }}
            onPress={() => {
              router.navigate("/(screens)/addExpense");
            }}
          >
            <Text
              style={{ color: COLORS.bagie, fontWeight: 500, fontSize: 18 }}
            >
              Add Expense
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
