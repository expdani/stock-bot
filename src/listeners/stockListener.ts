import {nio, ethereum} from "../";
import {env} from "../../environment";

const stockFinder = require('stockfinder');
const nioStock = new stockFinder('stable', 'NIO', env.IEX_API_KEY, false);
const CoinMarketCap = require('coinmarketcap-api')
 
const coinMarketClient = new CoinMarketCap(env.COIN_MARKET_API_KEY);

/**
 * Listener that listens to messages send in a server
 */
export default function setupStockListeners() {
  setInterval(() => { updateNio() }, 45 * 1000);
  setInterval(() => { updateEthereum() }, 700 * 1000);
}

function updateNio() {
  /*
  Call the get stock function and then wait
  for the promise to return
  */
  nioStock.getStock().then((res: any) => {
    nio.guilds.forEach(guild => {
      const response = JSON.parse(JSON.stringify(res));
      guild.me.setNickname(response[0].lastSalePrice.toString() + " USD");
    });
  });
}

function updateEthereum() {
  /*
  Call the get stock function and then wait
  for the promise to return
  */
  coinMarketClient.getQuotes({symbol: 'ETH'}).then((result: any) => {
    ethereum.guilds.forEach(guild => {
      guild.me.setNickname(parseFloat(result.data.ETH.quote.USD.price).toFixed(3).toString() + " USD");
    });
  }).catch(console.error)
}