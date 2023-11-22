import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs"; //encriptar
import { createAccessToken } from "../libs/jwt.js"; //hacer tokens - pases 
import jwt  from "jsonwebtoken";
import 'dotenv/config';


const UserControllers = {

    register: async (req, res) => {
        const { username, email, password } = req.body;
        try {

            const emailFound = await UserModel.findOne({ email })
            const userFound = await UserModel.findOne({ username })
            if (emailFound)
                return res.status(400).json(["the email is already used"])

            if (userFound)
                return res.status(400).json(["the username is already used"])


            const passwordHash = await bcrypt.hash(password, 10)

            const user = new UserModel({
                username,
                email,
                password: passwordHash
            })

            const userSave = await user.save();
            const token = await createAccessToken({ id: userSave._id });

            res.cookie('token', token);
           
            res.status(200).json({
                id: userSave._id,
                username: userSave.username,
                email: userSave.email,
                createAt: userSave.createdAt,
                updateAt: userSave.updatedAt
            });

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    },

    login: async (req, res) => {

        const { email, password } = req.body;
        try {
            const userFound = await UserModel.findOne({ email });
            if (!userFound) return res.status(404).json({
                message: "user not found"
            });

            const isMatch = await bcrypt.compare(password, userFound.password)
            if (!isMatch) return res.status(404).json({
                message: "invalid credentials"
            });

            const token = await createAccessToken({ id: userFound._id });

            res.cookie('token', token);
            res.status(200).json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createAt: userFound.createdAt,
                updateAt: userFound.updatedAt
            });

        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    },

    logout: (req, res) => {
        res.cookie('token', "", {
            expires: new Date(0)
        });
        return res.sendStatus(200);
    },

    profile: async (req, res) => {
        const userFound = await UserModel.findById(req.decoded.id);

        if (!userFound) return res.status(404).json({ message: "user not found" });

        return res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });

    },

    verify: async (req, res) => {
        const {token} = req.cookies;

        if (!token) return res.status(401).json({message: 'Unauthorized'});

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if(err) return  res.status(401).json({message: 'Unauthorized'});

            const userFound = await UserModel.findById(user.id);
            if(!userFound) return  res.status(401).json({message: 'Unauthorized'});

            return res.status(200).json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email
            })

        })
    }

}

export default UserControllers;