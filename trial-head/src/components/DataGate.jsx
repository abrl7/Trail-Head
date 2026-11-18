// src/components/DataGate.jsx
import { useTrails } from '../hooks/useTrails.js'
import { ui } from '../utils/ui.js'

const DataGate = ({ children }) => {
  const { status, error, reload } = useTrails()

  if (status === 'loading') {
    return <p role="status" className={ui.body}>Loading trails…</p>
  }

  if (status === 'error') {
    return (
      <div role="alert" className={`${ui.surface} flex flex-col items-start gap-4 p-6`}>
        <h1 className={ui.title}>Couldn’t load trails</h1>
        <p className={ui.body}>{error}</p>
        <button type="button" onClick={reload} className={ui.btnPrimary}>Try again</button>
      </div>
    )
  }

  return children
}

export default DataGate