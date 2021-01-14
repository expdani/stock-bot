import {Message, RichEmbed, User} from "discord.js";
import {getDaily, initiateDaily, updateDaily} from "./";
import {secondsToReadableString, getAmountOfSecondsBetweenDates} from "../../helpers";
import {Channel} from "../../types/discord";
import {changeCurrency} from "../currency/index";
import {CURRENCY_TYPE} from "../../types/constants";

const DAILY_TIMEOUT = 86400; // 24 hours in seconds
const DAILY_MONEY = 150; // amount of money to be added

/**
 * Sends embeded daily message if cooldown < 0.
 */
async function sayDailyMessage(channel: Channel, user: User) {
    try {
        const embed = new RichEmbed()
            .setTitle(`Here is your daily money, ${user?.username}!`)
            .setDescription(`**${CURRENCY_TYPE}${DAILY_MONEY}** has been added to your wallet!`)
            .setColor("#fffff");
        channel.send(embed);
    } catch (err) {
        channel.send("Oops, something went wrong adding your daily money.");
    }
}

/**
 * Adds cooldown if there is none, checks if you have cooldown before continuing.
 */
async function requestDaily(channel: Channel, user: User) {
    const daily = await getDaily(user?.id);
    const lastRequest = daily?.updated_at || new Date();

    if (!daily) {
        await initiateDaily(user?.id);
    }

    if (daily) {
        const secondsBetweenLastRequest = getAmountOfSecondsBetweenDates(new Date(), lastRequest);

        if (secondsBetweenLastRequest < DAILY_TIMEOUT) {
            const secondsWaiting = Math.round(DAILY_TIMEOUT - secondsBetweenLastRequest);
            channel.send(`You have to wait ${secondsToReadableString(secondsWaiting)} before you can use daily again.`);
            return;
        }
    }

    updateDaily(user?.id);
    changeCurrency(user?.id, DAILY_MONEY, 0);
    sayDailyMessage(channel, user);
}

/**
 * Setup commands for daily
 */
export default function setupDailyCommands(message: Message) {
    const messageChannel = message?.channel;

    requestDaily(messageChannel, message?.author);
}
