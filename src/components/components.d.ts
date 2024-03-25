export type Issue = {
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  node_id: string;

  user: {
    avatar_url: string;
    login: string;
  };
};

export type BoardProps = {
  category: string;
  method?: "POST" | "PATCH" | "DELETE";
  list?: ListRow[];
  issue?: Issue;
  title?: string;
};

export type PaginationProps = {
  category: string;
  last: number;
  page: number;
  query: string;
};

export type Modal = {
  message: string;
  type: string;
  prevRef?: React.RefObject<HTMLInputElement> | null;
  optionComponent?: React.ReactElement | null;
  handler?: () => void;
};
