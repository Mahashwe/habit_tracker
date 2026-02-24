import { createContext, useState, useContext } from "react";
import { Alert } from "react-native";

type Habit = {
  id: number;
  habitName: string;
  habitDescription: string;
  frequency: number;
  done?: boolean;
};

const HabitsContext = createContext({
  habits: [] as Habit[],
  addHabit: (_newHabit: Habit) => {},
  toggleHabitDone: (_id: number, _value: boolean) => {},
  deleteHabit: (_id: number) => {},
});

export const HabitsProvider = ({ children }: { children: React.ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const addHabit = (newHabit: Habit) => {
    setHabits((prev) => [...prev, newHabit]);
  };

  const toggleHabitDone = (id: number, value: boolean) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const newFrequency = value ? Math.max(h.frequency - 1, 0) : h.frequency;

        if (newFrequency === 0 && h.frequency !== 0) {
          Alert.alert(
            "Congratulations!",
            "You've achieved your goal for this habit!",
          );
        }

        return {
          ...h,
          done: value,
          frequency: newFrequency,
        };
      }),
    );
  };
  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };
  return (
    <HabitsContext.Provider
      value={{ habits, addHabit, toggleHabitDone, deleteHabit }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => useContext(HabitsContext);
