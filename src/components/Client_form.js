import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import * as yup from 'yup';


const clientLoginForm = ({ submitClient }) => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        username: '',
        password: '',
    })

    const [disabled, setDisabled] = useState(true)

    const clientLoginSchema = yup.object().shape({
        username: yup.string().required('Username is required!'),
        password: yup
            .string()
            .required('Password is required!')
            .min(6, 'Password must be 6 chars long'),
    })

    const validateChange = (event) => {
        yup.reach(clientLoginSchema, event.target.name)
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
        clientLoginSchema.isValid(formState).then((valid) => {
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
            username: '',
            password: '',
        })
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h1>Returning Client</h1>
            <FormGroup>
                <Label htmlFor='username'>Username</Label>
                <Input
                    type='text'
                    name='username'
                    id='username'
                    placeholder='username'
                    value={formState.username}
                    onChange={handleChange}
                    cy-data='username'
                />
                {error.name.length > 0 ? (
                    <p className='error'>{errors.username}</p>
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
                {errors.password.lenght > 0 ? (
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

export default clientLoginForm;