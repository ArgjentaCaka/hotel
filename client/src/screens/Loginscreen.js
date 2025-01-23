import React, { useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function Login() {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      // Dërgoja kërkesën për login në backend
      const result = (await axios.post('http://localhost:5000/api/users/login', user)).data;
      setLoading(false);

      // Ruaj të dhënat e përdoruesit në localStorage, përfshirë 'isAdmin'
      localStorage.setItem('currentUser', JSON.stringify(result.user));

      // Drejtoje përdoruesin në faqen kryesore me window.location.href
      window.location.href = '/home';  // Kjo do të bëjë një full page reload dhe do të shkojë në /home

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true); // Vendos gabimin nëse ka ndodhur një problem gjatë login-it
    }
  }

  return (
    <div>
      {loading && <Loader />} {/* Shfaq Loader gjatë ngarkimit */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Invalid Credentials" />} {/* Shfaq Error nëse kredencialet janë të pasakta */}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="email" // Përdorim 'email' si tip inputi për email
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Vendosim email në state
            />
            <input
              type="password" // Përdorim 'password' për inputin e fjalëkalimit
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Vendosim password në state
            />
            <button className="btn btn-primary mt-3" onClick={Login}>Login</button> {/* Butoni për login */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
