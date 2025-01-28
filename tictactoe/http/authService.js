import User from "../../db/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import error from "../../utils/error.js";

const register = async ({username, password}) => {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username,
        password: hashedPassword
    });

    return user;
}

const login = async ({username, password}) => {
    //find user
    const user = await User.where("username", username).findOne();

    if(!user){
        error("User not found", 404);
    }

    //check password
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if(!passwordIsCorrect){
        error("Invalid password", 401);
    }

    const accessToken = jwt.sign({ id: user._id, username: user.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h"});
    const refreshToken = jwt.sign({ id: user._id, username: user.username}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d"});
    return {accessToken: accessToken, refreshToken: refreshToken};
}

export default { register, login }