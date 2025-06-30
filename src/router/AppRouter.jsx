import { Routes, Route } from 'react-router-dom';
import MultiStepForm from '../pages/MultiStepForm';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MultiStepForm />} />
        </Routes>
    );
};