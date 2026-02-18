// Imports
import inquirer from "inquirer";
import {
  calculateTotalCost,
  getHighCostActivities,
  getActivitiesWithinBudget,
  getBudgetSummary,
} from "../services/budget.js";
import type { Trip } from "../models/trip.js";

const trips = [] = []; // ADD TRIPS LATER

const handleBudgetMenu = async (selectedTrip: Trip) => {
  const { budgetAction } = await inquirer.prompt([
    {
      type: "list",
      name: "budgetAction",
      message: `Budget Management for ${selectedTrip.destination}:`,
      choices: [
        "View Total Cost",
        "Filter High Cost Activities",
        "Filter Activities Within Budget",
        "Back to Main Menu",
      ],
    },
  ]);

// Switch case for budget actions here 

// Menu Loop
const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View Trips", "Add Activity", "View Budget", "Exit"],
    },
  ]);
  // Handle user choices here
};

mainMenu();
