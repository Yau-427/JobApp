import React, { useContext, useState, useEffect } from 'react';
import Step1PersonalInfo from '../components/forms/step1PersonalInfo';
import Step2AddressJob from '../components/forms/step2AdressJob';
import Step3LoanParams from '../components/forms/step3LoadParams';
import Modal from '../components/ui/Modal';
import LoadingAnimation from '../components/ui/LoadingAnimation';
import { FormContext } from '../context/FormContext';

const MultiStepForm: React.FC = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error('FormContext must be used within FormProvider');
    const { currentStep } = context;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [currentStep]);

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1PersonalInfo />;
            case 2: return <Step2AddressJob />;
            case 3: return <Step3LoanParams />;
            default: return <Step1PersonalInfo />;
        }
    };

    return (
        <div className="container">
            <h1 className={'main-title'}>Заявка на займ</h1>
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                    <LoadingAnimation />
                </div>
            ) : (
                renderStep()
            )}
        </div>
    );
};


export default MultiStepForm;