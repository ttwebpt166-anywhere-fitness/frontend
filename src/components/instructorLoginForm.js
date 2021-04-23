import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import * as yup from 'yup';


const instructorLoginForm = ({ submitInstructor }) => {
    const [formState, setFormState] = useState({
        instructorId: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        instructorId: '',
        password: '',
    })

    const [disabled, setDisabled] = useState(true)

    const instructorLoginSchema = yup.object().shape({
        instructorId: yup.string().required('instructorId is required!'),
        password: yup
            .string()
            .required('Password is required!')
            .min(6, 'Password must be 6 chars long'),
    })

    const validateChange = (event) => {
        yup.reach(instructorLoginSchema, event.target.name)
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
        instructorLoginSchema.isValid(formState).then((valid) => {
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
        submitInstructor(formState)
        submitInstructor(formState)
        setFormState({
            instructorId: '',
            password: '',
        })

    const [post, setPost] = useState([])

    axios
        .post('https://anywhere-fitness-server.herokuapp.com/v1/', user)
        .then((response) => {
            setPost(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h1>Instructor Login</h1>
            <FormGroup>
                <Label htmlFor='instructorId'>Instructor Id</Label>
                <Input
                    type='text'
                    name='instructorId'
                    id='instructorId'
                    placeholder='instructorId'
                    value={formState.instructorId}
                    onChange={handleChange}
                    cy-data='instructorId'
                />
                {error.name.length > 0 ? (
                    <p className='error'>{errors.instructorId}</p>
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
            <Button
                type='submit'
                disabled={disabled}
                cy-data='submit'
            >
                Login
            </Button>
        </Form>
    )
}

export default instructorLoginForm;