'use client'

import {
  Center,
  Container,
  Grid,
  Group,
  Header,
  Image,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './style'
import logo from '../../assets/logo.png'
import { Suspense } from 'react'


export function HeaderApp() {
  const { classes, theme } = useStyles()

  const tablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  
  return (
    <Suspense>
    <Container fluid className={classes.headerContainer} p={5} pb={35}>
      <Container size={'xl'}>
        <Header  height={'100%'} className={classes.header}>
          <Grid justify="space-between" align="center"> 
            <Grid.Col span={3} pl={20} sx={{display:'flex', justifyContent:'left'}}>
              <Center>
                <Group spacing={0} > 
                </Group>
              </Center>
            </Grid.Col>
            <Grid.Col span={tablet ? 9 : 6}>
                <Image
                    src={logo.src}
                    alt="Logo"
                    fit="contain"
                    height={125}
                    />
            </Grid.Col>
            <Grid.Col span={3} pr={20} sx={{display:'flex', justifyContent:'right'}}>
            </Grid.Col>
          </Grid>
        </Header>
      </Container>
    </Container>
    </Suspense>
  )
}
