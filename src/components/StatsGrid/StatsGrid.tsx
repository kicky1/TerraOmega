import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData, getUsersData} from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton, Badge, Image } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
import { getStatsData } from "@/app/utils/actions/stats";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";




export default function StatsGrid() {
    const isMobile = useMediaQuery('(max-width: 767px)');

    const { data: userData, isLoading: isUserLoading } = useQuery('usersData', getUsersData, {
        refetchInterval: 60000
      });

    const now = new Date().getTime(); 
    const oldUsers = userData ? userData.filter((user: { registrationTime: number; }) => (now - user.registrationTime) / 3600000 <= 24) : [];
    
 
  if (isUserLoading) {
    return (
      <>
      </>
    );
  }

  return (
    <>
        <Group>
        <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/1452/1452913.png"} />
            {
                isMobile ?
                <Text fz={"lg"} c="white">
                {userData.length}
                </Text> :
                <Text fz={"lg"} c="white">
                    <Text span fw={500} inherit>
                    Players{" "}
                    </Text>
                    : {userData.length}
                </Text>   
            }
        </Group>
        <Space h="md"/>
        <Group>
        <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/8040/8040933.png"} />
        
        {
            isMobile ?
            <Text fz={"lg"} c="white">
                {oldUsers.length}
            </Text> :
            <Text fz={"lg"} c="white">
                <Text span fw={500} inherit>
                New players{" "}
                </Text>
                : {oldUsers.length}
            </Text>   
            }
        </Group>
    </>
  );
}
