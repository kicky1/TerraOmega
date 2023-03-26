import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import {
  Space,
  SimpleGrid,
  Box,
  Table,
  Text,
  Pagination,
  Input,
  Grid,
  Button,
  Checkbox,
  Group,
  Modal,
  RingProgress,
  Select,
  Skeleton,
  Badge,
  Image,
  Card,
  Anchor,
  Avatar,
} from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getStatsData } from "@/app/utils/actions/stats";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";
import useStyles from "./style";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";

interface Props {
  accounts: any;
  mainAccount: any;
  mainUsername: any;
  hivePrice: any;
  statsData: any;
  loadingPrice: boolean;
  isStatsDataLoading: boolean;
}

export default function MainAccountPanel({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const isMobile = useMediaQuery("(max-width: 960px)");

  const toHive = () => {
    return (
      (props.mainAccount?.scrap + props.mainAccount?.hiveEngineScrap) *
      props.statsData?.result?.highestBid
    );
  };

  if (!props.accounts || props.loadingPrice || props.isStatsDataLoading) {
    return <></>;
  }

  return (
    <>
      <Card
        m={25}
        withBorder
        p="xl"
        radius={10}
        className={classes.card}
        mih={420}
        mah={420}
      >
        <Grid grow>
          <Grid.Col span={8}>
            <Text size="xl" weight={500}>
              Main account panel
            </Text>
            <Text size="lg" color="dimmed" mb="lg">
              Summary data for{" "}
              <span className={classes.highlight}>
                {props.mainUsername ? props.mainUsername : "@username"}
              </span>{" "}
              account
            </Text>
          </Grid.Col>
          {!isMobile && (
            <Grid.Col span={4}>
              <Group position="right">
                <Avatar
                  src={
                    props.mainUsername
                      ? `https://images.hive.blog/u/${props.mainUsername}/avatar`
                      : null
                  }
                  radius="md"
                  size="xl"
                />
              </Group>
            </Grid.Col>
          )}
        </Grid>
        <Group pt="sm">
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={
              "https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit"
            }
          />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              $SCRAP{" "}
            </Text>
            : {props.mainAccount ? props.mainAccount?.scrap.toFixed(2) : "0.00"}
          </Text>
        </Group>
        <Space h="xl" />
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={"https://cdn-icons-png.flaticon.com/512/584/584052.png"}
          />
          <Text fz={"lg"}>
            <Text span fw={500} inherit>
              $SCRAP H-E{" "}
            </Text>
            :{" "}
            {props.mainAccount
              ? props.mainAccount.hiveEngineScrap.toFixed(2)
              : "0.00"}
          </Text>
        </Group>
        <Space h="xl" />
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={
              "https://assets.coingecko.com/coins/images/10840/small/logo_transparent_4x.png?1584623184"
            }
          />
          {
            <Text fz={"lg"}>
              <Text span fw={500} inherit>
                Total SWAP.HIVE :{" "}
              </Text>

              {props.mainAccount && props.statsData?.result
                ? toHive().toFixed(2)
                : "0.00"}
            </Text>
          }
        </Group>
        <Space h="xl" />
        <Group>
          <Image
            maw={45}
            mah={45}
            fit="contain"
            src={"https://cdn-icons-png.flaticon.com/512/3190/3190615.png"}
          />
          {
            <Text fz={"lg"}>
              <Text span fw={500} inherit>
                Total $ :{" "}
              </Text>

              {props.mainAccount &&
              props.hivePrice?.hive?.usd &&
              props.statsData?.result
                ? (toHive() * props.hivePrice.hive.usd).toFixed(2)
                : "0.00"}
            </Text>
          }
        </Group>
      </Card>
    </>
  );
}
