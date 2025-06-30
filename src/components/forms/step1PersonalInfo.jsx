import { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import PhoneInput from "../ui/PhoneInput";
import useFormValidation from '../../hooks/useFormValidation';
import '../../styles/AllStyles.css'
const Step1PersonalInfo = () => {
    const { formData, updateFormData, setCurrentStep } = useContext(FormContext);
    const { errors, validate } = useFormValidation();

    const handleChange = (name, value) => {
        updateFormData('personal', { [name]: value });
    };

    // Маска для телефона (0XXX XXX XXX)
    const phoneMask = (value) => {
        if (!value) return '';

        let phone = value.replace(/\D/g, '');
        if (phone.length > 0) {
            phone = phone.match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,3})/);
            phone = !phone[2]
                ? phone[1]
                : phone[1] + phone[2] + (phone[3] ? ' ' + phone[3] : '') + (phone[4] ? ' ' + phone[4] : '');
        }
        return phone;
    };

    const handleSubmit = (e) => {
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
            <h2 className="form-title">Личные данные</h2>

            <PhoneInput
                label="Телефон"
                type="tel"
                name="phone"
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