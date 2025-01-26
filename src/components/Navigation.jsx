import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold">
          Mini App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/profile" className="text-white">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation