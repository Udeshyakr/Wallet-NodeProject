// creation of token with cookies.
const sendToken = (user, res) => {
    const token = user.getJWTToken()

    res.status(200).cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      message: "Logged in successfully",
      user,
      token,
    })
  }
  
  export default sendToken