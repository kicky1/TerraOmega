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
} from "@mantine/core";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getStatsData } from "@/app/utils/actions/stats";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";
import useStyles from "./style";

interface Props {
  accounts: any;
  totalScrap: number;
  totalHiveEngineScrap: number;
  statsData: any;
  isStatsDataLoading: boolean;
  loadingPrice: boolean;
  hivePrice: any;
}

export default function AccountsPanel({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const toHive = () => {
    return (
      (props.totalScrap + props.totalHiveEngineScrap) *
      props.statsData?.result?.highestBid
    );
  };

  if (!props.accounts || props.loadingPrice || props.isStatsDataLoading) {
    return <></>;
  }

  return (
    <>
      <Card
        withBorder
        p="xl"
        m={25}
        radius={10}
        className={classes.card}
        mih={420}
        mah={420}
      >
        <Text size="xl" weight={500}>
          Summary panel
        </Text>
        <Text size="lg" color="dimmed" mb="lg">
          Summary data from <span className={classes.highlight}>all</span>{" "}
          accounts in one place
        </Text>

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
            : {props.totalScrap ? props.totalScrap.toFixed(2) : "0.00"}
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
            {props.totalHiveEngineScrap
              ? props.totalHiveEngineScrap.toFixed(2)
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
              {props.totalScrap || props.totalHiveEngineScrap
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

              {(props.totalScrap || props.totalHiveEngineScrap) &&
              props.hivePrice?.hive?.usd
                ? (toHive() * props.hivePrice.hive.usd).toFixed(2)
                : "0.00"}
            </Text>
          }
        </Group>
      </Card>
    </>
  );
}
