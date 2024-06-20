'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, View, Views, dateFnsLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addHours,
  startOfHour,
} from 'date-fns'
import axios from 'axios'
import EventModal from '@/components/event-modal'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { enUS } from 'date-fns/locale'
import { useSaveEvents } from '@/hooks/use-save-events'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { 'en-US': enUS },
})

const DnDCalendar = withDragAndDrop(Calendar)

export default function Home() {
  const {
    currentDate,
    events,
    fetchEvents,
    handleNavigate,
    handleViewChange,
    modalIsOpen,
    onEventDrop,
    onEventResize,
    setModalIsOpen,
    view,
  } = useSaveEvents()

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md my-4"
        onClick={() => setModalIsOpen(true)}
      >
        Add Event
      </button>
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        fetchEvents={fetchEvents}
      />
      <DnDCalendar
        key={view}
        defaultView={view}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: '100vh' }}
        views={['month', 'week', 'day']}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        date={currentDate}
      />
    </>
  )
}
