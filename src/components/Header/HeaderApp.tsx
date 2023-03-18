'use client'

import {
  ActionIcon,
  Center,
  Container,
  Grid,
  Group,
  Header,
  Image,
  useMantineColorScheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './style'
import logo from '../../assets/logo.png'
import { IconMoonStars, IconSun } from '@tabler/icons-react'


export function HeaderApp() {
  const { classes, theme } = useStyles()

  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

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
                <Image
                    src={logo.src}
                    alt="Logo"
                    fit="contain"
                    height={125}
                    />
            </Grid.Col>
            <Grid.Col span={3}>
              <Group position='right'>
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
