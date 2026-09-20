import {Outlet} from "react-router-dom";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';

export default function RootLayout() {
  return (
    <>
  
    <div>
      <Header/>
      <NavBar />
      <main>
        <Outlet />
      </main>
        <Footer />
    </div>
    
    </>
  );
}