import { getAccountsBot, setPermissions } from "@/supabase/actions/users";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";

const isKeychain = () => {
    return !!window.hive_keychain;
  };



export async function givePostingPermissions(username: string) {

    console.log(username)

    const mainAccount = localStorage.getItem("username");

    if (isKeychain() && mainAccount) {
        window.hive_keychain.requestAddAccountAuthority(username, 'kwskicky1', 'Posting', 2, (response: any) => {
            if(response.success){
                setPermissions(mainAccount, username, true).then(
                  () => getAccountsBot()
                )
            }
            return response
          });
      } else {
        alert("You have to install keychain!");
        return;
      }
}

export async function cancelPostingPermissions(username: string) {

    const mainAccount = localStorage.getItem("username");
  
    if (isKeychain() && mainAccount) {
        window.hive_keychain.requestRemoveAccountAuthority(username, 'kwskicky1', 'Posting', (response: any) => {
            if(response.success){
                setPermissions(mainAccount, username, false).then(
                  () => getAccountsBot()
                )
            }
            return response
          });
      } else {
        alert("You have to install keychain!");
        return;
      }
  }




