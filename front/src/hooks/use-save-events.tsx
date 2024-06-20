import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Views } from 'react-big-calendar'

const useSaveEvents = () => {
  const [events, setEvents] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<View>(Views.WEEK)

  const fetchEvents = async () => {
    try {
      const result = await axios.get('http://localhost:3333/api/events')
      setEvents(
        result.data.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        })),
      )
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const onEventDrop = async (data: any) => {
    const { event, start, end } = data
    try {
      await axios.patch(`http://localhost:3333/api/events/${event.id}`, {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      fetchEvents()
    } catch (error) {
      console.error('Failed to move event:', error)
    }
  }

  const onEventResize = async (data: any) => {
    const { event, start, end } = data
    try {
      await axios.patch(`http://localhost:3333/api/events/${event.id}`, {
        start: start.toISOString(),
        end: end.toISOString(),
      })
      fetchEvents()
    } catch (error) {
      console.error('Failed to update event:', error)
    }
  }

  const handleNavigate = (date: Date) => {
    setCurrentDate(date)
  }

  const handleViewChange = (view: View) => {
    switch (view) {
      case 'week':
        setView(Views.WEEK)
        break
      case 'day':
        setView(Views.DAY)
        break
      case 'month':
        setView(Views.MONTH)
        break
    }
  }

  return {
    events,
    modalIsOpen,
    setModalIsOpen,
    currentDate,
    view,
    fetchEvents,
    onEventDrop,
    onEventResize,
    handleNavigate,
    handleViewChange,
  }
}

export { useSaveEvents }
