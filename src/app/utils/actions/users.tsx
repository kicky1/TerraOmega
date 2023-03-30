import {
  setBattleError,
  setBattleSuccess,
  setClaimSuccess,
  setScrapEarned,
} from "@/zustand/stores/useNotificationStore";
import api from "../api";
const hiveTx = require("hive-tx");

declare global {
  interface Window {
    hive_keychain: any;
  }
}

interface UserData {
  slice(arg0: number, arg1: number): unknown;
  attacks: number;
  balance: number;
  claims: number;
  cooldown: number;
  damage: number;
  defense: number;
  engineering: number;
  favor: number;
  health: number;
  hiveEngineScrap: number;
  hiveEngineStake: number;
  lastBattle: number;
  lastPayout: number;
  lastclaim: number;
  lastregen: number;
  minerate: number;
  registrationTime: number;
  scrap: number;
  username: string;
}

interface UserBattleData {
  id: string;
  username: string;
  attacked: string;
  scrap: number;
  timestamp: number;
}

const isKeychain = () => {
  return !!window.hive_keychain;
};

export async function getUsersData() {
  const { data } = await api.get("players", {});
  const filteredData = data.filter((obj: any) =>
    obj.hasOwnProperty("username") && obj.defense >= 10
  );
  return filteredData;
}

export async function getLeaderboard(): Promise<UserData[]> {
  const response = await fetch(`https://terracore.herokuapp.com/leaderboard`);
  const data = await response.json();
  return data;
}

export async function getUserBattlesData(username: string): Promise<any> {
  const response = await fetch(
    `https://terracore.herokuapp.com/battle_logs/${username}`
  );
  const data = await response.json();
  return data;
}

export async function getUserData(username: string): Promise<UserData> {
  const response = await fetch(
    `https://terracore.herokuapp.com/player/${username}`
  );
  const data = await response.json();
  return data as UserData;
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
          "Posting",
          JSON.stringify(claimData),
          "Claim tokens",
          (response: any) => {
            console.log(response)
            if(response.success == true){
              setClaimSuccess(true)
            }
            setTimeout(() => {
              getUserData(username).then((r) => {});
            }, 5000);
          }
        );
      } else {
        alert("You have to install keychain!");
      }
    });
  });
}

export async function claimAllScrap(usernames: UserData[]) {
  const operations = [
    [
      "claim",
      {
        amount: 10,
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



      if (isKeychain()) {
        usernames.map(async (user: UserData) => { 
          await new Promise((resolve) => setTimeout(resolve, 1000));

          claimData = {
            amount: user.hiveEngineScrap.toFixed(8),
            "tx-hash": hash_hex.substring(0, 22),
          };

          window.hive_keychain.requestCustomJson(
            user.username,
            "terracore_claim",
            "Posting",
            JSON.stringify(claimData),
            "Claim tokens",
            async (response: any) => {
              
              if(response.success == true){
                setClaimSuccess(true)
              }
                
            }
          );
          setClaimSuccess(true)
        })

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
          async (response: any) => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            await getUserData(response.data.username);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const battlesData = await getUserBattlesData(
              response.data.username
            );

            if (battlesData[0].attacked === target) {
              setScrapEarned(battlesData[0].scrap);
              setBattleSuccess(true);
            } else {
              setBattleError(true);
            }
          }
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
      "Posting",
      data,
      `Upgrade ${upgrade}`,
      (response: any) => {
        setTimeout(() => {
          getUserData(player).then((r) => {});
        }, 5000);
      }
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
      (response: any) => {
        setTimeout(() => {
          getUserData(player).then((r) => {});
        }, 5000);
      }
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
      (response: any) => {
        setTimeout(() => {
          getUserData(player).then((r) => {});
        }, 5000);
      }
    );
  } else {
    alert("You have to install keychain!");
  }
}
