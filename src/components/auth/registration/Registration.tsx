import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import {setSignUpTC} from '../../../bll/register-reducer';
import {ErrorSnackbar} from '../../errors/ErrorSnackbar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {AppRootStateType} from '../../../bll/store';
import {RequestStatusType} from '../../../bll/app-reducer';
import {Redirect} from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export const Registration: React.FC = () => {

    const classes = useStyles();
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
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    {
                        status === 'loading' &&
                        <CircularProgress style={{position: 'fixed', top: '40%', textAlign: 'center'}}/>
                    }
                    <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>

                        <TextField
                            variant="outlined"
                            required
                            fullWidth

                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}


                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="password"

                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <TextField
                            variant="outlined"
                            required
                            fullWidth

                            type="password"
                            label="Confirm password"
                            margin="normal"
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!formik.isValid || status === 'loading'}
                        >
                            Register
                        </Button>
                    </form>
                </div>
                <ErrorSnackbar/>
            </Container>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))