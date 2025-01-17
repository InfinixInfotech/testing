import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function BackButton({ to }) {
    const navigate = useNavigate();

    const handleBack = () => {
        // If `to` prop is provided, navigate to that route. Otherwise, go back to the previous page.
        if (to) {
            navigate(to);
        } else {
            window.history.back(); // Go back to the previous page if no 'to' prop is provided
        }
    };

    return (
        <button 
            type="button" 
            className="Csv-btn mt-3 px-2 py-0 text-white no-print" 
            style={{ borderRadius: "none" }} 
            onClick={handleBack}
        >
            <i className="bi bi-arrow-left-short"></i> Back
        </button>
    );
}
