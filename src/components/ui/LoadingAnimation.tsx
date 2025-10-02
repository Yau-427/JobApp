import React from 'react';
import './LoadingAnimation.css';

const LoadingAnimation: React.FC = () => {
    return (
        <div className="loading-container">
            <svg width="100" height="100" viewBox="0 0 100 100" className="loading-circle">
                <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#2E7D32', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#greenGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset="251.2"
                    className="circle-fill"
                />
            </svg>
        </div>
    );
};

export default LoadingAnimation;