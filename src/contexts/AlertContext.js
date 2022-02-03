import React, { createContext, useState } from 'react';
export const AlertContext = createContext();

export function AlertProvider(props) {
    const [alertMsg, setAlertMsg] = useState('');
    const [alertStatus, setAlertStatus] = useState('error');

	return (
		<AlertContext.Provider
			value={{
                setAlertMsg,
                alertMsg,
                setAlertStatus,
                alertStatus
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
}
