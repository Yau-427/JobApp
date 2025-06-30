import { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        personal: { phone: '', firstName: '', lastName: '', gender: '' },
        address: { workplace: '', address: '' },
        loan: { amount: 200, term: 10 }
    });
    const [currentStep, setCurrentStep] = useState(1);

    const updateFormData = (step, data) => {
        setFormData(prev => ({
            ...prev,
            [step]: { ...prev[step], ...data }
        }));
    };

    return (
        <FormContext.Provider value={{ formData, currentStep, updateFormData, setCurrentStep }}>
            {children}
        </FormContext.Provider>
    );
};