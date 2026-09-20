import React from 'react'
import { useState } from 'react';

const TrailsPage = () => {

  const [trials, setTrials] = useState([{
    "id": "tr-002",
    "name": "Mardi Himal",
    "region": "Annapurna",
    "distance": 44,
    "elevation": 4500,
    "difficulty": "Moderate",
    "days": 5,
    "season": "Mar - May",
    "walked": true,
  }])

  return (
    <div>TrailsPage</div>
  )
}

export default TrailsPage