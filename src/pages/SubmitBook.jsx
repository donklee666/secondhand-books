import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import './SubmitBook.css';

export default function SubmitBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    condition: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const { error } = await supabase.from('books').insert({
      title: form.title,
      author: form.author,
      price: Number(form.price),
      condition: form.condition,
      description: form.description || null,
      // 这里先写死一个分类和卖家（请把 1 换成你实际表里的某个 id）
      category_id: 1,
      seller_id: 1,
    });

    if (error) {
      console.error(error);
      setMessage('发布失败：' + error.message);
      setIsSubmitting(false);
    } else {
      setMessage('发布成功！');
      setForm({ title: '', author: '', price: '', condition: '', description: '' });
      setIsSubmitting(false);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="submit-book">
      <h1>📖 发布二手书</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label htmlFor="title">书名 *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="请输入书名"
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">作者 *</label>
            <input
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              placeholder="请输入作者姓名"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">价格（元）*</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition">成色 *</label>
              <select
                id="condition"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">请选择成色</option>
                <option value="全新">全新</option>
                <option value="九成新">九成新</option>
                <option value="八成新">八成新</option>
                <option value="七成新">七成新</option>
                <option value="六成新及以下">六成新及以下</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">简介</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="请输入书籍简介（可选）"
            />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '发布中...' : '发布书籍'}
          </button>

          {message && (
            <div className={`message ${message.includes('成功') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
