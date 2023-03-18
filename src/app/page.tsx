"use client"
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import BattleGrid from '@/components/BattleGrid/BattleGrid';
import MultiAccountsGrid from '@/components/MultiAccountsGrid/MultiAccountsGrid';
import PriceGrid from '@/components/PriceGrid/PriceGrid';
import StatisticGrid from '@/components/StatisticGrid/StatistisGrid';
import {Container, Center, Badge, Space, Skeleton, Tabs} from '@mantine/core';
import { IconChartHistogram, IconSettings, IconTableOptions } from '@tabler/icons-react';
import { useQuery } from 'react-query';

export const runtime = 'experimental-edge';


export default function MainPage() {

  const { data, isLoading } = useQuery('usersData', getUsersData, {
    refetchInterval: 60000
  });

  return (
    <>
      <Space h="xl"/>
      <Space h="xl"/>
      <Container fluid>
        <Container size="xl">
        <Tabs color="dark" defaultValue="tab">
          <Tabs.List>
            <Tabs.Tab value="tab" icon={<IconTableOptions size="1rem" />}>Table</Tabs.Tab> 
            <Tabs.Tab value="stats" icon={<IconChartHistogram size="1rem" />}>Stats</Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings size="1rem" /> } disabled>Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab" pt="xs">
            <BattleGrid data={data} isLoading={isLoading}/>
          </Tabs.Panel>
          <Tabs.Panel value="stats" pt="xs">
            <StatisticGrid/>
          </Tabs.Panel>
          <Tabs.Panel value="settings" pt="xs">
            <MultiAccountsGrid/>
          </Tabs.Panel>
        </Tabs>
          <Space h="xl"/>
          <Space h="xl"/>
        </Container>
      </Container>
    </>
  )
}



