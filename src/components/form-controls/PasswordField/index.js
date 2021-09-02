import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
import { FormHelperText } from '@material-ui/core';

const PasswordField = ({ form, name, label, disable }) => {
    const { control } = form;
    const [showPassword, setShowPassword] = useState(false);

    const togglrShowPassword = function () {
        setShowPassword(x => !x);
    }

    return (
        <FormControl fullWidth margin='normal' variant="outlined">
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, onBlur, value, ref },
                    fieldState: { invalid, error }
                }) => (
                    <>
                        <OutlinedInput
                            label={label}
                            error={invalid}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            value={value}
                            disabled={disable}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglrShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText error={invalid} >{error?.message}</FormHelperText>
                    </>
                )}
            ></Controller>
        </FormControl>
    )
}

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    lable: PropTypes.string,
    disable: PropTypes.bool,
}

export default PasswordField
