// habits.tsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  apiGetHabits,
  apiCreateHabit,
  apiUpdateHabit,
  apiDeleteHabit,
  apiTrackHabit,
  Habit,
  CreateHabitPayload,
} from "@/api/api";

type HabitsContextType = {
  habits: Habit[];
  addHabit: (
    habit: CreateHabitPayload | (CreateHabitPayload & { id?: number }),
  ) => Promise<void>;
  updateHabit: (id: number, habit: CreateHabitPayload) => Promise<void>;
  toggleHabitDone: (id: number, value: boolean) => Promise<void>;
  deleteHabit: (id: number) => Promise<void>;
};

const HabitsContext = createContext<HabitsContextType | null>(null);

export const HabitsProvider = ({ children }: { children: React.ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const refresh = async () => {
    try {
      const data = await apiGetHabits();
      console.log("Fetched habits:", data);
      setHabits(data);
    } catch (e: any) {
      console.error(
        "FETCH HABITS FAILED:",
        e?.response?.data ?? e?.message ?? e,
      );
      console.error("Make sure backend is running at the correct URL");
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const addHabit = async (habit: any) => {
    try {
      const saved = await apiCreateHabit(habit);
      setHabits((prev) => [...prev, saved]);
    } catch (e: any) {
      console.log("CREATE FAILED:", e?.response?.data ?? e?.message ?? e);
    }
  };

  const updateHabit = async (id: number, habit: CreateHabitPayload) => {
    try {
      const updated = await apiUpdateHabit(id, habit);
      setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
    } catch (e: any) {
      console.log("UPDATE FAILED:", e?.response?.data ?? e?.message ?? e);
      await refresh(); // rollback to server truth
    }
  };

  const toggleHabitDone = async (id: number, value: boolean) => {
    // optimistic UI
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: value } : h)),
    );

    try {
      const updated = await apiTrackHabit(id, value);
      setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
    } catch (e: any) {
      console.log("TRACK FAILED:", e?.response?.data ?? e?.message ?? e);
      await refresh(); // rollback to server truth
    }
  };

  const deleteHabit = async (id: number) => {
    try {
      await apiDeleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (e: any) {
      console.log("DELETE FAILED:", e?.response?.data ?? e?.message ?? e);
    }
  };

  return (
    <HabitsContext.Provider
      value={{ habits, addHabit, updateHabit, toggleHabitDone, deleteHabit }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used inside HabitsProvider");
  return ctx;
};
