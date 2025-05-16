import {
  Text,
  View,
  ScrollView,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useNavigation, router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "@/constants/color";
import { useState, useRef } from "react";
import LoginStyle from "@/assets/styles/login.styles";
import DeleteAccount from "@/components/Modal/DeleteAccount";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DelAccountScreen() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { visibility, toggleSetVisibility } = usePasswordVisibility();
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);

      router.replace("/(auth)");
    } catch (error) {
      console.error("Delete failed", error);
    }
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Delete Account
            </Text>
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
          <Text className=" text-center text-2xl font-semibold text-[#EF2748]">
            Are you sure you want to delete your account?
          </Text>
          <View
            style={{
              backgroundColor: COLORS.lightGreen,
              borderRadius: 20,
              padding: 30,
              marginVertical: hp("3%"),
            }}
          >
            <Text>
              This action will permanently delete all of your data, and you will
              not be able to recover it. Please keep the following in mind
              before proceeding:
            </Text>
            <View className="px-4 flex flex-col gap-5 mt-5">
              <Text>
                • All your expenses, income and associated transactions will be
                eliminated.
              </Text>
              <Text>
                • You will not be able to access your account or any related
                information.
              </Text>
              <Text>• This action cannot be undone.</Text>
            </View>
          </View>
          <Text className=" text-center text-2xl font-normal mb-5">
            Please enter your password to confirm deletion of your account.
          </Text>
          <View style={[LoginStyle.inputContainer, { borderRadius: 50 }]}>
            <TextInput
              style={LoginStyle.input}
              secureTextEntry={!visibility.password}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.textSecondary}
            />
            <Ionicons
              name={visibility.password ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="black"
              onPress={() => toggleSetVisibility("password")}
            />
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              marginTop: hp("4%"),
              marginBottom: hp("1.5%"),
              backgroundColor: COLORS.mainPink,
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("7%"),
              width: wp("60%"),
              borderRadius: wp("7%"),
            }}
            onPress={() => {
              setIsDelete(true);
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: 400,
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Yes, Delete Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginHorizontal: "auto",
              backgroundColor: COLORS.lightGreen,
              paddingVertical: hp("1%"),
              paddingHorizontal: wp("7%"),
              width: wp("60%"),
              borderRadius: wp("7%"),
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: 400,
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <DeleteAccount
          isOpen={isDelete}
          onClose={() => {
            setIsDelete(false);
          }}
          onConfirm={handleDelete}
        />
      </View>
    </SafeScreen>
  );
}
