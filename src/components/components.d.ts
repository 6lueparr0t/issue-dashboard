export type Issue = {
  number: number;
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
  category: string;
  title: string;
  list: ListRow[];
};