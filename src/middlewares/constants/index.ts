export interface StandardResponse {
  status: number;
  message: string;
}

//NULL ARRAY
const NULL_ARRAY = [0, null, "", undefined];

//SOME ERROR OBJECTS
const NOT_FOUND_ERROR: StandardResponse = {
  status: 404,
  message: "Resource Not Found",
};

const BAD_REQUEST_ERROR: StandardResponse = {
  status: 400,
  message: "Bad Request",
};

const AUTHENTICATION_ERROR: StandardResponse = {
  status: 401,
  message: "Authentication Error",
};

const RESOURCE_CREATED: StandardResponse = {
  status: 201,
  message: "Resource Created Successfully",
};

const RESOURCE_UPDATED: StandardResponse = {
  status: 200,
  message: "Resource Updated Successfully",
};

const INTERNAL_SERVER_ERROR: StandardResponse = {
  status: 500,
  message: "Internal Server Error.",
};

export const RESTRICTED_ERROR: StandardResponse = {
  message: "Do not have sufficient privileges!",
  status: 403,
};
const MEDIUM = "Medium";
const HIGH = "High";
const LOW = "Low";

export const CREATED = "Created";
export const IN_PROCESS = "In Process";
export const COMPLETED = "Completed";
export const CANCELLED = "Cancelled";

export const STATUSES = [CREATED, IN_PROCESS, COMPLETED, CANCELLED];
export type STATUS_ENUM =
  | typeof CREATED
  | typeof IN_PROCESS
  | typeof COMPLETED
  | typeof CANCELLED;

export const LEVEL_ONE = "Level 1";
export const LEVEL_TWO = "Level 2";
export const LEVEL_THREE = "Level 3";
export const ADMIN = "Admin";

export const DESIGNATIONS = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE, ADMIN];

export const PRIORITY = [LOW, MEDIUM, HIGH];

export type priorityEnum = typeof MEDIUM | typeof LOW | typeof HIGH;

//EXPORTING ALL CONSTANTS
export {
  NULL_ARRAY,
  NOT_FOUND_ERROR,
  BAD_REQUEST_ERROR,
  AUTHENTICATION_ERROR,
  RESOURCE_CREATED,
  INTERNAL_SERVER_ERROR,
  RESOURCE_UPDATED,
};

export const APPROVAL = "Approval";
export const TASK = "Task";

export const TYPES = [APPROVAL, TASK];
export type TICKET_TYPE_ENUM = typeof APPROVAL | typeof TASK;

export const STUDENT = "STUDENT";
export const INSTITUTION = "INSTITUTION";
export const FACULTY = "FACULTY";

export const USER_TYPES = [STUDENT, INSTITUTION, FACULTY];
export type USER_TYPE = typeof STUDENT | typeof INSTITUTION | typeof FACULTY;

//STUDENT
export const SWANATH_SCHOLARSHIP_SCHEME = "SWANATH SCHOLARSHIP SCHEME";
export const YOUTH_UNDERTAKING_VISIT_FOR_ACQUIRING_KNOWLEDGE =
  "YOUTH UNDERTAKING VISIT FOR ACQUIRING KNOWLEDGE";
export const LILAVATI_AWARD = "LILAVATI AWARD";

//INSTITUTION
export const GRANT_FOR_ORGANISING_CONFERENCE =
  "GRANT FOR ORGANISING CONFERENCE";

//FACULTY
export const NATIONAL_INITIATIVE_FOR_TECHNICAL_TEACHERS_TRAINING =
  "NATIONAL INITIATIVE FOR TECHNICAL TEACHERS TRAINING";
