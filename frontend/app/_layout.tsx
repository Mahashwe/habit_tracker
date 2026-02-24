import { HabitsProvider } from "@/context/habits";
import { Stack } from "expo-router";
import { Text, Image, View } from "react-native";

export default function RootLayout() {
  return (
    <HabitsProvider>
      <Stack
        screenOptions={{
          headerTitle: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                source={require("../assets/images/logo.png")}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <Text style={{ fontSize: 23, fontWeight: "bold", color: "#fff" }}>
                Habit Tracker
              </Text>
            </View>
          ),
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: "#ec7c7cff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </HabitsProvider>
  );
}
