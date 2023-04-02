import { useQuery } from "react-query";
import {
  Space,
  Text,
  Grid,
  Image,
  Group,
  Modal,
  Select,
  Avatar,
  Badge,
  Container,
  Skeleton,
  Divider,
  Box,
  Table,
  Pagination,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { getUserDataProfile } from "@/app/utils/actions/hiveUsers";
import { useAuthorizationStore } from "@/zustand/stores/useAuthorizationStore";
import { Column, Row, useTable } from "react-table";
import useStyles from "./style";


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
  dodge: number;
  crit: number;
}

interface UserBattleData {
  id: string;
  username: string;
  attacked: string;
  scrap: number;
  timestamp: number;
}

interface Props {
  showBattlelogPopup: boolean;
  handlePopupClose: () => void;
  selectedRow: UserData;
  userBattlesData: any;
  battleUsername: string;
  setSelectedValue: any;
  selectedValue: string | null;
  isLoadingBattleData: boolean;
}

export default function BattlelogsModal({ ...props }: Props) {


  function getTimeAgo(timestamp: number) {
    const now = Date.now();
    const diff = now - timestamp;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
  
    if (diff < minute) {
      return "just now";
    } else if (diff < hour) {
      const minutes = Math.floor(diff / minute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < day) {
      const hours = Math.floor(diff / hour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diff / day);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }

  const { classes, theme } = useStyles();


  const isMobile = useMediaQuery("(max-width: 767px)");

  const columns: readonly Column<UserBattleData>[] = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ row }: { row: { original: UserBattleData } }) => (
          <>

                {props.battleUsername == row.original.username? `You attacked` : `You were attacked`}
        
          </>
        ),
      },
      {
        Header: "Attacked",
        accessor: "attacked",
        Cell: ({ row }: { row: { original: UserBattleData } }) => (
          <>
 
                {row.original.attacked}
           
          </>
        ),
      },
      {
        Header: "Timestamp",
        accessor: "timestamp",
        Cell: ({ row }: { row: { original: UserBattleData } }) => (
          <>


                {getTimeAgo(row.original.timestamp)}
          

          </>
        ),
      },
      {
        Header: "Scrap",
        accessor: "scrap",
        Cell: ({ row }: { row: { original: UserBattleData } }) => {


          if(props.battleUsername == row.original.username){
            return(
              <>
              <span style={{color: "#1bce98"}}>+{row.original.scrap.toFixed(4)}</span>
              </>
            )
          }else{
            return(
            <>
              <span style={{color: "#ff5f5f"}}>-{row.original.scrap.toFixed(4)}</span>
              </>
  )}
          },
      },

    ],
    [props.battleUsername]
  );


  const userBattlesData = useMemo(() => {
    if (!props.userBattlesData) {
      return [];
    }

    return props.userBattlesData;
  }, [props.userBattlesData, props.battleUsername]);

  const tableData = useMemo(
    () => (userBattlesData ? userBattlesData : []),
    [userBattlesData, props.battleUsername]
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: tableData,
    }
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const pageCount = Math.ceil(rows.length / pageSize);
  const pageData = rows.slice((page - 1) * pageSize, page * pageSize);



  if (props.isLoadingBattleData ||  !tableData) {
    return (
      <>
        <Modal
          opened={props.showBattlelogPopup}
          onClose={props.handlePopupClose}
          centered
          size="lg"
        >
          <Container>
            <Grid grow>
              <Skeleton height={600} mt={6} width="100%" radius="sm" />
            </Grid>
          </Container>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal
        opened={props.showBattlelogPopup}
        onClose={props.handlePopupClose}
        centered
        size="xl"
      >
        <Container>
          <Text size="md" weight={500} tt="uppercase">
            {props.battleUsername}'s battle log
          </Text>
          
        <Box
          sx={{
            overflowX: "auto",
            "-webkit-overflow-scrolling": "touch",
          }}
        >
          <Table highlightOnHover {...getTableProps()} mt={35}>
            {/* <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      className={classes.header}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead> */}
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
        
        </Container>
      </Modal>
    </>
  );
}
