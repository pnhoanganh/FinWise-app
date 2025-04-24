import {
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRef, useState, useMemo, useEffect } from "react";
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
import calendarData from "../../assets/data/analysisData/calendar.json";
import PieChartFocusOnPress from "../../components/Char/PieChart";

export default function CalendarAnalysisScreen() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState("spend");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (calendarData && typeof calendarData === "object") {
      setData(calendarData);
    }
  }, []);

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

  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd");

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
                    active === "char" ? COLORS.mainPink : COLORS.lightGreen,
                },
              ]}
              onPress={() => {
                setActive("char");
              }}
            >
              <Text>Categories</Text>
            </TouchableOpacity>
          </View>

          {/* DISPLAY DATA */}
          <View style={[HomeStyles.transactionGroup, { marginTop: hp("2%") }]}>
            {active === "spend" ? (
              Array.isArray(data?.spend) && data.spend.length > 0 ? (
                data.spend.map((item, index) => renderItem(item, index))
              ) : (
                <Text>No transactions available</Text>
              )
            ) : active === "char" ? (
              Array.isArray(data?.char) && data.char.length > 0 ? (
                <PieChartFocusOnPress data={data.char} />
              ) : (
                <Text>No category data available</Text>
              )
            ) : (
              <Text>No data available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
