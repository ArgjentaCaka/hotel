import React from 'react';
import { Link } from 'react-router-dom';


function Landingscreen() {
  return (
    <div className="landing-container">
    {/* Menyja e navigimit */}
    <div className="row landing" id="na">
  <div className="menu-container">
    <ul className="menu-links">
      <li className="menu-item">
        {/* Lidhje që bën scroll në seksionin About */}
        <a href="#about-section" className="menu-link">About</a>
      </li>
      <li className="menu-item"><a href="#gallery-section" className="menu-link">Gallery</a></li>
      <li className="menu-item"><a href="#location-section" className="menu-link">Location</a></li>
      <li className="menu-item"><Link to="/review" className="menu-link">Review</Link></li>
      <li className='menu-item'><Link to = '/home' className="menu-link">Book Now
            </Link></li>
    </ul>
  </div>
</div>


 
  

      {/* Seksioni i "About" që shfaqet pas scroll-it */}
      <div id="about-section" className="about-section">
      <div className="about-image-container">
    <img src="https://img.freepik.com/premium-photo/low-angle-view-trees-against-blue-sky_1048944-30689614.jpg" alt="Royal Paradise Hotel" className="about-image" />
    <div className="about-image-overlay">
      <h1><b>ABOUT</b></h1>
      <p className="about-image-text">We are the hotel that represents service excellence, elegance and our aim to provide an unforgettable experience for our guests in a beautiful and perfect environment!</p>
    </div>
  </div>
        <div className="about-content">
          <h2>-About Us-</h2><hr></hr>
          <h2>Welcome to Royal Paradise – Your Ultimate Getaway</h2>
          <p>
            Escape into unparalleled luxury at <strong>Royal Paradise Hotel</strong>, a hidden oasis nestled in the vibrant heart of the city. Whether you're seeking a tranquil retreat or an exciting business trip, we promise an unforgettable experience with world-class amenities, personalized service, and an atmosphere of indulgence.
          </p>
          <p>
            Our hotel features a stunning collection of luxurious rooms, each designed to provide the utmost comfort and serenity. Unwind in our soothing spa, refresh by our expansive outdoor pool, or savor exquisite dishes at our fine dining restaurants. Whatever your desires, Royal Paradise has been crafted to provide you with an extraordinary stay.
          </p>
          <p>
            Treat yourself to the perfect balance of elegance and tranquility. At Royal Paradise, every moment is an invitation to relax, refresh, and rejuvenate – where luxury meets comfort and every detail is curated just for you.
          </p>
        </div>

        <div className="services">
          <h3>Our Exceptional Services</h3><br />
          <div className="service-list">
            <div className="service-box">
              <i className="bx bx-bed"></i>
              <h4>24/7 Room Service</h4>
              <p>Enjoy the convenience of room service available around the clock, ensuring you have everything you need at your fingertips.</p>
            </div>
            <div className="service-box">
              <i className="bx bx-spa"></i>
              <h4>Luxury Spa & Wellness Center</h4>
              <p>Relax and rejuvenate in our world-class spa with a wide range of treatments designed to soothe your body and mind.</p>
            </div>
            <div className="service-box">
              <i className="bx bx-pool"></i>
              <h4>Outdoor Pool & Lounge</h4>
              <p>Take a dip in our beautiful outdoor pool or unwind at the lounge area while enjoying the stunning surroundings.</p>
            </div>
            <div className="service-box">
              <i className="bx bx-utensils"></i>
              <h4>Fine Dining Restaurants</h4>
              <p>Indulge in exquisite meals at our fine dining restaurants, offering a variety of international and local delicacies.</p>
            </div>
            <div className="service-box">
              <i className="bx bx-wifi"></i>
              <h4>Free Wi-Fi</h4>
              <p>Stay connected with fast, free Wi-Fi available in all rooms and public areas, so you never miss a beat.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seksioni i "Gallery" */}
      <div id="gallery-section" className="gallery-section">
      <div className="gallery-header">
    <img 
      src="https://images.pexels.com/photos/5779174/pexels-photo-5779174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
      alt="Gallery Header"
      className="gallery-header-img"
    />
    <div className="gallery-header-text">
      <h2>GALLERY</h2>
      <p>Welcome to our gallery, where every image is a taste of the extraordinary experiences we offer. Browse through snapshots that 
        capture the essence of our culinary artistry, from meticulously crafted dishes to the inviting ambiance. Each photo tells a story 
        of passion, flavor, and the joy we take in creating memorable moments for you.</p>
    </div>
  </div>
        
        <div className="gallery-grid">
          {/* Fotot me adresa URL */}
          {[
            'https://images.pexels.com/photos/6466284/pexels-photo-6466284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/22598227/pexels-photo-22598227/free-photo-of-breakfast-and-coffee-served-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/11201493/pexels-photo-11201493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/4399889/pexels-photo-4399889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/2291636/pexels-photo-2291636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/6518843/pexels-photo-6518843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/3771837/pexels-photo-3771837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/27083015/pexels-photo-27083015/free-photo-of-business-break-sweet-food-breakfast-restaurant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'https://images.pexels.com/photos/10438816/pexels-photo-10438816.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/21856117/pexels-photo-21856117/free-photo-of-breakfast-served-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            'https://images.pexels.com/photos/10438816/pexels-photo-10438816.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            'https://images.pexels.com/photos/19064707/pexels-photo-19064707/free-photo-of-men-over-table-with-food-at-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/11508780/pexels-photo-11508780.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/2771927/pexels-photo-2771927.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1861785/pexels-photo-1861785.jpeg?auto=compress&cs=tinysrgb&w=600'
          ].map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      {/* Seksioni i "Location" me hartën */}
      <div id="location-section" className="location-section"><br></br>
        <h3>Find Us Here</h3>
        <div className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223700.1490386933!2d-97.11558670486288!3d28.829485511234168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864266db2e2dac3b%3A0xeee20d566f63267d!2sVictoria%2C%20TX%2C%20USA!5e0!3m2!1sen!2snp!4v1604921178092!5m2!1sen!2snp"
        width="100%"
        height="350"
        frameBorder="0"
        style={{ border: '0' }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        title="Location"
      ></iframe>
    </div>
        <p class="location-description">Royal Paradise Hotel is located in the vibrant heart of the city, easily accessible and just a few minutes away from popular landmarks and business centers.</p>
      </div>
      

    </div>
    
  );
}

export default Landingscreen;