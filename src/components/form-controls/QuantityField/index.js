import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import { Box, FormHelperText, makeStyles } from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {},
    box: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        maxWidth: '200px',
    },
}))

const QuantityField = ({ form, name, label, disable }) => {
    const classes = useStyles();
    const { control, setValue } = form;

    return (
        <FormControl fullWidth margin='normal' variant="outlined" size="small">
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, error }
                }) => (
                    <>
                        <Box className={classes.box} >
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) > 1 ? Number.parseInt(value) - 1 : 1)} >
                                <RemoveCircleOutline />
                            </IconButton>
                            <OutlinedInput
                                error={invalid}
                                onChange={onChange}
                                onBlur={onBlur}
                                name={name}
                                value={value}
                                disabled={disable}
                                type='number'
                            />
                            <IconButton onClick={() => setValue(name, Number.parseInt(value) + 1)} >
                                <AddCircleOutline />
                            </IconButton>
                        </Box>
                        <FormHelperText error={invalid} >{error?.message}</FormHelperText>
                    </>
                )}
            ></Controller>
        </FormControl>
    )
}

QuantityField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    lable: PropTypes.string,
    disable: PropTypes.bool,
}

export default QuantityField
