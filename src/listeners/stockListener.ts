import {client} from "../";
import {env} from "../../environment";

const stockFinder = require('stockfinder');
// const CurrencyConverter = require('@y2nk4/currency-converter')
const reloadInterval = 5;
const sf = new stockFinder('stable', 'NIO', env.IEX_API_KEY, false);

// const converter = new CurrencyConverter('do-not-use-this-key')

/**
 * Listener that listens to messages send in a server
 */
export default function setupStockListeners() {
    setInterval(() => { update() }, reloadInterval * 1000);
}

function update() {
    /*
    Call the get stock function and then wait
    for the promise to return
    */
    sf.getStock().then((res: any) => {
        client.guilds.forEach(guild => {
            const response = JSON.parse(JSON.stringify(res));
            guild.me.setNickname(response[0].lastSalePrice.toString() + " USD");
            // converter.convert('USD', 'EUR', response[0].lastSalePrice).then((value: any) => {
            //     guild.me.setNickname(value.toString() + " EUR");
            // });
        });
    });
}