import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useHabits } from "@/context/habits";
import { router, useLocalSearchParams } from "expo-router";

const EditHabit = () => {
  const { id } = useLocalSearchParams();
  const { habits, updateHabit } = useHabits();
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the habit to edit
    const habitToEdit = habits.find((h) => h.id === Number(id));
    if (habitToEdit) {
      setHabitName(habitToEdit.habitName);
      setHabitDescription(habitToEdit.habitDescription);
      setFrequency(String(habitToEdit.frequency));
      setLoading(false);
    } else {
      alert("Habit not found");
      router.push("/");
    }
  }, [id, habits]);

  const handleUpdate = async () => {
    if (habitName === "" || habitDescription === "" || frequency === "") {
      alert("Please fill in all fields");
      return;
    }

    const frequencyNum = parseInt(frequency, 10);
    if (isNaN(frequencyNum) || frequencyNum < 0) {
      alert("Please enter a valid number of days (0 or greater)");
      return;
    }

    const updatedHabit = {
      habitName,
      habitDescription,
      frequency: frequencyNum,
      done: false,
    };

    console.log("Updating habit:", updatedHabit);
    await updateHabit(Number(id), updatedHabit);

    alert("Habit updated successfully!");
    router.push("/");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5faafaff" />
        <Text style={styles.loadingText}>Loading habit...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Edit Habit</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter habit name"
            value={habitName}
            onChangeText={setHabitName}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter habit description"
            value={habitDescription}
            onChangeText={setHabitDescription}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your goal days"
            value={frequency}
            onChangeText={setFrequency}
            autoCapitalize="none"
            keyboardType="numeric"
            maxLength={5}
          />
          <Pressable style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Habit</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  form: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#5faafaff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#999",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
