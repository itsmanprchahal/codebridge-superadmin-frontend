
function LineChartSVG() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-40">
      <polyline fill="none" stroke="#4f46e5" strokeWidth="3" points="0,60 30,45 60,50 90,30 120,35 150,25 180,40" />
    </svg>
  )
}

function BarChartSVG() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-40">
      <rect x="10" y="30" width="20" height="40" fill="#10b981" />
      <rect x="45" y="20" width="20" height="50" fill="#06b6d4" />
      <rect x="80" y="10" width="20" height="60" fill="#f59e0b" />
      <rect x="115" y="25" width="20" height="45" fill="#ef4444" />
      <rect x="150" y="5" width="20" height="65" fill="#6366f1" />
    </svg>
  )
}

function PieChartSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-40">
      <circle cx="40" cy="40" r="30" fill="#ef4444" />
      <path d="M40 10 A30 30 0 0 1 70 40 L40 40 Z" fill="#f59e0b" />
      <path d="M70 40 A30 30 0 0 1 40 70 L40 40 Z" fill="#10b981" />
    </svg>
  )
}

export default function Dashboard() {
  return (
    <div className="flex h-screen text-sm">

      {/* Main content (right) */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="text-gray-500">Overview of recent metrics</div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Revenue (Last 7 days)</h3>
              <div className="mt-3">
                <LineChartSVG />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">Sales by Category</h3>
              <div className="mt-3">
                <BarChartSVG />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-500">User Distribution</h3>
              <div className="mt-3">
                <PieChartSVG />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm h-64">
              <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
              <div className="mt-3 h-full">
                <LineChartSVG />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm h-64">
              <h3 className="text-sm font-medium text-gray-500">Top Products</h3>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center justify-between"><span>Product A</span><span className="text-gray-500">1,230</span></li>
                <li className="flex items-center justify-between"><span>Product B</span><span className="text-gray-500">980</span></li>
                <li className="flex items-center justify-between"><span>Service C</span><span className="text-gray-500">620</span></li>
              </ul>
            </div>
          </section>

          <footer className="mt-8 text-center text-gray-400">Last updated: just now</footer>
        </div>
      </main>
    </div>
  )
}
