import React from 'react'
import { useParams } from 'react-router-dom';

const TrailDetailPage = () => {
  const { id } = useParams();

  return (
    <div>Trail Detail Page: {id}</div>
  )
}

export default TrailDetailPage