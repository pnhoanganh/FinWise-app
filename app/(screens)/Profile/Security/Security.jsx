import { Text, View, Animated, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, router, useNavigation } from "expo-router";

export default function SecurityScreen() {
  const navigation = useNavigation();
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
          <TouchableOpacity
            onPress={() => {
              router.push("(screens)/Profile/Security/ChangePin");
            }}
            className="flex flex-row justify-between border-b pt-6 pb-8 border-[#DFF7E2]"
          >
            <Text className="text-xl">Change Pin</Text>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("(screens)/Profile/Security/Term");
            }}
            className="flex flex-row justify-between border-b py-6 border-[#DFF7E2]"
          >
            <Text className="text-xl">Term And Conditions</Text>
            <MaterialIcons name="navigate-next" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}
