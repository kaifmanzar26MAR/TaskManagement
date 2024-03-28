import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const home = asyncHandler(async (req, res) => {
  return res.status(201).json(
    new ApiResponse(
      200,
      {
        By: "Md Kaif Manzar",
        email: "kaifmanzar321@gmail.com",
        phone: "6200561062",
      },
      "Build By!!"
    )
  );
});
export { home };
