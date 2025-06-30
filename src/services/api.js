export const fetchCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    return await response.json();
};

export const submitApplication = async (data) => {
    const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: `${data.personal.firstName} ${data.personal.lastName}`
        })
    });
    return await response.json();
};