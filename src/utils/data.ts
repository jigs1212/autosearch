export type DataJsonType = {
  authors: Author[];
  summaries: Summary[];
  titles: String[];
  queries: String[];
};

export type Author = {
  book_id: number;
  author: string;
};
export type Summary = {
  id: number;
  summary: string;
};

export type BooksDataType = {
  bookId: number;
  author: String;
  title: String;
  summary: String;
  count: number;
};
