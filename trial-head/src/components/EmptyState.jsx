
import { ui } from '../utils/ui.js'

const EmptyState = ({ title, message, actionLabel, onAction }) => (
  <div className={`${ui.surface} flex flex-col items-center gap-4 p-6 text-center`}>
    <h2 className={ui.title}>{title}</h2>
    <p className="max-w-md text-base text-slate-300">{message}</p>
    <button type="button" onClick={onAction} className={ui.btnPrimary}>{actionLabel}</button>
  </div>
)
export default EmptyState