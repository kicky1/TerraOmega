"use client"
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import BattleGrid from '@/components/BattleGrid/BattleGrid';
import {Container, Center, Badge, Space} from '@mantine/core';
import { useQuery } from 'react-query';

export default function MainPage() {

  const { data, isLoading, refetch } = useQuery('usersData', getUsersData);
  
  const now = new Date().getTime(); 
  const oldUsers = data ? data.filter((user: { registrationTime: number; }) => (now - user.registrationTime) / 3600000 <= 24) : [];

  return (
    <>      
      <Container fluid>
        <Container size="xl">
          {
            !isLoading ?           
            <>
              <Space h="xl"/>
              <Badge color="dark" size="xl" variant="outline" w={300}>Number of all users: {data.length}</Badge>
              <Space h="sm"/>
              <Badge color="dark" size="xl" variant="outline" w={300}>Untouchable players: {oldUsers.length}</Badge>
            </>:
            null
          }
          <BattleGrid data={data} refetch={refetch} isLoading={isLoading}/>
        </Container>
      </Container>
    </>
  )
}
