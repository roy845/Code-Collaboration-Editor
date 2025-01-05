import { Request } from "express";

export interface GetAllRoomsRequest extends Request {
  query: {
    search: string;
    page: string;
    limit: string;
  };
}
