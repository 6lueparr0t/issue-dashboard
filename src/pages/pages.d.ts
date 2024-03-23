import { PropsWithChildren } from "react";

export interface LayoutProps extends PropsWithChildren {}

export type RouteLoaderData = {
  category: string;
  title: string;
  list: [];
  total?: number;
  page?: number;
};
