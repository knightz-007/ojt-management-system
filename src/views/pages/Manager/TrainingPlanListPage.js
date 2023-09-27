import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import {
  defaultPageSize,
  defaultPageIndex,
  trainingPlanStatusOptions,
  trainingPlanStatus,
  signalRMessage,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import ModalTrainingPlanDetailManager from "views/components/modal/ModalTrainingPlanDetailManager";
import { trainingPlanPath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";
import { fDate } from "logic/utils/formatTime";
import { toast } from "react-toastify";
import Chip from "views/components/chip/Chip";
import signalRService from "logic/utils/signalRService";

const TrainingPlanListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [trainingplans, setTrainingplans] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTrainingPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage, status]);

  async function fetchTrainingPlans() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        trainingPlanPath.GET_TRAINING_PLAN_LIST +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage +
        "&nameSearch=" +
        `${searchTerm === null ? "" : searchTerm}` +
        "&status=" +
        status
      );
      setTrainingplans(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false); // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    signalRService.on(signalRMessage.TRAINING_PLAN.CREATE, (message) => {
      fetchTrainingPlans();
    });
    signalRService.on(signalRMessage.TRAINING_PLAN.UPDATE, (message) => {
      fetchTrainingPlans();
    });
    signalRService.on(signalRMessage.TRAINING_PLAN.DELETE, (message) => {
      fetchTrainingPlans();
    });
    signalRService.on(signalRMessage.TRAINING_PLAN.PROCESS, (message) => {
      fetchTrainingPlans();
    });

    return () => {
      signalRService.off(signalRMessage.TRAINING_PLAN.CREATE);
      signalRService.off(signalRMessage.TRAINING_PLAN.UPDATE);
      signalRService.off(signalRMessage.TRAINING_PLAN.DELETE);
      signalRService.off(signalRMessage.TRAINING_PLAN.PROCESS);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const [isTraingingPlanDetailModalOpen, setIsTrainingPlanDetailModalOpen] =
    useState(false);

  const theme = useTheme();

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <MainCard title={`Danh sách kế hoạch đào tạo `}>
      {isTraingingPlanDetailModalOpen ?
        <ModalTrainingPlanDetailManager
          onRequestClose={() => setIsTrainingPlanDetailModalOpen(false)}
          selectedTrainingPlan={selectedItem}
        ></ModalTrainingPlanDetailManager>
        : null}
      <SubCard>
        <div className="flex flex-wrap items-start gap-3">
          {/*Custom search bar*/}
          <Card className="w-2/5">
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Tìm kiếm ..."
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{ maxWidth: 550 }}
              onChange={setSearchTerm}
            />
          </Card>
          <div className="flex flex-wrap items-start max-w-[200px] w-full">
            <Autocomplete
              disablePortal={false}
              options={trainingPlanStatusOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Trạng thái" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setStatus(newValue.value);
                } else {
                  setStatus("");
                }
              }}
            />
          </div>
        </div>
        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={"30%"}>
                  Tên kế hoạch
                </StyledTableCell>
                <StyledTableCell align="left" width={"20%"}>
                  Người tạo
                </StyledTableCell>
                <StyledTableCell align="center" width={"20%"}>
                  Ngày sửa đổi
                </StyledTableCell>
                <StyledTableCell align="center" width={"15%"}>
                  Trạng thái
                </StyledTableCell>
                <StyledTableCell align="right" width={"15%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell width={"30%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"30%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"30%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              ) : trainingplans.length !== 0 ? (
                trainingplans.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell align="center">
                      {fDate(item.updateDate)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        color={
                          item?.status === trainingPlanStatus.PENDING
                            ? "warning"
                            : item?.status === trainingPlanStatus.ACTIVE
                              ? "success"
                              : "error"
                        }
                      >
                        {
                          trainingPlanStatusOptions.find(
                            (label) => label.value === item?.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                    <TableCell align="right" width={"15%"}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark, // Color on hover
                          },
                        }}
                        component="label"
                        className="flex items-center justify-center cursor-pointer w-3/4 h-8 text-text1 rounded-md"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsTrainingPlanDetailModalOpen(true);
                        }}
                      >
                        <span className="text-white">Chi tiết</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không có kế hoạch đào tạo nào được tìm thấy.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage="Số dòng"
            component="div"
            count={totalItem}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
            }
          />
        </TableContainer>
      </SubCard>
    </MainCard>
  );
};

export default TrainingPlanListPage;
