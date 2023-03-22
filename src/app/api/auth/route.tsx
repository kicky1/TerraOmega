import { Client, cryptoUtils, Signature } from "@hiveio/dhive";
import { NextApiRequest, NextApiResponse } from "next";

global.Buffer = global.Buffer || require("buffer").Buffer;

const hiveClient = new Client("https://api.hive.blog");

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { username, sig, ts, smartlock } = req.body;

  try {
    const [account] = await hiveClient.database.getAccounts([username]);

    let validSignature = false;

    const publicKey = Signature.fromString(sig)
      .recover(cryptoUtils.sha256(`${username}${ts}`))
      .toString();

    const thresholdPosting = account.posting.weight_threshold;
    const authorizedAccountsPosting = new Map(account.posting.account_auths);

    // Trying to validate using posting key
    if (!validSignature) {
      for (let i = 0; i < account.posting.key_auths.length; i += 1) {
        const auth = account.posting.key_auths[i];

        if (auth[0] === publicKey && auth[1] >= thresholdPosting) {
          validSignature = true;
          break;
        }
      }
    }

    // Trying to validate using posting authority
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
      req.body.user = username;
      req.body.smartlock = smartlock;
      let authorized = true;
      return res.json({ username, smartlock, authorized });
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message });
    return res.status(401);
  }
}
