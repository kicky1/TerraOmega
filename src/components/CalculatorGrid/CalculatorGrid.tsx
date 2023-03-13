import { useQuery } from 'react-query';
import { useTable, useSortBy, Column, } from 'react-table';
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import { Space, SimpleGrid, Table, Pagination, Input, Grid, Button, Checkbox, Group } from '@mantine/core';
import React, { useState, useMemo } from 'react';
import {IconShieldCheckeredFilled} from  '@tabler/icons-react';
import api from '../../app/utils/api_test'

interface UserData {
  username: string;
  damage: number;
  defense: number;
  engineering: number;
  scrap: number;
  registrationTime: number;
  favor: number;
}

export default function CalculatorGrid() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');

  const handleClick = () => {
      setUsername(username);
      refetch();
  };

  const { data, isLoading } = useQuery('usersData', getUsersData, {
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
  });

  const { isLoading: loadingUser, data: userData, refetch } = useQuery(
    ['user', username], () => getUserData(username), {
    enabled: false,
  });

  const body = { stream: "example-stream", source: "example-source", length: 10 };

  async function startBot (isRunning = true){
    const response = await fetch('http://localhost:3000/api/battle', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
  }

  const columns: readonly Column<UserData>[] = useMemo(
    () => [
        {
            Header: 'Username',
            accessor: 'username',
            Cell: ({ row }: { row: { original: UserData } }) => (
              <>
                {row.original.registrationTime ? (
                  <span style={{color: 'red'}}>{row.original.username} <IconShieldCheckeredFilled size={15}/></span>
                ) : (
                  <span>{row.original.username}</span>
                )}
              </>
            ),
          },
      {
        Header: 'Damage',
        accessor: 'damage',
      },
      {
        Header: 'Defense',
        accessor: 'defense',
      },
      {
        Header: 'Engineering',
        accessor: 'engineering',
      },
      {
        Header: 'Scrap',
        accessor: 'scrap' as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>{row.original.scrap ? row.original.scrap.toFixed(2) : 0}</span>
          </>
        ),
      },
      {
        Header: 'Favor',
        accessor: 'favor' as const,
        Cell: ({ row }: { row: { original: UserData } }) => (
          <>
            <span>{row.original.favor ? row.original.favor.toFixed(2) : 0}</span>
          </>
        ),
      },
    ],
    []
  );

  const filteredUsernameData = useMemo(() => {
    if (!data) {
      return [];
    }

    let filteredData = data.filter((user: any) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (userData) {
      filteredData = filteredData.filter((user: any) => user.defense < userData.defense && user.favor < userData.favor && !user.registrationTime);
      filteredData = filteredData.sort((a: { scrap: number; }, b: { scrap: number; }) => b.scrap - a.scrap);
    }

    return filteredData;
  }, [data, userData, searchQuery]);

  const tableData = useMemo(() => (filteredUsernameData ? filteredUsernameData : []), [
    filteredUsernameData,
  ]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  const pageCount = Math.ceil(rows.length / pageSize);
  const pageData = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
        <Space h="xl" />
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Grid grow>
                <Grid.Col span={2}>
                    <Input
                        pb={10}
                        placeholder="Filter by username"
                        value={searchQuery}
                        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group position="right">
                    <Input 
                      placeholder="Username"
                      type="text" 
                      value={username} 
                      onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUsername(e.target.value)} />
                    <Button onClick={handleClick}>Calculate</Button>
                  </Group>
                </Grid.Col>
            </Grid>

            <Table highlightOnHover {...getTableProps()} mt={35}>
              <thead>
                  {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: any, idx) => (
                      <th key={idx} {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      </th>
                      ))}
                  </tr>
                  ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                  {pageData.map((row) => {
                  prepareRow(row);
                  return (
                      <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                      </tr>
                  );
                  })}
              </tbody>
            </Table>
            <Pagination
                value={page}
                onChange={setPage}
                withControls 
                total={pageCount}
                position="center"
                sx={{paddingTop:50}}
            />
        </SimpleGrid>
        <Space h="xl" />
    </>
  );
}
