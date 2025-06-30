import { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

const Modal = ({ show, onClose }) => {
    const { formData } = useContext(FormContext);

    if (!show) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h3 className="modal-title">
                    Поздравляем, {formData.personal.lastName} {formData.personal.firstName}.
                </h3>
                <p className="modal-text">
                    Вам одобрена ${formData.loan.amount} на {formData.loan.term} дней.
                </p>
                <button className="btn-close" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>

    );
};

export default Modal;