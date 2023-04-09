import { Box, Table, Pagination } from "@mantine/core";
import React from "react";
import { Row, TablePropGetter } from "react-table";
import useStyles from "./style";

interface UserBattleData {
  id: string;
  username: string;
  attacked: string;
  scrap: number;
  timestamp: number;
  numberOfAttacks: number;
}

interface Props {
  getTableProps: TablePropGetter<UserBattleData>;
  pageData: Row<UserBattleData>[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  prepareRow: (row: Row<UserBattleData>) => void;
  pageCount: number;
}

export default function AbusersTab({ ...props }: Props) {
  const { classes, theme } = useStyles();

  return (
    <>
      <Box
        sx={{
          overflowX: "auto",
          "-webkit-overflow-scrolling": "touch",
        }}
      >
        <Table highlightOnHover mt={10}>
          <tbody>
            {props.pageData.map((row) => {
              props.prepareRow(row);
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
        value={props.page}
        onChange={props.setPage}
        withControls
        total={props.pageCount}
        position="center"
        pt={25}
        pb={5}
        color={"dark"}
      />
    </>
  );
}
