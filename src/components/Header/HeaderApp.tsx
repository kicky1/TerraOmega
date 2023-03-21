'use client'

import {
  ActionIcon,
  Anchor,
  Center,
  Container,
  Grid,
  Group,
  Header,
  Image,
  Menu,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './style'
import logo from '../../assets/logo.png'
import { IconLogout, IconMoonStars, IconSun } from '@tabler/icons-react'
import { Suspense, useState } from 'react'
import LoginButton from '../LoginButton/LoginButton'
import { UserButton } from '../UserButton/UserButton'
import { logoutUser, useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'


export default function HeaderApp() {
  const { classes, theme } = useStyles()

  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)
  const isSubscriber = useAuthorizationStore((state: { isSubscriber: boolean; }) => state.isSubscriber)

  const username = useAuthorizationStore((state: { username: string; }) => state.username)

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  
  return (

<Container fluid className={classes.header} p={5} pb={15}>
      <Container size={'xl'}>
        <Header  height={'100%'} className={classes.header}>
          <Grid justify="space-between" align="center"> 
            <Grid.Col span={3}>
            </Grid.Col>
            <Grid.Col span={tablet ? 9 : 6}>
            <Tooltip 
                  label="Navigate to terracore game"
                  color="dark"
                  withArrow
                  offset={10}
                >
            <Anchor href="https://www.terracoregame.com/" target="_blank">
                <Image
                    src={logo.src}
                    alt="Logo"
                    fit="contain"
                    height={125}
                    />
            </Anchor>
            </Tooltip>
            </Grid.Col>
            <Grid.Col span={3}>
              <Group position='right'>
              
            {(authorized && !isMobile) ? 
              <Menu shadow="md"
              
              width={260}
              position="bottom-end"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              >
              <Menu.Target>
                <UserButton name={username} authorized={authorized} isSubscriber={isSubscriber}/>
              </Menu.Target>
              <Menu.Dropdown>
              <Menu.Item 
                className={classes.subLink} 
                onClick={() => logoutUser()}  
                icon={<IconLogout color={theme.colorScheme === 'dark' ? '#ffff' : 'black'} size={20} stroke={1.5} />}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
            </Menu> :
            <LoginButton/>
            }
              <ActionIcon
                variant="outline"
                sx={{
                  color: theme.colors.gray[0]
                }}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
              </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Header>
      </Container>
    </Container>
    
  )
}
