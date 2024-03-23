export type ListRow = {
  title : string;
  body : string;
  created_at : string;
  updated_at : string;

  user : {
    avatar_url : string;
    login : string;
  }
}

export type ComponentProps = {
  title: string;
  list: ListRow[];
};