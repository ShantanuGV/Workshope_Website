import React, {useState} from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export default function CertificateModal({cert, onClose}){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [feedback, setFeedback] = useState('')
    const [status, setStatus] = useState('')
    const [allowed, setAllowed] = useState(false)

    async function checkEmail(e){
        e.preventDefault()
        setStatus('Checking...')
        try{
        const certRef = doc(db, 'certificates', cert.id)
        const snap = await getDoc(certRef)
        if(!snap.exists()){
        setStatus('Certificate not found')
        return
        }
        const data = snap.data()
        const emails = data.allowedEmails || []
        const matched = emails.map(x=>x.toLowerCase()).includes(email.toLowerCase())
        if(matched){
        setAllowed(true)
        setStatus('Email verified. You can download now.')
        } else {
        setAllowed(false)
        setStatus('Email not authorized for this certificate.')
        }
        }catch(err){
        console.error(err)
        setStatus('Error checking email')
        }
        }
        
        
        return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="bg-white p-6 rounded w-96">
        <h2 className="font-bold mb-3">Download: {cert.title}</h2>
        <form onSubmit={checkEmail}>
        <label className="block text-sm">Name</label>
        <input required value={name} onChange={e=>setName(e.target.value)} className="w-full mb-2 border p-1" />
        
        
        <label className="block text-sm">Email</label>
        <input required value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-2 border p-1" />
        
        
        <label className="block text-sm">Feedback</label>
        <textarea value={feedback} onChange={e=>setFeedback(e.target.value)} className="w-full mb-2 border p-1" />
        
        
        <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Verify Email</button>
        <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
        </form>
        
        
        <p className="mt-3 text-sm">{status}</p>
        
        
        {allowed && (
        <div className="mt-3">
        <a href={cert.fileUrl} download target="_blank" rel="noreferrer" className="bg-green-600 text-white px-3 py-1 rounded">Download Certificate</a>
        </div>
        )}
        </div>
        </div>
        )
        }