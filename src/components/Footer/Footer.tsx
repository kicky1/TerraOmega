import { Text, Center, Anchor } from "@mantine/core";
import { Suspense } from "react";
import useStyles from "./style";

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Center>
          <Suspense>
            <Text color="dimmed">Made by © <Anchor href="https://peakd.com/@kwskicky"  target="_blank">KICKY</Anchor></Text>
          </Suspense>
        </Center>
      </div>
    </div>
  );
}
