import Link from "next/link";

export default function ProgressPage() {
  const units = [
    {
      id: 1,
      title: "Overview",
      description: "Introduction to LEGO robotics and programming concepts",
      icon: "🔍",
      duration: "30 min",
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: "Hub/Software",
      description: "Getting started with LEGO hardware and software setup",
      icon: "🔧",
      duration: "45 min",
      completed: true,
      progress: 100
    },
    {
      id: 3,
      title: "Python Fundamentals",
      description: "Basic Python programming concepts for robotics",
      icon: "🐍",
      duration: "60 min",
      completed: false,
      progress: 65
    },
    {
      id: 4,
      title: "Movement",
      description: "Programming robot movement and motor controls",
      icon: "🤖",
      duration: "90 min",
      completed: false,
      progress: 0
    },
    {
      id: 5,
      title: "Sensors/Outputs",
      description: "Working with sensors and output devices",
      icon: "📡",
      duration: "75 min",
      completed: false,
      progress: 0
    },
    {
      id: 6,
      title: "Advanced Programming",
      description: "Complex topics like PID controllers and line followers",
      icon: "⚡",
      duration: "120 min",
      completed: false,
      progress: 0
    }
  ];

  const totalProgress = Math.round(units.reduce((acc, unit) => acc + unit.progress, 0) / units.length);
  const completedUnits = units.filter(unit => unit.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700">
              <span className="text-xl">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Learning Progress</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalProgress}%</div>
              <div className="text-blue-900 font-semibold">Overall Progress</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedUnits}</div>
              <div className="text-green-900 font-semibold">Units Completed</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{6 - completedUnits}</div>
              <div className="text-purple-900 font-semibold">Units Remaining</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Course Progress</span>
              <span className="text-sm text-gray-500">{totalProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Unit Progress */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Progress</h2>
          <div className="space-y-6">
            {units.map((unit) => (
              <div key={unit.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{unit.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Unit {unit.id}: {unit.title}
                      </h3>
                      <p className="text-gray-600">{unit.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{unit.duration}</span>
                    {unit.completed ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Completed</span>
                      </div>
                    ) : (
                      <Link 
                        href={`/units/${unit.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        {unit.progress > 0 ? 'Continue' : 'Start'}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm text-gray-500">{unit.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        unit.completed ? 'bg-green-500' : 
                        unit.progress > 0 ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${unit.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border-2 ${completedUnits >= 1 ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900">First Steps</h3>
              <p className="text-sm text-gray-600">Complete your first unit</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${completedUnits >= 3 ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900">Halfway There</h3>
              <p className="text-sm text-gray-600">Complete 3 units</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${completedUnits >= 6 ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900">Robot Master</h3>
              <p className="text-sm text-gray-600">Complete all units</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
