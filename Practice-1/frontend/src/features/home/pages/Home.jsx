import { Link } from 'react-router-dom'

const Home = () => {
  const userToken = localStorage.getItem('token')

  return (
    <main className="home-page">
      <section className="home-card">
        <span className="auth-badge">Home</span>
        <h1>Welcome to your dashboard</h1>
        <p>
          You are logged in and ready to continue. This is the basic home page after login.
        </p>

        {userToken ? <p className="home-note">Token saved successfully.</p> : null}

        <Link to="/login" className="home-link">
          Go back to login
        </Link>
      </section>
    </main>
  )
}

export default Home