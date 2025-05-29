import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import CodePlayground from "@/components/CodePlayground";

export default function DemoPage() {
  const demoCode = `# LEGO Robot Movement Demo
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction
from pybricks.tools import wait

# Initialize the hub
hub = PrimeHub()

# Initialize motors
left_motor = Motor(Port.A, Direction.COUNTERCLOCKWISE)
right_motor = Motor(Port.B)

# Function to move the robot forward
def move_forward(distance_mm):
    # Calculate rotation needed (adjust for your wheel size)
    rotation = distance_mm / (3.14159 * 56)  # 56mm wheel diameter
    
    # Move both motors
    left_motor.run_angle(200, rotation)
    right_motor.run_angle(200, rotation)

# Function to turn the robot
def turn_right(degrees):
    # Calculate rotation for turning
    rotation = degrees * 2.5  # Adjust for your robot's dimensions
    
    # Turn by moving motors in opposite directions
    left_motor.run_angle(200, rotation)
    right_motor.run_angle(200, -rotation)

# Demo program: Move in a square
print("Starting square movement demo...")

for i in range(4):
    print(f"Side {i+1}")
    move_forward(200)  # Move 200mm forward
    wait(500)          # Wait 0.5 seconds
    turn_right(90)     # Turn 90 degrees right
    wait(500)          # Wait 0.5 seconds

print("Demo complete!")
hub.speaker.beep()`;

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
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Interactive Demo</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore this example Python program that makes a LEGO robot move in a square pattern. 
            This demonstrates basic movement control and programming concepts you&apos;ll learn in our lessons.
          </p>
        </div>

        {/* Demo Code */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Robot Square Movement Demo</h2>
          <p className="text-gray-700 mb-6">
            This program demonstrates how to control LEGO robot motors to create movement patterns. 
            The robot will move forward, turn right, and repeat this pattern four times to create a square.
          </p>          <CodeBlock 
            code={demoCode}
            language="python"
            title="Robot Square Movement - Python"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">🧱 Hardware Setup</h3>
              <ul className="text-blue-800 space-y-2 text-sm">
                <li>• LEGO Prime Hub or compatible hub</li>
                <li>• Two motors connected to ports A and B</li>
                <li>• Wheels attached to the motors</li>
                <li>• Stable robot chassis</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">🔧 Key Concepts</h3>
              <ul className="text-green-800 space-y-2 text-sm">
                <li>• Motor initialization and control</li>
                <li>• Coordinate movement between motors</li>
                <li>• Distance and angle calculations</li>
                <li>• Loop structures for repetition</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Setup and Imports</h3>
              <p className="text-gray-700">
                The program starts by importing the necessary modules from the PyBricks library, 
                which provides the tools to control LEGO robots with Python.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Motor Initialization</h3>
              <p className="text-gray-700">
                Two motors are set up - one for the left wheel (Port A) and one for the right wheel (Port B). 
                The direction is specified to ensure both wheels rotate correctly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Movement Functions</h3>
              <p className="text-gray-700">
                Custom functions are created for basic movements: <code className="bg-gray-100 px-2 py-1 rounded">move_forward()</code> 
                makes the robot go straight, and <code className="bg-gray-100 px-2 py-1 rounded">turn_right()</code> 
                rotates the robot by moving the wheels in opposite directions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Main Program Loop</h3>
              <p className="text-gray-700">
                A loop repeats the movement pattern four times: move forward 200mm, pause, turn right 90 degrees, 
                pause, and repeat. This creates a perfect square path.
              </p>
            </div>
          </div>        </div>

        {/* Interactive Playground */}
        <div className="mb-8">
          <CodePlayground
            initialCode={`# Simple robot movement experiment
speed = 100
distance = 20

print("Robot starting movement")
print(f"Speed: {speed} degrees/second")
print(f"Distance: {distance} cm")

# Try changing these values!
move_forward(distance)
turn_angle(90)
move_forward(distance)

print("Movement complete!")`}
            title="🎮 Interactive Code Playground"
            description="Experiment with robot movement code. Change the speed and distance values to see different behaviors!"
          />
        </div>

        {/* Try It Yourself */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Try It Yourself?</h2>
          <p className="text-blue-100 mb-6">
            This is just a taste of what you&apos;ll learn in our complete course. Start with the basics 
            and work your way up to creating your own robot programs!
          </p>
          <Link 
            href="/units/1"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Learning Now
          </Link>
        </div>
      </main>
    </div>
  );
}
