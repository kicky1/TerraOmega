import api from "../api";
const hiveTx = require("hive-tx");

declare global {
  interface Window {
    hive_keychain: any;
  }
}

const isKeychain = () => {
  return !!window.hive_keychain;
};

export async function getUsersData() {
  const { data } = await api.get("players", {});
  const filteredData = data.filter((obj: any) =>
    obj.hasOwnProperty("username")
  );
  return filteredData;
}

export async function getUserBattlesData(username: string) {
  const { data } = await api.get(`battle_logs/${username}`, {});
  return data;
}

export async function getUserData(username: string) {
  const { data } = await api.get(`player/${username}`, {});
  return data;
}

export async function claimScrap(amount: number, username: string) {
  const operations = [
    [
      "claim",
      {
        amount: amount.toFixed(8),
      },
    ],
  ];

  let claimData = {};

  const tx = new hiveTx.Transaction();
  tx.create(operations).then(() => {
    const transaction = tx.transaction.expiration;
    const hash_object = crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(transaction)
    );

    hash_object.then(function (hash_arraybuffer) {
      const hash_uint8 = new Uint8Array(hash_arraybuffer);

      const hash_hex = Array.prototype.map
        .call(hash_uint8, function (x) {
          return ("00" + x.toString(16)).slice(-2);
        })
        .join("");

      claimData = {
        amount: amount.toFixed(8),
        "tx-hash": hash_hex.substring(0, 22),
      };

      if (isKeychain()) {
        window.hive_keychain.requestCustomJson(
          username,
          "terracore_claim",
          "Active",
          JSON.stringify(claimData),
          "Claim tokens",
          (response: any) => {}
        );
      } else {
        alert("You have to install keychain!");
      }
    });
  });
}

export async function attackOponent(target: string) {
  const operations = [
    [
      "battle",
      {
        target: target,
      },
    ],
  ];

  let battleData = {};

  const tx = new hiveTx.Transaction();
  tx.create(operations).then(() => {
    const transaction = tx.transaction.expiration;
    const hash_object = crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(transaction)
    );

    hash_object.then(function (hash_arraybuffer) {
      const hash_uint8 = new Uint8Array(hash_arraybuffer);

      const hash_hex = Array.prototype.map
        .call(hash_uint8, function (x) {
          return ("00" + x.toString(16)).slice(-2);
        })
        .join("");

      battleData = {
        target: target,
        "tx-hash": hash_hex.substring(0, 22),
      };

      if (isKeychain()) {
        window.hive_keychain.requestCustomJson(
          null,
          "terracore_battle",
          "Active",
          JSON.stringify(battleData),
          `Attack ${target}`,
          (response: any) => {}
        );
      } else {
        alert("You have to install keychain!");
      }
    });
  });
}

export function upgradeAccount(player: string, upgrade: string, value: number) {
  var hash =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  let amount;

  if (
    upgrade == "terracore_damage" ||
    upgrade == "terracore_defense" ||
    upgrade == "terracore_engineering"
  ) {
    amount = (value / 10) ** 2;
  }

  console.log(value);
  console.log(amount);

  const json = {
    contractName: "tokens",
    contractAction: "transfer",
    contractPayload: {
      symbol: "SCRAP",
      to: "null",
      quantity: amount?.toFixed(),
      memo: upgrade + "-" + hash,
    },
  };

  //convert json to string
  const data = JSON.stringify(json);
  if (isKeychain()) {
    window.hive_keychain.requestCustomJson(
      player,
      "ssc-mainnet-hive",
      "Active",
      data,
      `Upgrade ${upgrade}`,
      (response: any) => {}
    );
  } else {
    alert("You have to install keychain!");
  }
}

export function upgradeStash(player: string, value: number) {
  var hash =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const json = {
    contractName: "tokens",
    contractAction: "stake",
    contractPayload: {
      symbol: "SCRAP",
      to: player,
      quantity: value?.toFixed(3),
      memo: "stake" + "-" + hash,
    },
  };

  //convert json to string
  const data = JSON.stringify(json);
  if (isKeychain()) {
    window.hive_keychain.requestCustomJson(
      player,
      "ssc-mainnet-hive",
      "Active",
      data,
      `Upgrade ${player} stash size`,
      (response: any) => {}
    );
  } else {
    alert("You have to install keychain!");
  }
}

export function upgradeFavor(player: string, value: number) {
  var hash =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const json = {
    contractName: "tokens",
    contractAction: "transfer",
    contractPayload: {
      symbol: "SCRAP",
      to: "null",
      quantity: value?.toFixed(3),
      memo: "terracore_contribute" + "-" + hash,
    },
  };

  //convert json to string
  const data = JSON.stringify(json);
  if (isKeychain()) {
    window.hive_keychain.requestCustomJson(
      player,
      "ssc-mainnet-hive",
      "Active",
      data,
      `Upgrade ${player} favor`,
      (response: any) => {}
    );
  } else {
    alert("You have to install keychain!");
  }
}
