import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useHabits } from "@/context/habits";
import { router } from "expo-router";

const AddHabit = () => {
  const { addHabit, habits } = useHabits();
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = async () => {
    if (habitName === "" || habitDescription === "" || frequency === "") {
      alert("Please fill in all fields");
      return;
    }

    const frequencyNum = parseInt(frequency, 10);
    if (isNaN(frequencyNum) || frequencyNum <= 0) {
      alert("Please enter a valid number of days greater than 0");
      return;
    }

    const newHabit = {
      habitName,
      habitDescription,
      frequency: frequencyNum,
    };

    console.log("Creating habit:", newHabit);
    await addHabit(newHabit);

    setHabitName("");
    setHabitDescription("");
    setFrequency("");

    alert("Task added successfully!");
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Add Your Habit</Text>
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
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => router.push("/")}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </Pressable>

          <Pressable
            style={styles.cancel}
            onPress={() => {
              setHabitName("");
              setHabitDescription("");
              setFrequency("");
            }}
          >
            <Text style={styles.canceltext}>X</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Image
          style={styles.backgroundImage}
          source={require("../assets/images/bg.jpg")}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddHabit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#5faafaff",
    padding: 16,
    position: "relative",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#5faafaff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: "3%",
    marginBottom: "3%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancel: {
    position: "absolute",
    top: -40,
    right: 8,
  },
  canceltext: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backgroundImage: {
    height: 350,
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
    opacity: 0.5,
  },
});
