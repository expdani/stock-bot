import Discord from "discord.js";
// import setupMessageListeners from "./listeners/messageListener";
import setupStockListeners from "./listeners/stockListener";
import {env} from "../environment";

/**
 * Setup Discord.JS client
 */
export const nio = new Discord.Client();
export const ethereum = new Discord.Client();
nio.login(env.DISCORD_API_KEY_NIO);
ethereum.login(env.DISCORD_API_KEY_ETH);

/**
 * Setup listeners
 */
// eslint-disable-next-line no-console
nio.on("ready", () => console.log(`Logged in as ${nio.user.tag}!`));
ethereum.on("ready", () => console.log(`Logged in as ${ethereum.user.tag}!`));
setupStockListeners();
