import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function NavigationButton({ label, to }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(to);
    };
    NavigationButton.handleNavigate = handleNavigate;

    return (
        <button type="button" className="btn" onClick={handleNavigate}>
            {label}
        </button>
    );
}

