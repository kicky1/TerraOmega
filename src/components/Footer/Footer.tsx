import { Text, Center } from '@mantine/core';
import useStyles from './style';

export function Footer() {
  const { classes } = useStyles();


  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Center>
          <Text color="dimmed">Copyright © 2023 KWSKICKY</Text>
        </Center>
      </div>
    </div>
  );
}
