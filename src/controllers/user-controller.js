import { forgotPasswordService, loginUserService, refreshAccessTokenService, registerUserService, resetPasswordService } from "../services/user-service.js";

// Register User
export const registerUserController = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;

        //Check if all field are inputted
        if(!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const output = await registerUserService(req.body);

        res.status(201).json({
            message: "user registered successfully. Please login",
            status: 1,
            data: result 
        })
    } catch (error) {
    next(error); // pass to centralized error handler
  }
};


// LOGIN USER
export const loginUserController = async (req, res, next) => {
    try {
        const result = await loginUserService(req.body);

            res.json({
                message: "Login successful",
                status: 1,
                data: result
            })

    } catch(error) {
        next(error)
    }
}


//FORGOT PASSWORD
export const forgotPassword = async (req, res, next) => {
    try {
    const {email} = req.body;

    const result = await forgotPasswordService(email);

    res.json(result);
    } catch (error){
        next(error)
    }
};


// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const {token, newPassword} = req.body;

        const result = await resetPasswordService (token, newPassword)

        res.json(result)
    } catch(error) {
        next(error)
    }
    
}


//Refresh Access Token
export const refreshAccessToken = (req, res, next) => {

        try {
            const {token} = req.body;
           
             if(!token) {
                return res.status(401).json({message: "Token not provided"})
             } 
             const result = refreshAccessTokenService(token)

            res.json({result});
        } catch (error) {
           next(error)
        }
    };