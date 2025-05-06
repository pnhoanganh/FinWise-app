import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../constants/color";
import { Link, useLocalSearchParams, useNavigation, router } from "expo-router";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AnalysisStyles from "../../assets/styles/analysis.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import data from "../../assets/data/categoriesData/savingData.json";
import CategoryExpenseItem from "../../components/CategoryExpenseItem";
import Styles from "../../assets/styles/notification.styles";
import StatisticGoal from "../../components/StatisticGoal";

const calculateSavedAmount = (months) => {
  if (!months) return 0;

  return months.reduce((total, month) => {
    const monthTotal = month.transaction.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    return total + monthTotal;
  }, 0);
};
export default function SpecificGoal() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams();
  const [savingData, setSavingData] = useState();

  useEffect(() => {
    if (id && data[id]) {
      setSavingData(data[id]);
    }
  }, [id]);

  const renderItem = (item, index) => (
    <CategoryExpenseItem
      key={item.id || `${item.title}-${item.date}-${index}`}
      icon={item.icon}
      widthIcon={wp(`${item.widthIcon}%`)}
      heightIcon={wp(`${item.heightIcon}%`)}
      title={item.title}
      date={item.date}
      amount={`$${item.amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}`}
    />
  );
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
          {savingData && (
            <>
              <View className="mt-8">
                <StatisticGoal
                  goal={savingData.goal}
                  saved={calculateSavedAmount(savingData.months)}
                  label={savingData.label}
                  icon={savingData.icon}
                  iconHeight={wp(`${savingData.height}%`)}
                  iconWidth={wp(`${savingData.width}%`)}
                />
              </View>
              <View style={{ marginTop: hp("4%") }}>
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
                {savingData.months?.map((monthData, monthIndex) => (
                  <View
                    key={`${monthData.month}-${monthIndex}`}
                    style={{ marginBottom: hp("3%") }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: 8,
                      }}
                    >
                      {monthData.month}
                    </Text>
                    {monthData.transaction.map((item, index) =>
                      renderItem(item, index)
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              marginTop: hp("2%"),
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
              Add Savings
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
