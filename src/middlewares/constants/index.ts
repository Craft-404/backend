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
  status: 200,
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

const MEDIUM = "Medium";
const HIGH = "High";
const LOW = "Low";

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
