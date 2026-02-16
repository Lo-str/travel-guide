// Imports
import type { Activity } from "./activity.js";

// Types
export type Trip = {
  id: string;
  destination: string;
  startDate: Date;
  activities: Activity[];
};
