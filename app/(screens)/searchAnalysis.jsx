import {
  Text,
  View,
  ScrollView,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRef, useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Styles from "../../assets/styles/notification.styles";
import searchStyles from "../../assets/styles/searchAnalysis";
import LoginStyle from "../../assets/styles/login.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropdownComponent from "../../components/InputComponent/DropdownComponent";
import { Link, useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import RadioGroup from "react-native-radio-buttons-group";

const ReportItem = ({ img, imgWidth, imgHeight, title, time, amount }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: wp("80%"),
        backgroundColor: COLORS.lightGreen,
        justifyContent: "space-between",
        padding: hp("2%"),
        borderRadius: "8%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.mainPink,
            width: wp("12%"),
            height: wp("12%"),
            borderRadius: wp("5%"),
            justifyContent: "center",
            alignItems: "center",
            marginRight: wp("3%"),
          }}
        >
          <Image source={img} style={{ width: imgWidth, height: imgHeight }} />
        </View>
        <View style={{ gap: 3 }}>
          <Text>{title}</Text>
          <Text style={{ fontSize: 12, fontWeight: "600" }}>{time}</Text>
        </View>
      </View>
      <Text style={{ fontWeight: "600" }}>
        -$
        {amount.toLocaleString("en-US", {
          minimumFractionDigits: 0,
        })}
      </Text>
    </View>
  );
};

export default function SearchAnalysisScreen() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const toggleDatepicker = () => {
    setShow(!show);
  };

  const dataCategory = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const radioData = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Income",
        value: "Income",
      },
      {
        id: "2",
        label: "Expense",
        value: "Expense",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState();

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatepicker();
    }
  };

  const reportData = [
    {
      img: require("../../assets/images/Food.svg"),
      imgWidth: hp("2%"),
      imgHeight: hp("3.5%"),
      title: "Dinner",
      time: "18:27 - April 30",
      amount: 26000,
    },
    {
      img: require("../../assets/images/Car.svg"),
      imgWidth: hp("3%"),
      imgHeight: hp("2%"),
      title: "Transport",
      time: "18:27 - April 30",
      amount: 45000,
    },
    {
      img: require("../../assets/images/market.svg"),
      imgWidth: hp("2%"),
      imgHeight: hp("3.5%"),
      title: "Market",
      time: "18:27 - April 30",
      amount: 10000,
    },
    {
      img: require("../../assets/images/rent.svg"),
      imgWidth: hp("3.5%"),
      imgHeight: hp("3%"),
      title: "Rent",
      time: "18:27 - April 30",
      amount: 100500,
    },
  ];
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Search</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>
        {/* SEARCH INPUT */}
        <View
          style={[
            LoginStyle.inputContainer,
            {
              marginTop: hp("4%"),
              borderRadius: hp("5%") / 2,
              marginHorizontal: wp("5%"),
              backgroundColor: COLORS.greenWhite,
            },
          ]}
        >
          <TextInput
            style={LoginStyle.input}
            placeholder="Search..."
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
        {/* CARD */}
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[
            Styles.card,
            { maxHeight: undefined, paddingVertical: hp("5%") },
          ]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* INPUT GROUP */}
          <View style={searchStyles.inputGroup}>
            {/* Categories */}
            <View>
              <Text style={Styles.text}>Categories</Text>
              <DropdownComponent
                data={dataCategory}
                label="Selected Category"
                placeholder="Select the category"
              />
            </View>
            {/* Date */}
            <View>
              <Text style={Styles.text}>Date</Text>
              <View
                style={[
                  LoginStyle.inputContainer,
                  {
                    marginTop: hp("1.5%"),
                    borderRadius: hp("5%") / 2,
                    backgroundColor: COLORS.greenWhite,
                    borderWidth: 0.5,
                    borderColor: show ? COLORS.deepPink : "gray",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <TextInput
                  style={[
                    LoginStyle.input,
                    { flex: 1 },
                    show && { borderColor: COLORS.deepPink },
                  ]}
                  placeholder="Select date"
                  placeholderTextColor={COLORS.textSecondary}
                  editable={false}
                  value={format(date, "EEE, dd MMM yyyy")}
                  onPressIn={toggleDatepicker}
                />

                <TouchableOpacity
                  style={{
                    width: wp("8%"),
                    height: wp("8%"),
                    backgroundColor: COLORS.mainPink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                  onPress={toggleDatepicker}
                >
                  <Image
                    source={require("../../assets/images/calender.svg")}
                    style={{ width: 18, height: 16 }}
                  />
                </TouchableOpacity>
              </View>
              {show && (
                <View style={searchStyles.datePicker}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    is24Hour={true}
                    onChange={onChange}
                    style={{ width: "100%" }}
                  />
                </View>
              )}
            </View>
            {/* Radio box */}
            <View>
              <Text style={Styles.text}>Report</Text>
              <RadioGroup
                radioButtons={radioData}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: hp("1.5%"),
                  gap: wp("8%"),
                }}
              />
            </View>
            {/* Search btn */}
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={searchStyles.searchBtn}>
                <Text>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* RENDER DATA GROUP */}
          <View style={{ marginTop: hp("6%"), gap: hp("2%") }}>
            {/* <ReportItem
              img={require("../../assets/images/Food.svg")}
              imgWidth={hp("2%")}
              imgHeight={hp("3.5%")}
              title="Dinner"
              time="18:27 - April 30"
              amount="-$26,00"
            /> */}
            {reportData.map((item, index) => (
              <ReportItem
                key={index}
                img={item.img}
                imgWidth={item.imgWidth}
                imgHeight={item.imgHeight}
                title={item.title}
                time={item.time}
                amount={item.amount}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
