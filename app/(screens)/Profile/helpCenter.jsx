import {
  Text,
  View,
  ScrollView,
  Animated,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useNavigation } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import { useState, useRef } from "react";
import LoginStyle from "@/assets/styles/login.styles";
import AnalysisStyles from "@/assets/styles/analysis.styles";
import iconMapper from "@/constants/iconMapper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";

const Question = ({ label, answer, isOpen, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <View
        className="flex flex-row justify-between items-center text-lg"
        style={{ marginBottom: 4 }}
      >
        <Text style={{ width: wp("70%"), fontSize: wp("4.5%") }}>{label}</Text>
        <AntDesign name={isOpen ? "up" : "down"} size={20} color="black" />
      </View>
      {isOpen && (
        <Text style={{ color: "#555", fontSize: wp("4%"), width: wp("70%") }}>
          {answer}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const ContactLink = ({ link, label, icon }) => {
  const handlePress = () => {
    if (link) {
      Linking.openURL(link).catch((err) =>
        console.warn("Failed to open link:", err)
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex flex-row justify-between items-center py-3"
    >
      <View className="flex flex-row gap-4 items-center">
        <View
          style={{
            backgroundColor: COLORS.mainPink,
            borderRadius: "90%",
            width: wp("10%"),
            height: hp("5%"),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={iconMapper[icon]}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>

        <Text className="text-xl">{label}</Text>
      </View>

      <MaterialIcons name="navigate-next" size={28} color="black" />
    </TouchableOpacity>
  );
};

export default function HelpCenterScreen() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("faq");
  const activeTabs = [
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact Us" },
  ];
  const subTabs = [
    { id: 1, label: "General" },
    { id: 2, label: "Account" },
    { id: 3, label: "Service" },
  ];
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const toggleQuestion = (id) => {
    setExpandedQuestionId((prev) => (prev === id ? null : id));
  };

  const questions = [
    {
      id: 1,
      label: "How to use FinWise?",
      answer: "To use FinWise, simply sign up and start adding your expenses.",
    },
    {
      id: 2,
      label: "How much does it cost to use FinWise?",
      answer: "FinWise is free to use with optional premium features.",
    },
    {
      id: 3,
      label: "How to contact support?",
      answer:
        "You can contact support via the 'Contact Us' section or by emailing support@finwise.com.",
    },
    {
      id: 4,
      label: "How can I reset my password if I forget it?",
      answer:
        "Tap 'Forgot Password' on the login screen and follow the instructions to reset it via email.",
    },
    {
      id: 5,
      label: "Are there any privacy or data security measures in place?",
      answer:
        "Yes, FinWise uses encryption and secure storage to protect your personal and financial data.",
    },
    {
      id: 6,
      label: "Can I customize settings within the application?",
      answer:
        "Yes, you can personalize notifications, themes, and budget settings in the app's settings menu.",
    },
    {
      id: 7,
      label: "How can I delete my account?",
      answer:
        "Go to Settings > Account > Delete Account. Follow the prompts to permanently delete your data.",
    },
    {
      id: 8,
      label: "How do I access my expense history?",
      answer:
        "Navigate to the 'History' or 'Reports' tab to view all your past transactions and summaries.",
    },
    {
      id: 9,
      label: "Can I use the app offline?",
      answer:
        "Yes, you can use basic features offline. Your data will sync automatically once you're online.",
    },
  ];

  const contactLink = [
    {
      id: 1,
      label: "Customer Service",
      link: "https://www.google.com",
      icon: "helpDark",
    },
    {
      id: 2,
      label: "Website",
      link: "https://www.google.com",
      icon: "website",
    },
    {
      id: 3,
      label: "Facebook",
      link: "https://www.google.com",
      icon: "facebook",
    },
    {
      id: 4,
      label: "Whatapp",
      link: "https://www.google.com",
      icon: "whatapp",
    },
    {
      id: 5,
      label: "Instagram",
      link: "https://www.google.com",
      icon: "instagram",
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Help & FAQS</Text>
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
          contentContainerStyle={{
            paddingBottom: hp("20%"),
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
          style={[
            Styles.card,
            { paddingTop: hp("6%"), paddingHorizontal: wp("10%") },
          ]}
        >
          <Text className="text-center text-xl">How Can We Help You?</Text>
          {/* MAIN MENU */}
          <View
            style={[
              AnalysisStyles.menuGroup,
              {
                marginTop: hp("4%"),
                width: wp("80%"),
                justifyContent: "space-around",
              },
            ]}
          >
            {activeTabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  AnalysisStyles.menuItem,
                  {
                    backgroundColor:
                      activeTab === tab.id ? COLORS.mainPink : COLORS.lightGray,
                    borderRadius: 20,
                    paddingHorizontal: 0,
                    width: wp("36%"),
                  },
                ]}
                onPress={() => {
                  setActiveTab(tab.id);
                }}
              >
                <Text
                  style={[AnalysisStyles.menuText, { textAlign: "center" }]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* SUB MENU */}
          <View
            style={[
              AnalysisStyles.menuGroup,
              {
                marginTop: hp("2%"),
                width: wp("80%"),
                justifyContent: "space-around",
              },
            ]}
          >
            {subTabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  AnalysisStyles.menuItem,
                  {
                    paddingVertical: 5,
                  },
                ]}
              >
                <Text
                  style={[AnalysisStyles.menuText, { textAlign: "center" }]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* SEARCH INPUT */}
          <View
            style={[
              LoginStyle.inputContainer,
              {
                marginTop: hp("2%"),
                borderRadius: 12,
                backgroundColor: COLORS.lightGreen,
                borderColor: COLORS.mainPink,
              },
            ]}
          >
            <TextInput
              style={LoginStyle.input}
              placeholder="Search..."
              placeholderTextColor={COLORS.textPrimary}
            />
          </View>
          <View style={{ marginTop: hp("2%") }}>
            {activeTab === "faq" ? (
              <View>
                {questions.map((item) => (
                  <View key={item.id} className="mt-9">
                    <Question
                      label={item.label}
                      answer={item.answer}
                      isOpen={expandedQuestionId === item.id}
                      onToggle={() => toggleQuestion(item.id)}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View className="mt-8">
                {contactLink.map((item) => (
                  <ContactLink
                    key={item.id}
                    link={item.link}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}
