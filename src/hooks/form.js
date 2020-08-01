import { useState } from 'react'

export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    function clearForm() {
        setValues(initialValues)
    };

    return {
        values,
        setValues,
        handleChange,
        clearForm,
    };
};