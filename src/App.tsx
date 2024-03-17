import { useMemo, useState } from "react";
import data from "./data.json";
import { DataJsonType, BooksDataType, Summary } from "./utils/data";
import BookList from "./components/BookList";

const generateBooksData = (data: DataJsonType) => {
  return data.summaries.map((summary: Summary, index: number) => {
    return {
      bookId: summary.id,
      author: data?.authors[index]?.author,
      title: data.titles[index],
      summary: summary.summary,
      count: 0,
    };
  });
};

const findSearchResult = (searchText: string, booksData: BooksDataType[]) => {
  let result: BooksDataType[] = [];
  if (searchText) {
    booksData?.forEach((book) => {
      var regExp = new RegExp(searchText, "gi");
      const count: number = book.summary.match(regExp)?.length || 0;
      if (count) {
        result.push({ ...book, count });
        result.sort((a: BooksDataType, b: BooksDataType) => b.count - a.count);
      }
    });
  }
  return result;
};

function App() {
  const booksData: BooksDataType[] = useMemo(
    () => generateBooksData(data),
    [data]
  );
  const [searchText, setSearchText] = useState("");

  const resultData = useMemo(
    () => findSearchResult(searchText, booksData),
    [searchText]
  );

  const bookList: BooksDataType[] = resultData?.length ? resultData : booksData;

  return (
    <div>
      <h3>AutoComplete</h3>
      <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      <BookList bookList={bookList} searchText={searchText} />
    </div>
  );
}

export default App;
