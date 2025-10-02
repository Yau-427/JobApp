import React, { createContext, useState } from 'react';

interface PersonalData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
}

interface AddressData {
  workplace: string;
  address: string;
}

interface LoanData {
  amount: number;
  term: number;
}

export interface FormData {
  personal: PersonalData;
  address: AddressData;
  loan: LoanData;
}

interface FormContextType {
  formData: FormData;
  currentStep: number;
  theme: 'light' | 'dark';
  updateFormData: (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  toggleTheme: () => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        personal: { phone: '', firstName: '', lastName: '', gender: '' },
        address: { workplace: '', address: '' },
        loan: { amount: 200, term: 10 }
    });
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const updateFormData = (step: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
        setFormData(prev => ({
            ...prev,
            [step]: { ...prev[step], ...data }
        }));
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <FormContext.Provider value={{ formData, currentStep, theme, updateFormData, setCurrentStep, toggleTheme }}>
            {children}
        </FormContext.Provider>
    );
};