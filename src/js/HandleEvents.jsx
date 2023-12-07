import {useEffect } from 'react'

const HandleEvents = ({
  selectedEvent,
  selectedSubEvent,
  selectedSubSubEvent,
  tableData,
  eventtime,
  selectedTeam,
  selectedPlayer,
  playerRef,
  point,
  prevData,
  setTableData,
  setSelectedPlayer,
  setSelectedEvent,
  setSelectedSubEvent,
  setSelectedSubSubEvent,
}) => {
  const subEventsWithoutSubSub = [
    'Shot against',
    'Goal',
    'Goal conceded',
    'Own goal',
    'Assist',
    'Shot assist',
    'Second assist',
    'Third assist',
    'Recovery',
    'Loss ball ',
    'Counter pressing recovery',
    'Transition',
    'Counterattack',
    'Acceleration',
    'Progressive run',
    'Far Post Corner',
    'Near Post Corner',
    'Medium Corner',
    'Top-of-the-Arc Corner',
    'Short Corner',
    'Skip Header Corner',
    'Direct Score Corner ',
    'Hand ball',
    'Simulation',
    'Protest',
    'Time lost',
    'Late card',
    'Out of play',
    'Red card',
    'Yellow card',
    'Ball out',
    'Offside',
    'Game interruption',
  ]
  useEffect(() => {
    console.log(selectedSubEvent)
    console.log(subEventsWithoutSubSub.includes(selectedSubEvent))
    if (subEventsWithoutSubSub.includes(selectedSubEvent) || selectedSubSubEvent) {
      if (point) {
        const newData = {
          id: tableData.length + 1,
          half: eventtime,
          team: selectedTeam,
          playerNumber: selectedPlayer,
          time: playerRef.current.getCurrentTime(),
          x: point.x,
          y: point.y,
          event: selectedEvent || '',
          typeEvent: selectedSubEvent || '',
          subType: selectedSubSubEvent || '',
        }

        setTableData((prevData) => [...prevData, newData])

        // Clearing state
        setSelectedEvent(null)
        setSelectedSubEvent(null)
        setSelectedSubSubEvent(null)
        // setSelectedPlayer(null)
      }
    }
  }, [
    selectedEvent,
    selectedSubEvent,
    selectedSubSubEvent,
    tableData,
    eventtime,
    selectedTeam,
    selectedPlayer,
    playerRef,
    point,
    prevData,
    selectedEvent,
    selectedSubEvent,
    selectedSubSubEvent,
    setTableData,
    setSelectedPlayer,
    setSelectedEvent,
    setSelectedSubEvent,
    setSelectedSubSubEvent,
  ])

  return null
}

export default HandleEvents
