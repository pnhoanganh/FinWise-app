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

export default function SearchAnalysisScreen() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Calender</Text>
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
              paddingVertical: hp("5%"),
              marginTop: wp("25%"),
            },
          ]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        ></ScrollView>
      </View>
    </SafeScreen>
  );
}
