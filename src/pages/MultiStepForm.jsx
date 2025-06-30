import { useContext,useState } from 'react';
import Step1PersonalInfo from '../components/forms/step1PersonalInfo';
import Step2AddressJob from '../components/forms/step2AdressJob';
import Step3LoanParams from '../components/forms/step3LoadParams';
import Modal from '../components/ui/Modal';
import { FormContext } from '../context/FormContext';

const MultiStepForm = () => {
    const { currentStep } = useContext(FormContext);
    const [showModal, setShowModal] = useState(false);

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <Step1PersonalInfo />;
            case 2: return <Step2AddressJob />;
            case 3: return <Step3LoanParams onSubmit={() => setShowModal(true)} />;
            default: return <Step1PersonalInfo />;
        }
    };

    return (
        <div>
            <h1 className={'main-title'}>Заявка на займ</h1>
            {renderStep()}
            <Modal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
};


export default MultiStepForm;