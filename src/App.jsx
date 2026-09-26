import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialLeaveHistory = [
  { id: 'Leave-496', type: 'Unpaid Leave', dayType: '2nd Half', start: 'Sep 18, 2026', end: 'Sep 18, 2026', total: '0.5 day', status: 'PENDING' },
  { id: 'Leave-486', type: 'Optional Leave', dayType: 'Full Day', start: 'Sep 14, 2026', end: 'Sep 14, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-474', type: 'Sick Leave', dayType: 'Full Day', start: 'Sep 09, 2026', end: 'Sep 09, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-445', type: 'Unpaid Leave', dayType: 'Full Day', start: 'Aug 31, 2026', end: 'Aug 31, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-433', type: 'Unpaid Leave', dayType: '2nd Half', start: 'Aug 26, 2026', end: 'Aug 26, 2026', total: '0.5 day', status: 'APPROVED' },
  { id: 'Leave-424', type: 'Sick Leave', dayType: '2nd Half', start: 'Aug 18, 2026', end: 'Aug 18, 2026', total: '0.5 day', status: 'APPROVED' },
  { id: 'Leave-402', type: 'Sick Leave', dayType: 'Full Day', start: 'Aug 10, 2026', end: 'Aug 10, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-350', type: 'Sick Leave', dayType: '2nd Half', start: 'Jul 20, 2026', end: 'Jul 20, 2026', total: '0.5 day', status: 'APPROVED' },
]

const attendanceData = [
  { date: 'Mon, Sep 23', status: 'Present', shift: '09:00 AM - 06:00 PM', hours: '9h 00m' },
  { date: 'Tue, Sep 24', status: 'Present', shift: '09:10 AM - 06:10 PM', hours: '9h 00m' },
  { date: 'Wed, Sep 25', status: 'Late', shift: '09:42 AM - 06:42 PM', hours: '8h 50m' },
  { date: 'Thu, Sep 26', status: 'Present', shift: '09:00 AM - 06:00 PM', hours: '9h 00m' },
  { date: 'Fri, Sep 27', status: 'Absent', shift: 'Not marked', hours: '0h 00m' },
  { date: 'Mon, Sep 30', status: 'Present', shift: '09:00 AM - 06:00 PM', hours: '9h 00m' },
]

const projectData = [
  { name: 'OMS Portal', manager: 'Aisha Khan', deadline: 'Oct 15', progress: 78, team: 8, status: 'On Track' },
  { name: 'Finance Automation', manager: 'Nikhil Rao', deadline: 'Oct 18', progress: 63, team: 5, status: 'Review' },
  { name: 'Travel Desk Redesign', manager: 'Megha S.', deadline: 'Oct 24', progress: 42, team: 4, status: 'In Progress' },
]

const payrollData = [
  { month: 'Sep 2026', netPay: '$4,800', status: 'Processed', date: 'Sep 30, 2026' },
  { month: 'Aug 2026', netPay: '$4,800', status: 'Paid', date: 'Aug 30, 2026' },
  { month: 'Jul 2026', netPay: '$4,800', status: 'Paid', date: 'Jul 30, 2026' },
]

