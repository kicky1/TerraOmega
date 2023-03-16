"use client"
import {Container, Center, Text} from '@mantine/core';

export const runtime = 'experimental-edge';


export default function Maintance() {
  return (
    <>      
      <Container fluid>
        <Container size="xl">
          <Center><Text pt={30} size={'xl'} fw={700}>Page in <Text span c="blue" inherit>Maintenance mode</Text></Text></Center>
        </Container>
      </Container>
    </>
  )
}
