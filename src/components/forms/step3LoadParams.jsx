import React, { useContext, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import RangeSlider from '../ui/RangeSlider';
import useFormValidation from '../../hooks/useFormValidation';
import { submitApplication } from '../../services/api';
import Modal from '../ui/Modal';

const Step3LoanParams = () => {
    const { formData, updateFormData, setCurrentStep } = useContext(FormContext);
    const { validate } = useFormValidation();
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name, value) => {
        updateFormData('loan', { [name]: Number(value) });
    };

    const handleBack = () => {
        setCurrentStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate(formData.loan, 'loan')) return;

        setIsSubmitting(true);
        try {
            await submitApplication(formData);
            setShowModal(true);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Параметры займа</h2>

                <RangeSlider
                    label="Сумма займа ($)"
                    name="amount"
                    value={formData.loan.amount}
                    min={200}
                    max={1000}
                    step={100}
                    onChange={handleChange}
                    displayValue={`$${formData.loan.amount}`}
                />

                <RangeSlider
                    label="Срок займа (дней)"
                    name="term"
                    value={formData.loan.term}
                    min={10}
                    max={30}
                    step={1}
                    onChange={handleChange}
                    displayValue={`${formData.loan.term} дней`}
                />

                <div className="btn-container">
                    <button type="button" className="btn-next" onClick={handleBack}>
                        Назад
                    </button>
                    <button type="submit" className="btn-next">
                        Далее
                    </button>
                </div>
            </form>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h3>Поздравляем, {formData.personal.lastName} {formData.personal.firstName}!</h3>
                <p>Вам одобрена ${formData.loan.amount} на {formData.loan.term} дней.</p>
            </Modal>
        </>
    );
};

export default Step3LoanParams;