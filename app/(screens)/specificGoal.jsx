import { useState, useRef, useEffect } from "react";
import { Text, View, ScrollView, Animated } from "react-native";

import { Link, useLocalSearchParams, useNavigation, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AnalysisStyles from "../../assets/styles/analysis.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import data from "../../assets/data/categoriesData/allExpenses.json";
import CategoryExpenseItem from "../../components/CategoryExpenseItem";
import Styles from "../../assets/styles/notification.styles";
import StatisticGoal from "../../components/StatisticGoal";
const pieData = [
  { value: 70, color: "#EBA0C9" },
  { value: 30, color: "#FFFDEC" },
];

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

        {/* CARD */}
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[Styles.card, { maxHeight: undefined }]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <View className="mt-8">
            <StatisticGoal
              goal={1962.93}
              saved={653.31}
              label="Travel"
              icon="travel"
              data={pieData}
              iconHeight={wp(`${8}%`)}
              iconWidth={wp(`${15}%`)}
            />
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
