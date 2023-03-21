import { useQuery } from "react-query";
import { useTable, useSortBy, Column } from "react-table";
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
  IconShieldCheckeredFilled,
  IconSword,
  IconSwordOff,
  IconX,
} from "@tabler/icons-react";

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
}

interface Props {
  data: any;
  isLoading: boolean;
}

export default function FreeBattleGrid({ ...props }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const columns: readonly Column<UserData>[] = useMemo(
    () => [
      {
        Header: "",
        accessor: "id",
        Cell: ({ row }: { row: { original: UserData } }) => {
          const registrationTime = row.original.registrationTime;
          if (registrationTime) {
            const now = new Date();
            const registrationDate = new Date(registrationTime);
            const timeDiff = now.getTime() - registrationDate.getTime();
            const hoursDiff = timeDiff / (1000 * 3600);
            if (hoursDiff <= 24) {
              return (
                <span style={{ color: "red", cursor: "pointer" }}>
                  <Avatar
                    radius="lg"
                    size="sm"
                    src={`https://images.hive.blog/u/${row.original.username}/avatar`}
                  />
                </span>
              );
            } else {
              return (
                <span style={{ cursor: "pointer" }}>
                  <Avatar
                    radius="lg"
                    size="sm"
                    src={`https://images.hive.blog/u/${row.original.username}/avatar`}
                  />
                </span>
              );
            }
          } else {
            return (
              <span style={{ cursor: "pointer" }}>
                <Avatar
                  radius="lg"
                  size="sm"
                  src={`https://images.hive.blog/u/${row.original.username}/avatar`}
                />
              </span>
            );
          }
        },
      },
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
                <span style={{ color: "red", cursor: "pointer" }}>
                  <Group>
                    {row.original.username}
                    <IconShieldCheckeredFilled size={15} />
                  </Group>
                </span>
              );
            } else {
              return (
                <span style={{ cursor: "pointer" }}>
                  <Group>{row.original.username}</Group>
                </span>
              );
            }
          } else {
            return (
              <span style={{ cursor: "pointer" }}>
                <Group>{row.original.username}</Group>
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
            <span style={{ cursor: "pointer" }}>{row.original.damage}</span>
          </>
        ),
      },
      {
        Header: "Defense",
        accessor: "defense",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>{row.original.defense}</span>
          </>
        ),
      },
      {
        Header: "Engineering",
        accessor: "engineering",
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>
              {row.original.engineering}
            </span>
          </>
        ),
      },
      {
        Header: "Favor",
        accessor: "favor" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>
              {row.original.favor ? row.original.favor.toFixed(2) : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Scrap",
        accessor: "scrap" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>
              {row.original.scrap ? row.original.scrap.toFixed(2) : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Stash size",
        accessor: "hiveEngineStake" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>
              {row.original.hiveEngineStake
                ? (row.original.hiveEngineStake + 1.0).toFixed(2)
                : 0}
            </span>
          </>
        ),
      },
      {
        Header: "Attacks",
        accessor: "attacks" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>{row.original.attacks}</span>
          </>
        ),
      },
      {
        Header: "Claims",
        accessor: "claims" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span style={{ cursor: "pointer" }}>{row.original.claims}</span>
          </>
        ),
      },
      {
        Header: "Scrap/h",
        accessor: "minerate" as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <Group>
              <span style={{ cursor: "pointer" }}>
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

    return filteredData;
  }, [props.data, searchQuery]);

  const tableData = useMemo(
    () => (filteredUsernameData ? filteredUsernameData : []),
    [filteredUsernameData]
  );

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
      <SimpleGrid cols={1} mt={0} spacing={0}>
        <Grid grow>
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
          color={"dark"}
        />
      </SimpleGrid>
      <Space h="xl" />
    </>
  );
}
