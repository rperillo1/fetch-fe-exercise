import React, { useEffect, useState, useContext } from 'react';
import { fetchOccupationsAndStates, postFormData } from '../../services/fetchApi';
import { Spinner } from '../Spinner/Spinner.jsx';
import { AlertContext } from '../../contexts/AlertContext';

import './UserCreationForm.css';

export const UserCreationForm = () => {
    const { setAlertMsg, setAlertStatus } = useContext(AlertContext);
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        password: '',
        occupation: '',
        state: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [occupations, setOccupations] = useState([]);
    const [states, setStates] = useState([]);


    useEffect(() => {
        const fetchAPI = async () => {
            let data = await fetchOccupationsAndStates()
            setOccupations(['', ...data.occupations])
            setStates(['', ...data.states])
        }
        fetchAPI();
    }, []);

    useEffect(() => {
        if (states.length < 1 || occupations.length < 1) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [states, occupations])

    const checkFields = () => {
        const { name, email, password, occupation, state } = userForm;
        if (!(name && validateEmail(email) && password && occupation && state)) {
            setAlertMsg(`Please fill out ${!name ? 'name,' : ''} ${!validateEmail(email) ? 'email,' : ''} ${!password ? 'password,' : ''} ${!occupation ? 'occupation,' : ''} ${!state ? 'state' : ''}`)
            setAlertStatus('error')
            return false;
        } else {
            return true;
        };
    };

    const validateEmail = (email) => {
        //overly exhaustive regex email validation
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { value, name } = e.target
        setUserForm({
            ...userForm,
            [name]: value
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (checkFields()) {
            setIsLoading(true)
            let status = await postFormData({ ...userForm });
            setIsLoading(false);
            setAlertMsg(`Thank you for submitting the form. Status code: ${status}`);
            setAlertStatus('success');
            clearFormState();
        };
    };

    const clearFormState = () => {
        setUserForm({
            name: '',
            email: '',
            password: '',
            occupation: '',
            state: '',
        });
    };

    return !isLoading ?
        (
            <div id='form-container'>
                <form id='contact-form'>
                    <div>
                        <label>Full Name:</label>
                        <input type='text' name='name' placeholder='John Smith' onChange={(e) => handleChange(e)} value={userForm.name} autoFocus />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type='email' name='email' placeholder='john.smith@email.com' onChange={(e) => handleChange(e)} value={userForm.email} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type='password' name='password' onChange={(e) => handleChange(e)} value={userForm.password} />
                    </div>
                    <div>
                        <label>Occupation:</label>
                        <select name="occupation" onChange={(e) => handleChange(e)} value={userForm.occupation}>
                            {
                                occupations.map((occupation, idx) =>
                                    <option value={occupation} key={idx}>{occupation}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <label>State:</label>
                        <select name="state" onChange={(e) => handleChange(e)} value={userForm.state}>
                            {
                                states.map((state, idx) =>
                                    <option value={state.abbreviation} key={idx}>{state.abbreviation}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <button onClick={(e) => handleSubmitForm(e)} disabled={false} id='submit-btn'>Submit</button>
                    </div>
                </form>
            </div>
        )
        :
        (
            <Spinner />
        )
};