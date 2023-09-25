import { Outlet } from "react-router-dom" 
import './Layout.css'
import Sidebar from "../components/sidebar/sidebar"
import Navbar from "../components/Navbar/Navbar"

function Layout() {
  return (
    <main className="mainLayout">
        <div className="mainSidebar">
          <Sidebar/>
        </div>
        <div className="content">
            <Navbar/>
            <div className="mainContent">
              <Outlet/>
            </div>
        </div>
    </main>
  )
}

export default Layout