import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from './layouts/RootLayout.jsx';
import TrailsPage from './components/TrailsPage.jsx';
import LogTrailPage from './components/LogTrailPage.jsx';
import StatsPage from './components/StatsPage.jsx';
import NotFound from './components/NotFound.jsx';
import TrailDetailPage from './components/TrailDetailPage.jsx';
import trailContext from './context/trailContext.js';
import { useState } from "react";

//1. using createBrowserRouter with RouterProvider
//   const router=createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     errorElement: <NotFound />, // Automatically catches routing errors
//     children: [
//       { index: true, element: <TrailsPage  /> }, // Renders at "/"
//       { path: 'trails', element: <TrailsPage /> },
//       { path: 'log', element: <LogTrailPage /> },
//       { path: 'stats', element: <StatsPage /> }, 
//       { path: 'trails/:id', element: <TrailDetailPage /> },
//     ],
//   }
// ]);

// function App() {
//   const [trails, settrails] = useState([])

//   return (
//     <>
// {/* <trailContext.Provider value={{trails,settrails}}> */}
//     <RouterProvider router={router}  />
// {/* </trailContext.Provider> */}
//     </>
//   )
// }

//2.using browser router with routes
function App() {
  const [trails, settrails] = useState([])

  //1.mero solution for colored element for difficulty
  // const checkDifficulty=(t)=>{
  //   if (t==='Easy') {
  //     return "bg-blue-900 text-white px-2 text-sm p-1 rounded-lg"
  //   }else if (t==='Moderate'){
  //     return "bg-yellow-900 text-white px-2 text-sm p-1 rounded-lg"
  //   }else if (t==='Difficult'){
  //     return "bg-slate-900 text-white px-2 text-sm p-1 rounded-lg"
  //   }else{
  //     return "bg-black"
  //   }
  // }

  //2.claude daju ko solution
  const difficultyStyles = {
    Easy: "bg-green-900 text-green-400 text-sm p-1 rounded-lg",
    Moderate: "bg-yellow-900 text-yellow-400 text-sm p-1 rounded-lg",
    Difficult: "bg-red-900 text-red-400 text-sm p-1 rounded-lg",
  }

  const checkDifficulty = (t) => difficultyStyles[t] || "bg-black"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<TrailsPage trails={trails} checkDifficulty={checkDifficulty} />} />
          <Route path="trails" element={<TrailsPage trails={trails} checkDifficulty={checkDifficulty} />} />
          <Route path="log" element={<LogTrailPage trails={trails} settrails={settrails} />} />
          <Route path="stats" element={<StatsPage trails={trails} />} />
          <Route path="trails/:id" element={<TrailDetailPage trails={trails} checkDifficulty={checkDifficulty} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App
