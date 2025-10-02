import { useState } from 'react';
import * as yup from 'yup';

// Полные схемы валидации для всех форм
const schemas = {
    personal: yup.object().shape({
        phone: yup.string()
            .required('Телефон обязателен для заполнения')
            .matches(/^0\d{9}$/, 'Номер должен начинаться с 0 и содержать 10 цифр'),
        firstName: yup.string()
            .required('Имя обязательно для заполнения')
            .min(2, 'Имя должно содержать минимум 2 символа')
            .max(50, 'Имя не должно превышать 50 символов'),
        lastName: yup.string()
            .required('Фамилия обязательна для заполнения')
            .min(2, 'Фамилия должна содержать минимум 2 символа')
            .max(50, 'Фамилия не должна превышать 50 символов'),
        gender: yup.string()
            .required('Поле "Пол" обязательно для выбора')
            .oneOf(['male', 'female'], 'Выберите корректное значение')
    }),

    address: yup.object().shape({
        workplace: yup.string()
            .required('Место работы обязательно для выбора'),
        address: yup.string()
            .required('Адрес обязателен для заполнения')
            .min(5, 'Адрес должен содержать минимум 5 символов')
            .max(100, 'Адрес не должен превышать 100 символов')
    }),

    loan: yup.object().shape({
        amount: yup.number()
            .required('Укажите сумму займа')
            .min(200, 'Минимальная сумма - $200')
            .max(1000, 'Максимальная сумма - $1000'),
        term: yup.number()
            .required('Укажите срок займа')
            .min(10, 'Минимальный срок - 10 дней')
            .max(30, 'Максимальный срок - 30 дней')
    })
};

/**
 * Хук для валидации форм
 * @returns {Object} Объект с:
 *   - errors: объект с ошибками валидации
 *   - validate: функция для валидации данных
 */
const useFormValidation = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    /**
      * Валидирует данные формы
      * @param {Object} data - Данные для валидации
      * @param {string} step - Ключ схемы валидации ('personal', 'address', 'loan')
      * @returns {boolean} Результат валидации (true - успешно)
      */
    const validate = (data: any, step: keyof typeof schemas) => {
        try {
            // Синхронная валидация с отключением прерывания после первой ошибки
            schemas[step].validateSync(data, { abortEarly: false });
            setErrors({}); // Очищаем ошибки при успешной валидации
            return true;
        } catch (err: unknown) {
            // Обрабатываем ошибки валидации
            const newErrors: Record<string, string> = {};

            // Группируем ошибки по имени поля
            if (err instanceof yup.ValidationError) {
                err.inner.forEach((error: yup.ValidationError) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
            }

            setErrors(newErrors);
            return false;
        }
    };

    return { errors, validate };
};

// Экспорт по умолчанию
export default useFormValidation;

// Именованный экспорт для возможности импорта через деструктуризацию
export { useFormValidation };