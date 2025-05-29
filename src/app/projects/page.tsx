import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import CodePlayground from "@/components/CodePlayground";

export default function ProjectsPage() {
  const lineFollowerCode = `from pybricks.pupdevices import ColorSensor, Motor
from pybricks.parameters import Port
from pybricks.tools import wait

# Initialize components
color_sensor = ColorSensor(Port.D)
left_motor = Motor(Port.A)
right_motor = Motor(Port.B)

# Calibration values (adjust for your setup)
BLACK_THRESHOLD = 20
WHITE_THRESHOLD = 80
BASE_SPEED = 150

def follow_line():
    """Simple line following algorithm"""
    while True:
        # Read sensor value
        reflection = color_sensor.reflection()
        
        if reflection < BLACK_THRESHOLD:
            # On black line - go straight
            left_motor.run(BASE_SPEED)
            right_motor.run(BASE_SPEED)
        elif reflection > WHITE_THRESHOLD:
            # Off line (white surface) - turn to find line
            left_motor.run(BASE_SPEED // 2)
            right_motor.run(-BASE_SPEED // 2)
        else:
            # Edge of line - slight adjustment
            left_motor.run(BASE_SPEED * 0.8)
            right_motor.run(BASE_SPEED)
        
        wait(10)  # Small delay for responsive control

# Start line following
print("Starting line follower...")
follow_line()`;

  const obstacleAvoidanceCode = `from pybricks.pupdevices import UltrasonicSensor, Motor
from pybricks.parameters import Port
from pybricks.tools import wait

# Initialize components
distance_sensor = UltrasonicSensor(Port.C)
left_motor = Motor(Port.A)
right_motor = Motor(Port.B)

# Settings
SAFE_DISTANCE = 200  # mm
SPEED = 200

def avoid_obstacles():
    """Autonomous obstacle avoidance"""
    while True:
        distance = distance_sensor.distance()
        
        if distance > SAFE_DISTANCE:
            # Path clear - move forward
            left_motor.run(SPEED)
            right_motor.run(SPEED)
            print(f"Moving forward - distance: {distance}mm")
        else:
            # Obstacle detected - turn right
            print(f"Obstacle at {distance}mm - turning")
            left_motor.run_time(SPEED, 800)  # Turn right
            right_motor.run_time(-SPEED, 800)
            
        wait(100)  # Check distance every 100ms

# Start obstacle avoidance
print("Starting obstacle avoidance...")
avoid_obstacles()`;

  const remoteControlCode = `from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Button
from pybricks.tools import wait

# Initialize components
hub = PrimeHub()
left_motor = Motor(Port.A)
right_motor = Motor(Port.B)

SPEED = 200

def remote_control():
    """Control robot with hub buttons"""
    print("Remote control active!")
    print("Left button: Turn left")
    print("Right button: Turn right") 
    print("Center button: Move forward")
    print("Bluetooth button: Stop")
    
    while True:
        pressed = hub.buttons.pressed()
        
        if Button.LEFT in pressed:
            # Turn left
            left_motor.run(-SPEED)
            right_motor.run(SPEED)
            hub.light.on(Color.BLUE)
            
        elif Button.RIGHT in pressed:
            # Turn right
            left_motor.run(SPEED)
            right_motor.run(-SPEED)
            hub.light.on(Color.BLUE)
            
        elif Button.CENTER in pressed:
            # Move forward
            left_motor.run(SPEED)
            right_motor.run(SPEED)
            hub.light.on(Color.GREEN)
            
        else:
            # Stop
            left_motor.stop()
            right_motor.stop()
            hub.light.on(Color.RED)
            
        wait(50)

# Start remote control
remote_control()`;

  const projects = [
    {
      id: 1,
      title: "Line Following Robot",
      description: "Create a robot that can follow a black line on the ground using a color sensor",
      difficulty: "Intermediate",
      code: lineFollowerCode,
      concepts: ["Color Sensor", "Conditional Logic", "PID Control Basics"],
      instructions: [
        "Connect a color sensor to Port D",
        "Set up two motors on Ports A and B", 
        "Create a black line track on white paper",
        "Calibrate the sensor values for your lighting",
        "Test and adjust the speed and threshold values"
      ]
    },
    {
      id: 2,
      title: "Obstacle Avoidance Robot",
      description: "Build an autonomous robot that navigates around obstacles using ultrasonic sensors",
      difficulty: "Beginner",
      code: obstacleAvoidanceCode,
      concepts: ["Ultrasonic Sensor", "Autonomous Navigation", "Distance Measurement"],
      instructions: [
        "Connect an ultrasonic sensor to Port C",
        "Set up drive motors on Ports A and B",
        "Place obstacles in the robot's path",
        "Adjust the safe distance threshold",
        "Test in different environments"
      ]
    },
    {
      id: 3, 
      title: "Remote Control Robot",
      description: "Control your robot wirelessly using the hub's built-in buttons and sensors",
      difficulty: "Beginner",
      code: remoteControlCode,
      concepts: ["Button Input", "Real-time Control", "User Interface"],
      instructions: [
        "Connect motors to Ports A and B",
        "Learn the button layout on your hub",
        "Test each control direction",
        "Add sound effects for feedback",
        "Experiment with different movement patterns"
      ]
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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🚀 Robot Projects
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Put your LEGO programming skills to the test with these hands-on projects. 
            Each project includes complete code, step-by-step instructions, and opportunities to experiment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">        {/* Project Grid */}
        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                {/* Project Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        Project {project.id}: {project.title}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.difficulty === 'Beginner' 
                          ? 'bg-green-100 text-green-800'
                          : project.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    <p className="text-lg text-gray-600">{project.description}</p>
                  </div>
                </div>

                {/* Concepts and Instructions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">🧠 Key Concepts</h3>
                    <ul className="space-y-2">
                      {project.concepts.map((concept, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-gray-700">{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">📋 Setup Instructions</h3>
                    <ol className="space-y-2">
                      {project.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700 text-sm">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Code Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">💻 Complete Code</h3>
                  <CodeBlock 
                    code={project.code}
                    language="python"
                    title={`${project.title} - Python Code`}
                  />
                </div>

                {/* Interactive Playground */}
                <CodePlayground
                  initialCode={project.code}
                  title={`🎮 Try ${project.title}`}
                  description="Modify the code below to experiment with different behaviors and settings!"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Own Projects?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            These projects are just the beginning! With the fundamentals you&apos;ve learned, 
            you can create amazing robots that solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/units/1"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Learning
            </Link>
            <Link 
              href="/help"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Help
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
