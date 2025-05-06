import { Text, View, TouchableOpacity } from "react-native";
import iconMapper from "@/constants/iconMapper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
const Tag = ({ icon, widthIcon, heightIcon, label, onPressFunc, bgColor }) => {
  return (
    <TouchableOpacity className=" mb-4 flex gap-2" onPress={onPressFunc}>
      <View
        style={{
          backgroundColor: bgColor,
          marginHorizontal: "auto",
          borderRadius: 20,
          width: wp("24%"),
          height: hp("10%"),
        }}
      >
        <Image
          source={iconMapper[icon]}
          style={{
            width: widthIcon,
            height: heightIcon,
            marginVertical: "auto",
            marginHorizontal: "auto",
          }}
        />
      </View>
      <View
        style={{
          marginVertical: "auto",
          marginHorizontal: "auto",
        }}
      >
        <Text className="text-center text-lg">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tag;
