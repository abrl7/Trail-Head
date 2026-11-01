import { Outlet } from "react-router-dom";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';


export default function RootLayout() {
  return (
    <>

      <div className='min-h-screen flex flex-col'>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-indigo-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 focus:outline-none sm:px-6">
          {/* <TrailsProvider> */}
          <Outlet />
          {/* </TrailsProvider> */}
        </main>
        <Footer />
      </div>

    </>
  );
}