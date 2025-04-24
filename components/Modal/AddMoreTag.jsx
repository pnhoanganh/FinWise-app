import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Style from "@/assets/styles/login.styles";

const AddMoreTag = ({ isOpen, onClose }) => {
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
            gap: hp("2%"),
            backgroundColor: COLORS.bagie,
            borderRadius: wp("5%"),
            paddingHorizontal: wp("10%"),
            paddingVertical: hp("5%"),
            width: wp("84%"),
          }}
        >
          <Text
            style={{
              fontSize: 28,
              color: COLORS.greenBlack,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            New Category
          </Text>
          <View
            style={[
              Style.inputContainer,
              {
                marginTop: hp("1.5%"),
                borderRadius: hp("5%") / 2,
                backgroundColor: "transparent",
                borderWidth: 0.5,
                borderColor: "gray",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput style={Style.input} placeholder="write..."></TextInput>
          </View>
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
                  fontWeight: 500,
                  fontSize: hp("1.7%"),
                }}
              >
                Save
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
                  fontWeight: 500,
                  fontSize: hp("1.7%"),
                }}
              >
                Cancer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddMoreTag;
