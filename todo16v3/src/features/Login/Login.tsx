import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik"

interface MyFormValues {
    email?: string,
    password?: string,
}

export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: MyFormValues = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(values.email)) {
                errors.password = 'Password must consist of at least one number, one Capital letter, one LowerCase letter and not less than 6 symbols ';
            }

            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    console.log(formik.errors)

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <FormGroup>
                    <TextField label="Email" margin="normal" id='email' name='email' onChange={formik.handleChange}
                               value={formik.values.email}/>
                    {formik.errors.email && <div>{formik.errors.email}</div>}
                    <TextField type="password" label="Password"
                               margin="normal" id={'password'} name='password'
                               onChange={formik.handleChange}
                               value={formik.values.password}
                    />
                    {formik.errors.password && <div>{formik.errors.password}</div>}
                    <FormControlLabel label={'Remember me'}
                                      control={<Checkbox id='rememberMe'
                                                         name='password'
                                                         onChange={formik.handleChange}
                                                         checked={formik.values.rememberMe}/>}/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Login
                    </Button>
                </FormGroup>
            </FormControl>
        </Grid>
    </Grid>
}