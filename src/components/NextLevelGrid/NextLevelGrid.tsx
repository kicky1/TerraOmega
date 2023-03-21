import { useQuery } from "react-query";
import { Text, Group, RingProgress, Card } from "@mantine/core";
import React from "react";
import { useMediaQuery } from '@mantine/hooks';
import { getStatsData } from "@/app/utils/actions/stats";
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
                <Text weight={700} align="center" size="xl">
                  {((statsScrapData.currentFavor/statsScrapData.totalFavor)*100).toFixed(2)}%
                </Text>
              }
            />
            </Group>
        </Card>
    </>
  );
}
