import { createContext, useState } from 'react';

export const BookmarksContext = createContext({
  ids: [],
  addBookmark: (id) => {},
  removeBookmark: (id) => {},
});

function BookmarksContextProvider({ children }) {
  const [bookmarkIds, setBookmarkIds] = useState([]);

  function addBookmark(id) {
    setBookmarkIds((currentBookmarkIds) => [...currentBookmarkIds, id]);
  }

  function removeBookmark(id) {
    setBookmarkIds((currentBookmarkIds) =>
      currentBookmarkIds.filter((bookmarkId) => bookmarkId !== id)
    );
  }

  const value = {
    ids: bookmarkIds,
    addBookmark: addBookmark,
    removeBookmark: removeBookmark,
  };

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksContextProvider;