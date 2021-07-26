import React from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {changePasswordTC} from "../../../bll/changePassword-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../bll/store";


export const ForgotPassword = () => {
    const dispatch = useDispatch()
    const changeProcess = useSelector<AppRootStateType, boolean>(state => state.changePassword.changeProcess)
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            dispatch(changePasswordTC(values.email))
        },
    })
    if (!changeProcess) {
        return (
            <form onSubmit={formik.handleSubmit}>
                <input
                    id="email"
                    // type="email"
                    {...formik.getFieldProps('email')}
                />
                {
                    formik.touched.email &&
                    formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>
                }
                <button type="submit">Submit</button>
            </form>
        )
    } else {
        return (
            <div>CHECK YOUR EMAIL</div>
        )
    }
}


// disabled={!formik.isValid}