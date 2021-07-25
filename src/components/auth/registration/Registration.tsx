import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux';
import {setSignUpTC} from '../../../bll/register-reducer';
import {ErrorSnackbar} from '../../ErrorSnackbar';

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
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>}
                </div>

                <button type="submit" disabled={!formik.isValid}>Submit</button>
            </form>
            <ErrorSnackbar/>
        </>
    )
}


// type FormikValuesType = {
//     email?: string
//     password?: string
//     confirmPassword?: string
// }


