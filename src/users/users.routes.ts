import express, { Request, Response } from "express";
import { UnitUser, User } from "./user.interface";
import { StatusCodes } from "http-status-codes";
import * as database from "./user.database";

export const userRouter = express.Router();

userRouter.get("/users", async (request: Request, response: Response) => {
 try {
  const allUsers: UnitUser[] = await database.findAll();
  if (!allUsers) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({msg: "No users at this time."}); 
  }
  return response.status(StatusCodes.OK)
    .json({total: allUsers.length, allUsers});
  
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

userRouter.get("/user/:id", async (request: Request, response: Response) => {
 try {
  const user: UnitUser = await database.findOne(request.params.id);
  if (!user) {
   return response.status(StatusCodes.NOT_FOUND).json({error: "User not found."});
  }
  return response.status(StatusCodes.OK).json({user});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

userRouter.post("/user", async (request: Request, response: Response) => {
 try {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
   return response.status(StatusCodes.BAD_REQUEST)
     .json({error: "This email has already been registered."});
  }
  const newUser = await database.create(request.body);
  return response.status(StatusCodes.CREATED).json({newUser});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

userRouter.post("/login", async (request: Request, response: Response) => {
 try {
  const { email, password } = request.body;
  if (!email || !password) {
   return response.status(StatusCodes.BAD_REQUEST)
     .json({error: "Please provide all the required parameters."});
  }
  const user = await database.findByEmail(email);
  if (!user) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: "No user exists with the email provided."});
  }
  const comparePassword = await database.comparePassword(email, password);
  if (!comparePassword) {
   return response.status(StatusCodes.BAD_REQUEST)
     .json({error: "Incorrect password."});
  }
  return response.status(StatusCodes.OK).json({user});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

userRouter.put("/user/:id", async (request: Request, response: Response) => {
 try {
  const { username, email, password } = request.body;
  const getUser = await database.findOne(request.params.id);
  if (!username || !email || !password) {
   return response.status(StatusCodes.UNAUTHORIZED)
     .json({error: "Please provide all the required paramters."});
  }
  if (!getUser) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: `No user with id ${request.params.id}`});
  }
  const updateUser = await database.update(request.params.id, request.body);
  return response.status(StatusCodes.CREATED).json({updateUser});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});

userRouter.delete("/user/:id", async (request: Request, response: Response) => {
 try {
  const id = (request.params.id);
  const user = await database.findOne(id);
  if (!user) {
   return response.status(StatusCodes.NOT_FOUND)
     .json({error: "User does not exist."});
  }
  await database.remove(id);
  return response.status(StatusCodes.OK).json({msg: "User deleted."});
 } catch (error) {
  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
 }
});
