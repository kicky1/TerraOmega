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




export default function NextLevelGrid() {
    
    const { classes, theme } = useStyles();
   


    const { data: statsScrapData, isLoading: isStatsScrapDataLoading } = useQuery('statsData', getStatsData, {
        refetchInterval: 60000
      });
 
  if (isStatsScrapDataLoading) {
    return (
      <>
      </>
    );
  }

  return (
    <>
        <Card withBorder p="xl" radius={10}  className={classes.card} mih={400} mah={400}>
        <Text size="xl" weight={500} mt="sm">
                When next Planet?
            </Text>
            <Text size="lg"  color="dimmed" mb="lg">
                Soon, soon...
            </Text>
            <Group position="center">
            <RingProgress
        sections={[{ value:((statsScrapData.currentFavor/statsScrapData.totalFavor)*100), color: theme.colors.green[8] }]} 
        size={270}
        label={
          <Text color={'black'} weight={700} align="center" size="xl">
            {((statsScrapData.currentFavor/statsScrapData.totalFavor)*100).toFixed(2)}%
          </Text>
        }
      />
            </Group>

        </Card>


    </>
  );
}
