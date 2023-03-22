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
          symbol: "SCRAP",
        },
        limit: 1000,
        offset: 0,
      },
    });
    return data;
  } catch {}
}

export async function getHivePrice() {
  try {
    const { data } = await apiHive.post("contracts", {
      jsonrpc: "2.0",
      id: 1679004467172,
      method: "findOne",
      params: {
        contract: "market",
        table: "metrics",
        query: {
          symbol: "SWAP.HIVE",
        },
        limit: 1000,
        offset: 0,
      },
    });
    return data;
  } catch {}
}
