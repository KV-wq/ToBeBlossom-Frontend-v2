import WebApp from '@twa-dev/sdk'

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to Telegram Mini App
      </h1>
      <p className="mb-4">
        Your Telegram username: {WebApp.initDataUnsafe?.user?.username || 'Not available'}
      </p>
      <button
        onClick={() => WebApp.showAlert('Hello from Mini App!')}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Show Alert
      </button>
    </div>
  )
}

export default Home