import Navbar from './components/Navbar'
import { Outlet } from 'react-router'

const App = () => {
  return (
    <div>
      {/* this is for Navbar section */}
      <Navbar />
      {/* this is for routing outlet */}
      <main >
        <Outlet />
      </main>
      {/* this is for footer  */}
    </div>
  )
}

export default App