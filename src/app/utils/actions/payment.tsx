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
      `Request of subscription for: ${props.username}`,
      "SWAP.HBD",
      (response: any) => {}
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
    window.hive_keychain.requestSendToken(
      username,
      localStorage.getItem("username"),
      (amount - 0.001).toFixed(3),
      `Transfer $SCRAP to: ${localStorage.getItem("username")}`,
      "SCRAP",
      (response: any) => {}
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
