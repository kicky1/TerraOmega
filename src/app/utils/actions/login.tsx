import { isSubscriber } from "@/supabase/actions/users";
import {
  setAuthorized,
  setIsSubscriber,
  setUsername,
} from "@/zustand/stores/useAuthorizationStore";
import { Client, cryptoUtils, Signature } from "@hiveio/dhive";
import api from "../api";
const hiveClient = new Client("https://api.hive.blog");

function loginKeychain(username: string | null) {
  if (!username) {
    return;
  }
  if (!window.hive_keychain) {
    return;
  }

  const ts = Date.now();

  window.hive_keychain.requestSignBuffer(
    username,
    `${username}${ts}`,
    "Posting",
    async (r: any) => {
      if (r.success) {
        processLogin({ username, ts, sig: r.result }).then(async (response) => {
          if (response) {
            setAuthorized(true);
            localStorage.setItem("username", username);
            setUsername(username);
            if (await isSubscriber(username)) {
              setIsSubscriber(true);
            } else {
              setIsSubscriber(false);
            }
          } else {
            setAuthorized(false);
          }
        });
      }
    }
  );
}

async function processLogin({ username, ts, sig }: any) {
  const [account] = await hiveClient.database.getAccounts([username]);

  let validSignature = false;

  const publicKey = Signature.fromString(sig)
    .recover(cryptoUtils.sha256(`${username}${ts}`))
    .toString();

  const thresholdPosting = account.posting.weight_threshold;
  const authorizedAccountsPosting = new Map(account.posting.account_auths);

  if (!validSignature) {
    for (let i = 0; i < account.posting.key_auths.length; i += 1) {
      const auth = account.posting.key_auths[i];

      if (auth[0] === publicKey && auth[1] >= thresholdPosting) {
        validSignature = true;
        break;
      }
    }
  }

  if (!validSignature && authorizedAccountsPosting.size > 0) {
    let accountsData: any = await hiveClient.database.getAccounts(
      Array.from(authorizedAccountsPosting.keys())
    );

    accountsData = accountsData.map(
      (a: { posting: { key_auths: any[] } }) => a.posting.key_auths[0]
    );

    for (let i = 0; i < accountsData.length; i += 1) {
      const auth = accountsData[i];

      if (auth[0] === publicKey && auth[1] >= thresholdPosting) {
        validSignature = true;
        break;
      }
    }
  }

  if (validSignature) {
    return true;
  } else {
    return false;
  }
}

export default loginKeychain;
