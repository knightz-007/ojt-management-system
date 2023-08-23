export const authPath = {
  LOGIN: "/authen/login",
  RESET_PASSWORD_CODE: "/authen/reset-password-code",
  VERIFY_RESET_CODE: "/authen/verify-reset-code",
  RESET_PASSWORD: "/authen/reset-password",
};

export const commonPath = {
  GET_ME: "/common/current-user",
};

export const coursePath = {
  GET_COURSE_LIST: "/course",
  GET_COURSE: "/course/",
  CREATE_COURSE: "/course",
  UPDATE_COURSE: "",
};

export const criteriaPath = {
  GET_STUDENT_PONIT_LIST: "/criteria/list-of-trainee-point-by-trainer",
  EVALUATE_STUDENT: "/criteria",
};

export const ojtBatchPath = {
  GET_OJT_BATCH_LIST_OF_UNIVERSITY: "/ojtbatch/batches-of-university",
};

export const reportPath = {};

export const universityPath = {
  GET_UNIVERSITY_LIST: "/university",
  GET_UNIVERSITY: "/university/",
};

export const trainingPlanPath = {
  GET_TRAINING_PLAN_LIST: "/training-plan",
  GET_TRAINING_PLAN: "",
};

export const userPath = {
  GET_USER_LIST: "/user",
  GET_USER: "/user/",
  CREATE_USER: "/user",
  UPADTE_USER: "",
  GET_TRAINEE_LIST: "/user/trainee",
  GET_TRAINER_LIST: "/user/trainer",
};

export const skillPath = {
  GET_SKILL_LIST: "/skill",
  GET_SKILL: "/skill/",
  CREATE_SKILL: "",
  UPDATE_SKILL: "",
};

export const taskPath = {
  GET_TASK_LIST: "trainee-tasks",
};

export const positionPath = {
  GET_POSITION_LIST: "/position",
  GET_POSITION: "/position/",
};

export const templatePath = {
  CREATE_TEMPLATE: "/template",
  GET_TEMPLATE_HEADER: "/template/template-header/criteriaheader",
};

export const signalRURL = process.env.REACT_APP_SIGNALR_KEY;