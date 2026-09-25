import { useState } from 'react';
import { useContext } from 'react';
import trailContext from '../context/trailContext.js';
import TrailGrid from './TrailGrid.jsx';
import SearchBar from './SearchBar.jsx';
import FilterSidebar from './FilterSidebar.jsx'
import { useSearchParams } from 'react-router-dom';

const TrailsPage = ({ trails }) => {

  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') || '';
  const region = searchParams.get('region') || 'All';
  const difficulty = searchParams.get('difficulty') || 'All';

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const matchTrail = trails.filter((trail) => {
    const search = q.toLowerCase();
    const matchesSearch =
      trail.trailName.toLowerCase().includes(search) ||
      trail.region.toLowerCase().includes(search);
    const matchesRegion = region === 'All' || trail.region === region;
    const matchesDifficulty = difficulty === 'All' || trail.difficulty === difficulty;
    return matchesSearch && matchesRegion && matchesDifficulty;
  });

  // const {trails}=useContext(trailContext)

  // const [searchText, setsearchText] = useState("")

  //  const matchedTrail= trails.filter((trail)=> {
  //        return searchText===trail.trailName || searchText===trail.region
  //     })


  // if(!matchedTrail){
  //     return(
  //         <div className="text-red-500"> No matched trails</div>
  //     )
  // }


  return (
    <>
      {/* <div className="flex flex-col gap-4 p-4">


        <div className="flex gap-4">
          <FilterSidebar
            region={region}
            difficulty={difficulty}
            onRegionChange={(val) => updateParam('region', val)}
            onDifficultyChange={(val) => updateParam('difficulty', val)}
            onClear={clearFilters}
          />
          <SearchBar q={q} onSearchChange={(val) => updateParam('q', val)} />

        </div>
        {matchTrail.length === 0 ? (
          <div className="text-red-500 text-center p-6">No matched trails</div>
        ) : (
          <TrailGrid trails={matchTrail} />
        )}
      </div> */}


      <div className='p-4'>
        <div className='flex justify-center'>

          <SearchBar q={q} onSearchChange={(val) => updateParam('q', val)} />
          <FilterSidebar
            region={region}
            difficulty={difficulty}
            onRegionChange={(val) => updateParam('region', val)}
            onDifficultyChange={(val) => updateParam('difficulty', val)}
            onClear={clearFilters}
          />
          
        </div>
        <div>
          {matchTrail.length === 0 ? (
            <div className="text-red-500 text-center p-6">No matched trails</div>
          ) : (
            <TrailGrid trails={matchTrail} />
          )}
        </div>
      </div>
    </>
  )
}

export default TrailsPage