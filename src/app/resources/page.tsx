import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Getting Started",
      items: [
        {
          title: "LEGO Education SPIKE Prime",
          description: "Official LEGO robotics platform overview and hardware specs",
          url: "https://education.lego.com/en-us/products/lego-education-spike-prime-set/45678",
          type: "Official Documentation"
        },
        {
          title: "PyBricks Documentation",
          description: "Complete API reference for programming LEGO robots with Python",
          url: "https://pybricks.com/",
          type: "API Reference"
        },
        {
          title: "Python for Beginners",
          description: "Learn Python basics if you&apos;re new to programming",
          url: "https://www.python.org/about/gettingstarted/",
          type: "Tutorial"
        }
      ]
    },
    {
      category: "Hardware & Assembly",
      items: [
        {
          title: "Building Instructions",
          description: "Step-by-step guides for building different robot chassis",
          url: "#",
          type: "Instructions"
        },
        {
          title: "Sensor Setup Guide",
          description: "How to properly connect and configure sensors",
          url: "#",
          type: "Guide"
        },
        {
          title: "Motor Calibration",
          description: "Tips for getting accurate movement from your motors",
          url: "#",
          type: "Tutorial"
        }
      ]
    },
    {
      category: "Programming Concepts",
      items: [
        {
          title: "Variables and Functions",
          description: "Understanding the building blocks of programming",
          url: "/units/3",
          type: "Lesson"
        },
        {
          title: "Loops and Conditions",
          description: "Control flow in robot programming",
          url: "/units/3",
          type: "Lesson"
        },
        {
          title: "Object-Oriented Programming",
          description: "Advanced concepts for organizing your robot code",
          url: "#",
          type: "Advanced"
        }
      ]
    },
    {
      category: "Project Ideas",
      items: [
        {
          title: "Pet Robot",
          description: "Create a robot pet that follows you around and responds to touch",
          url: "#",
          type: "Project"
        },
        {
          title: "Security System",
          description: "Build a robot that patrols and detects intruders",
          url: "#",
          type: "Project"
        },
        {
          title: "Maze Solver",
          description: "Program a robot to navigate and solve mazes autonomously",
          url: "#",
          type: "Advanced Project"
        }
      ]
    }
  ];

  const tools = [
    {
      name: "VS Code",
      description: "Recommended code editor with Python support",
      icon: "💻",
      url: "https://code.visualstudio.com/"
    },
    {
      name: "Python",
      description: "Programming language for LEGO robotics",
      icon: "🐍", 
      url: "https://www.python.org/"
    },
    {
      name: "PyBricks",
      description: "Python library for LEGO robot programming",
      icon: "🧱",
      url: "https://pybricks.com/"
    },
    {
      name: "LEGO Education App",
      description: "Official app for SPIKE Prime programming",
      icon: "📱",
      url: "https://education.lego.com/en-us/downloads/spike-app"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 text-blue-600 hover:text-blue-700">
              <span className="text-xl">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            📚 Learning Resources
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Comprehensive resources, tools, and references to support your LEGO robotics programming journey. 
            Everything you need to become a robotics expert!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Essential Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🛠️ Essential Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                  <a 
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resource Categories */}
        <section className="space-y-12">
          {resources.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.type === 'Official Documentation' 
                          ? 'bg-blue-100 text-blue-800'
                          : item.type === 'API Reference'
                          ? 'bg-purple-100 text-purple-800'
                          : item.type === 'Tutorial'
                          ? 'bg-green-100 text-green-800'
                          : item.type === 'Advanced' || item.type === 'Advanced Project'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    {item.url.startsWith('http') ? (
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Visit Resource →
                      </a>
                    ) : item.url !== '#' ? (
                      <Link 
                        href={item.url}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Go to Lesson →
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm">Coming Soon</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Quick Reference */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">🚀 Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Common Commands</h3>
                <div className="space-y-2 text-sm font-mono bg-indigo-800 rounded p-4">
                  <div><span className="text-indigo-200"># Move forward</span></div>
                  <div>motor.run_angle(speed, degrees)</div>
                  <div><span className="text-indigo-200"># Read sensor</span></div>
                  <div>value = sensor.distance()</div>
                  <div><span className="text-indigo-200"># Wait</span></div>
                  <div>wait(milliseconds)</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Port Assignments</h3>
                <div className="space-y-2 text-sm">
                  <div>• Port A: Left Motor</div>
                  <div>• Port B: Right Motor</div>
                  <div>• Port C: Ultrasonic Sensor</div>
                  <div>• Port D: Color Sensor</div>
                  <div>• Port E: Force Sensor</div>
                  <div>• Port F: Additional Motor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="mt-16 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Check out our comprehensive help section 
              or join our community for support and project sharing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/help"
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Visit Help Center
              </Link>
              <Link 
                href="/projects"
                className="border border-yellow-500 text-yellow-700 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
              >
                Browse Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
