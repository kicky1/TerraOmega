"use client"
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import BattleGrid from '@/components/BattleGrid/BattleGrid';
import {Container, Center, Badge, Space} from '@mantine/core';
import { useQuery } from 'react-query';

export default function Home() {

  const { data, isLoading } = useQuery('usersData', getUsersData, {
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  return (
    <>
      <Container fluid>
        <Container size="xl">
          {
            !isLoading ?           
            <>
              <Space h="xl"/>
              <Badge color="dark" size="xl" variant="outline">Number of all users: {data.length}</Badge>
            </>:
            null
          }
          <BattleGrid data={data} isLoading={isLoading}/>
        </Container>
      </Container>
    </>
  )
}
