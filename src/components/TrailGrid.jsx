import React from 'react'
import TrailCard from './TrailCard'

const TrailGrid = ({ trails }) => {
    return (
        <>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-6' >
                {
                    trails.map((trail) => {
                           return <TrailCard key={trail.trailId} trail={trail} />
                    })
                }

            </div>
        </>
    )
}

export default TrailGrid