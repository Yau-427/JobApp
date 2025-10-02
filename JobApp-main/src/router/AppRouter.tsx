import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MultiStepForm from '../pages/MultiStepForm';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MultiStepForm />} />
        </Routes>
    );
};