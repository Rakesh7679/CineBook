import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData, {
        withCredentials: true,
      })

      const token = response?.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }

      setMessage(response?.data?.message || 'Login successful')
      navigate('/home')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-brand">
          <span className="auth-badge">Welcome back</span>
          <h1>Login</h1>
          <p>Sign in to continue to your account and manage your posts.</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {message ? <p className="auth-message">{message}</p> : null}

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
