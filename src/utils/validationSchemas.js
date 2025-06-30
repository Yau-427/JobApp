import * as yup from 'yup';

export const personalSchema = yup.object().shape({
    phone: yup.string()
        .required('Телефон обязателен')
        .matches(/^0\d{9}$/, 'Номер должен начинаться с 0 и содержать 10 цифр'),
    firstName: yup.string()
        .required('Имя обязательно')
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 50 символов'),
    lastName: yup.string()
        .required('Фамилия обязательна')
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 50 символов'),
    gender: yup.string()
        .required('Выберите пол')
        .oneOf(['male', 'female'], 'Неверное значение')
});

export const addressSchema = yup.object().shape({
    workplace: yup.string()
        .required('Выберите место работы'),
    address: yup.string()
        .required('Адрес обязателен')
        .min(5, 'Минимум 5 символов')
        .max(100, 'Максимум 100 символов')
});

export const loanSchema = yup.object().shape({
    amount: yup.number()
        .required('Укажите сумму')
        .min(200, 'Минимум $200')
        .max(1000, 'Максимум $1000'),
    term: yup.number()
        .required('Укажите срок')
        .min(10, 'Минимум 10 дней')
        .max(30, 'Максимум 30 дней')
});

export const schemas = {
    personal: personalSchema,
    address: addressSchema,
    loan: loanSchema
};