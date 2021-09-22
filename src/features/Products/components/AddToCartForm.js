import React from 'react';
import { PropTypes } from 'prop-types';
import { Box, Button, makeStyles } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import QuantityField from 'components/form-controls/QuantityField';


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

function AddToCartForm({ onSubmit = null }) {
    const classes = useStyles();

    const schema = yup.object().shape({
        quantity: yup.number().min(1, 'Minimum values is 1')
            .required('Please enter quatity')
            .typeError('Please enter a number'),
    });

    const form = useForm({
        defaultValues: {
            quantity: 1
        },
        resolver: yupResolver(schema),
    })

    const submitForm = async function (values) {
        if (onSubmit) {
            await onSubmit(values);
        }
    }
    return (
        <Box>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <QuantityField name='quantity' label='Quantity' form={form} />

                <Button type='submit' variant='contained' color='primary' fullWidth>
                    Add
                </Button>
            </form>
        </Box>
    )
}

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default AddToCartForm;
