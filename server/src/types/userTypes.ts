import { Request } from "express";
import { UserRole } from "../models/user.model";

export interface GetAllUsersRequest extends Request {
  query: {
    search: string;
    page: string;
    limit: string;
  };
}

export interface UpdateUserRequest extends Request {
  params: {
    objectId?: string;
  };
  body: {
    username?: string;
    avatar?: string;
    password?: string;
    email?: string;
    roles?: UserRole[];
  };
}

export interface AssignRolesRequest extends Request {
  params: {
    objectId?: string;
  };
  body: {
    roles?: UserRole[];
  };
}

export interface RemoveRolesRequest extends AssignRolesRequest {}
