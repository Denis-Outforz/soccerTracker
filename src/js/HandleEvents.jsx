import { useEffect } from 'react'

const HandleEvents = ({
  selectedEvent,
  selectedSubEvent,
  selectedSubSubEvent,
  tableData,
  eventtime: eventTime,
  selectedTeam,
  selectedPlayer,
  playerRef,
  point,
  prevData,
  setTableData,
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
    if ((subEventsWithoutSubSub.includes(selectedSubEvent) || selectedSubSubEvent) && point) {
      const newData = [
        ...prevData,
        {
          id: tableData.length + 1,
          half: eventTime,
          team: selectedTeam,
          playerNumber: selectedPlayer,
          time: playerRef.current.getCurrentTime(),
          x: point.x,
          y: point.y,
          event: selectedEvent,
          typeEvent: selectedSubEvent,
          subType: selectedSubSubEvent || '',
        },
      ]
      setSelectedEvent(null)
      setSelectedSubEvent(null)
      setSelectedSubSubEvent(null)

      return setTableData(newData)
    }
  }, [selectedSubEvent, selectedSubSubEvent])
  return null
}

export default HandleEvents
