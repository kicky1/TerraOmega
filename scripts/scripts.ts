// const cron = require('node-cron');
import { Client } from "@hiveio/dhive";
import supabase from "@/supabase/supabase";

const client = new Client('https://api.hive.blog');

export async function claimTokensForEnabledUsers() {
  // Fetch users with bot_enable set to true
  const { data: users, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('bot_enable', true);

   

  if (error) {
    console.error(error);
    return;
  }

  // Claim tokens for users in batches of 10 with a 10 second delay between batches
  const batchSize = 10;
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);

    for (const user of batch) {
      // Send request to claim tokens for each user
      const { success, error }: any = await sendClaimRequest(user);

      if (success) {
        console.log(`Tokens claimed for user ${user.username}`);
      } else {
        console.error(`Error claiming tokens for user ${user.username}: ${error}`);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
}

async function sendClaimRequest(user: any) {
  const postingKey = user.posting_key;
  const username = user.username;
  var hash =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  
    const claimData = {
    amount: 25,
    "tx-hash": hash
  };

  // Broadcast custom JSON request using hive.broadcast.customJson
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client.broadcast.json({
        id: "terracore_claim",
        required_auths: [],
        required_posting_auths: [username],
        json: JSON.stringify(claimData)
      }, postingKey);

      if (result) {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: "Custom JSON broadcast failed" });
      }
    } catch (error: any) {
      console.error(error);
      resolve({ success: false, error: error.message });
    }
  });
}

// Schedule the cron job to run every 4 hours
// cron.schedule('0 */4 * * *', claimTokensForEnabledUsers);
