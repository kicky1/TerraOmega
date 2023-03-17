import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData, getUsersData} from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton, Badge, Image, Card } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
import { getStatsData } from "@/app/utils/actions/stats";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";
import useStyles from "./style";




export default function PriceGrid() {

    const { classes, theme } = useStyles();
    const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    const { data: statsData, isLoading: isStatsDataLoading } = useQuery('statsHiveData', getStatsEngineData, {
        refetchInterval: 60000
      });

    const { data: statsScrapData, isLoading: isStatsScrapDataLoading } = useQuery('statsData', getStatsData, {
        refetchInterval: 60000
      });


 
  if (isStatsDataLoading || isStatsScrapDataLoading) {
    return (
      <>
      </>
    );
  }

  return (
    <>
        <Card withBorder p="xl" radius={10}  className={classes.card} mih={400} mah={isTablet ? 400 : 800}>
            <Text size="xl" weight={500} mt="sm">
                Hive Stock
            </Text>
            <Text size="lg"  color="dimmed" mb="lg">
                Key data related to the game currency
            </Text>
            <Group>
            <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/2162/2162183.png"} />
                <Text fz={"lg"} >
                    <Text span fw={500} inherit>
                    Bid{" "}
                    </Text>
                    : {parseFloat(statsData.result.highestBid).toFixed(2)} Hive
                </Text>   
            </Group>
            <Space h="xl" />
            <Group>
            <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/8991/8991273.png"} />
                <Text fz={"lg"} >
                    <Text span fw={500} inherit>
                    Ask{" "}
                    </Text>
                    : {parseFloat(statsData.result.lowestAsk).toFixed(2)} Hive
                </Text>   
            </Group>
            <Space h="xl"/>
            <Group>
            <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/3190/3190615.png"} />
                {
                    <Text fz={"lg"} >
                        <Text span fw={500} inherit>
                        Volume{" "}
                        </Text>
                        : {parseFloat(statsData.result.volume).toFixed(2)} Hive
                    </Text>   
                }
            </Group>
            <Space h="xl"/>
            <Group>
            <Image maw={45} mah={45} fit="contain" src={"https://cdn-icons-png.flaticon.com/512/7314/7314483.png"} />
                {
                    <Text fz={"lg"} >
                        <Text span fw={500} inherit>
                        Price change{" "}
                        </Text>
                        : {statsData.result.priceChangePercent}
                    </Text>   
                }
            </Group>
        </Card>


    </>
  );
}
