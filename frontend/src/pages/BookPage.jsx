import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const deleteBook = async (bookId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete book");
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const onDeleteClick = (bookId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?",
    );
    if (!confirm) return;
    deleteBook(bookId);
  };

  return (
    <div className="book-details">
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {book && (
        <article>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Genre: {book.genre}</p>
          <p>Available: {book.availability.isAvailable ? "Yes" : "No"}</p>
          <p>
            Due Date:{" "}
            {book.availability.dueDate
              ? new Date(book.availability.dueDate).toLocaleDateString()
              : "—"}
          </p>
          <p>Borrower: {book.availability.borrower || "—"}</p>

          <button onClick={() => navigate("/")}>Back</button>

          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate(`/edit-book/${book._id || book.id}`)}
              >
                Edit
              </button>
              <button onClick={() => onDeleteClick(book._id || book.id)}>
                Delete
              </button>
            </>
          )}
        </article>
      )}
    </div>
  );
};

export default BookPage;
