import { SetStateAction, useState } from "react";
import { useQuery } from 'react-query';
import { Input, Button } from "@mantine/core";
import supabase from "@/supabase/supabase";

function MultiAccountsGrid() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  const { isLoading, data, refetch, isFetched } = useQuery(['isSubscriber', username], async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .select("*")
      .eq('username', username);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },{enabled: false});

  const handleClick = () => {
    refetch()
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isFetched){
    if (data && data.length > 0) {
      console.log(`Username '${username}' already exists.`);
    } else if (data && data.length === 0) {
      console.log(`Username '${username}' does not exist.`);
    }
  }


  return (
    <>
      <Input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
      />
      <Button onClick={handleClick}>Check user</Button>

      {
        isFetched ? <div>{username}</div> : null
      }
    </>
  );
}

export default MultiAccountsGrid;
