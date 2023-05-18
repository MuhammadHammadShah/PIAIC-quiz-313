import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
// Initialize Chalk Animation
const rainbowAnimation = chalkAnimation.rainbow("Quiz Time");
// Utility function to display messages with chalk styling
const showMessage = (message, color = "white") => {
    console.log(chalk.bgMagenta(message));
};
// Function to display the quiz questions
const displayQuiz = async () => {
    showMessage("--- Quiz Time ---", "cyan");
    let score = 0;
    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Rome", "Berlin"],
            answer: "Paris",
        },
        {
            question: "Who painted the Mona Lisa?",
            choices: [
                "Leonardo da Vinci",
                "Pablo Picasso",
                "Vincent van Gogh",
                "Michelangelo",
            ],
            answer: "Leonardo da Vinci",
        },
        {
            question: "What is the largest planet in our solar system?",
            choices: ["Jupiter", "Saturn", "Neptune", "Earth"],
            answer: "Jupiter",
        },
        {
            question: "In which year did World War II end?",
            choices: ["1945", "1939", "1942", "1951"],
            answer: "1945",
        },
        {
            question: "What is the chemical symbol for gold?",
            choices: ["Au", "Ag", "Fe", "Cu"],
            answer: "Au",
        },
    ];
    for (const quiz of questions) {
        const { answer } = await inquirer.prompt([
            {
                name: "answer",
                type: "list",
                message: quiz.question,
                choices: quiz.choices,
            },
        ]);
        if (answer === quiz.answer) {
            score++;
            showMessage("Correct answer!", "green");
        }
        else {
            showMessage("Wrong answer!", "red");
        }
    }
    showMessage(`Your score: ${score}/${questions.length}`, "yellow");
};
// Function to prompt the user if they want to repeat the quiz
const askRepeat = async () => {
    const { repeat } = await inquirer.prompt([
        {
            name: "repeat",
            type: "confirm",
            message: "Do you want to take the quiz again?",
        },
    ]);
    return repeat;
};
// Function to start the quiz
const startQuiz = async () => {
    let shouldExit = false;
    while (!shouldExit) {
        await displayQuiz();
        const repeat = await askRepeat();
        if (!repeat) {
            shouldExit = true;
        }
    }
    rainbowAnimation.stop();
    showMessage("Exiting the program. Goodbye!", "magenta");
};
// Start the quiz
startQuiz();
