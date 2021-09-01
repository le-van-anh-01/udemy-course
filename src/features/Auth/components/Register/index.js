import React from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../RegisterForm'
import { useDispatch } from 'react-redux'
import { register } from 'features/Auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Register = () => {
    const dispatch = useDispatch()

    const hanleSubmit = async function (values) {
        try {
            // auto set user name = values.email;
            values.userName = values.email;
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);
            console.log('Newuser', user)
        } catch (error) {
            console.log('Failed to register', error);
        }

    }
    return (
        <div>
            <RegisterForm onSubmit={hanleSubmit} />
        </div>
    )
}

Register.propTypes = {

}

export default Register;

