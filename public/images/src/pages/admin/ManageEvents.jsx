import { useEffect, useState } from 'react';
import { createEvent, deleteEvent, listEvents, updateEvent } from '../../services/events.js';
import { FaEdit, FaTimes, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ManagePageLayout } from './ManagePageLayout.jsx';

export function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  async function refresh() {
    const data = await listEvents();
    setEvents(data);
  }

  useEffect(() => { refresh(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const eventData = { title, description, date: new Date(date).getTime(), registrationLink };
    if (editingEvent) {
      await updateEvent(editingEvent.id, eventData);
      setEditingEvent(null);
    } else {
      await createEvent(eventData);
    }
    setTitle(''); setDescription(''); setDate(''); setRegistrationLink('');
    refresh();
  }

  function onEdit(event) {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(new Date(event.date).toISOString().split('T')[0]);
    setRegistrationLink(event.registrationLink || '');
  }

  function onCancelEdit() {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setDate('');
    setRegistrationLink('');
  }

  async function move(index, direction) {
    const newEvents = [...events];
    const [event] = newEvents.splice(index, 1);
    newEvents.splice(index + direction, 0, event);

    for (let i = 0; i < newEvents.length; i++) {
      if (newEvents[i].order !== i) {
        await updateEvent(newEvents[i].id, { order: i });
      }
    }
    refresh();
  }

  return (
    <ManagePageLayout title="Manage Events">
      <table className="manage-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, i) => (
            <tr key={ev.id}>
              <td>{ev.title}</td>
              <td>{ev.description}</td>
              <td>{new Date(ev.date).toLocaleDateString()}</td>
              <td className="manage-table-actions">
                <button className='btn-icon' onClick={() => onEdit(ev)}><FaEdit /></button>
                {i > 0 && <button className='btn-icon' onClick={() => { move(i, -1); }}><FaArrowUp /></button>}
                {i < events.length - 1 && <button className='btn-icon' onClick={() => { move(i, 1); }}><FaArrowDown /></button>}
                <button className='btn-icon btn-danger' onClick={() => { deleteEvent(ev.id).then(refresh); }}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
        <form onSubmit={onSubmit} className="form">
          <div className="form-row">
              <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input placeholder="Registration Link" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} />
          {editingEvent ? (
            <div className="form-actions">
              <button type="submit" className="btn">Update</button>
              <button type="button" className="btn btn-secondary" onClick={onCancelEdit}><FaTimes /></button>
            </div>
          ) : (
            <button type="submit" className="btn">Add Event</button>
          )}
        </form>
      </div>
    </ManagePageLayout>
  );
}
