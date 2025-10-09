import { useEffect, useState } from 'react'
import { getSiteInfo, updateSiteInfo } from '../../services/site.js'

export function ManageSite() {
  const [info, setInfo] = useState({ title: 'CIED Cell', tagline: '', about: '' })

  useEffect(() => {
    getSiteInfo().then((data)=>{ if (data) setInfo(data) })
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    await updateSiteInfo(info)
    alert('Saved')
  }

  return (
    <div>
      <h3>Site Info</h3>
      <form onSubmit={onSubmit} className="form">
        <input placeholder="Title" value={info.title} onChange={(e)=>setInfo({ ...info, title: e.target.value })} />
        <input placeholder="Tagline" value={info.tagline} onChange={(e)=>setInfo({ ...info, tagline: e.target.value })} />
        <textarea placeholder="About" value={info.about} onChange={(e)=>setInfo({ ...info, about: e.target.value })} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}


