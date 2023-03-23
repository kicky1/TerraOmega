export function fetchHivePrice() {
  return fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=hive&vs_currencies=USD"
  ).then((response) => response.json());
}
