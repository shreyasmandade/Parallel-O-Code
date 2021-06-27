import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axiosConfig from '../config';

const RenderError = ({ error }) => (
	<div
		className='alert alert-warning alert-dismissible fade show'
		role='alert'>
		<strong>{error}</strong>
		<button
			type='button'
			className='close'
			data-dismiss='alert'
			aria-label='Close'>
			<span aria-hidden='true'>&times;</span>
		</button>
	</div>
);

const Index = () => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [events,setEvents]=useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { username: email, password: password };

		axiosConfig
			.post('/auth/login', data)
			.then((res) => 
				setEvents(res.data)
			)
			.catch((err) => {
			if(err.response && err.response.data)
				setError(err.response.data)
			else
				setError(JSON.stringify(err))}
			);
	};

	return (
		<>
			<div className='container' id='custom'>
				<h1 style={{ textAlign: 'center' }}>Login</h1>
				{error !== '' ? <RenderError error={error} /> : ''}
        
				<Form onSubmit={handleSubmit} method='POST'>
					<Form.Group controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter email'
							required
							name='email'
							className='input'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							required
							name='password'
							className='input'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Button variant='primary' type='submit'>
					Login
					</Button>
          	
				</Form>
        { events ? <RenderEvents  events={events} />:'' }
			</div>
		</>
	);
};

const RenderEvents=({events})=>{
	return(
		<>
			<ul style={{color:'#fff',padding:30}}>
				<li>Eliptas: {events[0].length}</li>
				<li>CodeKombat: {events[1].length}</li>
				<li>CodeTracer: {events[2].length}</li>
				<li>WebCipher: {events[3].length}</li>
				<li>Auslander: {events[4].length}</li>
			</ul>
			<ul>
				{events.map(ev=>{
					return ev.map(event=>{
						return(
							<li key={event.date} style={{display:'flex',color:'#fff',flexDirection:'column',border:'2px solid blue',margin:20}}>
								<p> Email: {event.email}</p>
								<p> Contact: {event.contact}</p>
								<p> Event: {event.event}</p>
								<p> Date: {event.date}</p>
							</li>
						);
					})
				})}
			</ul>
		</>
	);
}
export default Index;