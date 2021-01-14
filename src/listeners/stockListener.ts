import {client} from "../";
const stockFinder = require('stockfinder');
const reloadInterval = 5;
const sf = new stockFinder('stable', 'NIO', 'pk_69657184759b494f835eb91a4c20e072', false);


/**
 * Listener that listens to messages send in a server
 */
export default function setupStockListeners() {
    setInterval(()=> { update() }, reloadInterval * 1000);
}

function update() {
    /*
    Call the get stock function and then wait
    for the promise to return
    */
    sf.getStock().then((res: any) => {
        client.guilds.forEach(guild => {
            const response = JSON.parse(JSON.stringify(res));
            guild.me.setNickname(response[0].lastSalePrice.toString());
        });
    });
}