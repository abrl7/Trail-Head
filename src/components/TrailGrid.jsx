import React from 'react'
import TrailCard from './TrailCard'

const TrailGrid = ({ trails, checkDifficulty }) => {
    return (
        <>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4  p-6' >
                <TrailCard trails={trails} checkDifficulty={checkDifficulty} />
            </div>
        </>
    )
}

export default TrailGrid