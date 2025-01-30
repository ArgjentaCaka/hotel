import React, { useState, useEffect } from 'react';

function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                const parsedUser = JSON.parse(currentUser);  // Konvertoni objektin në JSON
                setUser(parsedUser); // Ruaj përdoruesin në state nëse është valid
            } catch (error) {
                console.error('Error parsing currentUser:', error);
            }
        }
    }, []);

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/home">
    <img src="https://img.freepik.com/premium-vector/elegant-initial-letter-r-with-crown-logo-vector-creative-lettering-logo-vector-illustration_148524-2394.jpg" alt="Royal Paradise" />
  </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "><i className="fa fa-bars" style={{ color: 'white' }}></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto ">
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user"></i> {user.name}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/profile">
                                        Profile</a>
                                    <a className="dropdown-item" href="#" onClick={logout}>Log Out</a>
                                </div>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
