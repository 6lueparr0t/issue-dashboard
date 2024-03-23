import { PropsWithChildren } from "react";

// export type PageProps = {
// };

export interface LayoutProps extends PropsWithChildren {
}

export type RouteLoaderData = {
  type: string;
  title: string;
  list: [];
  // page: {}[];
  // count: {}[];
}