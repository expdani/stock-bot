import {Message, RichEmbed, User} from "discord.js";
import {getCurrency} from "./";
import {Channel} from "../../types/discord";
import {CURRENCY_TYPE} from "../../types/constants";

/**
 * The bot tells the user the amount of money he has.
 */
async function sayUserBalance(channel: Channel, user: User) {
    try {
        const currency = await getCurrency(user.id);
        const wallet = currency?.wallet || 0;
        const bank = currency?.bank || 0;

        const embed = new RichEmbed()
            .setAuthor(`${user.username}'s balance`, `${user.avatarURL}`)
            .setDescription(`**Wallet:** ${CURRENCY_TYPE}${wallet}\n**Bank:** ${CURRENCY_TYPE}${bank}`)
            .setColor("#fffff");
        channel.send(embed);
    } catch (err) {
        channel.send("Oops, something went wrong while requesting your balance.");
    }
}

/**
 * Setup the command that are related to currency in the bot
 */
export default function setupCurrencyCommands(message: Message) {
    const messageChannel = message.channel;

    sayUserBalance(messageChannel, message.author);
}
