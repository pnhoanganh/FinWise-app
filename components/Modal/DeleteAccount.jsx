import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Style from "@/assets/styles/login.styles";

const DeleteAccount = ({ isOpen, onClose }) => {
  return (
    <Modal visible={isOpen} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "rgba(24, 24, 27, 0.4)",
        }}
      >
        <View
          style={{
            display: "flex",
            gap: hp("4%"),
            backgroundColor: COLORS.white,
            borderRadius: wp("5%"),
            paddingHorizontal: wp("10%"),
            paddingVertical: hp("5%"),
            width: wp("84%"),
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: COLORS.red,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            Delete account
          </Text>
          <Text className="text-center">Are you sure you want to log out?</Text>
          <Text className="text-center">
            By deleting your account, you agree that you understand the
            consequences of this action and that you agree to permanently delete
            your account and all associated data.{" "}
          </Text>
          <View
            style={{
              display: "flex",
              gap: hp("1.5%"),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.mainPink,
                padding: 10,
                width: wp("50%"),
                borderRadius: 24,
                paddingVertical: 12,
              }}
              onPress={onClose}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 400,
                  fontSize: hp("1.7%"),
                }}
              >
                Yes, Delete Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.lightGreen,
                padding: 10,
                width: wp("50%"),
                borderRadius: 24,
                paddingVertical: 12,
              }}
              onPress={onClose}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 400,
                  fontSize: hp("1.7%"),
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccount;
