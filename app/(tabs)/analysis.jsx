import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link, router, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import AnalysisStyles from "@/assets/styles/analysis.styles";
import ProgressBar from "@/components/ProgressBar";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Analysis() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("daily");
  const tabs = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  const targetComponent = () => {};
  return (
    <SafeScreen>
      <View>
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
              <Text style={{ fontSize: 20, fontWeight: 600 }}>Analysis</Text>
            </View>
            <Link href="/(screens)/notification">
              <Ionicons name="notifications" size={24} color="black" />
            </Link>
          </View>
          {/* TOTAL */}
          <View style={AnalysisStyles.totalContainer}>
            {/* Total Balance */}
            <View>
              <View style={AnalysisStyles.totalHeader}>
                <Image
                  source={require("../../assets/images/Income.svg")}
                  style={{ width: 16, height: 16 }}
                />
                <Text style={AnalysisStyles.text}>Total Balance</Text>
              </View>
              <Text style={[AnalysisStyles.boldText, { marginTop: 2 }]}>
                $7,783.00
              </Text>
            </View>
            {/* Divide */}
            <View
              style={{
                width: 2,
                height: 44,
                backgroundColor: COLORS.lightGreen,
                borderRadius: 2,
              }}
            ></View>
            {/* Total Expense */}
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
                -$1.187.40
              </Text>
            </View>
          </View>
          {/* PROGRESS BAR */}
          <ProgressBar percentage={30} amount={20000} />

          {/* CHECK TEXT */}
          <View
            style={[
              AnalysisStyles.totalContainer,
              { marginTop: wp("3%"), justifyContent: "flex-start", gap: 10 },
            ]}
          >
            <Image
              source={require("../../assets/images/check.png")}
              style={{ width: 12, height: 12 }}
            />
            <Text style={{ fontSize: 15 }}>
              30% of your expenses, looks good.
            </Text>
          </View>

          {/* CARD */}
          <ScrollView style={AnalysisStyles.card}>
            {/* MENU */}
            <View style={AnalysisStyles.menuGroup}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    AnalysisStyles.menuItem,
                    {
                      backgroundColor:
                        activeTab === tab.id
                          ? COLORS.mainPink
                          : COLORS.lightGray,
                    },
                  ]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Text style={AnalysisStyles.menuText}>{tab.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* BOX ANALYSIS */}
            <View style={AnalysisStyles.box}>
              {/* HEADER BOX */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.bagie,
                    fontSize: wp("4%"),
                    fontWeight: "600",
                  }}
                >
                  Income & Expenses
                </Text>
                <View style={{ flexDirection: "row", gap: wp("2%") }}>
                  <TouchableOpacity
                    style={{
                      width: wp("8%"),
                      height: wp("8%"),
                      backgroundColor: COLORS.mainPink,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/find.png")}
                      style={{ width: 16, height: 16 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: wp("8%"),
                      height: wp("8%"),
                      backgroundColor: COLORS.mainPink,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/calender.svg")}
                      style={{ width: 18, height: 16 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                source={require("../../assets/images/analysis.svg")}
                style={{ width: "100%", height: "78%" }}
              />
            </View>

            {/* INCOME - EXPENSE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: wp("10%"),
              }}
            >
              {/* INCOME */}
              <View style={{ alignItems: "center", gap: wp("1%") }}>
                <Image
                  source={require("../../assets/images/incomePink.svg")}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={AnalysisStyles.text}>Income</Text>
                <Text
                  style={[AnalysisStyles.boldText, { color: COLORS.deepPink }]}
                >
                  $4,120.00
                </Text>
              </View>
              {/* EXPENSE */}
              <View style={{ alignItems: "center", gap: wp("1%") }}>
                <Image
                  source={require("../../assets/images/expensesGreen.svg")}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={AnalysisStyles.text}>Expense</Text>
                <Text
                  style={[AnalysisStyles.boldText, { color: COLORS.green }]}
                >
                  $1.187.40
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeScreen>
  );
}
