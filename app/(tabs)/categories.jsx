import { useState, useRef, useEffect } from "react";
import { Text, View, ScrollView, Animated } from "react-native";
import { Image } from "expo-image";
import { Link, useNavigation, router } from "expo-router";
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
import tagData from "@/assets/data/categoriesData/tag.json";
import AddMoreTagModal from "@/components/Modal/AddMoreTag";
import Tag from "@/components/TagCategory";

export default function Categories() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [categories, setCategories] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fullTag = [
      ...tagData,
      {
        id: "moreTag",
        label: "More",
        icon: "more",
        isMore: true,
      },
    ];
    setCategories(fullTag);
  }, []);

  const handleSelectedTag = (item) => {
    if (!item?.id || !item?.label) {
      console.error("Invalid item:", item);
      return;
    }

    setSelectedTag(item.id);

    if (item.isMore) {
      setVisible(true);
      return;
    }

    const pathname =
      item.label === "Saving"
        ? "/(screens)/savingCategory"
        : "/(screens)/specificCategory";

    router.push({
      pathname,
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Categories</Text>
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
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {categories.map((item) => (
              <View
                key={item.id}
                style={{
                  width: "33.33%",
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}
              >
                <Tag
                  icon={item.icon}
                  label={item.label}
                  heightIcon={wp(item.height ? `${item.height}%` : "9%")}
                  widthIcon={wp(item.width ? `${item.width}%` : "9%")}
                  onPressFunc={() => handleSelectedTag(item)}
                  bgColor={
                    selectedTag === item.id ? COLORS.mainPink : COLORS.green
                  }
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <AddMoreTagModal
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
