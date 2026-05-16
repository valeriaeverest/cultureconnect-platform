export type TimeSlot = "luncheon" | "afternoon" | "happy-hour" | "evening";

export interface IntakeState {
  location: string;
  teamSize: string;
  budget: string;
  eventDate: string;
  timeSlot: TimeSlot | "";
}

const KEY = "lattice:intake";

export const defaultIntake: IntakeState = {
  location: "",
  teamSize: "",
  budget: "",
  eventDate: "",
  timeSlot: "",
};

export function loadIntake(): IntakeState {
  if (typeof window === "undefined") return defaultIntake;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultIntake;
    return { ...defaultIntake, ...JSON.parse(raw) };
  } catch {
    return defaultIntake;
  }
}

export function saveIntake(state: IntakeState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}
