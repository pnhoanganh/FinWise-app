import { Text, View, ScrollView, Animated, StyleSheet } from "react-native";
import { useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Styles from "@/assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useNavigation } from "expo-router";
import { Checkbox, Button } from "react-native-paper";

export default function TermScreen() {
  const navigation = useNavigation();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [checked, setChecked] = useState(false);
  return (
    <SafeScreen>
      <View style={Styles.container}>
        {/* HEADER */}
        <View style={[Styles.header, { marginHorizontal: "auto" }]}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Terms And Conditions
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
          style={[Styles.card, { maxHeight: undefined, paddingTop: hp("5%") }]}
          contentContainerStyle={{ paddingBottom: hp("20%") }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        >
          <Text style={styles.sectionTitle}>
            Est Fugiat Assumenda Aut Reprehenderit
          </Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet. Et odio officia aut voluptate internos
            est omnis vitae ut architecto sunt non tenetur fuga ut provident
            vero. Quo aspernatur facere et consectetur ipsum et facere corrupti
            est asperiores facere. Est fugiat assumenda aut reprehenderit
            voluptatem sed.
          </Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>
              1. Ea voluptates omnis aut sequi sequi.
            </Text>
            <Text style={styles.listItem}>
              2. Est dolore quae in aliquid ducimus et autem repellendus.
            </Text>
            <Text style={styles.listItem}>
              3. Aut ipsum Quis qui porro quasi aut minus placeat!
            </Text>
            <Text style={styles.listItem}>
              4. Sit consequatur neque ab vitae facere.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Aut quidem accusantium nam alias autem eum officiis placeat et omnis
            autem id officiis perspiciatis qui corrupti officia eum aliquam
            provident. Eum voluptas error et optio dolorum cum molestiae nobis
            et odit molestiae quo magnam impedit sed fugiat nihil non nihil
            vitae.
          </Text>

          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>
              • Aut fuga sequi eum voluptatibus provident.
            </Text>
            <Text style={styles.bulletItem}>
              • Eos consequuntur voluptas vel amet eaque aut dignissimos velit.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Vel exercitationem quam vel eligendi rerum At harum obcaecati et
            nostrum beatae? Ea accusantium dolores qui rerum aliquam est
            perferendis mollitia et ipsum ipsa qui enim autem At corporis sunt.
            Aut odit quisquam est reprehenderit itaque aut accusantium dolor qui
            neque repellat.
          </Text>

          <Text style={styles.paragraph}>
            Read the terms and conditions in more detail at
          </Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.finwiseapp.de")}
          >
            www.finwiseapp.de
          </Text>

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <View style={{ borderWidth: 1, transform: [{ scale: 0.5 }] }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => setChecked(!checked)}
              />
            </View>
            <Text style={styles.checkboxLabel}>
              I accept all the terms and conditions
            </Text>
          </View>

          {/* Accept Button */}
          <Button
            mode="contained"
            onPress={() => console.log("Accepted")}
            style={{
              marginHorizontal: "auto",
              marginTop: hp("3%"),
              backgroundColor: COLORS.darkGreen,
              paddingHorizontal: wp("7%"),
              borderRadius: wp("7%"),
            }}
            disabled={!checked}
          >
            <Text
              style={{ color: COLORS.bagie, fontWeight: 500, fontSize: 18 }}
            >
              Accept
            </Text>
          </Button>
        </ScrollView>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  paragraph: { fontSize: 14, marginVertical: 6, color: "#333" },
  list: { marginLeft: 12 },
  listItem: { fontSize: 14, marginVertical: 2 },
  bulletList: { marginLeft: 12, marginVertical: 6 },
  bulletItem: { fontSize: 14 },
  link: { color: "blue", marginVertical: 8 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: wp("1%"),
  },
  checkboxLabel: { fontSize: 14 },
});
