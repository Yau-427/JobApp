import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import SelectField from '../ui/SelectField';
import InputField from '../ui/InputField';
import useFormValidation from '../../hooks/useFormValidation';
import { fetchCategories } from '../../services/api';

const Step2AddressJob = () => {
    const { formData, updateFormData, setCurrentStep } = useContext(FormContext);
    const { errors, validate } = useFormValidation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data.map(category => ({
                    value: category.slug,
                    label: category.slug.charAt(0).toUpperCase() + category.slug.slice(1).replace(/-/g, ' ')
                })));
            } catch (error) {
                console.error('Error loading categories:', error);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (name, value) => {
        updateFormData('address', { [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(formData.address, 'address')) {
            setCurrentStep(3);
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Адрес и место работы</h2>

            {loading ? (
                <div className="mb-3">
                    <label className="form-label">Место работы</label>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <SelectField
                    label="Место работы"
                    name="workplace"
                    value={formData.address.workplace}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Выберите место работы' },
                        ...categories
                    ]}
                    error={errors.workplace}
                    required
                />
            )}

            <InputField
                label="Адрес проживания"
                type="text"
                name="address"
                value={formData.address.address}
                onChange={handleChange}
                error={errors.address}
                placeholder="Введите ваш адрес"
                required
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
    );
};

export default Step2AddressJob;