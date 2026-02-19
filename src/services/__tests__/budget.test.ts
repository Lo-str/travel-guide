import { describe, it, expect } from "vitest";
import {
  calculateTotalCost,
  getHighCostActivities,
  getActivitiesWithinBudget,
  getBudgetSummary,
} from "../budget.js";
import type { Trip } from "../../models/trip.js";
import type { Activity } from "../../models/activity.js";

const createActivity = (
  overrides: Partial<Activity> = {},
): Activity => ({
  id: "1",
  name: "Test Activity",
  cost: 100,
  category: "sightseeing",
  startTime: new Date("2026-03-01T10:00:00"),
  ...overrides,
});

const createTrip = (overrides: Partial<Trip> = {}): Trip => ({
  id: "trip-1",
  destination: "Paris",
  startDate: new Date("2026-03-01"),
  activities: [],
  ...overrides,
});

describe("budget service", () => {
  describe("calculateTotalCost", () => {
    it("returns 0 for a trip with no activities", () => {
      const trip = createTrip({ activities: [] });
      expect(calculateTotalCost(trip)).toBe(0);
    });

    it("returns the cost of a single activity", () => {
      const trip = createTrip({
        activities: [createActivity({ cost: 50 })],
      });
      expect(calculateTotalCost(trip)).toBe(50);
    });

    it("sums costs of multiple activities", () => {
      const trip = createTrip({
        activities: [
          createActivity({ id: "1", cost: 50 }),
          createActivity({ id: "2", cost: 75 }),
          createActivity({ id: "3", cost: 25 }),
        ],
      });
      expect(calculateTotalCost(trip)).toBe(150);
    });

    it("handles decimal costs correctly", () => {
      const trip = createTrip({
        activities: [
          createActivity({ id: "1", cost: 19.99 }),
          createActivity({ id: "2", cost: 5.01 }),
        ],
      });
      expect(calculateTotalCost(trip)).toBeCloseTo(25.0);
    });
  });

  describe("getHighCostActivities", () => {
    it("returns empty array when no activities exceed threshold", () => {
      const trip = createTrip({
        activities: [
          createActivity({ id: "1", cost: 50 }),
          createActivity({ id: "2", cost: 75 }),
        ],
      });
      expect(getHighCostActivities(trip, 100)).toEqual([]);
    });

    it("returns activities that exceed the threshold", () => {
      const expensiveActivity = createActivity({ id: "2", name: "Fancy Dinner", cost: 150 });
      const trip = createTrip({
        activities: [
          createActivity({ id: "1", cost: 50 }),
          expensiveActivity,
        ],
      });
      expect(getHighCostActivities(trip, 100)).toEqual([expensiveActivity]);
    });

    it("does not include activities equal to the threshold", () => {
      const trip = createTrip({
        activities: [createActivity({ cost: 100 })],
      });
      expect(getHighCostActivities(trip, 100)).toEqual([]);
    });

    it("returns all activities when threshold is 0", () => {
      const activities = [
        createActivity({ id: "1", cost: 10 }),
        createActivity({ id: "2", cost: 20 }),
      ];
      const trip = createTrip({ activities });
      expect(getHighCostActivities(trip, 0)).toEqual(activities);
    });
  });

  describe("getActivitiesWithinBudget", () => {
    it("returns empty array when all activities exceed budget", () => {
      const activities = [
        createActivity({ id: "1", cost: 150 }),
        createActivity({ id: "2", cost: 200 }),
      ];
      expect(getActivitiesWithinBudget(activities, 100)).toEqual([]);
    });

    it("returns activities that are within budget", () => {
      const cheapActivity = createActivity({ id: "1", name: "Walking Tour", cost: 25 });
      const activities = [
        cheapActivity,
        createActivity({ id: "2", cost: 150 }),
      ];
      expect(getActivitiesWithinBudget(activities, 100)).toEqual([cheapActivity]);
    });

    it("includes activities equal to the budget", () => {
      const activity = createActivity({ cost: 100 });
      expect(getActivitiesWithinBudget([activity], 100)).toEqual([activity]);
    });

    it("returns all activities when budget is high", () => {
      const activities = [
        createActivity({ id: "1", cost: 10 }),
        createActivity({ id: "2", cost: 20 }),
      ];
      expect(getActivitiesWithinBudget(activities, 1000)).toEqual(activities);
    });

    it("returns empty array for empty activities list", () => {
      expect(getActivitiesWithinBudget([], 100)).toEqual([]);
    });
  });

  describe("getBudgetSummary", () => {
    it("returns formatted summary with destination and total", () => {
      const trip = createTrip({
        destination: "Tokyo",
        activities: [
          createActivity({ id: "1", cost: 100 }),
          createActivity({ id: "2", cost: 50 }),
        ],
      });
      expect(getBudgetSummary(trip)).toBe("Total Trip Cost for Tokyo: $150.00");
    });

    it("formats zero cost correctly", () => {
      const trip = createTrip({ destination: "Berlin", activities: [] });
      expect(getBudgetSummary(trip)).toBe("Total Trip Cost for Berlin: $0.00");
    });

    it("formats decimal costs with two decimal places", () => {
      const trip = createTrip({
        destination: "Rome",
        activities: [createActivity({ cost: 99.9 })],
      });
      expect(getBudgetSummary(trip)).toBe("Total Trip Cost for Rome: $99.90");
    });
  });
});
