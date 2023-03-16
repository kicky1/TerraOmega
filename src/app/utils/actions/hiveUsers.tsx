import apiHive from "../apiHive";

export async function getUserDataProfile(username: any) {
  try {
    const { data } = await apiHive.post("", {
      jsonrpc: "2.0",
      method: "bridge.get_profile",
      params: {
        account: username,
      },
      id: 1,
    });
    return data;
  } catch {}
}
