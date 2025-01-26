import WebApp from '@twa-dev/sdk'

function Profile() {
  const user = WebApp.initDataUnsafe?.user || {}

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="space-y-3">
        <p>
          <span className="font-semibold">Username:</span> {user.username || 'Not available'}
        </p>
        <p>
          <span className="font-semibold">First Name:</span> {user.first_name || 'Not available'}
        </p>
        <p>
          <span className="font-semibold">Last Name:</span> {user.last_name || 'Not available'}
        </p>
      </div>
    </div>
  )
}

export default Profile