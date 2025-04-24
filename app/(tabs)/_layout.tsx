import { Tabs } from "expo-router";
import BottomNavBar from "../../components/BottomNavBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <BottomNavBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Catogories",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Account",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
