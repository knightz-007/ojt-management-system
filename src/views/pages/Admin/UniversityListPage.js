import Heading from "views/components/common/Heading";
import { Fragment, useEffect, useState } from "react";
import { Button } from "views/components/button";
import { universityPath } from "logic/api/apiUrl";
import { defaultPageIndex, defaultPageSize, signalRMessage } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { defaultUniversityImage } from "logic/constants/global";
import { Skeleton, TablePagination } from "@mui/material";
import Gap from "views/components/common/Gap";
import SearchBar from "views/modules/SearchBar";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";

const UniversityListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [universities, setUniversities] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST +
        "?PageSize=" +
        rowsPerPage +
        "&PageIndex=" +
        page +
        "&searchTerm=" +
        `${searchTerm === null ? "" : searchTerm}`
      );
      setUniversities(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      console.log("fetchUsers ~ error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    signalRService.on(signalRMessage.UNIVERSITY.CREATED, (message) => {
      fetchUniversities();
    });
    signalRService.on(signalRMessage.UNIVERSITY.DELETED, (message) => {
      fetchUniversities();
    });
    signalRService.on(signalRMessage.UNIVERSITY.UPDATED, (message) => {
      fetchUniversities();
    });

    return () => {
      signalRService.off(signalRMessage.UNIVERSITY.CREATED);
      signalRService.off(signalRMessage.UNIVERSITY.DELETED);
      signalRService.off(signalRMessage.UNIVERSITY.UPDATED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <Heading className="text-[2.25rem] font-bold pt-6">
            Quản lý trường đại học
          </Heading>
        </div>
        <Button
          className="px-7"
          type="button"
          href="/create-new-university"
          kind="secondary"
        >
          Thêm trường đại học mới
        </Button>
      </div>
      <div className="flex flex-wrap items-start gap-5 mt-5">
        <div className=" max-w-[600px] w-full">
          <SearchBar onChangeSearch={setSearchTerm}></SearchBar>
        </div>
      </div>
      <Gap />
      <div className="pt-[66px]">
        <div className="w-full max-w-[1000px] mx-auto text-center">
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] space-x-10">
            {isLoading ? ( // Render skeleton loading when loading is true
              // Use the animate-pulse class for skeleton effect
              <>
                <div
                  className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96"
                >
                  <Skeleton className="mb-5 w-full h-full max-h-40 object-contain" height={300} />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                </div>
                <div
                  className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96"
                >
                  <Skeleton className="mb-5 w-full h-full max-h-40 object-contain" height={300} />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                </div>
                <div
                  className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96"
                >
                  <Skeleton className="mb-5 w-full h-full max-h-40 object-contain" height={300} />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                </div>
                <div
                  className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96"
                >
                  <Skeleton className="mb-5 w-full h-full max-h-40 object-contain" height={300} />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-full" />
                </div>
              </>
            ) : universities.length !== 0 ? (
              universities.map((university) => (
                <div
                  className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96"
                  key={university.id}
                >
                  <img
                    src={university.imgURL}
                    alt=""
                    className="mb-5 w-full h-full max-h-40 object-contain"
                    onError={(e) => {
                      e.target.src = defaultUniversityImage;
                    }}
                  />
                  <div className="max-h-1/2 mt-2">
                    <h1 className="decoration-solid font-medium text-2xl">
                      {university.name}
                    </h1>
                    <p className="mb-6 mt-3 text-sm text-text3">
                      {university.address}
                    </p>
                  </div>
                  <Button
                    className="w-full bg-opacity-20 text-secondary bg-violet-500 hover:bg-violet-300"
                    onClick={() => {
                      navigate("/batch-list/" + university.id);
                    }}
                  >
                    Chọn
                  </Button>
                </div>
              ))) :
              <>Không có trường đại học nào được tìm thấy.</>
            }
          </div>
          <TablePagination
            labelRowsPerPage="Số dòng"
            component="div"
            count={totalItem}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UniversityListPage;
