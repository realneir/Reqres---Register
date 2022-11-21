import { useState } from "react";
import React from 'react';
import { validateUser } from './Utils';

const Register = () => {
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const [result, setResult] = useState('');

	const onChange = (evt) => {
		const value = evt.target.value;
		const name = evt.target.name;
		setUser({
			...user,
			[name]: value
		});
	};

	const sendRegister = async () => {
		try {
			const res = await validateUser(user);
			console.log(res);


			setResult(res && res.code ? 'Unsucessful' : 'Successful'); //res = token
		}catch(err) {
			console.log('err in login.js ', err);
		}		
	};

	

	return  ( 
		<>
			<input 
				placeholder="Enter Email"
				type="text"
				onChange={onChange}
				data-testid="email"
				name="email"
			/><br />
			<input 
				placeholder="Enter password"
				type="password"
				onChange={onChange}
				data-testid="password"
				name="password"
			/>
			<br/>
			<button
				onClick={sendRegister} 
				data-testid="reg"
			>
				Register
			</button>
			<br/>
			<h2 data-testid="token">{result}</h2>
		</>
	)
};

export default Register;