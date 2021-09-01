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

const LoginForm = ({ onSubmit }) => {
    const classes = useStyles();

    const schema = yup.object().shape({
        identifier: yup.string().required('Please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string().required('Please enter your password')
    });

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
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
                Sign In
            </Typography>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <InputField name='identifier' label='Email' form={form} />
                <PasswordField name='password' label='Password' form={form} />

                <Button type='submit' className={classes.submit} variant='contained' color='primary' fullWidth>
                    Sign In
                </Button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
}
export default LoginForm;
