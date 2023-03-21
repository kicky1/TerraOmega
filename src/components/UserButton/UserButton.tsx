'use client'

import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore';
import { Avatar, Badge, Group, Progress, Text, UnstyledButton } from '@mantine/core';
import { IconChevronsRight } from '@tabler/icons-react';
import { forwardRef } from 'react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  authorized: boolean;
  isSubscriber: boolean;
}



const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, authorized, isSubscriber, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: 170,
        padding: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        borderRadius: 5,
        '&:hover': {
          backgroundColor: theme.colors.dark[8] ,
        },
      })}
      {...others}
    >
      <Group>
      <Avatar src={`https://images.hive.blog/u/${name}/avatar`} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500} color="#ffff">
            {name}
          </Text>
          <Text color="dimmed" size="xs">
            {isSubscriber ? 'subscriber' : 'guest'}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
);

export { UserButton };

