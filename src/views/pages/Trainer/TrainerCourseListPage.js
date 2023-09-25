import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { coursePath, skillPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  signalRMessage,
  skillStatus,
} from "logic/constants/global";
import CourseGrid from "views/modules/course/CourseGrid";
import TablePagination from "@mui/material/TablePagination";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";
import CourseCardSkeleton from "views/modules/course/CourseCardSkeleton";
import MainCard from "views/components/cards/MainCard";
import {
  SvgIcon,
  // Button,
  Card,
  OutlinedInput,
  InputAdornment,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SubCard from "views/components/cards/SubCard";
import TrainerCourseCardDisplay from "views/modules/course/TrainerCourseCardDisplay";
import { toast } from "react-toastify";

const TrainerCourseListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [skill, setSkill] = useState("");
  const [skillList, setSkillList] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    signalRService.on(signalRMessage.COURSE.CREATED, (message) => {
      fetchCourses();
    });
    signalRService.on(signalRMessage.COURSE.UPDATED, (message) => {
      fetchCourses();
    });
    signalRService.on(signalRMessage.COURSE.DELETED, (message) => {
      fetchCourses();
    });

    return () => {
      signalRService.off(signalRMessage.COURSE.CREATED);
      signalRService.off(signalRMessage.COURSE.DELETED);
      signalRService.off(signalRMessage.COURSE.UPDATED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data)
      const  response = await axiosPrivate.get(
          coursePath.GET_TRAINER_COURSE_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}` +
          "&filterSkill=" +
          `${skill === null ? "" : skill}`
        );
      setCourses(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000 +
        "&filterStatus=" +
        skillStatus.ACTIVE
      );
      setSkillList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, skill, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <MainCard
      title={`Khóa học`}
    >
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
              id="combo-box-demo"
              options={skillList}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Kỹ năng" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setSkill(newValue.id);
                } else {
                  setSkill("");
                }
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          </div>
        </div>
        <Gap></Gap>
        <CourseGrid type="secondary">
          {isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </>
          ) : courses.length !== 0 ? (
            courses.map((item) => (
              <TrainerCourseCardDisplay course={item} key={item.id} />
            ))
          ) : (
            <>Không có khóa học nào được tìm thấy.</>
          )}
        </CourseGrid>
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
      </SubCard>
    </MainCard>
  );
};

export default TrainerCourseListPage;
