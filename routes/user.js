import express from "express"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bodyParser = require('body-parser')
import {createUser, logIn, transferAmount, getAllUsers, deleteUser} from '../controllers/user.js'
import { isAuthenticated } from "../services/auth.js";

const router = express.Router()
router.use(bodyParser.json())


router.get('/', getAllUsers);
router.post("/signup", isAuthenticated, createUser);

router.post("/login", isAuthenticated, logIn);
router.post("/transfer",isAuthenticated, transferAmount);


router.delete('/:email', deleteUser);



export default router;