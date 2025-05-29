import Link from "next/link";

export default function Home() {
  const units = [
    {
      id: 1,
      title: "Overview",
      description: "Introduction to LEGO robotics and programming concepts",
      icon: "🔍",
      duration: "30 min"
    },
    {
      id: 2,
      title: "Hub/Software",
      description: "Getting started with LEGO hardware and software setup",
      icon: "🔧",
      duration: "45 min"
    },
    {
      id: 3,
      title: "Python Fundamentals",
      description: "Basic Python programming concepts for robotics",
      icon: "🐍",
      duration: "60 min"
    },
    {
      id: 4,
      title: "Movement",
      description: "Programming robot movement and motor controls",
      icon: "🤖",
      duration: "90 min"
    },
    {
      id: 5,
      title: "Sensors/Outputs",
      description: "Working with sensors and output devices",
      icon: "📡",
      duration: "75 min"
    },
    {
      id: 6,
      title: "Advanced Programming",
      description: "Complex topics like PID controllers and line followers",
      icon: "⚡",
      duration: "120 min"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🧱</div>
              <h1 className="text-2xl font-bold text-gray-900">LEGO Python Programming</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/projects" className="text-gray-600 hover:text-blue-600 transition-colors">
                Projects
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="/progress" className="text-gray-600 hover:text-blue-600 transition-colors">
                Progress
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                Help
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn to Program LEGO Robots with Python
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master robotics programming through interactive lessons, hands-on projects, and step-by-step tutorials. 
            Build amazing robots and bring them to life with code!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/units/1"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </Link>
            <Link 
              href="/projects"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              View Projects
            </Link>
            <Link 
              href="/demo"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Units */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Learning Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <Link 
              key={unit.id}
              href={`/units/${unit.id}`}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{unit.icon}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {unit.duration}
                </span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Unit {unit.id}: {unit.title}
              </h4>
              <p className="text-gray-600">{unit.description}</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                Start Unit →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Learn Here?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Interactive Lessons</h4>
              <p className="text-gray-600">
                Learn through hands-on coding examples and interactive tutorials
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Real Projects</h4>
              <p className="text-gray-600">
                Build actual robots and see your code come to life
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h4>
              <p className="text-gray-600">
                Track your learning journey and celebrate achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2024 LEGO Python Programming Learning Platform</p>
            <p className="mt-2">Based on curriculum from <a href="https://primelessons.org" className="text-blue-600 hover:underline">PrimeLessons.org</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
