import { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { Link, useLocalSearchParams, useNavigation, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Styles from "../../assets/styles/notification.styles";
import DropdownComponent from "../../components/InputComponent/DropdownComponent";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import LoginStyle from "../../assets/styles/login.styles";
import searchStyles from "../../assets/styles/searchAnalysis";

export default function AddExpense() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const toggleDatepicker = () => {
    setShow(!show);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatepicker();
    }
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Add Expenses</Text>
          </View>
          <Ionicons name="notifications" size={24} color="black" />
        </View>

        {/* CARD */}
        <ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[Styles.card, { maxHeight: undefined }]}
          contentContainerStyle={{ paddingBottom: hp("8%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <View className="mt-5 flex gap-8">
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
            <View>
              <Text style={Styles.text}>Categories</Text>
              <DropdownComponent
                data={dataCategory}
                label="Selected Category"
                placeholder="Select the category"
              />
            </View>
            <View>
              <Text style={Styles.text}>Amount</Text>
              <View
                style={[
                  LoginStyle.inputContainer,
                  {
                    marginTop: hp("1.5%"),
                    borderRadius: hp("5%") / 2,
                    backgroundColor: "transparent",
                    borderWidth: 0.5,
                    borderColor: "gray",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Write..."
                ></TextInput>
              </View>
            </View>
            <View>
              <Text style={Styles.text}>Expense Title</Text>
              <View
                style={[
                  LoginStyle.inputContainer,
                  {
                    marginTop: hp("1.5%"),
                    borderRadius: hp("5%") / 2,
                    backgroundColor: "transparent",
                    borderWidth: 0.5,
                    borderColor: "gray",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <TextInput
                  style={LoginStyle.input}
                  placeholder="Write..."
                ></TextInput>
              </View>
            </View>
            <View
              style={[
                LoginStyle.inputContainer,
                {
                  marginTop: hp("1.5%"),
                  borderRadius: hp("5%") / 2,
                  backgroundColor: "transparent",
                  borderWidth: 0.5,
                  borderColor: "gray",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  height: hp("15%"),
                  paddingTop: 12,
                },
              ]}
            >
              <TextInput
                multiline
                numberOfLines={4}
                maxLength={40}
                style={LoginStyle.input}
                placeholder="Enter Message..."
              ></TextInput>
            </View>
            <TouchableOpacity
              style={{
                marginHorizontal: "auto",
                marginTop: 8,
                backgroundColor: COLORS.darkGreen,
                paddingVertical: hp("1%"),
                paddingHorizontal: wp("7%"),
                borderRadius: wp("7%"),
                width: wp("40%"),
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.bagie,
                  fontWeight: 500,
                  fontSize: 18,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
