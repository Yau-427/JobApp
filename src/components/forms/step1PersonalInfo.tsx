import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import PhoneInput from "../ui/PhoneInput";
import ThemeToggle from '../ui/ThemeToggle';
import useFormValidation from '../../hooks/useFormValidation';
import '../../styles/AllStyles.css';

const Step1PersonalInfo: React.FC = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error('FormContext must be used within FormProvider');
    const { formData, updateFormData, setCurrentStep } = context;
    const { errors, validate } = useFormValidation();

    const handleChange = (name: string, value: string) => {
        updateFormData('personal', { [name]: value });
    };

    // Маска для телефона (0XXX XXX XXX)
    const phoneMask = (value: string) => {
        if (!value) return '';

        let phone = value.replace(/\D/g, '');
        if (phone.length > 0) {
            const match = phone.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,3})/);
            if (match) {
                phone = !match[2]
                    ? match[1]
                    : match[1] + match[2] + (match[3] ? ' ' + match[3] : '') + (match[4] ? ' ' + match[4] : '');
            }
        }
        return phone;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate(formData.personal, 'personal')) {
            setCurrentStep(2);
        }
    };

    const genderOptions = [
        { value: '', label: 'Выберите пол' },
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' },
        { value: 'UFO', label: 'Инопланетная раса' }
    ];

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <ThemeToggle />
            <h2 className="form-title">Личные данные</h2>

            <PhoneInput
                label="Телефон"
                value={formData.personal.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="0XXX XXX XXX"
            />

            <InputField
                label="Имя"
                type="text"
                name="firstName"
                value={formData.personal.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="Введите ваше имя"
            />

            <InputField
                label="Фамилия"
                type="text"
                name="lastName"
                value={formData.personal.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Введите вашу фамилию"
            />

            <SelectField
                label="Пол"
                name="gender"
                value={formData.personal.gender}
                onChange={handleChange}
                options={genderOptions}
                error={errors.gender}
            />

            <div className="mt-4">
                <button type="submit" className="btn-next">
                    Далее
                </button>
            </div>
        </form>
    );
};

export default Step1PersonalInfo;