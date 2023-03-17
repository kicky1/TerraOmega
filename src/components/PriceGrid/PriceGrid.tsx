import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData, getUsersData} from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton, Badge, Image } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
import { getStatsData } from "@/app/utils/actions/stats";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";




export default function PriceGrid() {
    const isMobile = useMediaQuery('(max-width: 767px)');

    const { data: statsData, isLoading: isStatsDataLoading } = useQuery('statsHiveData', getStatsEngineData, {
        refetchInterval: 60000
      });


 
  if (isStatsDataLoading) {
    return (
      <>
      </>
    );
  }

  return (
    <>
        <Group>
        <Image maw={45} mah={45} fit="contain" src={"https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit"} />
            {
                isMobile ?
                <Text fz={"lg"} c="white">
                {parseFloat(statsData.result.highestBid).toFixed(2)}
                </Text> :
                <Text fz={"lg"} c="white">
                    <Text span fw={500} inherit>
                    Scrap{" "}
                    </Text>
                    : {parseFloat(statsData.result.highestBid).toFixed(2)} Hive
                </Text>   
            }
        </Group>
        <Space h="xl" />
        <Group>
        <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/7314/7314483.png"} />
            {
                isMobile ?
                <Text fz={"lg"} c="white">
                {parseFloat(statsData.result.volume).toFixed(2)}
                </Text> :
                <Text fz={"lg"} c="white">
                    <Text span fw={500} inherit>
                    Volume{" "}
                    </Text>
                    : {parseFloat(statsData.result.volume).toFixed(2)} Hive
                </Text>   
            }
        </Group>
    </>
  );
}
