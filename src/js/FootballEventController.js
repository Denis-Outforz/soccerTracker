// FootballEventController.js

import React, { useState } from 'react'
import '../css/FootballEventController.css'

const FootballEventController = ({ onEventSelected }) => {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedSubEvent, setSelectedSubEvent] = useState(null)
  const [selectedSubSubEvent, setSelectedSubSubEvent] = useState(null)

  const events = [
    {
      name: 'Attack Pass',
      subEvents: [
        {
          name: 'Key',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Cross',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Smart',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Through',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Final third',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Deep Cross',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Pass into penalty area',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
      ],
    },
    {
      name: 'Regular Pass',
      subEvents: [
        {
          name: 'Pass',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Head',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Short/medium pass',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Hand',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Deep',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Long',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Progressive',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Fair play',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
        {
          name: 'Throw in',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
      ],
    },
    {
      name: 'Reception',
      subEvents: [
        {
          name: 'Under pressure',
          subSubEvents: ['Succesfull Reception', 'Missed Reception'],
        },
        {
          name: 'Open play',
          subSubEvents: ['Succesfull Reception', 'Missed Reception'],
        },
      ],
    },
    {
      name: 'Shot',
      subEvents: [
        {
          name: 'Left Foot Shot',
          subSubEvents: ['On Target', 'Off Target', 'Blocked'],
        },
        {
          name: 'Right Foot Shot',
          subSubEvents: ['On Target', 'Off Target', 'Blocked'],
        },
        {
          name: 'Head Shot',
          subSubEvents: ['On Target', 'Off Target', 'Blocked'],
        },
      ],
    },
    {
      name: 'Gk Action',
      subEvents: [
        { name: 'Shot against', subSubEvents: [] },
        { name: 'Save', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Reflexes save', subSubEvents: ['Succesful', 'Unsuccessful'] },
        {
          name: 'Goalkeeper Leaving Line',
          subSubEvents: ['Succesful', 'Unsuccessful'],
        },
      ],
    },
    {
      name: 'Goals',
      subEvents: [
        { name: 'Goal', subSubEvents: [] },
        { name: 'Goal conceded', subSubEvents: [] },
        { name: 'Own goal', subSubEvents: [] },
      ],
    },
    {
      name: 'Assists',
      subEvents: [
        { name: 'Assist', subSubEvents: [] },
        { name: 'Shot assist', subSubEvents: [] },
        { name: 'Second assist', subSubEvents: [] },
        { name: 'Third assist', subSubEvents: [] },
      ],
    },
    {
      name: 'Possession',
      subEvents: [
        { name: 'Touch', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Touch in box', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Recovery', subSubEvents: [] },
        { name: 'Loss ball', subSubEvents: [] },
        { name: 'Counter pressing recovery', subSubEvents: [] },
        { name: 'Transition', subSubEvents: [] },
        { name: 'Counterattack', subSubEvents: [] },
        { name: 'Dribble', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Acceleration', subSubEvents: [] },
        { name: 'Progressive run', subSubEvents: [] },
      ],
    },
    {
      name: 'Duel',
      subEvents: [
        { name: 'Ground Duel', subSubEvents: ['Win', 'Lose'] },
        { name: 'Aerial duel', subSubEvents: ['Win', 'Lose'] },
        { name: 'Defensive duel', subSubEvents: ['Win', 'Lose'] },
        { name: 'Pressing duel', subSubEvents: ['Win', 'Lose'] },
        { name: 'Offensive duel', subSubEvents: ['Win', 'Lose'] },
      ],
    },
    {
      name: 'Clearance',
      subEvents: [
        { name: 'Under pressure', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Open play', subSubEvents: ['Succesful', 'Unsuccessful'] },
      ],
    },
    {
      name: 'Interception',
      subEvents: [
        { name: 'First Third', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Second Third', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Final Third', subSubEvents: ['Succesful', 'Unsuccessful'] },
      ],
    },
    {
      name: 'Block Shot',
      subEvents: [
        { name: 'Leg', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Body', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Head', subSubEvents: ['Succesful', 'Unsuccessful'] },
      ],
    },
    {
      name: 'Tackling',
      subEvents: [
        { name: 'First Third', subSubEvents: ['Succesful'] },
        { name: 'Second Third', subSubEvents: ['Succesful'] },
        { name: 'Final Third', subSubEvents: ['Succesful'] },
      ],
    },
    {
      name: 'Sliding tackle',
      subEvents: [
        { name: 'First Third', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Second Third', subSubEvents: ['Succesful', 'Unsuccessful'] },
        { name: 'Final Third', subSubEvents: ['Succesful', 'Unsuccessful'] },
      ],
    },
    {
      name: 'Corner kick',
      subEvents: [
        { name: 'Far Post Corner', subSubEvents: [] },
        { name: 'Near Post Corner', subSubEvents: [] },
        { name: 'Medium Corner', subSubEvents: [] },
        { name: 'Top-of-the-Arc Corner', subSubEvents: [] },
        { name: 'Short Corner', subSubEvents: [] },
        { name: 'Skip Header Corner', subSubEvents: [] },
        { name: 'Direct Score Corner ', subSubEvents: [] },
      ],
    },
    {
      name: 'Free kick',
      subEvents: [
        {
          name: 'Curved',
          subSubEvents: ['On Target', 'Off Target', 'Blocked on the Wall'],
        },
        {
          name: 'Driven / Power',
          subSubEvents: ['On Target', 'Off Target', 'Blocked on the Wall'],
        },
        {
          name: 'Dipping',
          subSubEvents: ['On Target', 'Off Target', 'Blocked on the Wall'],
        },
        {
          name: 'Knuckleball',
          subSubEvents: ['On Target', 'Off Target', 'Blocked on the Wall'],
        },
        {
          name: 'Cross',
          subSubEvents: ['Successful', 'Failed Trajectory', 'Blocked'],
        },
      ],
    },
    {
      name: 'Penalty kick',
      subEvents: [
        { name: 'Left Foot Shot', subSubEvents: ['On Target', 'Off Target'] },
        { name: 'Right Foot Shot', subSubEvents: ['On Target', 'Off Target'] },
      ],
    },
    {
      name: 'Fouls',
      subEvents: [
        { name: 'Hand ball', subSubEvents: [] },
        { name: 'Penalty', subSubEvents: ['Win', 'Lose'] },
        { name: 'Violent', subSubEvents: ['Win', 'Lose'] },
        { name: 'Simulation', subSubEvents: [] },
        { name: 'Protest', subSubEvents: [] },
        { name: 'Time lost', subSubEvents: [] },
        { name: 'Late card', subSubEvents: [] },
        { name: 'Out of play', subSubEvents: [] },
        { name: 'Regular', subSubEvents: ['Win', 'Lose'] },
      ],
    },
    {
      name: 'Cards',
      subEvents: [
        { name: 'Red card', subSubEvents: [] },
        { name: 'Yellow card', subSubEvents: [] },
      ],
    },
    {
      name: 'Non-game',
      subEvents: [
        { name: 'Ball out', subSubEvents: [] },
        { name: 'Offside', subSubEvents: [] },
        { name: 'Game interruption', subSubEvents: [] },
      ],
    },
    {
      name: 'Half',
      subEvents: [
        { name: '1 Half', subSubEvents: ['Start', 'End'] },
        { name: '2 Half', subSubEvents: ['Start', 'End'] },
      ],
    },
    {
      name: 'Substitute',
      subEvents: [
        { name: 'Tactical', subSubEvents: ['In', 'Out'] },
        { name: 'Injury', subSubEvents: ['In', 'Out'] },
      ],
    },
  ]

  const handleEventClick = (eventName) => {
    if (selectedEvent === eventName) {
      // Если текущее событие уже выбрано, сбрасываем его
      setSelectedEvent(null)
      setSelectedSubEvent(null)
      setSelectedSubSubEvent(null)
    } else {
      // Иначе, устанавливаем новое выбранное событие
      setSelectedEvent(eventName)
      setSelectedSubEvent(null)
      setSelectedSubSubEvent(null)
      onEventSelected(eventName, null, null)
    }
  }

  const handleSubEventClick = (subEventName, subSubEvents) => {
    setSelectedSubEvent(subEventName)
    setSelectedSubSubEvent(null)
    onEventSelected(selectedEvent, subEventName, null)
  }

  const handleSubSubEventClick = (subSubEventName) => {
    setSelectedSubSubEvent(subSubEventName)
    onEventSelected(selectedEvent, selectedSubEvent, subSubEventName)
  }

  return (
    <div className="football-event-controller">
      <div className="event-buttons">
        {events.map((event) => (
          <button
            key={event.name}
            className={`event-button ${selectedEvent === event.name ? 'selected' : ''}`}
            onClick={() => handleEventClick(event.name)}
          >
            {event.name}
          </button>
        ))}
      </div>
      {selectedEvent && (
        <div className="sub-event-buttons">
          {events
            .find((event) => event.name === selectedEvent)
            .subEvents.map((subEvent) => (
              <div key={subEvent.name}>
                <button
                  className={`sub-event-button ${
                    selectedSubEvent === subEvent.name ? 'selected' : ''
                  }`}
                  onClick={() => handleSubEventClick(subEvent.name, subEvent.subSubEvents)}
                >
                  {subEvent.name}
                </button>
                {selectedSubEvent === subEvent.name && (
                  <div className="sub-sub-event-buttons">
                    {subEvent.subSubEvents.map((subSubEvent) => (
                      <button
                        key={subSubEvent}
                        className={`sub-sub-event-button ${
                          selectedSubSubEvent === subSubEvent ? 'selected' : ''
                        }`}
                        onClick={() => handleSubSubEventClick(subSubEvent)}
                      >
                        {subSubEvent}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default FootballEventController
