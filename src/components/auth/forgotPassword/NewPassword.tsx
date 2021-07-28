import React from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../../bll/setNewPassword-reducer";
import {AppRootStateType} from "../../../bll/store";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ErrorSnackbar} from "../../../features/errors/ErrorSnackbar";

export const NewPassword = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const newPasswordSet = useSelector<AppRootStateType, boolean>(state => state.setNewPassword.newPasswordSet)
    const token = useParams<{ token: string }>()
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(setNewPasswordTC(values.password, token.token))
        },
    })
    const classes = makeStyles((theme) => ({
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
    }))();

    if (newPasswordSet) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Container component="div" maxWidth="xs">
            <ErrorSnackbar/>
            {(status === 'loading') &&
            <div
                style={{position: 'fixed', top: '50%', left: '50%'}}>
                <CircularProgress/>
            </div>
            }
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter new password
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        style={{height: '65px'}}
                        id="password"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoFocus
                        helperText={formik.touched.password && !!formik.errors.password && formik.errors.password}
                        error={formik.touched.password && !!formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                    <TextField
                        style={{height: '65px'}}
                        id="confirmPassword"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm password"
                        type="password"
                        helperText={formik.touched.confirmPassword && !!formik.errors.confirmPassword && formik.errors.confirmPassword}
                        error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        {...formik.getFieldProps('confirmPassword')}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formik.isValid || status === 'loading'}
                    >
                        SET NEW PASSWORD
                    </Button>
                </form>
            </div>
        </Container>

    )
}
