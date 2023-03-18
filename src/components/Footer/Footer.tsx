import { Text, Center } from '@mantine/core';
import { Suspense } from 'react';
import useStyles from './style';

export default function Footer() {
  const { classes } = useStyles();


  return (
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Center>
            <Suspense>
              <Text color="dimmed">Copyright © 2023 KWSKICKY</Text>
            </Suspense>
          </Center>
        </div>
      </div>
  );
}
