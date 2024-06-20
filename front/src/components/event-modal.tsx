'use client'

import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

const EventModal = ({ isOpen, onRequestClose, fetchEvents }: any) => {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const addEvent = async () => {
    if (!title || !start || !end) {
      alert('Please fill all the fields')
      return
    }
    try {
      const response = await axios.post('http://localhost:3333/api/events', {
        title,
        start: start.toISOString(),
        end: end.toISOString(),
      })
      if (response.status === 200) {
        fetchEvents()
        onRequestClose()
      }
    } catch (error) {
      console.error('Failed to add event:', error)
    }
  }

  return (
    <Modal
      className="bg-neutral-400 h-[400px] w-[400px] flex items-center justify-center flex-col mx-auto mt-40 z-[10000] gap-5"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <input
        className="text-white bg-transparent border py-2 w-[320px] outline-none rounded pl-2"
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="text-white bg-transparent border py-2 w-[320px] outline-none rounded pl-2"
        type="datetime-local"
        value={start.toISOString().substring(0, 16)}
        onChange={(e) => setStart(new Date(e.target.value))}
      />
      <input
        className="text-white bg-transparent border py-2 w-[320px] outline-none rounded pl-2"
        type="datetime-local"
        value={end.toISOString().substring(0, 16)}
        onChange={(e) => setEnd(new Date(e.target.value))}
      />
      <button
        className="bg-white text-zinc-900 font-semibold border rounded w-[320px] py-2 outline-none"
        onClick={addEvent}
      >
        Add Event
      </button>
      <button
        className="bg-white text-zinc-900 font-semibold border rounded w-[320px] py-2 outline-none"
        onClick={onRequestClose}
      >
        Cancel
      </button>
    </Modal>
  )
}

export default EventModal
