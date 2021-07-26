import React from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../../bll/setNewPassword-reducer";
import {AppRootStateType} from "../../../bll/store";

export const NewPassword = () => {
    const dispatch = useDispatch()
    const newPasswordSet = useSelector<AppRootStateType, boolean>(state => state.setNewPassword.newPasswordSet)
    let token = useParams<{ token: string }>()
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

    if (newPasswordSet) {
        return <Redirect to={'/login'}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
            />
            {
                formik.touched.password &&
                formik.errors.password &&
                <div style={{color: 'red'}}>{formik.errors.password}</div>
            }
            <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
            />
            {
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>
            }
            <button type="submit">Submit</button>
        </form>
    )
}
