import { useMutation, useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import {
  claimAllScrap,
  claimScrap,
  getUserBattlesData,
  getUserData,
  getUsersData,
  upgradeAccount,
} from "@/app/utils/actions/users";
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
  Title,
} from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import {
  IconArrowDown,
  IconArrowUp,
  IconBrandTelegram,
  IconCheck,
  IconInfoCircle,
  IconShieldCheckeredFilled,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import UserModal from "../BattleGrid/UserModal/UserModal";
import useStyles from "./style";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";
import { addUser } from "@/supabase/actions/users";
import { fetchHivePrice } from "@/app/utils/actions/currency";
import { getStatsEngineData } from "@/app/utils/actions/hiveEngine";
import { transferTokens } from "@/app/utils/actions/payment";
import UpgradeModal from "./UpgradeModal/UpgradeModal";
import BattleGrid from "../BattleGrid/BattleGrid";
import AccountsPanel from "./AccountsPanel/AccountsPanel";
import MainAccountPanel from "./MainAccountPanel/MainAccountPanel";
import { claimTokensForEnabledUsers } from "../../../scripts/scripts";
import BattlelogsModal from "./BattlelogsModal/BattlelogsModal";
import { useNotificationStore } from "@/zustand/stores/useNotificationStore";
import { getStatValue } from "@/app/utils/actions/tableOperations";

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
  battle: string;
  crit: number;
  dodge: number;
  luck: number;
  stats: {
    dodge: number;
    crit: number;
    luck: number;
  };
}
interface Props {
  accounts: any;
  isLoadingAccounts: boolean;
  refetchAccounts: any;
}

