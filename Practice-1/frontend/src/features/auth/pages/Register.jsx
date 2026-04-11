import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
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
      const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
        withCredentials: true,
      })

      const token = response?.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }

      setMessage(response?.data?.message || 'Registration successful')
      navigate('/login')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell-reverse">
        <div className="auth-brand">
          <span className="auth-badge">Create account</span>
          <h1>Register</h1>
          <p>Create a new account to start posting and connecting with others.</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          {message ? <p className="auth-message">{message}</p> : null}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Register
