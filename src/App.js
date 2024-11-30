import React, { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Get the API URL from the environment variables
  const apiUrl = process.env.REACT_APP_API_URL;

  // Handle the option click to send a request to the backend
  const handleOptionClick = async (option) => {
    try {
      // Send POST request to backend API
      const response = await fetch(`${apiUrl}/api/result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice: option }), // Send user's choice as JSON
      });

      // Parse response from backend
      const data = await response.json();
      setResult(data.result); // Set the result to display
      setShowResult(true); // Show result message

      // Hide result after 5 seconds
      setTimeout(() => setShowResult(false), 5000);
    } catch (error) {
      console.error('Error fetching result:', error);
      setResult('Something went wrong! Please try again.'); // Show error message if the request fails
      setShowResult(true);

      // Hide error message after 5 seconds
      setTimeout(() => setShowResult(false), 5000);
    }
  };

  return (
    <div className="App">
      <h1>Aarvi's Outfit</h1>
      
      {/* Display the images */}
      <div className="images">
        <img src="/images/black-outfit.jpeg" alt="Black Outfit" />
        <img src="/images/colorful-outfit.jpeg" alt="Colorful Outfit" />
      </div>

      {/* Display the 3 options */}
      <div className="options">
        <button onClick={() => handleOptionClick('Aarvi looks hot in black outfit')}>
          Aarvi looks hot in black outfit
        </button>
        <button onClick={() => handleOptionClick('Aarvi looks hot in colorful outfit')}>
          Aarvi looks hot in colorful outfit
        </button>
        <button onClick={() => handleOptionClick('both')}>
          Both
        </button>
      </div>

      {/* Show the result */}
      {showResult && (
        <div className="result">
          <p>{result} 🔥 ❤️</p>
        </div>
      )}
    </div>
  );
}

export default App;
