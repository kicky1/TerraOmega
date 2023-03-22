interface PaymentData {
  username: string;
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
  console.log(props);
  if (isKeychain()) {
    window.hive_keychain.requestSendToken(
      props.username,
      "terraomega",
      props.amount.toFixed(3),
      `Request of subscription for: ${props.username}`,
      "SWAP.HBD",
      (response: any) => {
        console.log(response);
      }
    );
  } else {
    alert("You have to install keychain!");
  }
}
