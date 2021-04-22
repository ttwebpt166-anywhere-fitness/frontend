import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import * as yup from 'yup';


const instructorRegisterForm = ({ submitClient }) => {
    const [formState, setFormState] = useState({
        instructorId: '',
        gymCode: '',
        password: '',
        confirmpassword: '',
        terms: '',
    })

    const [errors, setErrors] = useState({
        instructorId: '',
        gymCode: '',
        password: '',
        confirmpassword: '',
        terms: '',
    })

    const [disabled, setDisabled] = useState(true)

    const instructorRegisterSchema = yup.object().shape({
        instructorId: yup.string().required('You must enter your ID'),
        gymCode: yup.string().required('You must enter your Gym Code'),
        password: yup
            .string()
            .required('Password is required!')
            .min(6, 'Password must be 6 chars long'),
        confirmpassword: yup.string().required('Please reenter your password to confirm!'),
        terms: yup
            .boolean()
            .oneOf([true], 'You must agree to the Terms of Service'),
    })

    const validateChange = (event) => {
        yup.reach(instructorRegisterSchema, event.target.name)
            .validate(event.target.value)
            .then((valid) => {
                setErrors({ ...errors, [event.target.name]: '' })
            })
            .catch((err) => {
                console.log('ERROR!', err)
                setErrors({ ...errors, [event.target.name]: err.errors[0] })
            })
    }

    useEffect(() => {
        instructorRegisterSchema.isValid(formState).then((valid) => {
            console.log('valid?', valid)
            setDisabled(!valid)
        })
    }, [formState])

    const handleChange = (event) => {
        event.persist()
        validateChange(event)
        if (event.target.name === true){
            setFormState({ ...formState, [event.target.name]: event.target.value })
        }else false
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        submitClient(formState)
        submitClient(formState)
        setFormState({
            instructorId: '',
            gymCode: '',
            password: '',
            confirmpassword: '',
            terms: '',
        })
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h1>Returning Client</h1>
            <FormGroup>
                <Label htmlFor='instructorId'>Instructor ID</Label>
                <Input
                    type='text'
                    name='instructorId'
                    id='instructorId'
                    placeholder='Instructor ID'
                    value={formState.instructorId}
                    onChange={handleChange}
                    cy-data='instructorId'
                />
                {error.name.length > 0 ? (
                    <p className='error'>{errors.instructorId}</p>
                ): null}
            </FormGroup>
            <FormGroup>
                <Label htmlFor='gymCode'>Gym Code</Label>
                <Input
                    type='text'
                    name='gymCode'
                    id='gymCode'
                    placeholder='Gym Code'
                    value={formState.gymCode}
                    onChange={handleChange}
                    cy-data='gymCode'
                />
                {error.name.length > 0 ? (
                    <p className='error'>{errors.gymCode}</p>
                ): null}
            </FormGroup>
            <FormGroup>
                <Label htmlFor='password'>Password</Label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    value={formState.password}
                    onChange={handleChange}
                    cy-data='password'
                />
                {errors.password.length > 0 ? (
                    <p className='error'>{errors.password}</p>
                ): null}
            </FormGroup>
            <FormGroup>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input  
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='Confirm Password'
                    value={formState.confirmpassword}
                    onChange={handleChange}
                    cy-data='confirmPassword'
                />
                {errors.confirmpassword.length > 0 ? (
                    <p className='error'>{errors.confirmpassword}</p>
                ): null}
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input
                        type='checkbox'
                        onChange={handleChange}
                        name='terms'
                        cy-data='terms'
                    />{' '}
                    I agree to the Terms of Service
                </Label>
            </FormGroup>
            <Button
                type='submit'
                disabled={disabled}
                cy-data='submit'
            >
                Register
            </Button>
        </Form>
    )
}

export default instructorRegisterForm;