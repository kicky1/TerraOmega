import { useMutation, useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { claimScrap, getUserData } from "@/app/utils/actions/users";
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
  ActionIcon,
  Tooltip,
  Container,
} from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import {
  IconAdjustments,
  IconBrandTelegram,
  IconCheck,
  IconHelpCircle,
  IconShieldCheckeredFilled,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import UserModal from "../BattleGrid/UserModal/UserModal";
import useStyles from "./style";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";
import { addUser, getAccounts } from "@/supabase/actions/users";
import AccountsPanel from "./AccountsPanel/AccountsPanel";
import MainAccountPanel from "./MainAccountPanel/MainAccountPanel";
import { fetchHivePrice } from "@/app/utils/actions/currency";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";

interface UserData {
  username: string;
  damage: number;
  defense: number;
  engineering: number;
  scrap: number;
  registrationTime: number;
  favor: number;
  hiveEngineScrap: number;
  hiveEngineStake: number;
  minerate: number;
  attacks: number;
  lastclaim: number;
  actions: string;
  claims: number;
}

interface Props {
  data: any;
  accounts: any;
  isLoading: boolean;
  isLoadingAccounts: boolean;
  refetchAccounts: any;
}

export default function MultiAccountsGrid({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const [page, setPage] = useState(1);
  const isSubscriber = useAuthorizationStore(
    (state: { isSubscriber: boolean }) => state.isSubscriber
  );
  const [pageSize, setPageSize] = useState(10);
  const [username, setUsername] = useState("");

  const { mutate } = useMutation(addUser, {
    onSuccess: () => {
      setUsername("");
      props.refetchAccounts();
    },
  });

  const mainUsername = useAuthorizationStore(
    (state: { username: string }) => state.username
  );

  const isMobile = useMediaQuery("(max-width: 960px)");

  const { data: hivePrice, isLoading: loadingPrice } = useQuery(
    "hivePrice",
    fetchHivePrice
  );

  const { data: statsData, isLoading: isStatsDataLoading } = useQuery(
    "statsHiveData",
    getStatsEngineData,
    {
      refetchInterval: 60000,
    }
  );

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    mutate(username);
  };

  const columns: readonly Column<UserData>[] = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ row }: { row: { original: UserData } }) => {
          const registrationTime = row.original.registrationTime;
          if (registrationTime) {
            const now = new Date();
            const registrationDate = new Date(registrationTime);
            const timeDiff = now.getTime() - registrationDate.getTime();
            const hoursDiff = timeDiff / (1000 * 3600);
            if (hoursDiff <= 24) {
              return (
                <span style={{ color: "red" }}>
                  {row.original.username}{" "}
                  <IconShieldCheckeredFilled size={15} />
                </span>
              );
            } else {
              return <span>{row.original.username}</span>;
            }
          } else {
            return <span>{row.original.username}</span>;
          }
        },
      },
      {
        Header: "Damage",
        accessor: "damage",
      },
      {
        Header: "Defense",
        accessor: "defense",
      },
      {
        Header: "Engineering",
        accessor: "engineering",
      },
      {
        Header: "Favor",
        accessor: "favor",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>
              {row.original.favor ? row.original.favor.toFixed(2) : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Scrap",
        accessor: "scrap",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>
              {row.original.scrap ? row.original.scrap.toFixed(2) : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Stash size",
        accessor: "hiveEngineStake",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>
              {row.original.hiveEngineStake
                ? (row.original.hiveEngineStake + 1.0).toFixed(2)
                : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Attacks",
        accessor: "attacks",
      },
      {
        Header: "Claims",
        accessor: "claims",
      },
      {
        Header: "Cooldown",
        accessor: "lastclaim",
        Cell: ({ row }: { row: { original: UserData } }) => {
          const cooldownLastClime = row.original.lastclaim;
            const now = new Date();
            const lastRegenDate = new Date(cooldownLastClime);
            const timeDiff = now.getTime() - lastRegenDate.getTime();
            const cooldownTime = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
            const remainingTime = cooldownTime - timeDiff;
            
            if (remainingTime > 0) {
              const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
              const remainingMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
              return <span>{remainingHours} hours {remainingMinutes} minutes</span>;
            } else {
              return <span>0 hours 0 minutes</span>;
            }
        },
      },
      {
        Header: "Scrap/h",
        accessor: "minerate",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Group>
              <span>
                {(row.original.minerate * 3600).toFixed(4)}
                <img
                  src={
                    "https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit"
                  }
                  alt="Scrap"
                  height={15}
                />
              </span>
            </Group>
          </>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Group>
              <Tooltip
                label="Claim $SCRAP"
                color="dark"
                withArrow
                arrowPosition="center"
                offset={10}
              >
                <ActionIcon
                  variant="outline"
                  onClick={() =>
                    claimScrap(row.original.scrap, row.original.username)
                  }
                >
                  <IconCheck size="1.125rem" />
                </ActionIcon>
              </Tooltip>

              {/* <Tooltip
              label={`Transfer $SCRAP to ${mainUsername}`}
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
            <ActionIcon
              variant="outline"
              onClick={() =>
                claimScrap(row.original.scrap, row.original.username)
              }
            >
              <IconBrandTelegram size="1.125rem" />
            </ActionIcon>
            </Tooltip> */}
            </Group>
          </>
        ),
      },
    ],
    []
  );

  const filteredUsernameData = useMemo(() => {
    if (!props.data || !props.accounts) {
      return [];
    }

    let filteredData = props.data.filter((user: UserData) =>
      props.accounts.includes(user.username.toLowerCase())
    );
    return filteredData;
  }, [props.data, props.accounts]);

  const tableData = useMemo(
    () => (filteredUsernameData ? filteredUsernameData : []),
    [filteredUsernameData]
  );

  const filteredMain = tableData.find(
    (obj: { username: string }) => obj.username === mainUsername
  );

  const mainAccountData = useMemo(
    () => (filteredMain ? filteredMain : null),
    [filteredMain]
  );

  const totalHiveEngineScrapFilter = tableData.reduce(
    (accumulator: any, currentValue: { hiveEngineScrap: any }) => {
      return accumulator + currentValue.hiveEngineScrap;
    },
    0
  );

  const totalHiveEngineScrap = useMemo(
    () => (totalHiveEngineScrapFilter ? totalHiveEngineScrapFilter : null),
    [totalHiveEngineScrapFilter]
  );

  const totalScrapFilter = tableData.reduce(
    (accumulator: any, currentValue: { scrap: any }) => {
      return accumulator + currentValue.scrap;
    },
    0
  );

  const totalScrap = useMemo(
    () => (totalScrapFilter ? totalScrapFilter : null),
    [totalScrapFilter]
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy
  );

  if (props.isLoading || props.isLoadingAccounts) {
    return (
      <>
        <Space h="xl" />
        <SimpleGrid
          cols={1}
          mt={0}
          spacing={0}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Grid grow>
            <Skeleton height={800} mt={6} width="100%" radius="xl" />
          </Grid>
        </SimpleGrid>
      </>
    );
  }

  const pageCount = Math.ceil(rows.length / pageSize);
  const pageData = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Space h="xl" />
      <Space h="xl" />
      <SimpleGrid
        cols={1}
        mt={0}
        spacing={0}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Grid grow>
          <Grid.Col span={12}>
            <Box w={310} pb={5}>
              <Group>
                <Box w={168}>
                  <Input
                    disabled={!isSubscriber}
                    placeholder="Usernames"
                    type="text"
                    value={username}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setUsername(e.target.value)}
                  />
                </Box>
                <Box w={125}>
                  <Tooltip
                    label="Use comma to separate names"
                    color="dark"
                    withArrow
                    arrowPosition="center"
                    offset={10}
                  >
                    <Button
                      fullWidth
                      onClick={handleSubmit}
                      disabled={!isSubscriber}
                      styles={(theme: any) => ({
                        root: {
                          backgroundColor: "#0a3d47",
                          "&:not([data-disabled])": theme.fn.hover({
                            backgroundColor: theme.fn.darken("#072f37", 0.05),
                          }),
                        },
                      })}
                    >
                      Add account
                    </Button>
                  </Tooltip>
                </Box>
              </Group>
            </Box>
          </Grid.Col>
        </Grid>
        <Box
          sx={{
            overflowX: "auto",
            "-webkit-overflow-scrolling": "touch",
          }}
        >
          <Table highlightOnHover {...getTableProps()} mt={35}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {pageData.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id}>
                    {row.cells.map((cell, id) => (
                      <td key={id}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
        <Pagination
          value={page}
          onChange={setPage}
          withControls
          total={pageCount}
          position="center"
          pt={50}
          pb={50}
          color={"dark"}
        />
        <Space h="xl" />
        <Space h="xl" />

        <Grid grow>
          <Grid.Col span={isMobile ? 12 : 6}>
            <AccountsPanel
              accounts={tableData}
              totalScrap={totalScrap}
              totalHiveEngineScrap={totalHiveEngineScrap}
              statsData={statsData}
              isStatsDataLoading={isStatsDataLoading}
              loadingPrice={loadingPrice}
              hivePrice={hivePrice}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 6}>
            <MainAccountPanel
              accounts={tableData}
              mainAccount={mainAccountData}
              mainUsername={mainUsername}
              hivePrice={hivePrice}
              loadingPrice={loadingPrice}
              statsData={statsData}
              isStatsDataLoading={isStatsDataLoading}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
