import { createUser, signinuser } from "../services/auth.services.js"
import asyncHandler from "../utils/asynchandler.js"
import ApiResponse from "../utils/apierror.js"
const registerUser = asyncHandler(async (req, res) => {
    const create = await createUser(req.body)

    return res
        .status(201)
        .json(new ApiResponse( create, "User created successfully."));
})

const loginUser = asyncHandler(async (req, res) => {
    const login = await signinuser(req.body)

    return res
        .status(200)
        .json(new ApiResponse(login, "User logged in successfully."));
})
export {
    registerUser,
    loginUser
}