import { setSubDays } from "@/zustand/stores/useAuthorizationStore";
import supabase from "../supabase";

export async function isSubscriber(username: string) {
  let { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .eq("username", username)

  if (error) {
    console.log(error.message);
    return false;
  }

  if (data && data.length > 0) {
    const subscription = data[0];
    const purchaseDate = new Date(subscription.created_at);
    const today = new Date();
    const maxDurationInDays = subscription.amount * 30;
    const diffInDays = Math.ceil((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    const remainingDays = maxDurationInDays - diffInDays;

    setSubDays(remainingDays)

    if (diffInDays >= maxDurationInDays) {
      const { error: updateError } = await supabase
        .from("subscribers")
        .update({ active: false })
        .eq("id", subscription.id);

      if (updateError) {
        console.log(updateError.message);
      }
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export async function getAccounts() {
  if (!localStorage.getItem("username")) {
    return;
  }

  let { data: accountsData, error } = await supabase
    .from("subscribers")
    .select("accounts")
    .eq("username", localStorage.getItem("username"));

  if (error) {
    console.log(error.message);
    return;
  }

  if (!accountsData) {
    console.log("sub_accounts is null");
    return;
  }

  let accounts = accountsData[0].accounts;

  return accounts;
}

export async function addUser(username: string) {
  // Get the current user's accounts from the subscribers table
  let { data: sub_accounts, error: sub_error } = await supabase
    .from("subscribers")
    .select("accounts")
    .eq("username", localStorage.getItem("username"));

  if (sub_error) {
    console.log(sub_error.message);
    return;
  }

  if (!sub_accounts) {
    console.log("sub_accounts is null");
    return;
  }

  const accounts = sub_accounts[0].accounts;
  const usernames = username.split(",");

  // Iterate through all usernames
  for (const u of usernames) {
    // Check if the username is already in the accounts array
    if (!accounts.includes(u.trim())) {
      // Add the username to the accounts array in the subscribers table
      accounts.push(u.trim());

      let { data: sub_data, error: sub_error } = await supabase
        .from("subscribers")
        .update({ accounts: accounts })
        .eq("username", localStorage.getItem("username"));

      if (sub_error) {
        console.log(sub_error.message);
        return;
      }
    } else {
      console.log(`Username '${u}' is already in the accounts array`);
    }
  }
  // If all usernames are already in the accounts array, return an appropriate message
  return "Dataset updated";
}