function App() {
  const [portalData, setPortalData] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [activePage, setActivePage] = useState('Leaves')
  const [leaveStatusFilter, setLeaveStatusFilter] = useState('All')
  const [attendanceFilter, setAttendanceFilter] = useState('All')
  const [leaveHistory, setLeaveHistory] = useState(initialLeaveHistory)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestForm, setRequestForm] = useState({
    type: 'Sick Leave',
    dayType: 'Full Day',
    start: '2026-10-02',
    end: '2026-10-02',
  })

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/portal')
        const data = await response.json()
        setPortalData(data)
      } catch (error) {
        console.error('Failed to load portal data:', error)
      }
    }

    fetchPortalData()
  }, [])

  const filteredLeaves = useMemo(() => {
    if (leaveStatusFilter === 'All') return leaveHistory
    return leaveHistory.filter((entry) => entry.status === leaveStatusFilter)
  }, [leaveHistory, leaveStatusFilter])

  const filteredAttendance = useMemo(() => {
    if (attendanceFilter === 'All') return attendanceData
    return attendanceData.filter((entry) => entry.status === attendanceFilter)
  }, [attendanceFilter])

  const handleLogin = (event) => {
    event.preventDefault()
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true)
    }
  }

  const handleLeaveRequest = (event) => {
    event.preventDefault()
    const newEntry = {
      id: `Leave-${Math.floor(Math.random() * 900) + 100}`,
      type: requestForm.type,
      dayType: requestForm.dayType,
      start: new Date(requestForm.start).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      end: new Date(requestForm.end).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      total: requestForm.dayType === 'Full Day' ? '1 day' : '0.5 day',
      status: 'PENDING',
    }

    setLeaveHistory((prev) => [newEntry, ...prev])
    setShowRequestModal(false)
    setRequestForm({
      type: 'Sick Leave',
      dayType: 'Full Day',
      start: '2026-10-02',
      end: '2026-10-02',
    })
    setActivePage('Leaves')
  }

  if (!portalData) {
    return <div className="loading-state">Loading portal...</div>
  }

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-copy">
            <div className="brand-mark">Employee portal</div>
            <h1>Welcome back.</h1>
            <p>
              Sign in to keep your attendance, projects, leave, and time logs moving.
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label>
              <span>Username</span>
              <input
                type="text"
                placeholder="name@company.com"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>

            <label>
              <span>Password</span>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div className="login-row">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <button type="button" className="text-btn">Forgot password?</button>
            </div>

            <button type="submit" className="primary-btn sign-in-btn">
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  const { user, navItems, leaveSummary, nextHolidays } = portalData

  const renderPage = () => {
    switch (activePage) {
      case 'Overview':
        return (
          <div className="overview-grid">
            <div className="panel overview-panel">
              <div className="panel-header">
                <div>
                  <h2>Overview</h2>
                  <small>TEAM PERFORMANCE</small>
                </div>
              </div>
              <div className="metric-grid">
                <div className="metric-box">
                  <span>Attendance</span>
                  <strong>96.8%</strong>
                </div>
                <div className="metric-box">
                  <span>Projects</span>
                  <strong>3 Active</strong>
                </div>
                <div className="metric-box">
                  <span>Payroll</span>
                  <strong>$4,800</strong>
                </div>
              </div>
            </div>

            <div className="panel overview-panel">
              <div className="panel-header">
                <div>
                  <h2>Today</h2>
                  <small>WORKFLOW</small>
                </div>
              </div>
              <ul className="timeline-list">
                <li><strong>09:00</strong> Standup with product team</li>
                <li><strong>11:30</strong> Review leave approvals</li>
                <li><strong>14:00</strong> Sprint planning for OMS Portal</li>
              </ul>
            </div>
          </div>
        )

      case 'Attendance':
        return (
          <div className="panel table-panel attendance-panel">
            <div className="panel-header">
              <div>
                <h2>Attendance</h2>
                <small>WEEKLY SUMMARY</small>
              </div>
              <div className="panel-actions">
                <select
                  className="filter-btn select-filter"
                  value={attendanceFilter}
                  onChange={(event) => setAttendanceFilter(event.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Present">Present</option>
                  <option value="Late">Late</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>SHIFT</th>
                    <th>WORK HOURS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((entry) => (
                    <tr key={entry.date}>
                      <td>{entry.date}</td>
                      <td>
                        <span className={`status ${entry.status.toLowerCase()}`}>{entry.status}</span>
                      </td>
                      <td>{entry.shift}</td>
                      <td>{entry.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'Projects':
        return (
          <div className="projects-grid">
            {projectData.map((project) => (
              <div key={project.name} className="panel project-card">
                <div className="project-head">
                  <div>
                    <h3>{project.name}</h3>
                    <small>Managed by {project.manager}</small>
                  </div>
                  <span className="project-status">{project.status}</span>
                </div>

                <div className="progress-block">
                  <div className="progress-row">
                    <span>Progress</span>
                    <strong>{project.progress}%</strong>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="project-meta">
                  <span>Deadline: {project.deadline}</span>
                  <span>Team: {project.team} members</span>
                </div>
              </div>
            ))}
          </div>
        )

      case 'Payroll':
        return (
          <div className="panel table-panel payroll-panel">
            <div className="panel-header">
              <div>
                <h2>Payroll</h2>
                <small>RECENT PAYSLIPS</small>
              </div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>MONTH</th>
                    <th>NET PAY</th>
                    <th>STATUS</th>
                    <th>PAID DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollData.map((item) => (
                    <tr key={item.month}>
                      <td>{item.month}</td>
                      <td>{item.netPay}</td>
                      <td>
                        <span className={`status ${item.status === 'Processed' ? 'pending' : 'approved'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'Reports':
        return (
          <div className="panel overview-panel">
            <div className="panel-header">
              <div>
                <h2>Reports</h2>
                <small>PERFORMANCE</small>
              </div>
            </div>
            <div className="metric-grid">
              <div className="metric-box">
                <span>Working Days</span>
                <strong>21</strong>
              </div>
              <div className="metric-box">
                <span>Utilization</span>
                <strong>82%</strong>
              </div>
              <div className="metric-box">
                <span>Pending Tasks</span>
                <strong>05</strong>
              </div>
            </div>
          </div>
        )

      case 'Leaves':
      default:
        return (
          <>
            <section className="tab-row">
              <button type="button" className="tab selected">My leaves</button>
              <button type="button" className="tab">Holidays</button>
            </section>

            <section className="stats-grid" aria-label="Leave balance summary">
              {leaveSummary.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <div className="stat-number">{stat.count}</div>
                  <div className="stat-type">{stat.type}</div>
                  <div className="stat-label">{stat.label}</div>
                </article>
              ))}
            </section>

            <section className="content-grid">
              <div className="panel table-panel">
                <div className="panel-header">
                  <div>
                    <h2>Leave history</h2>
                    <small>{portalData.historyLabel}</small>
                  </div>
                  <div className="panel-actions">
                    <select
                      className="filter-btn select-filter"
                      value={leaveStatusFilter}
                      onChange={(event) => setLeaveStatusFilter(event.target.value)}
                    >
                      <option value="All">Status: All Statuses</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="PENDING">PENDING</option>
                    </select>
                    <button type="button" className="request-btn" onClick={() => setShowRequestModal(true)}>
                      Request
                    </button>
                  </div>
                </div>

                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>LEAVE NAME</th>
                        <th>LEAVE TYPE</th>
                        <th>DAY TYPE</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>TOTAL DAYS</th>
                        <th>LEAVE STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeaves.map((entry) => (
                        <tr key={entry.id}>
                          <td className="id-cell">{entry.id}</td>
                          <td>{entry.type}</td>
                          <td>{entry.dayType}</td>
                          <td>{entry.start}</td>
                          <td>{entry.end}</td>
                          <td>{entry.total}</td>
                          <td>
                            <span className={`status ${entry.status.toLowerCase()}`}>
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="panel side-panel">
                <div className="side-header">
                  <h3>NEXT HOLIDAY</h3>
                  <button type="button" className="view-link">View all</button>
                </div>

                <div className="holiday-list">
                  {nextHolidays.map((holiday) => (
                    <div key={`${holiday.day}-${holiday.month}`} className="holiday-item">
                      <div className="holiday-date">
                        <span className="date-day">{holiday.day}</span>
                        <span className="date-month">{holiday.month}</span>
                      </div>
                      <div className="holiday-meta">
                        <strong>{holiday.title}</strong>
                        <span>{holiday.meta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </section>
          </>
        )
    }
  }

  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-badge">PORTAL</div>
          <div className="user-mini">
            <span className="nav-icon">◔</span>
            <span className="user-text">{user.initials}</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`nav-item ${activePage === item.name ? 'active' : ''}`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="nav-dot">•</span>
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">TIME OFF</p>
            <h1>{activePage === 'Leaves' ? 'Leave management' : activePage}</h1>
          </div>
          <button type="button" className="primary-btn" onClick={() => setShowRequestModal(true)}>
            Request a leave
          </button>
        </header>

        {renderPage()}
      </main>

      {showRequestModal && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Request leave</h3>
              <button type="button" className="close-btn" onClick={() => setShowRequestModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleLeaveRequest} className="request-form">
              <label>
                <span>Leave type</span>
                <select
                  value={requestForm.type}
                  onChange={(event) => setRequestForm((form) => ({ ...form, type: event.target.value }))}
                >
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                  <option>Optional Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </label>

              <label>
                <span>Day type</span>
                <select
                  value={requestForm.dayType}
                  onChange={(event) => setRequestForm((form) => ({ ...form, dayType: event.target.value }))}
                >
                  <option>Full Day</option>
                  <option>2nd Half</option>
                </select>
              </label>

              <label>
                <span>Start date</span>
                <input
                  type="date"
                  value={requestForm.start}
                  onChange={(event) => setRequestForm((form) => ({ ...form, start: event.target.value }))}
                />
              </label>

              <label>
                <span>End date</span>
                <input
                  type="date"
                  value={requestForm.end}
                  onChange={(event) => setRequestForm((form) => ({ ...form, end: event.target.value }))}
                />
              </label>

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowRequestModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
