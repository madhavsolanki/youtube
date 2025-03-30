import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const {token} = req.cookies;

//   if (!token) {
//     return res.status(401).json({success:false, message: "Unauthorized: Login again"});
//   }

//   try {
    
//     const tokenDecode =  jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if(tokenDecode.id && tokenDecode.role){
//       req.body.userId  = tokenDecode.id;
//       req.body.role = tokenDecode.role;
//     }else{
//       return res.status(401).json({success:false, message: "Unauthorized: Login again"});
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({success:false, message: "Unauthorized: Login again"});
//   }

// }

// export default userAuth;




const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: Login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (tokenDecode.id && tokenDecode.role) {
      req.user = {
        id: tokenDecode.id,
        role: tokenDecode.role
      };
    } else {
      return res.status(401).json({ success: false, message: "Unauthorized: Login again" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized: Login again" });
  }
};

export default userAuth;
