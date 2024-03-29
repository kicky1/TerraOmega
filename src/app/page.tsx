"use client";

import { getUsersData } from "@/app/utils/actions/users";
import FreeBattleGrid from "@/components/BattleGrid/FreeBattleGrid";
import { InfoGrid } from "@/components/InfoGrid/InfoGrid";
import MultiAccountsGrid from "@/components/MultiAccountsGrid/MultiAccountsGrid";
import PaymentGrid from "@/components/PaymentGrid/PaymentGrid";
import StatisticGrid from "@/components/StatisticGrid/StatistisGrid";
import SubscriptionGrid from "@/components/SubscriptionGrid/SubscriptionGrid";
import { getAccounts } from "@/supabase/actions/users";
import {
  useAuthorizationStore,
} from "@/zustand/stores/useAuthorizationStore";
import { Container, Space, Tabs } from "@mantine/core";
import {
  IconChartHistogram,
  IconCoinBitcoin,
  IconHome,
  IconPlanet,
  IconQuestionMark,
  IconTableOptions,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";

export const runtime = "experimental-edge";

export default function Home() {
  const { data, isLoading } = useQuery("playersData", getUsersData, {
    refetchInterval: 300000,
  });

  const isSubscriber = useAuthorizationStore(
    (state: { isSubscriber: boolean }) => state.isSubscriber
  );

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch: refetchAccounts,
  } = useQuery("accountsData", getAccounts);

  useEffect(() => {
    refetchAccounts();
  }, [isSubscriber, refetchAccounts]);

  return (
    <>
      <Space h="xl" />
      <Space h="xl" />
      <Container fluid>
        <Container size="xl">
          <Tabs color="dark" defaultValue="home">
            <Tabs.List>
              <Tabs.Tab value="home" icon={<IconHome size="1rem" />}>
                Home
              </Tabs.Tab>
              <Tabs.Tab value="tab" icon={<IconTableOptions size="1rem" />}>
                Table
              </Tabs.Tab>
              <Tabs.Tab value="accounts" icon={<IconUsers size="1rem" />}>
                Accounts
              </Tabs.Tab>
              <Tabs.Tab value="stats" icon={<IconChartHistogram size="1rem" />}>
                Stats
              </Tabs.Tab>
              <Tabs.Tab value="sub" icon={<IconCoinBitcoin size="1rem" />}>
                Subscription
              </Tabs.Tab>
              <Tabs.Tab value="info" icon={<IconQuestionMark size="1rem" />}>
                Info
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="home" pt="xs">
              <SubscriptionGrid />
            </Tabs.Panel>
            <Tabs.Panel value="tab" pt="xs">
              <FreeBattleGrid data={data} isLoading={isLoading} />
            </Tabs.Panel>
            <Tabs.Panel value="accounts" pt="xs">
              <MultiAccountsGrid
                accounts={accounts}
                isLoadingAccounts={isLoadingAccounts}
                refetchAccounts={refetchAccounts}
              />
            </Tabs.Panel>
            <Tabs.Panel value="stats" pt="xs">
              <StatisticGrid />
            </Tabs.Panel>
            <Tabs.Panel value="info" pt="xs">
              <InfoGrid />
            </Tabs.Panel>
            <Tabs.Panel value="sub" pt="xs">
              <PaymentGrid />
            </Tabs.Panel>
          </Tabs>
          <Space h="xl" />
          <Space h="xl" />
        </Container>
      </Container>
    </>
  );
}
