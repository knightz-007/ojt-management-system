import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { userPath } from "api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "constants/global";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "components/button";
import ModalTraineeDetailManager from "components/modal/ModalTraineeDetailManager";

const TraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );
        setUsers(response.data.data);
        setTotalItem(response.data.totalItem);
        // setPage(response.data.pageIndex);
        // console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
      }
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isTraineeDetailModalOpen, setIsTraineeDetailModalOpen] =
    useState(false);

  return (
    <Fragment>
      <ModalTraineeDetailManager
        isOpen={isTraineeDetailModalOpen}
        onRequestClose={() => setIsTraineeDetailModalOpen(false)}
      ></ModalTraineeDetailManager>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Thực tập sinh</Heading>
        </div>
      </div>
      <Gap></Gap>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right" width={"10%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-20">
                  <img
                    class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="logo.png"
                    alt=""
                  />
                </TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell align="right" width={"10%"}>
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => setIsTraineeDetailModalOpen(true)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default TraineeListPage;
