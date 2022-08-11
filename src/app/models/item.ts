import { Comments } from "./comments";

export interface Item {
  id: number;
  url: string;
  comments?: Comments[];
}
