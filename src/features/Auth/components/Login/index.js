import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from 'features/Auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import LoginForm from '../LoginForm'
import { useSnackbar } from 'notistack'

const Login = ({ closeDialog }) => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const hanleSubmit = async function (values) {
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            if (closeDialog) {
                closeDialog();
            }
        } catch (error) {
            console.log('Failed to Login', error);
            enqueueSnackbar(error.message, { variant: 'error' });
        }

    }
    return (
        <div>
            <LoginForm onSubmit={hanleSubmit} />
        </div>
    )
}

Login.propTypes = {
    closeDialog: PropTypes.func,
}

export default Login;

