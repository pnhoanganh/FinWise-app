import {
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRef, useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Styles from "../../assets/styles/notification.styles";
import searchStyles from "../../assets/styles/searchAnalysis";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useNavigation } from "expo-router";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import TransactionItem from "@/components/TransactionItem";
import HomeStyles from "../../assets/styles/home.styles";
import { PieChart } from "react-native-gifted-charts";

const renderLegend = (text, color) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 12,
      }}
    >
      <View
        style={{
          height: 18,
          width: 18,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: color || "white",
        }}
      />
      <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
        {text || ""}
      </Text>
    </View>
  );
};

const PieChartFocusOnPress = () => {
  const pieData = [
    { value: 27, color: COLORS.deepPink, text: "27%", label: "Eating" },
    { value: 30, color: COLORS.lightPink, text: "30%", label: "Groceries" },
    { value: 16, color: COLORS.peach, text: "16%", label: "Shopping" },
    { value: 27, color: COLORS.darkGreen, text: "27%", label: "Transport" },
  ];

  return (
    <View style={{ marginTop: hp("1%"), alignItems: "center" }}>
      <PieChart
        donut
        showText
        textColor="black"
        innerRadius={wp("10%")}
        radius={wp("30%")}
        showTextBackground
        textBackgroundColor="transparent"
        textBackgroundRadius={22}
        data={pieData}
        focusOnPress
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap", // Allow legend items to wrap to the next line
          justifyContent: "space-evenly",
          marginTop: 20,
          paddingHorizontal: wp("5%"),
        }}
      >
        {pieData.map((item, index) => (
          <View key={index}>{renderLegend(item.label, item.color)}</View>
        ))}
      </View>
    </View>
  );
};

export default function CalendarAnalysisScreen() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState("spend");

  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd"); // e.g., "2025-04-17"

  // Custom Day Component to style each day cell
  const CustomDay = (props) => {
    const { date, state, marking } = props;
    const isSelected = marking?.selected;
    const isToday = date.dateString === today;

    return (
      <View style={{ backgroundColor: COLORS.greenWhite }}>
        <TouchableOpacity
          style={{
            backgroundColor: isSelected ? COLORS.mainPink : COLORS.greenWhite,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: isToday
              ? COLORS.deepPink
              : isSelected
              ? COLORS.deepPink
              : "transparent",
            width: wp("8%"),
            height: wp("8%"),
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setSelected(date.dateString)}
        >
          <Text
            style={{
              color: isSelected
                ? COLORS.textPrimary
                : state === "disabled"
                ? "gray"
                : COLORS.textPrimary,
              textAlign: "center",
              fontSize: wp("3.5%"),
              fontWeight: isToday ? "bold" : "normal",
            }}
          >
            {date.day}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Define marked dates for both the selected date and today
  const markedDates = useMemo(() => {
    const marked = {};

    // Mark today
    marked[today] = {
      marked: true,
      dotColor: COLORS.deepPink,
    };

    // Mark the selected date (override if it's the same as today)
    if (selected) {
      marked[selected] = {
        selected: true,
        disableTouchEvent: true,
        selectedColor: COLORS.mainPink,
        selectedTextColor: COLORS.deepPink,
        ...(selected === today && {
          marked: true,
          dotColor: COLORS.deepPink,
        }),
      };
    }

    return marked;
  }, [selected, today]);

  // DATA
  const data = {
    spend: [
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
      {
        icon: require("@/assets/images/Salary.svg"),
        widthIcon: wp("8%"),
        heightIcon: wp("7%"),
        title: "Other",
        date: "11:30 - April 15",
        frequency: "Daily",
        amount: "$133.50",
      },
    ],
    cate: [],
  };

  return (
    <SafeScreen>
      <View style={Styles.container}>
        {/* HEADER */}
        <View style={Styles.header}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Calendar</Text>
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
          style={[
            Styles.card,
            {
              maxHeight: undefined,
              paddingVertical: hp("2%"),
              marginTop: wp("25%"),
            },
          ]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* CALENDAR */}
          <Calendar
            current={today}
            markedDates={markedDates}
            showSixWeeks={true}
            theme={{
              calendarBackground: COLORS.greenWhite,
              textSectionTitleColor: COLORS.deepPink,
              textSectionTitleFontWeight: "bold",
              dayTextColor: COLORS.bagie,
              textDisabledColor: COLORS.bagie,
              dotColor: "red",
              selectedDotColor: "white",
              arrowColor: COLORS.deepPink,
              monthTextColor: COLORS.deepPink,
              textMonthFontWeight: "bold",
              textDayFontSize: wp("4%"),
              textMonthFontSize: wp("5%"),
              textDayHeaderFontSize: wp("4%"),
            }}
            style={[
              searchStyles.calendar,
              {
                borderRadius: 10,
                backgroundColor: COLORS.greenWhite,
                padding: 10,
              },
            ]}
            dayComponent={CustomDay}
          />

          {/* BTN */}
          <View
            style={{
              marginTop: hp("3%"),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={[
                searchStyles.btn,
                {
                  backgroundColor:
                    active === "spend" ? COLORS.mainPink : COLORS.lightGreen,
                },
              ]}
              onPress={() => {
                setActive("spend");
              }}
            >
              <Text>Spends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                searchStyles.btn,
                {
                  backgroundColor:
                    active === "cate" ? COLORS.mainPink : COLORS.lightGreen,
                },
              ]}
              onPress={() => {
                setActive("cate");
              }}
            >
              <Text>Categories</Text>
            </TouchableOpacity>
          </View>

          {/* DISPLAY DATA */}
          <View style={[HomeStyles.transactionGroup, { marginTop: hp("2%") }]}>
            {active === "spend" ? (
              data.spend.map((item, index) => (
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
              ))
            ) : (
              <PieChartFocusOnPress />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
