// server/routes/reviewsRoute.js
const express = require('express');
const router = express.Router();
const { sql } = require('../db');

// POST: Krijo një review të ri
router.post('/add', async (req, res) => {
    const { username, content, rating } = req.body;
    
    // Shtoni log për të parë të dhënat që po dërgoni
    console.log("Të dhënat e marra:", req.body);
  
    try {
      // Sigurohuni që query SQL të jetë i saktë
      const result = await sql.query`
        INSERT INTO Reviews (username, content, rating)
        VALUES (${username}, ${content}, ${rating})
      `;
      res.status(201).json({ message: 'Review i ri u shtua me sukses!' });
    } catch (err) {
      console.error('Gabim gjatë shtimit të review-t:', err);
      res.status(500).json({ message: 'Gabim gjatë shtimit të review-t' });
    }
  });
  

module.exports = router;
