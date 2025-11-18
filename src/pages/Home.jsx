import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import './Home.css';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('id, title, author, price, condition')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('加载书籍失败', error);
      } else {
        setBooks(data);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>📚 二手书广场</h1>
      {books.length === 0 ? (
        <div className="empty-state">
          <p>暂无书籍，快去发布一本吧！</p>
          <Link to="/submit" className="btn-primary">
            发布第一本书
          </Link>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <Link to={`/book/${book.id}`} key={book.id} className="book-card">
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">作者：{book.author}</p>
                <div className="book-footer">
                  <span className="book-price">¥{book.price}</span>
                  <span className="book-condition">{book.condition}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}