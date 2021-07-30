import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from '../../../bll/auth-reducer';
import {AppRootStateType} from '../../../bll/store';
import {Link as RouterLink} from 'react-router-dom'
import {RequestStatusType} from '../../../bll/app-reducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Yup from 'yup';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';

//
// type FormikErrorType = {
//     email?: string
//     password?: string
//     rememberMe?: boolean
// }

export const Login = () => {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                // .min(8, 'Your password is too short')
                .required('Password is required')
        }),

        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm()
        },
    });

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
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    if (requestStatus === 'loading') {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    // if (isLoggedIn) {
    //     return <Redirect to={'/profile'}/>
    // }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
                    <TextField
                        style={{height: '65px'}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        // autoComplete="email"
                        type="email"
                        // autoFocus
                        // error={!!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && !!formik.errors.email}
                        {...formik.getFieldProps('email')}
                    />

                    <TextField
                        style={{height: '65px'}}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        // error={!!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && !!formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formik.isValid || status === 'loading'}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/changepassword">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/registration">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <ErrorSnackbar/>
        </Container>

    )
}