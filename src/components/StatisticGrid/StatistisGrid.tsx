import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData} from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconHelpCircle, IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
import PriceGrid from "../PriceGrid/PriceGrid";



export default function StatisticGrid() {
  
  

  return (
    <>
      <Space h="xl"/>
      <Space h="xl"/>
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Grid grow>
            <PriceGrid/>
        </Grid>
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
