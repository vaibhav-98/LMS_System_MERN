import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

const cookieOptions = {
    maxAge: 7*24*60*60*1000 ,// 7 days
    httpOnly:true,
    secure:true,
}

//******************************Registreation Controller******************************** */
const register = async (req,res,next) => {
  
       const {fullName,email,password} = req.body;

       if(!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400))
       }

       const userExists = await User.findOne({email})

       if(userExists){
        return  next(new AppError('Email already exists ', 400))
       }

       const user = await User.create({
         fullName,
         email,
         password,
         avatar: {
            public_id: email,
            secure_url:"URL",
            
         }

       });

       if(!user) {
        return next(new AppError('User registration faild , Please try  again ', 400))
       }

       // TODO: File uplode

       await user.save();

      

       const token = await user.generateJWTToken();
       user.password = undefined;

       res.cookie('token', token , cookieOptions)


       res.status(201).json({
        success:true,
        message:'User registered successfully',
        user,
       });

    };

      
//**********************************Login Controller*********************************** */
const login = async (req,res,next) => {
     
    try {

        const {email,  password} = req.body ;

        if(!email || !password ) {
            return next(new AppError('All fields are required',400))
        }
    
        const user = await User.findOne({
            email
        }).select('+password')
    
    
        if(!user || !user.comparePassowrd(password)) {
            return next (new AppError('Email or password does not match' , 400))
        }
    
        const token = await user.generateJWTToken();
        user.password = undefined;
    
        res.cookie('token', token, cookieOptions);
    
        res.status(200).json({
            success: true,
            message: 'User loggedin successfullu',
            user,
        })



        
    } catch (err) {

        return res.status(500).send(err.message)
        
    }






}


//*******************************LogOut Controller******************************** */

const logout = (req,res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge:0,
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })


}

//*******************************getProfile  Controller**************************** */

const getProfile = async (req,res,next) => {


    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        res.status(200).json({
            success:true,
            message:'User details',
            user,
        });
        
    } catch (error) {
        return next(new AppError('Failed to fetch profile', 500))
        
    }


}





export {
    register,
    login,
    logout,
    getProfile
}
