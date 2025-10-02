import { FormData } from '../context/FormContext';

export const fetchCategories = async (): Promise<any[]> => {
    const response = await fetch('https://dummyjson.com/products/categories');
    return await response.json();
};

export const submitApplication = async (data: FormData): Promise<any> => {
    const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: `${data.personal.firstName} ${data.personal.lastName}`
        })
    });
    return await response.json();
};