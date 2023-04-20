import supabase from "@/supabase/supabase";
import { getUserData } from "./users";

interface PaymentData {
  username: string;
  amount: number;
}

interface TransferData {
  data: any;
  amount: number;
}

declare global {
  interface Window {
    hive_keychain: any;
  }
}

const isKeychain = () => {
  return !!window.hive_keychain;
};

export async function payForSubscription({ ...props }: PaymentData) {
  if (isKeychain()) {
    window.hive_keychain.requestSendToken(
      props.username,
      "terraomega",
      props.amount.toFixed(3),
      // '0.001',
      `Request of subscription for: ${props.username}`,
      "SWAP.HBD",
      async (response: any) => {
        if (response.success) {
          let { data, error } = await supabase
            .from("subscribers")
            .select("*")
            .eq("username", props.username);

          if (error) {
            console.log(error.message);
            return;
          }

          if (data && data.length > 0) {
            await supabase
              .from("subscribers")
              .update({ created_at: new Date().toISOString() })
              .eq("id", data[0].id).then(
                () => location.reload()
              );

          } else {
            let subMonths = 0
            if(props.amount == 3){
              subMonths = 1
            }else if (props.amount == 16.2){
              subMonths = 6
            }else{
              subMonths = 12
            }

            await supabase
              .from("subscribers")
              .insert({ 
                username: props.username, 
                created_at: new Date().toISOString(),
                amount: subMonths,
                accounts: [props.username]
              }).then(
                () => location.reload()
              );


          }
        }
      }
    );
  } else {
    alert("You have to install keychain!");
  }
}


export async function transferTokens(username: string, amount: number) {
  if (!localStorage.getItem("username")) {
    return false;
  }

  if (isKeychain()) {
    let userMain: string;
    const usernameFromStorage = localStorage.getItem("username");
    userMain = usernameFromStorage ? usernameFromStorage : "";
    window.hive_keychain.requestSendToken(
      username,
      localStorage.getItem("username"),
      (amount - 0.001).toFixed(3),
      `Transfer $SCRAP to: ${localStorage.getItem("username")}`,
      "SCRAP",
      (response: any) => {
        setTimeout(() => {
          getUserData(username).then((r) => {});
          getUserData(userMain).then((r) => {});
        }, 5000);
      }
    );
  } else {
    alert("You have to install keychain!");
  }
}

// export async function sendTokens(data: any, mainUsername: string) {
//   try {
//     let filtered_data = data.filter((row: { username: string; }) => row.username !== 'terraomega');
//     const promises = filtered_data.map((account: { username: any; }) =>
//       new Promise((resolve) => {
//         window.hive_keychain.requestSendToken(
//           account.username,
//           'terraomega',
//           (5).toFixed(3),
//           `Transfer tokens to: ${mainUsername}`,
//           "SCRAP",
//           (response: any) => {
//             console.log(response);
//             if (response.success) {
//               resolve(response);
//             } else {
//               console.error(`Failed to send tokens to ${account.username}`);
//               resolve(null); // Resolve with null so Promise.all() doesn't reject
//             }
//           }
//         );
//       })
//     );

//     const responses = await Promise.all(promises.map(p => p.catch(e => null)));
//     console.log(responses);

//     // Send additional requests here
//   } catch (error) {
//     console.error(error);
//   }
// }
