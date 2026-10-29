import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTrails } from '../hooks/useTrails.js'
import { useFilteredTrails } from '../hooks/useFilteredTrails.js'
import TrailGrid from '../components/TrailGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterSidebar from '../components/FilterSidebar.jsx'
import EmptyState from '../components/EmptyState.jsx'


const TrailsPage = () => {
  const { trails } = useTrails()
  const filtered = useFilteredTrails()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  

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

  // const matchTrail = trails.filter((trail) => {
  //   const search = q.toLowerCase();
  //   const matchesSearch =
  //     trail.trailName.toLowerCase().includes(search) ||
  //     trail.region.toLowerCase().includes(search);
  //   const matchesRegion = region === 'All' || trail.region === region;
  //   const matchesDifficulty = difficulty === 'All' || trail.difficulty === difficulty;
  //   return matchesSearch && matchesRegion && matchesDifficulty;
  // });



  // Build a readable description of whatever is currently filtering the list
 const activeFilters = []
  const q = searchParams.get('q')
  const region = searchParams.get('region')
  const difficulty = searchParams.get('difficulty')
  if (q) activeFilters.push(`search "${q}"`)
  if (region) activeFilters.push(`region "${region}"`)
  if (difficulty) activeFilters.push(`difficulty "${difficulty}"`)
  let content
  if (trails.length === 0) {
    content = <EmptyState title="No trails logged yet" message="Log your first trail to see it here." actionLabel="Log a trail" onAction={() => navigate('/log')} />
  } else if (filtered.length === 0) {
    content = <EmptyState title="No trails match your filters" message={`Nothing matches ${activeFilters.join(', ')}.`} actionLabel="Clear filters" onAction={clearFilters} />
  } else {
    content = <TrailGrid />
  }


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
          
          {content}
        </div>
      </div>
    </>
  )
}

export default TrailsPage