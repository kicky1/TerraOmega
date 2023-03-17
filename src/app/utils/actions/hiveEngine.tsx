import apiHive from "../apiHiveEngine";

export async function getStatsEngineData() {
  try {
    const { data } = await apiHive.post("contracts", {


    jsonrpc: "2.0",
    id: 1679004467172,
    method: "findOne",
    params: {
        contract: "market",
        table: "metrics",
        query: {
        symbol: "SCRAP"
        },
        limit: 1000,
        offset: 0
    
          
      },

    });
    return data;
  } catch {}
}



// export async function getScrapStats() {
//   try {
//     const { data } = await apiHive.post("contracts", {
//     id: 1679066086902,
//     jsonrpc: "2.0",
//     method: "find",
//     params: {contract: "tokens", table: "tokens", query: {symbol: "SCRAP"}, offset: 0, limit: 1000}
//     });
//     return data;
//   } catch {}
// }


