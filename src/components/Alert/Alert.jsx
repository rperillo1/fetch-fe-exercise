import React, { useContext } from 'react';
import AlertMui from '@mui/material/Alert';
import { AlertContext } from '../../contexts/AlertContext';
import './Alert.css'

export const Alert = () => {
    const { alertMsg, alertStatus } = useContext(AlertContext);


    return alertMsg && alertStatus ?
        (
            <div id='error-alert'>
                <AlertMui severity={alertStatus} variant='filled'>{alertMsg}</AlertMui>
            </div>
        )
        :
        (
            <></>
        )
};