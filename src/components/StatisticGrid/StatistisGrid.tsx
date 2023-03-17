import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData} from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconHelpCircle, IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
import PriceGrid from "../PriceGrid/PriceGrid";
import TerraStatsGrid from "../TerraStatsGrid/TerraStatsGrid";
import NextLevelGrid from "../NextLevelGrid/NextLevelGrid";
import useStyles from "./style";



export default function StatisticGrid() {

  const { classes, theme } = useStyles()
  const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  

  return (
    <>
      <Space h="xl"/>
      <Space h="xl"/>
      <SimpleGrid cols={3}
        breakpoints={[
          { maxWidth: 'lg', cols: 2, spacing: 16 },
          { maxWidth: 'md', cols: 1, spacing: 16 }
          ]} >
        <div>
        <PriceGrid/>
        </div>
        <div>
        <TerraStatsGrid/>
        </div>
        <div>
        <NextLevelGrid/>
        </div>

      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
