import User from "../models/user.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(403).json({ 
      status: false, 
      message: "Token Expired, please login again!!" 
    })
  }
  try{
  const data = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(data.id)
  return next();
  }catch{
    return res.sendStatus(403);
  }
}


export default {isAuthenticated}
