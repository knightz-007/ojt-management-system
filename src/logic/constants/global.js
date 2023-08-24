export const defaultImage =
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export const defaultUserIcon = "user.png";

export const defaultCourseImage = "default-course.png";

export const defaultPageSize = 10;

export const defaultPageIndex = 1;

export const genderOptions = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
  { value: 3, label: "Khác" },
];

export const courseOptions = [
  { value: 1, label: "Không bắt buộc" },
  { value: 2, label: "Bắt buộc" },
];

export const roleOptions = [
  { value: 1, label: "Admin" },
  { value: 2, label: "Quản lý" },
  { value: 3, label: "Đào tạo viên" },
  { value: 4, label: "Thực tập sinh" },
];

export const roleFilter = [
  { value: 0, label: "Tất cả" },
  { value: 1, label: "Admin" },
  { value: 2, label: "Quản lý" },
  { value: 3, label: "Đào tạo viên" },
  { value: 4, label: "Thực tập sinh" },
];

export const roleExchange = {
  ADMIN: 1,
  MANAGER: 2,
  TRAINER: 3,
  TRAINEE: 4,
};

export const positionOptions = [
  { value: 1, label: "Back-end dev" },
  { value: 2, label: "Front-end dev" },
  { value: 3, label: "Business Analyst" },
  { value: 4, label: "Project Manager" },
  { value: 5, label: "Dev-ops" },
  { value: 6, label: "Tester" },
];

export const traineeTaskStatus = [
  { value: 1, label: "Hoàn thành" },
  { value: 2, label: "Quá Hạn" },
  { value: 3, label: "Đang thực hiện" },
];

export const skillLevel = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

export const accountStatus = [
  { value: 1, label: "Đã khóa" },
  { value: 2, label: "Đang hoạt động" },
];

export const skillStatusOptions = [
  { value: 1, label: "Đã xóa" },
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Không sử dụng" },
];

export const positionStatusOptions = [
  { value: 1, label: "Đã xóa" },
  { value: 2, label: "Đang sử dụng" },
  { value: 3, label: "Không sử dụng" },
];

export const isCriteriaOptions = [
  { value: true, label: "Có" },
  { value: false, label: "Không" },
];

export const statusColor = {
  DELETED: "bg-red-500",
  ACTIVE: "bg-green-500",
  INACTIVE: "bg-yellow-500",
};

export const signalRMessage = {
  COURSE: "New Course Created",
  SKILL: "New Skill Created",
  USER: "New User Created",
  TRAINING_PLAN: "New Training Plan Created",
  POSITION: "New Position Created",
  OJTBATCH: "New OJT Batch Created",
};

export const skillStatus = {
  DELETED: 1,
  ACTIVE: 2,
  INACTIVE: 3,
};

export const positionStatus = {
  DELETED: 1,
  ACTIVE: 2,
  INACTIVE: 3,
};
