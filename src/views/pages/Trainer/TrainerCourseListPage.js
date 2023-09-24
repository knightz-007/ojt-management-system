import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { coursePath, positionPath, skillPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  signalRMessage,
  skillStatus,
  traineeCourseOptions,
  positionStatus,
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

const TrainerCourseListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [skill, setSkill] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [courseOption, setCourseOption] = useState(1);
  const [position, setPosition] = useState("");
  const [positionList, setPositionList] = useState([]);

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

  const fetchPositions = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000 +
        "&filterStatus=" +
        positionStatus.ACTIVE
      );
      setPositionList(response.data.data);
    } catch (error) {
      console.log("fetchSkills ~ error", error);
    }
  };

  const fetchCourses = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data)
      let response = {};
      if (courseOption === 3) {
        response = await axiosPrivate.get(
          coursePath.GET_TRAINEE_COURSE_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}` +
          "&filterSkill=" +
          `${skill === null ? "" : skill}` +
          "&filterPosition=" +
          `${position === null ? "" : position}`
        );
      } else if (courseOption === 1) {
        response = await axiosPrivate.get(
          coursePath.GET_RECOMMENDED_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}` +
          "&filterSkill=" +
          `${skill === null ? "" : skill}`
        );
      } else {
        response = await axiosPrivate.get(
          coursePath.GET_COMPULSORY_COURSE_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage
        );
      }
      console.log(response.data);
      setCourses(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      console.log("fetchCourses ~ error", error);
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
      console.log("fetchSkills ~ error", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSkills();
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, skill, rowsPerPage, page, courseOption]);

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
              options={positionList}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Vị trí" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setPosition(newValue.id);
                } else {
                  setPosition("");
                }
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          </div>
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
          <div className="flex flex-wrap items-start max-w-[200px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={traineeCourseOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Lựa chọn" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setCourseOption(newValue.value);
                } else {
                  setCourseOption("");
                }
              }}
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