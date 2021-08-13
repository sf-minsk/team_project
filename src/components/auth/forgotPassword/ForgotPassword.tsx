import React from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {changePasswordTC} from "../../../bll/changePassword-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";
import Container from "@material-ui/core/Container/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ErrorSnackbar} from "../../../features/errors/ErrorSnackbar";


export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const changeProcess = useSelector<AppRootStateType, boolean>(state => state.changePassword.changeProcess)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required field'),
        }),
        onSubmit: values => {
            dispatch(changePasswordTC(values.email))
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

    if (!changeProcess) {
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
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Password recovery
                    </Typography>
                    <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
                        <TextField
                            style={{height: '65px'}}
                            id="email"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Enter your email address"
                            // autoComplete="email"
                            type="email"
                            autoFocus
                            helperText={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && !!formik.errors.email}
                            {...formik.getFieldProps('email')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!formik.isValid || status === 'loading'}
                        >
                            Recovery
                        </Button>
                    </form>
                </div>
            </Container>
        )
    } else {
        return (
            <Container component="div" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOpenOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        CHECK YOUR EMAIL
                    </Typography>
                </div>
            </Container>
        )
    }
}