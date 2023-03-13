import { useQuery } from 'react-query';
import { useTable, useSortBy, Column, } from 'react-table';
import { getUserData, getUsersData } from '@/app/utils/actions/users';
import { Space, SimpleGrid, Table, Text, Pagination, Input, Grid, Button, Checkbox, Group, Modal, RingProgress, Select } from '@mantine/core';
import React, { useState, useMemo } from 'react';
import {IconShieldCheckeredFilled} from  '@tabler/icons-react';

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
}

interface Props {
  data: any;
  isLoading: boolean;
  refetch: any
}

export default function BattleGrid({...props}: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);


  const handleClick = () => {
      props.refetch();
      setUsername(username);
      refetch();
  };

  const handleRowClick = (row: { original: UserData }) => {
    props.refetch()
    setSelectedRow(row.original);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const { data: userData, refetch } = useQuery(
    ['user', username], () => getUserData(username), {
    enabled: false,
  });
 
  const columns: readonly Column<UserData>[] = useMemo(
    () => [
        {
            Header: 'Username',
            accessor: 'username',
            Cell: ({ row }: { row: { original: UserData } }) => {
              const registrationTime = row.original.registrationTime;
              if (registrationTime) {
                const now = new Date();
                const registrationDate = new Date(registrationTime);
                const timeDiff = now.getTime() - registrationDate.getTime();
                const hoursDiff = timeDiff / (1000 * 3600);
                if (hoursDiff <= 24) {
                  return (
                    <span style={{color: 'red'}}>
                      {row.original.username} <IconShieldCheckeredFilled size={15}/>
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
      {
        Header: 'Mining rate',
        accessor: 'minerate' as const,
      },
    ],
    []
  );

  const filteredUsernameData = useMemo(() => {
    if (!props.data) {
      return [];
    }

    let filteredData = props.data.filter((user: any) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (userData) {
      filteredData = filteredData.filter((user: any) => user.defense < userData.damage && user.favor < userData.favor);
      filteredData = filteredData.sort((a: { scrap: number; }, b: { scrap: number; }) => b.scrap - a.scrap);
    }

    return filteredData;
  }, [props.data, userData, searchQuery]);

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

  if (props.isLoading) {
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
                  <tr key={headerGroup.id}>
                      {headerGroup.headers.map((column: any) => (
                      <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      </th>
                      ))}
                  </tr>
                  ))}
              </thead>
              <tbody>
                  {pageData.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(row)}
                      style={{ cursor: 'pointer' }}
                    >
                      {row.cells.map((cell, id) => (
                          <td key={id}>{cell.render('Cell')}</td>
                      ))}
                      </tr>
                  );
                  })}
              </tbody>
            </Table>
            {selectedRow && (
        <Modal 
          opened={showPopup} 
          onClose={handlePopupClose}
          title={`User info: ${selectedRow.username}`}
          centered
          size="xl"
          >
            <Grid grow>
              <Grid.Col span={6}>
                <Text fz={"lg"}><Text span fw={500} inherit>Scrap </Text>: {selectedRow.scrap ? selectedRow.scrap.toFixed(2): 0} / {(selectedRow.hiveEngineStake+1) ? (selectedRow.hiveEngineStake.toFixed(2)+1): 0}</Text>
                <Text fz={"lg"}><Text span fw={500} inherit>HE Balance</Text>: {selectedRow.hiveEngineScrap ? selectedRow.hiveEngineScrap.toFixed(2): 0}</Text>
                <Text fz={"lg"}><Text span fw={500} inherit>Favor</Text>: {selectedRow.favor ? selectedRow.favor.toFixed(2): 0}</Text>
                <Text fz={"lg"}><Text span fw={500} inherit>Mining Rate</Text>: {selectedRow.minerate ? selectedRow.minerate: 0}</Text>
                <Grid grow>
                  <Grid.Col span={6}>
                    <Select
                    clearable
                    pt={5}
                    pb={5}
                    
                    data={[
                      {value: '1', label: '1h'},
                      {value: '4', label: '4h'},
                      {value: '8', label: '8h'},
                      {value: '12', label: '12h'},
                    ]}
                    placeholder="Pick time"
                    onChange={setSelectedValue}
                    sx={{zIndex: 100}}
                  />
                  </Grid.Col>
                  <Grid.Col span={6}>
                  </Grid.Col>
                </Grid>
                  {selectedValue && (
                    <>
                      <Text fz={"lg"}>
                      <Text span fw={500} inherit>Scrap from {selectedValue}h</Text>: {selectedRow.minerate && selectedValue ? (selectedRow.minerate * 3600 * parseInt(selectedValue)).toFixed(4) : 0}
                      </Text>
                    </>
                  )}
                      <Text fz={"lg"}>
                      <Text span fw={500} inherit>Stash will be full in: </Text>
                        {selectedRow.minerate ? (
                          <>
                           {(() => {
                            const minutesRemaining = Math.floor((selectedRow.hiveEngineStake - selectedRow.scrap) / (selectedRow.minerate * 60));
                            const hoursRemaining = Math.floor(minutesRemaining / 60);
                            const minutesAfterHours = minutesRemaining % 60;
                            const daysRemaining = Math.floor(hoursRemaining / 24);
                            const hoursAfterDays = hoursRemaining % 24;
                            const timeRemaining = [];
                            if (daysRemaining > 0) {
                              timeRemaining.push(`${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`);
                            }
                            if (hoursAfterDays > 0) {
                              timeRemaining.push(`${hoursAfterDays} hour${hoursAfterDays > 1 ? 's' : ''}`);
                            }
                            if (minutesAfterHours > 0) {
                              timeRemaining.push(`${minutesAfterHours} minute${minutesAfterHours > 1 ? 's' : ''}`);
                            }
                            return timeRemaining.join(', ');
                          })()}
                          </>
                        ) : 0}
                      </Text>             
              </Grid.Col>
              <Grid.Col span={6}>
                <Group position="center">
                  <RingProgress
                    size={250}
                    thickness={24}
                    label={
                      <Text size="lg" align="center" px="md" sx={{ pointerEvents: 'none' }}>
                        Hover sections to see stats
                      </Text>
                    }
                    sections={[
                      { value: (selectedRow.damage / (selectedRow.damage + selectedRow.defense + selectedRow.engineering*10))*100, color: 'orange', tooltip: `Damage ${selectedRow.damage}` },
                      { value: (selectedRow.defense / (selectedRow.damage + selectedRow.defense + selectedRow.engineering*10))*100, color: 'cyan', tooltip: `Defense ${selectedRow.defense}` },
                      { value: (selectedRow.engineering*10 / (selectedRow.damage + selectedRow.defense + selectedRow.engineering*10))*100 , color: 'green', tooltip: `Engineering ${selectedRow.engineering}` },
                    ]}
                  />
                </Group>
              </Grid.Col>
            </Grid>
        </Modal>
      )}
            <Pagination
                value={page}
                onChange={setPage}
                withControls 
                total={pageCount}
                position="center"
                sx={{paddingTop:50}}
            />
        </SimpleGrid>
            {/* <Button onClick={() => handleToggle()}>
            {isRunning ? "Stop Bot" : "Start Bot"}
            </Button> */}
        <Space h="xl" />
    </>
  );
}
