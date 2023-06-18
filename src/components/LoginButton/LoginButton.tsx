"use client";

import loginKeychain from "@/app/utils/actions/login";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";
import { Button, Dialog, Group, rem, Text, TextInput } from "@mantine/core";
import { IconBrandTwitter } from "@tabler/icons-react";
import { SetStateAction, useEffect, useState } from "react";
import useStyles from "./style";

declare global {
  interface Window {
    hive_keychain: any; // 👈️ turn off type checking
  }
}

const isKeychain = () => {
  return !!window.hive_keychain;
};

function LoginButton() {
  const { classes, theme } = useStyles();
  const authorized = useAuthorizationStore(
    (state: { authorized: boolean }) => state.authorized
  );
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isKeychain() && localStorage.getItem("username") && !authorized) {
      const username = localStorage.getItem("username");
      loginKeychain(username);
    }
  }, []);

  const loginUser = async () => {
    if (isKeychain()) {
      loginKeychain(value);
    } else {
      console.log("You have to install keychain");
    }
  };

  return (
    <>
      <Group position="center">
        {!authorized && (
          <Button
            styles={(theme) => ({
              root: {
                color: "black",
                backgroundColor: "#ffffff",
                border: 0,
                height: rem(38),
                paddingLeft: rem(15),
                paddingRight: rem(15),
                "&:not([data-disabled])": theme.fn.hover({
                  backgroundColor: theme.fn.darken("#ffffff", 0.1),
                }),
              },
            })}
            onClick={() => setOpened((o) => !o)}
          >
            Log in
          </Button>
        )}
      </Group>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size="lg"
        radius="md"
        position={{ top: 10, right: 10 }}
      >
        <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
          Put your Hive username
        </Text>
        <Group align="flex-end">
          <TextInput
            placeholder="username"
            value={value}
            style={{ flex: 1 }}
            onChange={(event: {
              currentTarget: { value: SetStateAction<string> };
            }) => setValue(event.currentTarget.value)}
          />
          <Button
            styles={(theme) => ({
              root: {
                color: "#ffffff",
                backgroundColor: "black",
                border: 0,
                height: rem(38),
                paddingLeft: rem(15),
                paddingRight: rem(15),
                "&:not([data-disabled])": theme.fn.hover({
                  backgroundColor: theme.fn.darken("black", 0.1),
                }),
              },
            })}
            onClick={() => {
              setOpened(false);
              loginUser();
            }}
          >
            Log in
          </Button>
        </Group>
      </Dialog>
    </>
  );
}

export default LoginButton;