export default function MultiAccountsGrid({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const [page, setPage] = useState(1);

  const claimSuccess = useNotificationStore(
    (state: { claimSuccess: boolean }) => state.claimSuccess
  );

  const battleSuccess = useNotificationStore(
    (state: { battleSuccess: boolean }) => state.battleSuccess
  );

  const isSubscriber = useAuthorizationStore(
    (state: { isSubscriber: boolean }) => state.isSubscriber
  );
  const { data: statsData, isLoading: isStatsDataLoading } = useQuery(
    "statsHiveData",
    getStatsEngineData,
    {
      refetchInterval: 300000,
    }
  );
  const [pageSize, setPageSize] = useState<string | null>("10");
  const [username, setUsername] = useState("");

  const { mutate } = useMutation(addUser, {
    onSuccess: () => {
      setUsername("");
      props.refetchAccounts();
    },
  });

  const [battleUsername, setBattleUsername] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [showBattlelogPopup, setShowBattlelogPopup] = useState(false);

  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);
  const [selectedBattlelogRow, setSelectedBattlelogRow] =
    useState<UserData | null>(null);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const [selectedUpgradeRow, setSelectedUpgradeRow] = useState<UserData | null>(
    null
  );

  const { data, isLoading } = useQuery("tableData", getUsersData, {
    refetchInterval: 10000,
  });

  const [selectedUpgradeName, setSelectedUpgradeName] = useState("");

  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [inputAmount, setInputAmount] = useState("");

  const mainUsername = useAuthorizationStore(
    (state: { username: string }) => state.username
  );

  const isMobile = useMediaQuery("(max-width: 960px)");

  const { data: hivePrice, isLoading: loadingPrice } = useQuery(
    "hivePrice",
    fetchHivePrice
  );

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    mutate(username);
  };

  const handleRowClick = (row: { original: UserData }) => {
    setSelectedRow(row.original);
    setBattleUsername(row.original.username);
    setShowPopup(true);
  };

  const handleInfoClick = (row: { original: UserData }) => {
    setSelectedBattlelogRow(row.original);
    setBattleUsername(row.original.username);
    setShowBattlelogPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleShowBattlelogPopupClose = () => {
    setShowBattlelogPopup(false);
  };

  const handleUpgradePopup = (row: { original: UserData }, stake: string) => {
    setSelectedUpgradeRow(row.original);
    setSelectedUpgradeName(stake);
    setShowUpgradePopup(true);
  };

  const {
    data: userBattlesData,
    isLoading: isLoadingBattleData,
    refetch: refetchBattles,
  } = useQuery(
    ["userBattle", battleUsername],
    () => getUserBattlesData(battleUsername),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (battleUsername) {
      refetchBattles({ queryKey: ["userBattle", battleUsername] });
    }
  }, [battleUsername, refetchBattles]);

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
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleRowClick(row)}
                >
                  {row.original.username}{" "}
                  <IconShieldCheckeredFilled size={15} />
                </span>
              );
            } else {
              return (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(row)}
                >
                  {row.original.username}
                </span>
              );
            }
          } else {
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
                {row.original.username}
              </span>
            );
          }
        },
      },
      {
        Header: "Damage",
        accessor: "damage",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Tooltip
              label={`Upgrade for ${(row.original.damage / 10) ** 2} $SCRAP`}
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  upgradeAccount(
                    row.original.username,
                    "terracore_damage",
                    row.original.damage
                  )
                }
              >
                {getStatValue(row.original, 'damage')}
                <IconArrowUp size={"0.9rem"} fontWeight={100} />{" "}
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        Header: "Defense",
        accessor: "defense",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Tooltip
              label={`Upgrade for ${(row.original.defense / 10) ** 2} $SCRAP`}
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  upgradeAccount(
                    row.original.username,
                    "terracore_defense",
                    row.original.defense
                  )
                }
              >
                {getStatValue(row.original, 'defense')}
                <IconArrowUp size={"0.9rem"} fontWeight={100} />{" "}
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        Header: "Engineering",
        accessor: "engineering",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Tooltip
              label={`Upgrade for ${row.original.engineering ** 2} $SCRAP`}
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  upgradeAccount(
                    row.original.username,
                    "terracore_engineering",
                    row.original.engineering * 10
                  )
                }
              >
                {getStatValue(row.original, 'engineering')}
                <IconArrowUp size={"0.9rem"} fontWeight={100} />
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        Header: "Favor",
        accessor: "favor",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Tooltip
              label="Gain favor"
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleUpgradePopup(row, "favor")}
              >
                {row.original.favor
                  ? parseFloat(row.original.favor.toFixed(2))
                  : 0}
                <IconArrowUp size={"0.9rem"} fontWeight={100} />
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        Header: "Stash size",
        accessor: "hiveEngineStake",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Tooltip
              label="Increase size"
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleUpgradePopup(row, "stash size")}
              >
                {row.original.hiveEngineStake
                  ? (row.original.hiveEngineStake + 1.0).toFixed(2)
                  : 0}
                <IconArrowUp size={"0.9rem"} fontWeight={100} />
              </span>
            </Tooltip>
          </>
        ),
      },
      {
        Header: "Dodge",
        accessor: "dodge",
        defaultCanSort: false,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {getStatValue(row.original, 'dodge')}
            </span>
          </>
        ),
      },
      {
        Header: "Crit",
        accessor: "crit" as const,
        defaultCanSort: false,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {getStatValue(row.original, 'crit')}
            </span>
          </>
        ),
      },
      {
        Header: "Luck",
        accessor: "luck" as const,
        defaultCanSort: false,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {getStatValue(row.original, 'luck')}
            </span>
          </>
        ),
      },
      {
        Header: "Scrap",
        accessor: "scrap",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {row.original.scrap ? row.original.scrap.toFixed(2) : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Scrap H-E",
        accessor: "hiveEngineScrap",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {row.original.hiveEngineScrap
                ? row.original.hiveEngineScrap.toFixed(2)
                : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Attacks",
        accessor: "attacks",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {row.original.attacks}
            </span>
          </>
        ),
      },
      {
        Header: "Claims",
        accessor: "claims",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {row.original.claims}
            </span>
          </>
        ),
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
            const remainingMinutes = Math.floor(
              (remainingTime / (1000 * 60)) % 60
            );
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
                {remainingHours} hours {remainingMinutes} minutes
              </span>
            );
          } else {
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
                0 hours 0 minutes
              </span>
            );
          }
        },
      },
      {
        Header: "Scrap/h",
        accessor: "minerate",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Group>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
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
                label="Battle log"
                color="dark"
                withArrow
                arrowPosition="center"
                offset={10}
              >
                <ActionIcon
                  variant="outline"
                  onClick={() => (
                    // refetchBattles({
                    //   queryKey: ["userBattle", battleUsername],
                    // }),
                    setBattleUsername(row.original.username),
                    handleInfoClick(row)
                  )}
                >
                  <IconInfoCircle size="1.125rem" />
                </ActionIcon>
              </Tooltip>

              <Tooltip
                label="Claim $SCRAP"
                color="dark"
                withArrow
                arrowPosition="center"
                offset={10}
              >
                <ActionIcon
                  variant="outline"
                  disabled={battleSuccess}
                  onClick={() =>
                    claimScrap(row.original.scrap, row.original.username)
                  }
                >
                  <IconCheck size="1.125rem" />
                </ActionIcon>
              </Tooltip>

              {row.original.username == localStorage.getItem("username") ? (
                <></>
              ) : (
                <Tooltip
                  label={`Transfer $SCRAP to ${localStorage.getItem(
                    "username"
                  )}`}
                  color="dark"
                  withArrow
                  arrowPosition="center"
                  offset={10}
                >
                  <ActionIcon
                    variant="outline"
                    onClick={() =>
                      transferTokens(
                        row.original.username,
                        row.original.hiveEngineScrap
                      )
                    }
                  >
                    <IconBrandTelegram size="1.125rem" />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
          </>
        ),
      },
    ],
    [battleSuccess]
  );

  const filteredUsernameData = useMemo(() => {
    if (!data || !props.accounts) {
      return [];
    }

    let filteredData = data.filter((user: UserData) =>
      props.accounts.includes(user.username.toLowerCase())
    );
    return filteredData;
  }, [data, props.accounts]);

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

  if (isLoading || props.isLoadingAccounts || isStatsDataLoading) {
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

  const pageCount = Math.ceil(
    rows.length / (pageSize ? parseInt(pageSize) : 10)
  );
  const pageData = rows.slice(
    (page - 1) * (pageSize ? parseInt(pageSize) : 10),
    page * (pageSize ? parseInt(pageSize) : 10)
  );

  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={isMobile ? 12 : 6}>
          <Title order={2}>Accounts Dashboard</Title>
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 6}>
          <Group position={isMobile ? "left" : "right"}>
            <Input
              disabled={!isSubscriber}
              placeholder="Usernames"
              type="text"
              value={username}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setUsername(e.target.value)}
              w={180}
            />
            <Tooltip
              label="Use comma to separate names"
              color="dark"
              withArrow
              arrowPosition="center"
              offset={10}
            >
              <Button
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
                w={isMobile ? 180 : 120}
              >
                Add account
              </Button>
            </Tooltip>
          </Group>
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 6}>
          <Box w={180}>
            <Button
              onClick={() => {
                claimAllScrap(tableData).then(async () => {
                  await new Promise((resolve) => setTimeout(resolve, 7500));
                  tableData.map(async (user: UserData) => {
                    getUserData(user.username);
                  });
                });
              }}
              // onClick={()=>{claimTokensForEnabledUsers()}}
              disabled={!isSubscriber || claimSuccess}
              fullWidth
              styles={(theme: any) => ({
                root: {
                  backgroundColor: "#0a3d47",
                  "&:not([data-disabled])": theme.fn.hover({
                    backgroundColor: theme.fn.darken("#072f37", 0.05),
                  }),
                },
              })}
            >
              Claim entire $SCRAP
            </Button>
          </Box>
        </Grid.Col>
      </Grid>

      <SimpleGrid
        cols={1}
        mt={0}
        spacing={0}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
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
                      className={classes.header}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <IconArrowDown size={15} />
                          ) : (
                            <IconArrowUp size={15} />
                          )
                        ) : (
                          ""
                        )}
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
                      <td className={classes.header} key={id}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
        {selectedRow && (
          <UserModal
            showPopup={showPopup}
            handlePopupClose={handlePopupClose}
            selectedRow={selectedRow}
            userBattlesData={userBattlesData}
            battleUsername={battleUsername}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
          />
        )}

        {selectedBattlelogRow && (
          <BattlelogsModal
            showBattlelogPopup={showBattlelogPopup}
            handlePopupClose={handleShowBattlelogPopupClose}
            selectedRow={selectedBattlelogRow}
            userBattlesData={userBattlesData}
            isLoadingBattleData={isLoadingBattleData}
            battleUsername={battleUsername}
            setSelectedValue={setSelectedBattlelogRow}
            selectedValue={selectedValue}
          />
        )}

        {selectedUpgradeRow && (
          <UpgradeModal
            showUpgradePopup={showUpgradePopup}
            setShowUpgradePopup={setShowUpgradePopup}
            selectedUpgradeRow={selectedUpgradeRow}
            selectedUpgradeName={selectedUpgradeName}
            setInputAmount={setInputAmount}
            setSelectedUpgradeName={setSelectedUpgradeName}
            inputAmount={inputAmount}
          />
        )}
        <Group position="right">
          <Box w={70}>
            <Select
              pt={15}
              data={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "15", label: "15" },
                { value: "20", label: "20" },
              ]}
              defaultValue={"10"}
              placeholder="Size"
              onChange={setPageSize}
            />
          </Box>
        </Group>

        <Pagination
          value={page}
          onChange={setPage}
          withControls
          total={pageCount}
          position="center"
          pt={25}
          pb={5}
          color={"dark"}
        />
        <Space h="xl" />
        <Space h="xl" />
        <BattleGrid data={data} isLoading={isLoading} />
        <Space h="xl" />
        {isSubscriber ? (
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
        ) : null}
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
