import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import trailContext from '../context/trailContext.js';
import TrailGrid from './TrailGrid.jsx';

const TrailsPage = ({ trails, checkDifficulty }) => {

  // const {trails}=useContext(trailContext)

  return (
    <>
    <TrailGrid trails={trails} checkDifficulty={checkDifficulty}/>
    </>
  )
}

export default TrailsPage