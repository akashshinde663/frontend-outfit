import React, { useState } from "react";
import "./App.css";

function App() {
    const [result, setResult] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleOptionClick = async (option) => {
        try {
            const response = await fetch("/api/result", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ choice: option }),
            });
    
            const data = await response.json();
            setResult(data.result);
            setShowResult(true);
    
            // Hide result after 5 seconds
            setTimeout(() => setShowResult(false), 5000);
        } catch (error) {
            console.error("Error fetching result:", error);
            setResult("Something went wrong! Please try again.");
            setShowResult(true);
    
            // Hide error message after 5 seconds
            setTimeout(() => setShowResult(false), 5000);
        }
    };
    


    return (
        <div className="App">
            <h1>Aarvi's Outfit</h1>
            <div className="images">
                <img src="/images/colorful-outfit.jpeg" alt="Colorful Outfit" />
                <img src="/images/Black-outfit.jpeg" alt="Black Outfit" />
            </div>
            <div className="options">
                <button onClick={() => handleOptionClick("Black")}>
                    Aarvi looks hot in Black outfit
                </button>
                <button onClick={() => handleOptionClick("colorful")}>
                    Aarvi looks hot in colorful outfit
                </button>
                <button onClick={() => handleOptionClick("both")}>
                    Both
                </button>
            </div>
            {showResult && <div className="result">{result}</div>}
        </div>
    );
}

export default App;
