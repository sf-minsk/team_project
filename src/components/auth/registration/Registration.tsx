import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpTC} from '../../../bll/register-reducer';
import {ErrorSnackbar} from '../../errors/ErrorSnackbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {AppRootStateType} from '../../../bll/store';
import {RequestStatusType} from '../../../bll/app-reducer';
import {Redirect} from 'react-router-dom';

export const Registration = () => {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.register.isRegistered)

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
        onSubmit: values => {
            dispatch(setSignUpTC(values))
            formik.resetForm()
        },
    })


    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Grid container justifyContent="center" style={{padding: '30px 0'}}>
                {
                    status === 'loading' &&
                    <CircularProgress style={{position: 'fixed', top: '25%', textAlign: 'center'}}/>
                }
                <Grid item>
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
                                        disabled={!formik.isValid || status === 'loading'}
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

