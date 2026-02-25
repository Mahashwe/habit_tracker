import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { apiAskGemini } from "../api/api";
export default function AI() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Ask AI about Habits!</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Ask me anything about habits!"
              autoCapitalize="none"
              value={prompt}
              onChangeText={setPrompt}
            />
            <Pressable
              style={styles.button}
              onPress={async () => {
                setLoading(true);
                try {
                  const answer = await apiAskGemini(prompt);
                  setResponse(answer);
                  setPrompt("");
                } catch (error) {
                  setResponse("Error: Unable to get response from AI.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="rgb(240, 213, 78)"
                  style={{ marginTop: 20, borderRadius: 50 }}
                />
              )}
              <Text style={styles.buttonText}>
                {loading ? "Thinking..." : "Ask AI"}
              </Text>
            </Pressable>
            {response ? (
              <View style={styles.responseContainer}>
                <Text style={styles.responseText}>{response}</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  form: {
    width: "80%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#5faafaff",
    borderRadius: 5,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  responseText: {
    color: "#333",
  },
});
