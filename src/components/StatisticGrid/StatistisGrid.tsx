import { Space, SimpleGrid } from "@mantine/core";
import React from "react";
import PriceGrid from "../PriceGrid/PriceGrid";
import TerraStatsGrid from "../TerraStatsGrid/TerraStatsGrid";
import NextLevelGrid from "../NextLevelGrid/NextLevelGrid";

export default function StatisticGrid() {
  return (
    <>
      <Space h="xl" />
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "lg", cols: 2, spacing: 16 },
          { maxWidth: "md", cols: 1, spacing: 16 },
        ]}
      >
        <div>
          <PriceGrid />
        </div>
        <div>
          <TerraStatsGrid />
        </div>
        <div>
          <NextLevelGrid />
        </div>
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
