"use client"
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import BattleGrid from '@/components/BattleGrid/BattleGrid';
import {Container, Center, Text} from '@mantine/core';
import { useQuery } from 'react-query';

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
