import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux';
import {setSignUpTC} from '../../../bll/register-reducer';
import {ErrorSnackbar} from '../../ErrorSnackbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Button, FormControl, FormGroup, TextField, Typography} from '@material-ui/core';

export const Registration = () => {

    const dispatch = useDispatch()
    useEffect(() => {

    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Password is required'),
        }),

        // validate: values => {
        //     const errors: FormikValuesType = {}
        //
        //     if (!values.email) {
        //         errors.email = 'Email is required';
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {               //(!/.+@.+\..+/i.test(values.email))
        //         errors.email = 'Invalid email address';
        //     }
        //
        //     if (!values.password) {
        //         errors.password = 'Password is required';
        //     } else if (values.password.length < 4 || values.password.length > 12) {
        //         errors.password = 'Must be at least 4 and no more than 12 characters';
        //     }
        //
        //     if (!values.confirmPassword) {
        //         errors.confirmPassword = 'Password is required';
        //     } else if (values.confirmPassword.length < 4  || values.password.length > 12) {
        //         errors.confirmPassword = 'Must be at least 4 and no more than 12 characters';
        //     }
        //
        //     return errors
        // },
        onSubmit: values => {
            dispatch(setSignUpTC(values))
            // alert(JSON.stringify(values));
        },
    })

    return (
        <>
            <Grid container justifyContent="center" style={{padding: '30px 0'}}>
                <Grid item xs={4}>
                    <Paper elevation={4}
                           style={{width: '320px', padding: '15px', textAlign: 'center', backgroundColor: '#E6E7FF'}}>
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl style={{width: '300px'}}>
                                <Grid item>
                                    <Typography variant={'h5'}>
                                        Sign Up
                                    </Typography>
                                </Grid>
                                <FormGroup>
                                    <TextField
                                        label="Email"
                                        margin="normal"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email &&
                                    <div style={{color: 'red'}}>{formik.errors.email}</div>}

                                    <TextField
                                        type="password"
                                        label="Password"
                                        margin="normal"
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.touched.password && formik.errors.password &&
                                    <div style={{color: 'red'}}>{formik.errors.password}</div>}

                                    <TextField
                                        type="password"
                                        label="Confirm password"
                                        margin="normal"
                                        {...formik.getFieldProps('confirmPassword')}
                                    />
                                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!formik.isValid}
                                    >
                                        Register
                                    </Button>

                                </FormGroup>
                            </FormControl>
                        </form>
                        <ErrorSnackbar/>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}


// type FormikValuesType = {
//     email?: string
//     password?: string
//     confirmPassword?: string
// }


