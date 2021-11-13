const inquirer = require("inquirer");
const Robot = require("./src/objects/Robot");

const actions = require("./src/constants/actions");
const headings = require("./src/constants/headings");
const formatString = require("./src/utils/formatString");

const validCommands = Object.values(actions);
const validHeadings = Object.keys(headings);

const robot = new Robot();
play();

function play() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "command",
        message: `Make a move (${validCommands.join(", ")}):`,
        filter: (input) => formatString(input),
      },
    ])
    .then((answers) => {
      if (!isValidCommand(answers.command)) {
        console.warn("\nThis is not a valid command. Please try again.");
        return replay();
      }

      if (answers.command !== actions.PLACE && !robot.isPlaced) {
        console.warn("\nThe robot is not placed yet. Place robot first.");
        return replay();
      }

      commandDelegator(answers.command);
    })
    .catch((error) => {
      console.error(error);
    });
}

function replay() {
  console.log(''); // newline
  play();
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
      if (robot.place(answers)) {
        replay();
      } else {
        console.warn(
          "\nOne or more the coordinates are invalid. Please try again."
        );
        console.log(''); // newline
        placeCommand();
      }
    });
}

function moveCommand() {
  robot.move();
  replay();
}

function leftCommand() {
  robot.turnLeft();
  replay();
}

function rightCommand() {
  robot.turnRight();
  replay();
}

function reportCommand() {
  robot.report();
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
