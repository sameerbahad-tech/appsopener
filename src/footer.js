// src/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.linkedin.com/in/sameer-bahad" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin linkedin-icon"></i>  LinkedIn
        </a>
        <a href="https://x.com/BahadSameer" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter twitter-icon"></i> Twitter
        </a>
        <a href="https://www.youtube.com/channel/UCh456gpfKAocBMp8Pr1Ew6A" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube youtube-icon"></i> YouTube
        </a>
      </div>
      <p>
      © 2024 | Designed and developed by <a href='https://linktr.ee/sameerbahad' target="_blank" rel="noopener noreferrer">Sameer Bahad</a>
      </p>
    </footer>
  );
}

export default Footer;
