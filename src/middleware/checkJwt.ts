import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { request } from "http";

export const checkJwt = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //Get the jwt token from the head
  const token = <string>request.headers["x-access-token"];
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    response.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    response.status(401).send();
    return;
  }

  //Call the next middleware or controller
  next();
};
