import { useQuery } from "react-query";
import { Text, Group, RingProgress, Card, Center, ThemeIcon, Image, Avatar, Tooltip } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getStatsData } from "@/app/utils/actions/stats";
import useStyles from "./style";
import ocanea from "../../assets/oceana.png"

export default function NextLevelGrid() {
  const { classes, theme } = useStyles();

  const { data: statsScrapData, isLoading: isStatsScrapDataLoading } = useQuery(
    "statsData",
    getStatsData,
    {
      refetchInterval: 300000,
    }
  );

  if (isStatsScrapDataLoading) {
    return <></>;
  }

  return (
    <>
      <Card
        withBorder
        p="xl"
        radius={10}
        className={classes.card}
        mih={400}
        mah={400}
      >
        <Text size="xl" weight={500} mt="sm">
          When next Planet?
        </Text>
        <Text size="lg" color="dimmed">
          Ocanea needs 500,000 $SCRAP to be unlocked
        </Text>
        <Group position="center">
          <RingProgress
            sections={[
              {
                value:
                  (statsScrapData.currentFavor / statsScrapData.totalFavor) *
                  100,
                color: theme.colors.blue[9],
              },
            ]}
            size={280}
            label={
              // <Text weight={700} align="center" size="xl">
              //   {(
              //     (statsScrapData.currentFavor / statsScrapData.totalFavor) *
              //     100
              //   ).toFixed(2)}
              //   %
              // </Text>
              <Center>
                            <Tooltip
              label={'Accumulated: ' + ((statsScrapData.currentFavor / statsScrapData.totalFavor) * 100).toFixed(2) + ' %' }
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
              
            >
                  <Avatar
                    radius={200}
                    size={217}
                    src={ocanea.src}
                    
                  /> 
                  </Tooltip>
            </Center>
            }
          />
        </Group>
      </Card>
    </>
  );
}
