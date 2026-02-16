// Imports
import type { Trip } from "../models/trip.js";

// Calculate Total Cost
export const calculateTotalCost = (trip: Trip): number => {
  return trip.activities.reduce((sum, activity) => sum + activity.cost, 0);
};
