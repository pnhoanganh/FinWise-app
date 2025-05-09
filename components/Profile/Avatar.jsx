import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Avatar = ({ onImagePicked, isEdit, name, ID }) => {
  const [imageUri, setImageUri] = useState(null);
  const defaultAvatar = require("../../assets/images/defaultProfile.webp");

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onImagePicked) onImagePicked(uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          isEdit && pickImage();
        }}
      >
        <Image
          source={imageUri ? { uri: imageUri } : defaultAvatar}
          style={styles.image}
        />
        <View
          style={[styles.iconWrapper, { display: isEdit ? "flex" : "none" }]}
        >
          <MaterialCommunityIcons
            name="camera-outline"
            size={16}
            color="#555"
          />
        </View>
      </TouchableOpacity>
      <Text style={{ marginTop: hp("1%"), fontSize: 24, fontWeight: 600 }}>
        {name}
      </Text>
      <Text style={{ fontWeight: 600 }}>
        ID: <Text style={{ fontWeight: 400 }}>{ID}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  iconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: COLORS.mainPink,
    borderRadius: 15,
    padding: 5,
  },
});

export default Avatar;
