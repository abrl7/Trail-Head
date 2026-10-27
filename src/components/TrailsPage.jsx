
import { useNavigate } from 'react-router-dom'   
import EmptyState from './EmptyState.jsx'
import TrailGrid from './TrailGrid.jsx';
import SearchBar from './SearchBar.jsx';
import FilterSidebar from './FilterSidebar.jsx'
import { useSearchParams } from 'react-router-dom';

const TrailsPage = ({ trails, onToggleWalked }) => {

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

  const navigate = useNavigate()

  // Build a readable description of whatever is currently filtering the list
  const activeFilters = []
  if (q) activeFilters.push(`search "${q}"`)
  if (region !== 'All') activeFilters.push(`region "${region}"`)
  if (difficulty !== 'All') activeFilters.push(`difficulty "${difficulty}"`)

  let content
  if (trails.length === 0) {
    content = (
      <EmptyState
        title="No trails logged yet"
        message="Your trail list is empty. Log your first trail to see it here."
        actionLabel="Log a trail"
        onAction={() => navigate('/log')}
      />
    )
  } else if (matchTrail.length === 0) {
    content = (
      <EmptyState
        title="No trails match your filters"
        message={`Nothing matches ${activeFilters.join(', ')}. Try loosening a filter or clear them all.`}
        actionLabel="Clear filters"
        onAction={clearFilters}
      />
    )
  } else {
    content = <TrailGrid trails={matchTrail} onToggleWalked={onToggleWalked} />
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
          {/* {matchTrail.length === 0 ? (
            <div className="text-red-500 text-center p-6">No matched trails</div>
          ) : (
            <TrailGrid trails={matchTrail} onToggleWalked={onToggleWalked} />
          )} */}
          {content}
        </div>
      </div>
    </>
  )
}

export default TrailsPage