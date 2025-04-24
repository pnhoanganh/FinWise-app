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
import iconMapper from "@/constants/iconMapper";
import tagData from "@/assets/data/categoriesData/tag.json";
import AddMoreTagModal from "@/components/Modal/AddMoreTag";

const Tag = ({ icon, widthIcon, heightIcon, label, onPressFunc, bgColor }) => {
  return (
    <TouchableOpacity className=" mb-4 flex gap-2" onPress={onPressFunc}>
      <View
        style={{
          backgroundColor: bgColor,
          marginHorizontal: "auto",
          paddingVertical: hp("2%"),
          paddingHorizontal: wp("7%"),
          borderRadius: 20,
          width: wp("24%"),
          height: hp("10%"),
        }}
      >
        <Image
          source={iconMapper[icon]}
          style={{
            width: widthIcon,
            height: heightIcon,
            marginVertical: "auto",
            marginHorizontal: "auto",
          }}
        />
      </View>
      <Text className="text-center text-lg">{label}</Text>
    </TouchableOpacity>
  );
};
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
    setSelectedTag(item.id);
    if (item.isMore) {
      setVisible(true);
      return;
    }
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
          contentContainerStyle={{ paddingBottom: hp("10%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <View className="flex flex-row flex-wrap gap-7 justify-start">
            {categories.map((item, index) => (
              <Tag
                key={index}
                icon={item.icon}
                label={item.label}
                heightIcon={item.height ? wp(`${item.height}%`) : wp("9%")}
                widthIcon={item.width ? wp(`${item.width}%`) : wp("9%")}
                onPressFunc={() => handleSelectedTag(item)}
                bgColor={
                  selectedTag === item.id ? COLORS.mainPink : COLORS.darkGreen
                }
              />
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
