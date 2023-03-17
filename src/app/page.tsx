"use client"
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import BattleGrid from '@/components/BattleGrid/BattleGrid';
import StatsGrid from '@/components/StatsGrid/StatsGrid';
import {Container, Center, Badge, Space, Skeleton} from '@mantine/core';
import { useQuery } from 'react-query';

export const runtime = 'experimental-edge';


export default function MainPage() {

  const { data, isLoading } = useQuery('usersData', getUsersData, {
    refetchInterval: 60000
  });

  // const { data: usersBattles } = useQuery('usersBattles', getMoreUsersBattles, {
  //   refetchInterval: 10000
  // });

  return (
    <>      
      <Container fluid>
        <Container size="xl">
          <BattleGrid data={data} isLoading={isLoading}/>
          <Space h="xl"/>
          <Space h="xl"/>
        </Container>
      </Container>
    </>
  )
}



