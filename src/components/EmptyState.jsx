const EmptyState = ({ title, message, actionLabel, onAction }) => (
  <div className="flex flex-col items-center text-center gap-3 p-10 w-[50%] mx-auto bg-slate-100 rounded-2xl">
    <p className="text-xl font-bold">{title}</p>
    <p className="text-gray-600 max-w-md">{message}</p>
    <button
      onClick={onAction}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
    >
      {actionLabel}
    </button>
  </div>
)

export default EmptyState