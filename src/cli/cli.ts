// Imports
import inquirer from "inquirer";
import {
  getHighCostActivities,
  getActivitiesWithinBudget,
  getBudgetSummary,
} from "../services/budget.js";
import type { Trip } from "../models/trip.js";

// npx tsx src/cli/cli.ts to run file

// ADD MORE TRIPS IN AN ARRAY LATER
const trips: Trip[] = [
  {
    id: "1",
    destination: "Paris",
    startDate: new Date("2026-09-03"),
    activities: [
      {
        name: "Eiffel Tower", cost: 30,
        id: "1",
        category: "food",
        startTime: new Date, 
      },
      {
        name: "Louvre Museum", cost: 40,
        id: "2",
        category: "food",
        startTime: new Date,
      },
      {
        name: "Wine Tasting", cost: 150,
        id: "3",
        category: "food",
        startTime: new Date,
      }
    ]
  },
  {
    id: "2",
    destination: "Tokyo",
    startDate: new Date("2026-12-10"),
    activities: [
      {
        name: "Shibuya Crossing", cost: 0,
        id: "4",
        category: "food",
        startTime: new Date,
      },
      {
        name: "Sushi Dinner", cost: 80,
        id: "5",
        category: "food",
        startTime: new Date,
      },
      {
        name: "Robot Restaurant", cost: 100,
        id: "6",
        category: "food",
        startTime: new Date,
      }
    ]
  }
];

const handleBudgetMenu = async (selectedTrip: Trip) => {
  const { budgetAction } = await inquirer.prompt([
    {
      type: "list",
      name: "budgetAction",
      message: `Budget Management Options for ${selectedTrip.destination}: \n
        - View Total Cost \n
        - Filter High Cost Activities \n
        - Filter Activities Within Budget \n
        - Back to Main Menu \n`,
      choices: [
        "View Total Cost",
        "Filter High Cost Activities",
        "Filter Activities Within Budget",
        "Back to Main Menu",
      ],
    },
  ]);

  // Switch case for budget actions here
  switch (budgetAction) {
    case "View Total Cost":
      console.log("\n" + getBudgetSummary(selectedTrip) + "\n");
      break;

    case "Filter High Cost Activities":
      const { threshold } = await inquirer.prompt([
        {
          type: "number",
          name: "threshold",
          message: "Enter the cost threshold:",
        },
      ]);
      const expensive = getHighCostActivities(selectedTrip, threshold);
      console.table(expensive);
      break;

    case "Filter Activities Within Budget":
      const { budget } = await inquirer.prompt([
        {
          type: "number",
          name: "budget",
          message: "Enter your maximum budget:",
        },
      ]);
      const affordable = getActivitiesWithinBudget(
        selectedTrip.activities,
        budget,
      );
      console.table(affordable);
      break;

    default:
      return;
  }

  // Return to budget menu until user goes "Back"
  await handleBudgetMenu(selectedTrip);
};

// Menu Loop
const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?", // NEED TO MAKE THE OPTIONS SHOW UP
      choices: ["View Trips", "Add Activity", "View Budget", "Exit"],
    },
  ]);

  // Handle user choices here

  switch (answers["action"]) {

    case "View Budget":
      // Ask the user which trip they want to see
      const { selectedTripName } = await inquirer.prompt([
        {
          type: "list",
          name: "selectedTripName",
          message: "Select a trip to manage:", // NEED TO MAKE THE TRIPS SHOW UP AS OPTIONS
          choices: trips.map(t => t.destination)
        }
      ]);

      // Find the trip object that matches the name
      const trip = trips.find(t => t.destination === selectedTripName);

      if (trip) {
        await handleBudgetMenu(trip);
      }
      break;

    case "Exit":
      console.log("Goodbye!");
      process.exit(0);
  }

  await mainMenu(); // Loop back to main menu after handling action
};

mainMenu();
