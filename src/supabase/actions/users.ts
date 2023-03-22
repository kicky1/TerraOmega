import supabase from "../supabase";

export async function isSubscriber(username: string) {
  let { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .eq("username", username);

  if (error) {
    console.log(error.message);
    return;
  }



  const isExist = data && data.length > 0 ? true : false;
  return isExist;
}


export async function getAccounts() {
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

  const accounts = accountsData[0].accounts;

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
  const usernames = username.split(',');
  
  // Iterate through all usernames
  for (const u of usernames) {
    // Check if the username is already in the accounts array
    if (!accounts.includes(u.trim())) {
  
      // Add the username to the accounts array in the subscribers table
      accounts.push(u.trim());
  
      let { data: sub_data, error: sub_error } = await supabase
        .from('subscribers')
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
  return 'Dataset updated';
}