import {Router} from "express"
import { getProfile, login, logout, register } from "../controllers/user.controller.js"
import { isLoggedIn } from "../middelwares/auth.middelware.js"


const router = Router()
//****************************** Registion User**********************************/
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', isLoggedIn, getProfile)




export default router;