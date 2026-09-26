import './App.css'

const navItems = [
  'Overview',
  'Attendance',
  'Projects',
  'Leaves',
  'Payroll',
  'Reports',
]

const leaveStats = [
  { label: 'Sick Leave', count: '00', type: 'LEFT' },
  { label: 'Casual Leave', count: '1.5', type: 'LEFT' },
  { label: 'Optional Leave', count: '01', type: 'LEFT' },
  { label: 'Unpaid Leave', count: '02', type: 'TAKEN' },
]

const leaveHistory = [
  { id: 'Leave-496', type: 'Unpaid Leave', dayType: '2nd Half', start: 'Sep 18, 2026', end: 'Sep 18, 2026', total: '0.5 day', status: 'PENDING' },
  { id: 'Leave-486', type: 'Optional Leave', dayType: 'Full Day', start: 'Sep 14, 2026', end: 'Sep 14, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-474', type: 'Sick Leave', dayType: 'Full Day', start: 'Sep 09, 2026', end: 'Sep 09, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-445', type: 'Unpaid Leave', dayType: 'Full Day', start: 'Aug 31, 2026', end: 'Aug 31, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-433', type: 'Unpaid Leave', dayType: '2nd Half', start: 'Aug 26, 2026', end: 'Aug 26, 2026', total: '0.5 day', status: 'APPROVED' },
  { id: 'Leave-424', type: 'Sick Leave', dayType: '2nd Half', start: 'Aug 18, 2026', end: 'Aug 18, 2026', total: '0.5 day', status: 'APPROVED' },
  { id: 'Leave-402', type: 'Sick Leave', dayType: 'Full Day', start: 'Aug 10, 2026', end: 'Aug 10, 2026', total: '1 day', status: 'APPROVED' },
  { id: 'Leave-350', type: 'Sick Leave', dayType: '2nd Half', start: 'Jul 20, 2026', end: 'Jul 20, 2026', total: '0.5 day', status: 'APPROVED' },
]

const holidays = [
  { day: '02', month: 'OCT', title: 'Gandhi Jayanti', meta: 'Public · in 6 days' },
  { day: '20', month: 'OCT', title: 'Dussehra', meta: 'Public · in 24 days' },
  { day: '08', month: 'NOV', title: 'Diwali', meta: 'Public · in 43 days' },
  { day: '09', month: 'NOV', title: 'Govardhan Puja', meta: 'Public · in 44 days' },
]

function App() {
  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-badge">PORTAL</div>
          <div className="user-mini">
            <span className="nav-icon">◔</span>
            <span className="user-text">MO</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`nav-item ${index === 3 ? 'active' : ''}`}
            >
              <span className="nav-dot">•</span>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">TIME OFF</p>
            <h1>Leave management</h1>
          </div>
          <button type="button" className="primary-btn">Request a leave</button>
        </header>

        <section className="tab-row">
          <button type="button" className="tab selected">My leaves</button>
          <button type="button" className="tab">Holidays</button>
        </section>

        <section className="stats-grid" aria-label="Leave balance summary">
          {leaveStats.map((stat) => (
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
                <small>8 REQUESTS · THIS YEAR</small>
              </div>
              <div className="panel-actions">
                <button type="button" className="filter-btn">Status: All Statuses ▾</button>
                <button type="button" className="request-btn">Request</button>
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
                  {leaveHistory.map((entry) => (
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
              {holidays.map((holiday) => (
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
      </main>
    </div>
  )
}

export default App
