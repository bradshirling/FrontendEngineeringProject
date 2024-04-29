import React from 'react';
import '../App.css'; // Import CSS file for styling

function About() {
    return (
        <div className="about-container">
            <h2 className="about-heading">About Our Application</h2>
            <div className="about-content">
                <p>
                    Welcome to our web-based application designed to assist ABC Industrial Management in upgrading its outdated software to a faster and more efficient platform.
                </p>
                <p>
                    The database management system will maintain client information and inventory data, providing easy access via the web application. Our software aims to exceed client expectations by offering robust search functionality, a responsive interface, and features like Launch Screen and Landing Page.
                </p>
                <p>
                    This project aims to develop a tailored website to streamline access to client contacts and inventory management, providing a user-friendly interface for data manipulation.
                </p>
            </div>
        </div>
    );
}

export default About;