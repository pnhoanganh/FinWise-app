import { Text, View, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import COLORS from "@/constants/color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Styles from "../../assets/styles/notification.styles";
import SafeScreen from "@/components/SafeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";

const NotiGroup = ({ title, children }) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "flex-start",
        textAlign: "left",
        width: "100%",
        marginTop: wp("3%"),
      }}
    >
      <Text style={{ fontSize: wp("4%") }}>{title}</Text>
      <View style={{}}>{children}</View>
    </View>
  );
};

const Noti = ({ icon, widthIcon, heightIcon, title, text, time }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginVertical: wp("3%"),
        width: wp("80%"),
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: wp("50%") }}
      >
        {/* Left Icon */}
        <View
          style={{
            backgroundColor: COLORS.mainPink,
            width: wp("12%"),
            height: wp("12%"),
            borderRadius: wp("5%"),
            justifyContent: "center",
            alignItems: "center",
            marginRight: wp("3%"),
          }}
        >
          <Image
            source={icon}
            style={{ width: widthIcon, height: heightIcon }}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: wp("4%"), fontWeight: "500", marginBottom: 5 }}
          >
            {title}
          </Text>
          <Text>{text}</Text>
        </View>
      </View>
      {/* Title + Date */}
      <View
        style={{
          marginTop: wp("4%"),
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontWeight: "200" }}>{time}</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: COLORS.mainPink,
          marginTop: "2%",
        }}
      ></View>
    </View>
  );
};

const Transaction = ({
  icon,
  widthIcon,
  heightIcon,
  title,
  text,
  info,
  time,
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        marginVertical: wp("3%"),
        width: wp("80%"),
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: wp("60%") }}
      >
        {/* Left Icon */}
        <View
          style={{
            backgroundColor: COLORS.mainPink,
            width: wp("12%"),
            height: wp("12%"),
            borderRadius: wp("5%"),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: wp("3%"),
          }}
        >
          <Image
            source={icon}
            style={{ width: widthIcon, height: heightIcon }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: wp("4%"),
              fontWeight: "500",
              marginBottom: wp("1%"),
            }}
          >
            {title}
          </Text>
          <Text>{text}</Text>
          <Text
            style={{ marginTop: wp("1%"), color: "red", fontWeight: "600" }}
          >
            {info}
          </Text>
        </View>
      </View>
      {/* Title + Date */}
      <View
        style={{
          marginTop: wp("4%"),
          alignItems: "flex-end",
        }}
      >
        <Text style={{ fontWeight: "200" }}>{time}</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: COLORS.mainPink,
          marginTop: "2%",
        }}
      ></View>
    </View>
  );
};

export default function NotificationScreen() {
  const navigation = useNavigation();
  return (
    <SafeScreen>
      <View>
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
                Notification
              </Text>
            </View>
            <Ionicons name="notifications" size={24} color="black" />
          </View>

          {/* CARD */}
          <ScrollView style={Styles.card}>
            <NotiGroup
              title="Today"
              children={[
                <Noti
                  key={Math.random()}
                  icon={require("../../assets/images/noti.svg")}
                  widthIcon={wp("6%")}
                  heightIcon={wp("8%")}
                  title="Reminder!"
                  text="Set up your automatic savings to meet your savings goal..."
                  time="17:00 - April 24"
                ></Noti>,
                <Noti
                  key={Math.random()}
                  icon={require("../../assets/images/new.svg")}
                  widthIcon={wp("7.5%")}
                  heightIcon={wp("7.3%")}
                  title="New update"
                  text="Set up your automatic savings to meet your savings goal..."
                  time="17:00 - April 24"
                ></Noti>,
              ]}
            ></NotiGroup>

            <NotiGroup
              title="Yesterday"
              children={[
                <Transaction
                  key={Math.random()}
                  icon={require("../../assets/images/money.svg")}
                  widthIcon={wp("4%")}
                  heightIcon={wp("9%")}
                  title="Transactions"
                  text="A new transaction has been registered"
                  info="Groceries |  pantry  |  -$100,00"
                  time="17:00 - April 23"
                ></Transaction>,
                <Noti
                  key={Math.random()}
                  icon={require("../../assets/images/noti.svg")}
                  widthIcon={wp("6%")}
                  heightIcon={wp("8%")}
                  title="Reminder!"
                  text="Set up your automatic savings to meet your savings goal..."
                  time="17:00 - April 23"
                ></Noti>,
              ]}
            ></NotiGroup>
            <NotiGroup
              title="This week"
              children={[
                <Noti
                  key={Math.random()}
                  icon={require("../../assets/images/down.svg")}
                  widthIcon={wp("6%")}
                  heightIcon={wp("5%")}
                  title="Expense record"
                  text="We recommend that you be more attentive to your finances."
                  time="17:00 - April 23"
                ></Noti>,
                <Transaction
                  key={Math.random()}
                  icon={require("../../assets/images/money.svg")}
                  widthIcon={wp("4%")}
                  heightIcon={wp("9%")}
                  title="Transactions"
                  text="A new transaction has been registered"
                  info="Food |  Dinner  |  -$70,40"
                  time="17:00 - April 23"
                ></Transaction>,
              ]}
            ></NotiGroup>
          </ScrollView>
        </View>
      </View>
    </SafeScreen>
  );
}
