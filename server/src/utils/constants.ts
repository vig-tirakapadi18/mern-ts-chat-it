export const statusCodes = {
  code200: 200,
  code201: 201,
  code400: 400,
  code401: 401,
  code403: 403,
  code404: 404,
  code409: 409,
  code500: 500,
};

export const errorMessages = {
  internalServerError: "Internal Server Error!",
  invalidInputRequest: "Input values are invalid!",
  userExists: "User already exists!",
  createUser: "Error creating user!",
  invalidCredentials: "Invalid credentials!",
  unauthorized: "Unauthorized user!",
  unauthorizedNoToken: "Unauthorized - No token provided!",
  unauthorizedInvalidToken: "Unauthorized - Invalid token provided!",
};

export const successMessages = {
  createUser: "User created successfully!",
  userLogin: "User logged in successfully!",
  userUpdate: "User details updated successfully!",
  userDeleted: "User deleted successfully!",
  userFetch: "User fetched successfully!",
};

export const booleanValues = {
  trueValue: true,
  falseValue: false,
};
