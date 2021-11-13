const inquirer = require("inquirer");
const Robot = require("./src/objects/Robot");

const actions = require("./src/constants/actions");
const headings = require("./src/constants/headings");

const validCommands = Object.values(actions);
const validHeadings = Object.keys(headings);

const robot = new Robot();
play();

function play() {
  robot.report();
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "command",
        message: `Take an action (${validCommands.join(", ")}):`,
        filter: (input) => formatString(input),
      },
    ])
    .then((answers) => {
      console.log("\n");

      if (!isValidCommand(answers.command)) {
        console.log("This is not a valid command. Please try again.");
        return play();
      }

      if (answers.command !== actions.PLACE && !robot.isPlaced) {
        console.log("The robot is not placed yet. Place robot first.");
        return play();
      }

      commandDelegator(answers.command);
    })
    .catch((error) => {
      console.error(error);
    });
}

function placeCommand() {
  console.log("Please enter coordinates and heading: X, Y, Heading");
  inquirer
    .prompt([
      {
        type: "input",
        name: "x",
        message: "X Coordinate:",
        filter: (input) => parseInt(input),
      },
      {
        type: "input",
        name: "y",
        message: "Y Coordinate:",
        filter: (input) => parseInt(input),
      },
      {
        type: "input",
        name: "heading",
        message: `Heading ${validHeadings.join(", ")}:`,
        filter: (input) => formatString(input),
      },
    ])
    .then((answers) => {
      console.log("\n");

      if (robot.isValidPlacement(answers)) {
        robot.place(answers);
        play();
      } else {
        console.log(
          "One or more the coordinates are invalid. Please try again."
        );
        placeCommand();
      }
    });
}

function moveCommand() {
  robot.move();
  play();
}

function leftCommand() {
  robot.turnLeft();
  play();
}

function rightCommand() {
  robot.turnRight();
  play();
}

function reportCommand() {
  robot.report();
  play();
}

function commandDelegator(command) {
  if (command === actions.PLACE) placeCommand();
  else if (command === actions.MOVE) moveCommand();
  else if (command === actions.LEFT) leftCommand();
  else if (command === actions.RIGHT) rightCommand();
  else if (command === actions.REPORT) reportCommand();
}

function isValidCommand(command) {
  const uppercaseCommand = command?.toUpperCase();
  return validCommands.includes(uppercaseCommand);
}

function formatString(string = '') {
  const match = string?.match(/[a-zA-Z]+/g);
  return match?.[0]?.toUpperCase();
}