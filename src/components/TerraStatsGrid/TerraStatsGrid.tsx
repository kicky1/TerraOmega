import { useQuery } from "react-query";
import { getUsersData } from "@/app/utils/actions/users";
import { Space, Text, Group, Image, Card } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getStatsData } from "@/app/utils/actions/stats";
import useStyles from "./style";

export default function TerraStatsGrid() {
  const { classes, theme } = useStyles();
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const { data: statsScrapData, isLoading: isStatsScrapDataLoading } = useQuery(
    "statsData",
    getStatsData,
    {
      refetchInterval: 300000,
    }
  );

  const { data: userData, isLoading: isUserLoading } = useQuery(
    "usersData",
    getUsersData,
    {
      refetchInterval: 30000,
    }
  );

  const now = new Date().getTime();
  const oldUsers = userData
    ? userData.filter(
        (user: { registrationTime: number }) =>
          (now - user.registrationTime) / 3600000 <= 24
      )
    : [];

  if (isStatsScrapDataLoading || isUserLoading) {
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
        mah={isTablet ? 400 : 800}
      >
        <Text size="xl" weight={500} mt="sm">
          TerraCore Info
        </Text>
        <Text size="lg" color="dimmed" mb="lg">
          Data related to the game ecosystem
        </Text>
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={"https://cdn-icons-png.flaticon.com/512/1452/1452913.png"}
          />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              Players{" "}
            </Text>
            : {userData.length}
          </Text>
        </Group>
        <Space h="xl" />
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={"https://cdn-icons-png.flaticon.com/512/8040/8040933.png"}
          />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              New players{" "}
            </Text>
            : {oldUsers.length}
          </Text>
        </Group>
        <Space h="xl" />
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={"https://cdn-icons-png.flaticon.com/512/2489/2489669.png"}
          />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              Staked{" "}
            </Text>
            : {statsScrapData.totalStaked.toFixed(2)}
          </Text>
          <Image
            maw={25}
            mah={25}
            fit="contain"
            src={
              "https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit"
            }
          />
        </Group>
        <Space h="xl" />
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={"https://cdn-icons-png.flaticon.com/512/9413/9413241.png"}
          />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              Liquid{" "}
            </Text>
            : {statsScrapData.totalScrap.toFixed(2)}
          </Text>
          <Image
            maw={25}
            mah={25}
            fit="contain"
            src={
              "https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit"
            }
          />
        </Group>
      </Card>
    </>
  );
}
