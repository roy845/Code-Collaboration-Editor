import { Request } from "express";
import { UserRole } from "../models/user.model";

export interface CreateRoleRequestBody {
  name: string;
}

export interface GetAllRolesRequest extends Request {
  query: {
    search: string;
    page: string;
    limit: string;
  };
}

export interface UpdateRoleRequest extends Request {
  params: {
    objectId?: string;
  };
  body: {
    name?: UserRole;
  };
}
