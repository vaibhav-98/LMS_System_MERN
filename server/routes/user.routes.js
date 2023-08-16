import {Router} from "express"
import { forgotPassword, getProfile, login, logout, register, resetPassword } from "../controllers/user.controller.js"
import { isLoggedIn } from "../middelwares/auth.middelware.js"
import upload from "../middelwares/multer.middelware.js"


const router = Router()
//****************************** Registion User*************************************/
router.post('/register',upload.single("avatar") ,register)
//******************************login********************************************* */
router.post('/login', login)
//**************************logOut************************************************* */
router.get('/logout', logout)
//*********************************Get User**************************************** */
router.get('/me', isLoggedIn, getProfile)

//***********************************forgot-password ************************************** */
router.post('/forgot/password' , forgotPassword)

//*******************************reset-password********************************************* */
router.post('/reset-password', resetPassword)





export default router;