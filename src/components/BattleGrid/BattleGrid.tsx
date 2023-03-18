import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
import { getUserBattlesData, getUserData} from "@/app/utils/actions/users";
import { Space, SimpleGrid, Box, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select, Skeleton } from "@mantine/core";
import React, { useState, useMemo, useEffect } from "react";
import { IconHelpCircle, IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useMediaQuery } from '@mantine/hooks';
import UserModal from "./UserModal/UserModal";
import logo from '../../assets/logo.png'

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
  claims: number;
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
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [battleUsername, setBattleUsername] = useState("");

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

  const { data: userData, refetch } = useQuery(["user", username], () => getUserData(username), {
    enabled: false,
  });

  const { data: userBattlesData , refetch: refetchBattles } = useQuery(
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
                <span style={{ color: "red" }}>
                  {row.original.username} <IconShieldCheckeredFilled size={15} />
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
        Header: "Stash size",
        accessor: "hiveEngineStake" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>{row.original.hiveEngineStake ? row.original.hiveEngineStake.toFixed(2) : 0}</span>
          </>
        ),
      },
      {
        Header: "Favor",
        accessor: "favor" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>{row.original.favor ? row.original.favor.toFixed(2) : 0}</span>
          </>
        ),
      },
      {
        Header: "Scrap",
        accessor: "scrap" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>{row.original.scrap ? row.original.scrap.toFixed(2) : 0}</span>
          </>
        ),
      },
      {
        Header: "Attacks",
        accessor: "attacks" as const,
      },
      {
        Header: "Claims",
        accessor: "claims" as const,
      },
      {
        Header: "Scrap/h",
        accessor: "minerate" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <> 
          <Group>
              <span>{(row.original.minerate*3600).toFixed(4) }
              <img
              src={'https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnM7aPAGpC6PAd69t?format=match&mode=fit'}
              alt="Scrap"
              height={15}
              />
              </span>
          </Group>
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

    let filteredData = props.data.filter((user: UserData) => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

    if (userData) {
      filteredData = filteredData.filter((user: UserData) => user.defense < userData.damage && user.favor < userData.favor);
      filteredData = filteredData.sort((a: { scrap: number }, b: { scrap: number }) => b.scrap - a.scrap);
    }

    return filteredData;
  }, [props.data, userData, searchQuery]);





  const tableData = useMemo(() => (filteredUsernameData ? filteredUsernameData : []), [filteredUsernameData]);

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy
  );

  if (props.isLoading) {
    return (
      <>
        <Space h="xl" />
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
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
      <Space h="xl"/>
      <Space h="xl"/>
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Grid grow>
          <Grid.Col span={isMobile ? 12 : 4}>
            <Input pb={10} placeholder="Search username" value={searchQuery} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setSearchQuery(e.target.value)} />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 4}></Grid.Col>
          <Grid.Col span={isMobile ? 12 : 4}>
            <Group position={isMobile ? "left" : "right"}>
              <Input placeholder="Username" type="text" value={username} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setUsername(e.target.value)} />
              <Button
                onClick={handleClick}
                styles={(theme : any) => ({
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
            </Group>
          </Grid.Col>
        </Grid>
        <Box   sx={{
          overflowX: "auto",
          "-webkit-overflow-scrolling": "touch",
          }}>
          <Table highlightOnHover {...getTableProps()} mt={35}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column: any) => (
                    <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {pageData.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} onClick={() => handleRowClick(row)} style={{ cursor: "pointer" }}>
                    {row.cells.map((cell, id) => (
                      <td key={id}>{cell.render("Cell")}</td>
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
              battleUsername ={battleUsername}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
              />
        )}
        <Pagination value={page} onChange={setPage} withControls total={pageCount} position="center" pt={50} color={"dark"} />
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
