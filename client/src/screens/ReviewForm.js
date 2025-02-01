// client/src/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm() {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      
        // Verifikoni që të dhënat janë të plota dhe të sakta
        if (!username || !content || !rating) {
          alert("Të gjitha fushat janë të detyrueshme!");
          return;
        }
      
        try {
          // Dërgoni të dhënat tek backend
          const response = await axios.post('http://localhost:5000/api/reviews/add', {
            username,
            content,
            rating,
          });
          
          // Kontrolloni përgjigjen nga backend
          alert(response.data.message); 
        } catch (error) {
          // Trajtoni gabimet që mund të ndodhin gjatë kërkesës
          console.error('Gabim gjatë dërgimit të review-t:', error);
          alert('Gabim gjatë dërgimit të review-t');
        }
      };
      

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Emri i Përdoruesit:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Review:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label>Vlerësimi:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
        />
      </div>
      <button type="submit">Dërgo Review</button>
    </form>
  );
}

export default ReviewForm;
