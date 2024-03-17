import { BooksDataType } from "../utils/data";

const BookList = ({
  bookList,
  searchText,
}: {
  bookList: BooksDataType[];
  searchText: string;
}) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Book Title</td>
          <td>Book Summary</td>
          <td>Book Author</td>
          {searchText?.length > 0 && <td>Count</td>}
        </tr>
      </thead>
      <tbody>
        {bookList?.map((book: BooksDataType) => {
          return (
            <tr key={book.bookId}>
              <td>{book.title}</td>
              <td>{book.summary}</td>
              <td>{book.author}</td>
              {searchText?.length > 0 && <td>{book.count}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BookList;
