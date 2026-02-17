// Imports
import inquirer from "inquirer";
// import { calculateTotalCost, getHighCostActivities, getActivitiesWithinBudget, getBudgetSummary } from "../services/budget.js";

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
