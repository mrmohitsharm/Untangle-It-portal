import express from 'express'
import cors from 'cors'

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/api/portal', (req, res) => {
  res.json({
    pageTitle: 'Leave management',
    historyLabel: '8 REQUESTS · THIS YEAR',
    user: {
      initials: 'MO',
    },
    navItems: [
      { name: 'Overview' },
      { name: 'Attendance' },
      { name: 'Projects' },
      { name: 'Leaves' },
      { name: 'Payroll' },
      { name: 'Reports' },
    ],
    leaveSummary: [
      { label: 'Sick Leave', count: '00', type: 'LEFT' },
      { label: 'Casual Leave', count: '1.5', type: 'LEFT' },
      { label: 'Optional Leave', count: '01', type: 'LEFT' },
      { label: 'Unpaid Leave', count: '02', type: 'TAKEN' },
    ],
    leaveHistory: [
      { id: 'Leave-496', type: 'Unpaid Leave', dayType: '2nd Half', start: 'Sep 18, 2026', end: 'Sep 18, 2026', total: '0.5 day', status: 'PENDING' },
      { id: 'Leave-486', type: 'Optional Leave', dayType: 'Full Day', start: 'Sep 14, 2026', end: 'Sep 14, 2026', total: '1 day', status: 'APPROVED' },
      { id: 'Leave-474', type: 'Sick Leave', dayType: 'Full Day', start: 'Sep 09, 2026', end: 'Sep 09, 2026', total: '1 day', status: 'APPROVED' },
      { id: 'Leave-445', type: 'Unpaid Leave', dayType: 'Full Day', start: 'Aug 31, 2026', end: 'Aug 31, 2026', total: '1 day', status: 'APPROVED' },
      { id: 'Leave-433', type: 'Unpaid Leave', dayType: '2nd Half', start: 'Aug 26, 2026', end: 'Aug 26, 2026', total: '0.5 day', status: 'APPROVED' },
      { id: 'Leave-424', type: 'Sick Leave', dayType: '2nd Half', start: 'Aug 18, 2026', end: 'Aug 18, 2026', total: '0.5 day', status: 'APPROVED' },
      { id: 'Leave-402', type: 'Sick Leave', dayType: 'Full Day', start: 'Aug 10, 2026', end: 'Aug 10, 2026', total: '1 day', status: 'APPROVED' },
      { id: 'Leave-350', type: 'Sick Leave', dayType: '2nd Half', start: 'Jul 20, 2026', end: 'Jul 20, 2026', total: '0.5 day', status: 'APPROVED' },
    ],
    nextHolidays: [
      { day: '02', month: 'OCT', title: 'Gandhi Jayanti', meta: 'Public · in 6 days' },
      { day: '20', month: 'OCT', title: 'Dussehra', meta: 'Public · in 24 days' },
      { day: '08', month: 'NOV', title: 'Diwali', meta: 'Public · in 43 days' },
      { day: '09', month: 'NOV', title: 'Govardhan Puja', meta: 'Public · in 44 days' },
    ],
  })
})

app.listen(port, () => {
  console.log(`Portal API running on http://localhost:${port}`)
})
