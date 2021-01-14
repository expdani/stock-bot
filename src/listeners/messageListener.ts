import {Message} from "discord.js";
import {client} from "../";
import {calculateResponse} from "../commandHandler";
import setupMinigameCommands from "../controllers/minigames";
import setupDailyCommands from "../controllers/daily/commands";
import setupCurrencyCommands from "../controllers/currency/commands";

enum Commands {
    Balance = "balance",
    Daily = "daily",
    Trivia = "trivia",
}

/**
 * Listener that listens to messages send in a server
 */
export default function setupMessageListeners() {
    client.on("message", async (message: Message) => {
        const response = await calculateResponse(message);

        if (response) {
            switch (response.command?.command) {
                case Commands.Balance:
                    setupCurrencyCommands(message);
                    break;
                case Commands.Daily:
                    setupDailyCommands(message);
                    break;
                case Commands.Trivia:
                    setupMinigameCommands(message);
                    break;
                default:
                    message.channel.send(response.response);
                    break;
            }
        }
    });
}
