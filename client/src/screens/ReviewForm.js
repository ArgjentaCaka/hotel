import React, { useState, useEffect } from 'react';

function ReviewForm() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState([]);

  // Funksioni për të ruajtur dhe shfaqur review-et nga localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(savedReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !content || !rating) {
      alert('Të gjitha fushat janë të detyrueshme!');
      return;
    }

    // Krijimi i një review të ri
    const newReview = { username, content, rating };

    // Ruajtja e review-it të ri në array dhe në localStorage
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    // Pastrimi i formës pas dërgimit
    setUsername('');
    setContent('');
    setRating('');
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

      {/* Shfaqja e review-eve të ruajtura */}
      <div className="reviews-list">
        <h3>Reviewet që keni dhënë:</h3>
        {reviews.length > 0 ? (
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
