import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';



export default function LoginUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    //prevent automatic page refresh
    e.preventDefault();
    setError('');

    try {
      const res =  await fetch('/api/login', {
        method: 'POST',
        headers:{'Content-Types': 'application/json'},
        body: JSON.stringify({email, password})
      });

      const data = await res.json();
      if (data.success){
        //alert('Login successful');
        console.log('Login successful');
        router.push('/learn'); // Redirect to learning page on success
      }else{
        setError(data.message || 'Login failed');
      }
    } catch (err){
      setError('An error occurred. Please try again.');
    }


  };


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label><br />
        <input type="text" 
        id='email' 
        value={email} onChange={(e) => setEmail(e.target.value)} required/><br/>

        <label htmlFor= 'password'> Password:</label><br/>
        <input type='text' 
        id= 'password' 
        value={password} onChange={(e) => setPassword(e.target.value)} required/><br/>

        <button type='submit'>Sign-in</button><br/>
        <button>
          <Link href="/Register">Sign-Up</Link>
        </button><br/>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
}

