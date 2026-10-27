export const checkDifficulty = (t) => {
  const styles = {
    Easy: "bg-green-900 text-green-400 text-sm p-1 rounded-lg",
    Moderate: "bg-yellow-900 text-yellow-400 text-sm p-1 rounded-lg",
    Difficult: "bg-red-900 text-red-400 text-sm p-1 rounded-lg",
  }
  return styles[t] || "bg-black"
}
