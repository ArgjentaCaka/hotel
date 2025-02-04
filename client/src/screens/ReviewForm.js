import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewForm() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Ndjek ngarkimin e të dhënave
  const [error, setError] = useState(null); // Ndjek gabimet

  // Përdorimi i useEffect për të marrë review-t nga backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data); // Ruaj review-t
      } catch (err) {
        setError('Nuk ka asnje review per momentin.'); // Vendos gabimin
      } finally {
        setLoading(false); // Përsëri vendos ngarkimin në false
      }
    };
    
    fetchReviews(); // Thirrja e funksionit për të marrë review-t
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !content || !rating) {
      alert('Të gjitha fushat janë të detyrueshme!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reviews/add', {
        username,
        content,
        rating,
      });

      alert(response.data.message); // Mesazhi nga backend
      setUsername('');
      setContent('');
      setRating('');

      // Përsëri marrja e review-ve pas dërgimit të një të ri
      const updatedResponse = await axios.get('http://localhost:5000/api/reviews');
      setReviews(updatedResponse.data);

    } catch (error) {
      console.error('Gabim gjatë dërgimit të review-t:', error);
      alert('Gabim gjatë dërgimit të review-t');
    }
  };

  return (
    <div>
      <h2>Here you can give your feedback</h2>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Emri i Përdoruesit:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Shkruaj emrin"
          />
        </div>
        <div className="form-group">
          <label>Review:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Shkruaj review-in tuaj"
          />
        </div>
        <div className="form-group">
          <label>Vlerësimi:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
          />
        </div>
        <button type="submit" className="submit-btn">Dërgo Review</button>
      </form>

      {/* Shfaqja e review-eve */}
      <div className="reviews-list">
        <h3>Reviewet që keni dhënë:</h3>
        {loading ? (
          <p>Po ngarkohet...</p>
        ) : error ? (
          <p>{error}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p><strong>{review.username}</strong> (Vlerësimi: {review.rating})</p>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>Nuk ka asnjë review për momentin.</p>
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
