import React from "react";
import classNames from "utils/classNames";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const CourseCategory = ({ text = "BE", className = "text-xs", link }) => {
  return (
    <span
      className={classNames(
        "flex items-middle mb-4 font-medium gap-x-3 text-text3",
        className
      )}
    >
      <FolderOpenOutlinedIcon />
      <span className="mt-1">{text}</span>
    </span>
  );
};

export default CourseCategory;
