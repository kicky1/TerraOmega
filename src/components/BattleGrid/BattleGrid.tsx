import { useQuery } from "react-query";
import { useTable, useSortBy, Column, TableState } from "react-table";
import {
  attackOponent,
  getUserBattlesData,
  getUserData,
} from "@/app/utils/actions/users";
import {
  Space,
  SimpleGrid,
  Box,
  Table,
  Notification,
  Pagination,
  Input,
  Grid,
  Button,
  Group,
  Skeleton,
  Tooltip,
  TextInput,
  Transition,
  Avatar,
  ActionIcon,
  Center,
} from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import {
  IconArrowDown,
  IconArrowUp,
  IconShieldCheckeredFilled,
  IconSword,
  IconSwordOff,
  IconX,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import UserModal from "./UserModal/UserModal";
import useStyles from "./style";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";
import {
  setBattleError,
  setBattleSuccess,
  setClaimSuccess,
  useNotificationStore,
} from "@/zustand/stores/useNotificationStore";
import { getStatValue } from "@/app/utils/actions/tableOperations";

interface UserData {
  id: string;
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
  claims: number;
  battle: string;
  dodge: number;
  crit: number;
  stats: {
    dodge: number;
    crit: number;
  };
}

interface Props {
  data: any;
  isLoading: boolean;
}

export default function BattleGrid({ ...props }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [battleUsername, setBattleUsername] = useState("");
  const { classes, theme } = useStyles();

  const isSubscriber = useAuthorizationStore(
    (state: { isSubscriber: boolean }) => state.isSubscriber
  );

  const battleSuccess = useNotificationStore(
    (state: { battleSuccess: boolean }) => state.battleSuccess
  );

  const claimSuccess = useNotificationStore(
    (state: { claimSuccess: boolean }) => state.claimSuccess
  );

  const battleError = useNotificationStore(
    (state: { battleError: boolean }) => state.battleError
  );

  const scrapEarned = useNotificationStore(
    (state: { scrapEarned: number }) => state.scrapEarned
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (battleSuccess) {
      timeoutId = setTimeout(() => {
        setBattleSuccess(false);
      }, 6000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [battleSuccess]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (claimSuccess) {
      timeoutId = setTimeout(() => {
        setClaimSuccess(false);
      }, 6000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [claimSuccess]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (battleError) {
      timeoutId = setTimeout(() => {
        setBattleError(false);
      }, 6000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [battleError]);

  const handleClick = () => {
    setUsername(username);
    refetch();
  };

  const handleRowClick = (row: { original: UserData }) => {
    setSelectedRow(row.original);
    setBattleUsername(row.original.username);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const { data: userData, refetch } = useQuery(
    ["user", username],
    () => getUserData(username),
    {
      enabled: false,
    }
  );

  const { data: userBattlesData, refetch: refetchBattles } = useQuery(
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
        defaultCanSort: false,
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
                  <Group>
                    {row.original.username}
                    <Tooltip
                      label={`This user is under first day protection!`}
                      color="dark"
                      withArrow
                      arrowPosition="center"
                      offset={10}
                    >
                      <IconShieldCheckeredFilled size={15} />
                    </Tooltip>
                  </Group>
                </span>
              );
            } else {
              return (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(row)}
                >
                  <Group>{row.original.username}</Group>
                </span>
              );
            }
          } else {
            return (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(row)}
              >
                <Group>{row.original.username}</Group>
              </span>
            );
          }
        },
      },
      {
        Header: "Attack",
        accessor: "battle",
        defaultCanSort: false,
        Cell: ({ row }: { row: { original: UserData } }) => {
          const registrationTime = row.original.registrationTime;
          if (registrationTime) {
            const now = new Date();
            const registrationDate = new Date(registrationTime);
            const timeDiff = now.getTime() - registrationDate.getTime();
            const hoursDiff = timeDiff / (1000 * 3600);
            if (hoursDiff <= 24) {
              return (
                <span>
                  <ActionIcon variant="outline" disabled>
                    <IconSwordOff />
                  </ActionIcon>
                </span>
              );
            } else {
              return (
                <span>
                  <ActionIcon
                    variant="outline"
                    onClick={() => {
                      attackOponent(row.original.username);
                    }}
                  >
                    <IconSword />
                  </ActionIcon>
                </span>
              );
            }
          } else {
            return (
              <span>
                <ActionIcon
                  variant="outline"
                  onClick={() => attackOponent(row.original.username)}
                >
                  <IconSword />
                </ActionIcon>
              </span>
            );
          }
        },
      },
      {
        Header: "Damage",
        accessor: "damage",
        defaultCanSort: true,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {getStatValue(row.original, 'damage')}
            </span>
          </>
        ),
      },
      {
        Header: "Defense",
        accessor: "defense",
        defaultCanSort: false,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {getStatValue(row.original, 'defense')}
            </span>
          </>
        ),
      },
      {
        Header: "Favor",
        accessor: "favor" as const,
        defaultCanSort: false,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(row)}
            >
              {row.original.favor ? row.original.favor.toFixed(2) : 0}
            </span>
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
        Header: "Scrap",
        accessor: "scrap" as const,
        defaultCanSort: false,
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
    ],
    []
  );

  const filteredUsernameData = useMemo(() => {
    if (!props.data) {
      return [];
    }

    let filteredData = props.data.filter((user: UserData) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (userData) {
      filteredData = filteredData.filter(
        (user: UserData) => user.defense < userData?.damage
      );

      filteredData = filteredData.sort(
        (a: { scrap: number }, b: { scrap: number }) => b.scrap - a.scrap
      );
    }

    return filteredData;
  }, [props.data, userData, searchQuery]);

  const tableData = useMemo(
    () => (filteredUsernameData ? filteredUsernameData : []),
    [filteredUsernameData]
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: tableData,
      initialState: { sortBy: [{ id: "scrap", desc: true }] } as Partial<
        TableState<UserData>
      >,
    },
    useSortBy
  );

  if (props.isLoading) {
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
      <SimpleGrid cols={1} mt={0} spacing={0}>
        <Grid grow>
          <Grid.Col span={12}>
            <Box w={300} pb={5} pr={0}>
              <Group>
                <Box w={178}>
                  <Input
                    placeholder="Username"
                    type="text"
                    value={username}
                    disabled={!isSubscriber}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setUsername(e.target.value)}
                  />
                </Box>
                <Box w={105}>
                  <Tooltip
                    label="Filter for the best opponent to scrap"
                    color="dark"
                    withArrow
                    arrowPosition="center"
                    offset={10}
                  >
                    <Button
                      onClick={handleClick}
                      disabled={!isSubscriber}
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
                      Calculate
                    </Button>
                  </Tooltip>
                </Box>
              </Group>
            </Box>
          </Grid.Col>
          <Grid.Col span={12}>
            <Box w={300}>
              <Input
                placeholder="Search username"
                value={searchQuery}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setSearchQuery(e.target.value)}
              />
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
          <Pagination
            value={page}
            onChange={setPage}
            withControls
            total={pageCount}
            position="center"
            pt={50}
            color={"dark"}
          />
        </SimpleGrid>
        <Space h="xl" />
        <div>
          <Transition
            mounted={claimSuccess}
            transition="fade"
            duration={300}
            timingFunction="ease"
            onExited={() => setClaimSuccess(false)}
          >
            {(transitionStyles) => (
              <div style={transitionStyles}>
                <div className={classes.notificationContainer}>
                  <Notification
                    title="Claim $SCRAP"
                    color="teal"
                    onClose={() => setClaimSuccess(false)}
                  >
                    The transaction has been broadcasted successfully.
                  </Notification>
                </div>
              </div>
            )}
          </Transition>
        </div>
        <div>
          <Transition
            mounted={battleSuccess}
            transition="fade"
            duration={300}
            timingFunction="ease"
            onExited={() => setBattleSuccess(false)}
          >
            {(transitionStyles) => (
              <div style={transitionStyles}>
                <div className={classes.notificationContainer}>
                  <Notification
                    title="Battle"
                    color="teal"
                    onClose={() => setBattleSuccess(false)}
                  >
                    The transaction has been broadcasted successfully.
                  </Notification>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </SimpleGrid>
    </>
  );
}
