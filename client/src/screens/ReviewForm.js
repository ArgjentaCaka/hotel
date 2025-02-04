import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewForm() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Ndjek ngarkimin e të dhënave
  const [error, setError] = useState(null); // Ndjek gabimet

  // Përdorimi i useEffect për të marrë review-t nga backend dhe për t'i ruajtur ato në localStorage
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        const fetchedReviews = response.data; // Të dhënat e review-ve nga backend

        // Ruajmë review-t që merren nga MSSQL në localStorage për përdorim në browser
        localStorage.setItem('reviews', JSON.stringify(fetchedReviews));

        // Vendosim review-t në shtetin e komponentit
        setReviews(fetchedReviews);
      } catch (err) {
        setError('Nuk ka asnjë review për momentin.');
      } finally {
        setLoading(false);
      }
    };

    // Kontrollo nëse ka review të ruajtura në localStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews'));
    if (savedReviews) {
      setReviews(savedReviews); // Përdorim review-t e ruajtura nga localStorage nëse ekzistojnë
      setLoading(false);
    } else {
      fetchReviews(); // Përdorim fetch nëse nuk ka review të ruajtura në localStorage
    }
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

      alert(response.data.message);

      // Pas dërgimit të review-t, rifreskojmë listën e review-ve nga MSSQL dhe localStorage
      const updatedReviews = await axios.get('http://localhost:5000/api/reviews');
      setReviews(updatedReviews.data);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews.data));

      setUsername('');
      setContent('');
      setRating('');
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
