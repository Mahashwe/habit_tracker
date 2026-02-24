// api.ts
import axios from "axios";

const BASE_URL = "http://192.168.29.69:8000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Optional but very useful for debugging 400s from DRF
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("AXIOS ERROR:", err?.response?.status, err?.response?.data);
    return Promise.reject(err);
  }
);

export type Habit = {
  id: number;
  habitName: string;
  habitDescription: string;
  frequency: number;
  done: boolean;
  last_updated?: string;
};

export type CreateHabitPayload = {
  habitName: string;
  habitDescription: string;
  frequency: number;
  done?: boolean;
};

// add_habit.tsx currently sends an `id` too; accept it and strip it.
type CreateHabitPayloadLoose = CreateHabitPayload & { id?: number };

const HABITS_PATH = "/tracker/habits/";
const TRACK_PATH = "/tracker/track/";

const toInt = (v: any): number => {
  if (typeof v === "number") return Number.isFinite(v) ? Math.trunc(v) : NaN;
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : NaN;
};

const normalizeHabit = (h: any): Habit => ({
  id: Number(h.id),
  habitName: String(h.habitName ?? ""),
  habitDescription: String(h.habitDescription ?? ""),
  frequency: Number.isFinite(Number(h.frequency)) ? Number(h.frequency) : 0,
  done: Boolean(h.done),
  last_updated: h.last_updated ? String(h.last_updated) : undefined,
});

// GET all habits
export const apiGetHabits = async (): Promise<Habit[]> => {
  const res = await api.get<any[]>(HABITS_PATH);
  return (res.data ?? []).map(normalizeHabit);
};

// CREATE habit
export const apiCreateHabit = async (payload: CreateHabitPayloadLoose): Promise<Habit> => {
  const { id, ...clean } = payload ?? {};

  const frequency = toInt(clean.frequency);
  if (!Number.isFinite(frequency)) {
    // prevents sending bad request -> 400
    throw new Error("frequency must be a valid number");
  }

  const send: CreateHabitPayload = {
    habitName: String(clean.habitName ?? "").trim(),
    habitDescription: String(clean.habitDescription ?? "").trim(),
    frequency,
    done: Boolean(clean.done ?? false),
  };

  const res = await api.post<any>(HABITS_PATH, send);
  return normalizeHabit(res.data);
};

// TRACK habit (PATCH)
export const apiTrackHabit = async (id: number, done: boolean): Promise<Habit> => {
  const res = await api.patch<any>(`${TRACK_PATH}${id}/`, { done });
  return normalizeHabit(res.data);
};

// DELETE habit
export const apiDeleteHabit = async (id: number): Promise<void> => {
  await api.delete(`${HABITS_PATH}${id}/`);
};