import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setStatus(response.data.status);
        } catch (error) {
            setStatus('Error submitting file');
        }
    };

    return (
        <div class = "container">
            <h1>Upload CSV File</h1>
            <div class = "submissionDiv">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <h2>Submission Status: {status}</h2>
            </div>
        </div>
    );
}

export default App;