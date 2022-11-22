import moment from 'moment'
import React from 'react'

export interface LocalTimeProps {
  epochTime: number
  locale?: string
}

export const LocalTime = ({ epochTime, locale }: LocalTimeProps) => {
  if (locale) moment.locale(locale)

  const dateTime = moment.unix(epochTime).calendar()
  return <>{dateTime}</>
}
