import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from 'components/form-controls/InputField';



const TodoForm = ({ onSubmit }) => {

    const schema = yup.object().shape({
        title: yup.string().required('Please enter title'),

    });

    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema),
    })

    const hanleSubmit = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
        form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(hanleSubmit)}>
            <InputField name='title' label='ToDo' form={form} />
        </form>
    )
}

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default TodoForm
