import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from 'components/form-controls/PasswordField';


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(4)
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main,
    },
    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: 'center'
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0)
    }
}))

const RegisterForm = ({ onSubmit }) => {
    const classes = useStyles();

    const schema = yup.object().shape({
        fullName: yup.string().required('Please enter your full name')
            .test('Should has at least two words', 'Please enter at lest two words', (value) => {
                return value.trim().split(' ').length >= 2;
            }),
        email: yup.string().required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password')
            .min(6, 'Please enter at least 6 characters.'),
        retypePassword: yup.string().required('Please retype your password')
            .oneOf([yup.ref('password')], 'Password does not match')
    });

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    })

    const submitForm = async function (values) {
        console.log(isSubmitting);
        if (onSubmit) {
            await onSubmit(values);
        }
    }
    const { isSubmitting } = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress />}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>
            <Typography component='h3' variant='h5' className={classes.title}>
                Create An Account
            </Typography>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <InputField name='fullName' label='Full Name' form={form} />
                <InputField name='email' label='Email' form={form} />
                <PasswordField name='password' label='Password' form={form} />
                <PasswordField name='retypePassword' label='Retype Password' form={form} />

                <Button type='submit' className={classes.submit} variant='contained' color='primary' fullWidth>
                    Create An Account
                </Button>
            </form>
        </div>
    )
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}
export default RegisterForm;
