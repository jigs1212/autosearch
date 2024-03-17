import { useState, useMemo, useEffect } from "react";
import data from "./utils/data.json";

const searchForText = (booksData, searchText) => {
  return booksData
    .reduce((acc, book) => {
      let count = 0;
      const test = book.summary
        .split(new RegExp(`(${searchText})`, "gi"))
        .map((part, i) => {
          part.toLowerCase() === searchText.toLowerCase() && ++count;
          return (
            <span
              key={i}
              style={
                part.toLowerCase() === searchText.toLowerCase()
                  ? { color: "black", background: "yellow" }
                  : {}
              }
            >
              {part}
            </span>
          );
        });
      if (count) {
        acc.push({ ...book, summary: test, count });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count);
};

const generateBookData = () => {
  return data.summaries.map((book, index) => ({
    id: book.id,
    author: data.authors[index].author,
    summary: book.summary,
    title: data.titles[index],
  }));
};

function App() {
  const booksData = generateBookData();
  const [searchText, setSearchText] = useState("");
  // let searchResult = null;
  const searchResult = useMemo(() => {
    if (searchText && booksData) {
      return searchForText(booksData, searchText);
    }
  }, [searchText, booksData]);

  return (
    <>
      <h3>Autosearch</h3>
      <input
        type="text"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Book Summary</th>
            <th>Book Author</th>
          </tr>
        </thead>
        <tbody>
          {(searchResult || booksData)?.map((book, index) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.summary}</td>
                <td>{book.author}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
