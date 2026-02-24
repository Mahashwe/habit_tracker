import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useHabits } from "@/context/habits";
import Checkbox from "expo-checkbox";

export default function App() {
  const { habits, toggleHabitDone, deleteHabit } = useHabits();
  const completedgoal = habits.filter((h) => h.frequency === 0).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Track Your Habits</Text>
        <Text style={styles.text2}>
          "Motivation is what gets you started. Habit is what keeps you going."
        </Text>

        <Text style={styles.text2}>Completed Goals : {completedgoal}</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/add_habit")}
        >
          <Text style={styles.buttonText}>+ Add Habit</Text>
        </Pressable>

        <View>
          {habits.length === 0 ? (
            <View>
              <Text style={styles.text3}>
                No habits added yet. Start tracking!
              </Text>
              <Image
                style={styles.img}
                source={require("../assets/images/none.png")}
              />
            </View>
          ) : (
            habits.map((habit) => (
              <View
                key={habit.id}
                style={[
                  styles.box,
                  habit.frequency === 0 && { backgroundColor: "#d4f8d4" },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.habitText, { fontWeight: "bold" }]}>
                    {habit.habitName}
                  </Text>
                  <Text style={styles.habitText}>{habit.habitDescription}</Text>
                  <Text style={styles.habitText}>
                    Goal: {habit.frequency} days
                  </Text>
                </View>
                <View style={styles.rightSide}>
                  <Checkbox
                    value={habit.done ?? false}
                    disabled={habit.frequency === 0}
                    onValueChange={(value) => toggleHabitDone(habit.id, value)}
                  />
                  <Pressable
                    style={styles.editButton}
                    onPress={() => router.push(`/edit_habits?id=${habit.id}`)}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => deleteHabit(habit.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginLeft: "2%",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#5faafaff",
    borderRadius: 5,
    marginLeft: "30%",
    marginRight: "35%",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: "8%",
    marginRight: "8%",
    fontStyle: "italic",
    fontFamily: "Arial",
    color: "#f86d36ff",
    backgroundColor: "#fceae9ff",
    padding: 10,
    borderRadius: 10,
  },
  box: {
    marginTop: 20,
    marginLeft: "8%",
    marginRight: "5%",
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    backgroundColor: "#f9f9f9ff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightSide: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  habitText: {
    marginTop: "1%",
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  text3: {
    fontSize: 17,
    marginTop: 80,
    marginBottom: 10,
    marginLeft: "8%",
    marginRight: "8%",
    fontWeight: "bold",
    fontFamily: "Arial",
    color: "#003a71ff",
    backgroundColor: "#eecdccff",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  img: {
    padding: "20%",
    width: 200,
    height: 200,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: "#120201ff",
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ff4d4dff",
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#4d9fff",
    borderRadius: 5,
  },
  editText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
