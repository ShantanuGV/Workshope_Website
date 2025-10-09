import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'


export default function AdminLogin(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState('')
const nav = useNavigate()


async function submit(e){
e.preventDefault()
try{
await signInWithEmailAndPassword(auth, email, password)
nav('/admin')
}catch(err){
console.error(err)
setErr('Login failed')
}
}


return (
<div className="max-w-md mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-bold mb-4">Admin Login</h2>
<form onSubmit={submit}>
<label className="block">Email</label>
<input className="w-full mb-2 border p-1" value={email} onChange={e=>setEmail(e.target.value)} />
<label className="block">Password</label>
<input type="password" className="w-full mb-2 border p-1" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="bg-blue-600 text-white px-3 py-1 rounded">Login</button>
</form>
{err && <p className="text-red-600 mt-2">{err}</p>}
</div>
)
}