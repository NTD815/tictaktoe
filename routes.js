import express from "express";
import authenticateToken from "./middleware/authenticateToken.js";
import authService from "./tictactoe/http/authService.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    
    if(!req.body?.username || !req.body?.password) {
        res.status(400).json({
            error: "Username and password are required."
        });

        return;
    }

    try {
        const user = await authService.register(req.body);

        return res.status(201).json(user);
    }catch(err){
        if(err.code === 11000){
            return res.status(400).json({
                error: "Username already exists."
            });
        }
        return res.status(500).json({
            error: "Something went wrong."
        });
    }
});

router.post("/login", async (req, res) => {

    if(!req.body?.username || !req.body?.password) {
        res.status(400).json({
            error: "Username and password are required."
        });

        return;
    }

    try {
        const loginData = await authService.login(req.body);

        return res.status(200).json(loginData);
    }catch(err){
        return res.status(err.status).json({
            error: err.message
        });
    }
});

router.get("/profile", authenticateToken, (req, res) => {
    res.status(200).json(req.user);
});

export default router