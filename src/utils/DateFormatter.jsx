import React from 'react'
import Moment from 'react-moment'

const DateFormatter = ({date})=> {
  return (
    <Moment format='D MMM YYYY HH:mm' withTitle>
        {date}
    </Moment>
  )
}

export default DateFormatter