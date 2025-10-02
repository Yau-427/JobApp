import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
    const context = useContext(FormContext);
    if (!context) throw new Error('FormContext must be used within FormProvider');
    const { formData } = context;

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                {children ? children : (
                    <>
                        <h3 className="modal-title">
                            Поздравляем, {formData.personal.lastName} {formData.personal.firstName}.
                        </h3>
                        <p className="modal-text">
                            Вам одобрена ${formData.loan.amount} на {formData.loan.term} дней.
                        </p>
                    </>
                )}
                <button className="btn-close" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>

    );
};

export default Modal;