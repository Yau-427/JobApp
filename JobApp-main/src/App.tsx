import React, { useContext, useEffect } from 'react';
import { FormProvider, FormContext } from './context/FormContext';
import { AppRouter } from './router/AppRouter';
import '../src/App.css';

const ThemeSetter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const context = useContext(FormContext);
    if (!context) throw new Error('FormContext must be used within FormProvider');
    const { theme } = context;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <FormProvider>
            <ThemeSetter>
                <AppRouter />
            </ThemeSetter>
        </FormProvider>
    );
};

export default App;