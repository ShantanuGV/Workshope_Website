import React from 'react'


export default function CertificateCard({cert, onRequest}){
return (
<div className="border rounded p-4 shadow-sm">
<h3 className="font-bold">{cert.title}</h3>
<p className="text-sm">Uploaded: {cert.createdAt?.toDate ? cert.createdAt.toDate().toLocaleString() : ''}</p>
<button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded" onClick={()=>onRequest(cert)}>
Download Certificate
</button>
</div>
)
}