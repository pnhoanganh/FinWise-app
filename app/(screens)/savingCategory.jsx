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
import AnalysisStyles from "../../assets/styles/analysis.styles";
import ProgressBar from "@/components/Char/ProgressBar";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import tagData from "../../assets/data/categoriesData/goalTag.json";
import Styles from "../../assets/styles/notification.styles";
import Tag from "../../components/TagCategory";
import AddMoreGoalModal from "@/components/Modal/AddMoreGoal";

export default function SavingCategory() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams();
  const [goalData, setGoalData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setGoalData(tagData);
  }, []);

  const handleSelectedTag = (item) => {
    if (!item?.id || !item?.label) {
      console.error("Invalid item:", item);
      return;
    }

    setSelectedTag(item.id);

    router.push({
      pathname: "/(screens)/specificGoal",
      params: { id: item.label },
    });

    setTimeout(() => {
      setSelectedTag(false);
    }, 300);
  };

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
          style={[Styles.card, { maxHeight: undefined }]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <View className="flex flex-row flex-wrap gap-7 mt-6 justify-start">
            {goalData.map((item, index) => (
              <Tag
                key={index}
                icon={item.icon}
                label={item.label}
                heightIcon={item.height ? wp(`${item.height}%`) : wp("9%")}
                widthIcon={item.width ? wp(`${item.width}%`) : wp("9%")}
                onPressFunc={() => handleSelectedTag(item)}
                bgColor={
                  selectedTag === item.id ? COLORS.mainPink : COLORS.green
                }
              />
            ))}
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              marginTop: hp("6%"),
              backgroundColor: COLORS.darkGreen,
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("7%"),
              borderRadius: wp("7%"),
            }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text
              style={{ color: COLORS.bagie, fontWeight: 500, fontSize: 18 }}
            >
              Add More
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <AddMoreGoalModal
          isOpen={visible}
          onClose={() => {
            setVisible(false);
            setSelectedTag(null);
          }}
        />
      </View>
    </SafeScreen>
  );
}
