import supabase from "../supabase"

export async function isSubscriber(username: string) {
    let { data, error } = await supabase
    .from('subscribers')
    .select("*")
    .eq('username', username)
  
    if (error) {
      console.log(error.message)
      return
    }

    console.log(data)
  
    const isExist = data && data.length > 0 ? true : false
    return isExist
  }