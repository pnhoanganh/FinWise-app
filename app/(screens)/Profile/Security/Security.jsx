import { Text, View, Animated, TouchableOpacity } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router, useNavigation } from "expo-router";

export default function SecurityScreen() {
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
            <Text style={{ fontSize: 20, fontWeight: 600 }}>Security</Text>
          </View>
          <Link href="/(screens)/notification">
            <Ionicons name="notifications" size={24} color="black" />
          </Link>
        </View>

        {/* CARD */}
        <View style={[Styles.card]}>
          <Text className="text-2xl font-semibold my-8">Security</Text>
          <View className="flex flex-row justify-between border-b pt-6 pb-8 border-[#DFF7E2]">
            <TouchableOpacity
              onPress={() => {
                router.push("(screens)/Profile/Security/ChangePin");
              }}
            >
              <Text className="text-xl">Change Pin</Text>
            </TouchableOpacity>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
          <View className="flex flex-row justify-between border-b py-6 border-[#DFF7E2]">
            <TouchableOpacity>
              <Text className="text-xl">Term And Conditions</Text>
            </TouchableOpacity>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}
