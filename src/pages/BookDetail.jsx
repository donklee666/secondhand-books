import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import './BookDetail.css';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('加载书籍详情失败', error);
      } else {
        setBook(data);
      }
      setLoading(false);
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="error-container">
        <h2>未找到这本书</h2>
        <Link to="/" className="btn-primary">返回首页</Link>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <Link to="/" className="back-link">← 返回首页</Link>
      
      <div className="book-detail-card">
        <div className="book-header">
          <h1>{book.title}</h1>
          <div className="book-meta">
            <span className="book-author">作者：{book.author}</span>
            <span className="book-condition-badge">{book.condition}</span>
          </div>
        </div>

        <div className="book-info">
          <div className="info-section">
            <h3>价格</h3>
            <p className="book-price-large">¥{book.price}</p>
          </div>

          {book.description && (
            <div className="info-section">
              <h3>简介</h3>
              <p className="book-description">{book.description}</p>
            </div>
          )}

          {!book.description && (
            <div className="info-section">
              <p className="no-description">暂无简介</p>
            </div>
          )}
        </div>

        <div className="book-actions">
          <button className="contact-button">联系卖家</button>
        </div>
      </div>
    </div>
  );
}
