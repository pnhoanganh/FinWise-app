import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Avatar = ({ onImagePicked, isEdit, name, ID, imageUri: externalUri }) => {
  const [imageUri, setImageUri] = useState(externalUri || null);
  const defaultAvatar = require("../../assets/images/defaultProfile.webp");

  useEffect(() => {
    if (externalUri) setImageUri(externalUri);
  }, [externalUri]);

  // Hàm mở thư viện ảnh và chọn ảnh
  const pickImage = async () => {
    // Xin quyền truy cập thư viện
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required!");
      return;
    }
    // Nếu không được cấp quyền thì thoát

    // Mở thư viện để chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ chọn ảnh
      allowsEditing: true, // Cho phép chỉnh sửa (crop)
      aspect: [1, 1], // Tỉ lệ ảnh 1:1 (vuông)
      quality: 1, // Chất lượng cao
    });

    // Nếu người dùng chọn ảnh
    if (!result.canceled) {
      const uri = result.assets[0].uri; // Lấy đường dẫn ảnh
      setImageUri(uri); // Cập nhật vào state
      if (onImagePicked) onImagePicked(uri); // Gọi callback nếu có
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Pick profile image"
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
      <Text
        style={{ marginTop: hp("1%"), fontSize: wp("6%"), fontWeight: 600 }}
      >
        {name}
      </Text>
      <Text style={{ fontWeight: 600, fontSize: wp("4%") }}>
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
    width: wp("24%"),
    height: wp("24%"),
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
