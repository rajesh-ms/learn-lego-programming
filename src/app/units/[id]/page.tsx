import Link from "next/link";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";

interface UnitData {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  content: {
    introduction: string;
    objectives: string[];
    sections: {
      title: string;
      content: string;
      codeExample?: string;
    }[];
  };
}

const units: Record<number, UnitData> = {
  1: {
    id: 1,
    title: "Overview",
    description: "Introduction to LEGO robotics and programming concepts",
    icon: "🔍",
    duration: "30 min",
    content: {
      introduction: "Welcome to the exciting world of LEGO robotics programming! In this unit, you'll learn the fundamentals of robotics and how programming brings LEGO robots to life.",
      objectives: [
        "Understand what robotics is and how it applies to LEGO",
        "Learn the basic components of a LEGO robot",
        "Discover how programming controls robot behavior",
        "Set up your learning environment"
      ],
      sections: [
        {
          title: "What is Robotics?",
          content: "Robotics combines mechanical engineering, electrical engineering, and computer science to create machines that can perform tasks automatically. LEGO robotics makes these concepts accessible and fun to learn."
        },
        {
          title: "LEGO Robot Components",
          content: "A typical LEGO robot consists of: the programmable hub (brain), motors (for movement), sensors (for input), and building elements (structure)."
        },
        {
          title: "Programming Languages",
          content: "While LEGO robots can be programmed with block-based languages, Python offers more power and flexibility for advanced robotics projects.",
          codeExample: `# Your first Python program for LEGO
print("Hello, LEGO Robot!")

# This simple command will display a message
# on your robot's screen or computer terminal`
        }
      ]
    }
  },
  2: {
    id: 2,
    title: "Hub/Software",
    description: "Getting started with LEGO hardware and software setup",
    icon: "🔧",
    duration: "45 min",
    content: {
      introduction: "Learn how to set up your LEGO hub and install the necessary software to start programming your robot.",
      objectives: [
        "Connect and configure your LEGO hub",
        "Install Python development environment",
        "Test your first connection",
        "Understand the development workflow"
      ],
      sections: [
        {
          title: "LEGO Hub Setup",
          content: "The LEGO hub is the brain of your robot. We'll learn how to connect it to your computer and prepare it for programming."
        },
        {
          title: "Software Installation",
          content: "Install the necessary software tools including Python, VS Code, and LEGO-specific libraries.",
          codeExample: `# Install required packages
pip install pybricks
pip install micropython

# Test your installation
import pybricks
print("Ready to program!")`        }
      ]
    }
  },
  3: {
    id: 3,
    title: "Python Fundamentals",
    description: "Basic Python programming concepts for robotics",
    icon: "🐍",
    duration: "60 min",
    content: {
      introduction: "Master the essential Python programming concepts you&apos;ll need to control your LEGO robot effectively. This unit covers variables, functions, loops, and conditional statements.",
      objectives: [
        "Understand Python variables and data types",
        "Learn to use functions and parameters",
        "Master loops and conditional statements",
        "Practice with robotics-focused examples"
      ],
      sections: [
        {
          title: "Variables and Data Types",
          content: "Variables store information that your robot can use. Learn about numbers, strings, and boolean values in Python.",
          codeExample: `# Variables for robot control
speed = 50          # Integer for motor speed
robot_name = "Rex"  # String for robot name
is_moving = True    # Boolean for status

print(f"Robot {robot_name} is moving at speed {speed}")
print(f"Currently moving: {is_moving}")`
        },
        {
          title: "Functions",
          content: "Functions are reusable blocks of code that make your robot programs organized and efficient.",
          codeExample: `# Function to move robot forward
def move_forward(distance):
    print(f"Moving forward {distance} cm")
    # Robot movement code would go here

# Function with return value
def calculate_turn_time(angle):
    time_per_degree = 0.1
    return angle * time_per_degree

# Using functions
move_forward(30)
turn_time = calculate_turn_time(90)
print(f"Turn will take {turn_time} seconds")`
        },
        {
          title: "Loops and Conditions",
          content: "Loops repeat actions and conditions make decisions - essential for robot behavior programming.",
          codeExample: `# For loop - repeat action multiple times
for i in range(3):
    print(f"Beep {i + 1}")

# While loop - continue until condition is met
distance_traveled = 0
while distance_traveled < 100:
    distance_traveled += 10
    print(f"Traveled {distance_traveled} cm")

# Conditional statements for robot decisions
sensor_value = 75
if sensor_value > 50:
    print("Obstacle detected - turning left")
elif sensor_value > 20:
    print("Slow down")
else:
    print("Path clear - full speed ahead")`
        }
      ]
    }
  },
  4: {
    id: 4,
    title: "Movement",
    description: "Programming robot movement and motors",
    icon: "🚗",
    duration: "75 min",
    content: {
      introduction: "Learn to control your robot&apos;s movement with precision. This unit covers motor control, steering, and creating complex movement patterns.",
      objectives: [
        "Control individual motors and motor pairs",
        "Implement precise movement and turning",
        "Create movement patterns and sequences",
        "Understand motor timing and synchronization"
      ],
      sections: [
        {
          title: "Basic Motor Control",
          content: "Start with simple motor operations to move your robot forward, backward, and turn.",
          codeExample: `from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction
from pybricks.tools import wait

# Initialize motors
left_motor = Motor(Port.A)
right_motor = Motor(Port.B)

# Move forward for 2 seconds
left_motor.run(200)   # 200 degrees per second
right_motor.run(200)
wait(2000)  # Wait 2 seconds

# Stop motors
left_motor.stop()
right_motor.stop()`
        },
        {
          title: "Precise Movement",
          content: "Control exact distances and angles for precise robot positioning.",
          codeExample: `# Move specific distance
def move_distance(distance_cm):
    # Calculate motor rotations needed
    wheel_diameter = 5.6  # cm
    wheel_circumference = wheel_diameter * 3.14159
    rotations = distance_cm / wheel_circumference
    degrees = rotations * 360
    
    # Move both motors the calculated amount
    left_motor.run_angle(200, degrees)
    right_motor.run_angle(200, degrees)

# Turn specific angle
def turn_angle(angle_degrees):
    # Calculate wheel movement for turn
    robot_width = 15  # cm between wheels
    arc_length = (robot_width * 3.14159 * angle_degrees) / 360
    wheel_degrees = (arc_length / wheel_circumference) * 360
    
    # Turn by moving wheels in opposite directions
    left_motor.run_angle(200, wheel_degrees)
    right_motor.run_angle(200, -wheel_degrees)

# Use the functions
move_distance(30)  # Move 30 cm forward
turn_angle(90)     # Turn 90 degrees right`
        },
        {
          title: "Movement Patterns",
          content: "Combine basic movements to create complex patterns and behaviors.",
          codeExample: `# Draw a square pattern
def draw_square(side_length):
    for i in range(4):
        move_distance(side_length)
        turn_angle(90)

# Spiral pattern
def spiral_pattern():
    distance = 10
    for i in range(6):
        move_distance(distance)
        turn_angle(60)
        distance += 5  # Increase distance each time

# Figure-8 pattern
def figure_eight():
    for i in range(2):
        # Make a circle
        for j in range(36):  # 36 steps for smooth circle
            left_motor.run_time(150, 100)   # Left wheel slower
            right_motor.run_time(200, 100)  # Right wheel faster
        # Reverse direction for second loop
        for j in range(36):
            left_motor.run_time(200, 100)   # Left wheel faster
            right_motor.run_time(150, 100)  # Right wheel slower

# Execute patterns
draw_square(20)
wait(1000)
spiral_pattern()
wait(1000)
figure_eight()`
        }
      ]
    }
  },
  5: {
    id: 5,
    title: "Sensors/Outputs",
    description: "Working with sensors and output devices",
    icon: "📡",
    duration: "90 min",
    content: {
      introduction: "Discover how sensors give your robot awareness of its environment and how to use various output devices to interact with the world.",
      objectives: [
        "Read and interpret sensor data",
        "Use color, distance, and touch sensors",
        "Control lights, sounds, and displays",
        "Create responsive robot behaviors"
      ],
      sections: [
        {
          title: "Distance and Color Sensors",
          content: "Learn to use ultrasonic and color sensors to detect obstacles and identify objects.",
          codeExample: `from pybricks.pupdevices import UltrasonicSensor, ColorSensor
from pybricks.parameters import Port, Color

# Initialize sensors
distance_sensor = UltrasonicSensor(Port.C)
color_sensor = ColorSensor(Port.D)

# Read distance sensor
distance = distance_sensor.distance()
print(f"Distance to obstacle: {distance} mm")

# Read color sensor
detected_color = color_sensor.color()
print(f"Detected color: {detected_color}")

# Obstacle avoidance behavior
def avoid_obstacles():
    while True:
        distance = distance_sensor.distance()
        
        if distance > 200:  # Path clear (20 cm)
            move_forward()
        elif distance > 100:  # Slow down
            move_forward_slow()
        else:  # Turn to avoid
            turn_right()
            wait(1000)
            
        wait(100)  # Check every 100ms`
        },
        {
          title: "Touch and Force Sensors",
          content: "Implement touch-based interactions and force sensing for delicate operations.",
          codeExample: `from pybricks.pupdevices import ForceSensor
from pybricks.parameters import Port

# Initialize force sensor
force_sensor = ForceSensor(Port.E)

# Touch detection
def wait_for_touch():
    print("Waiting for touch...")
    while not force_sensor.pressed():
        wait(10)
    print("Touch detected!")

# Force measurement
def measure_force():
    force = force_sensor.force()
    print(f"Applied force: {force} N")
    
    if force > 5:
        print("Too much force - backing away")
        move_backward()
    elif force > 2:
        print("Good pressure - continuing")
        move_forward_slow()
    else:
        print("Light touch - moving forward")
        move_forward()

# Bump sensor behavior
def bump_and_turn():
    move_forward()
    while not force_sensor.pressed():
        wait(10)
    
    # Hit something - back up and turn
    move_backward()
    wait(500)
    turn_angle(45)
    move_forward()`
        },
        {
          title: "Lights, Sounds, and Display",
          content: "Use output devices to communicate and provide feedback.",
          codeExample: `from pybricks.hubs import PrimeHub
from pybricks.parameters import Color
from pybricks.tools import wait

# Initialize hub
hub = PrimeHub()

# Control LED lights
hub.light.on(Color.RED)     # Turn on red light
wait(1000)
hub.light.on(Color.GREEN)   # Change to green
wait(1000)
hub.light.off()             # Turn off

# Play sounds
hub.speaker.beep(frequency=1000, duration=500)  # 1kHz beep for 0.5s

# Display on screen
hub.display.text("HELLO")
wait(2000)
hub.display.number(42)
wait(2000)

# Custom pixel pattern
hub.display.pixel(2, 2, 100)  # Center pixel bright

# Status indication function
def show_status(status):
    if status == "ready":
        hub.light.on(Color.GREEN)
        hub.speaker.beep(800, 200)
        hub.display.text("RDY")
    elif status == "error":
        hub.light.on(Color.RED)
        hub.speaker.beep(200, 1000)
        hub.display.text("ERR")
    elif status == "working":
        hub.light.on(Color.YELLOW)
        hub.display.text("WORK")

# Smart sensor feedback
def sensor_feedback():
    while True:
        distance = distance_sensor.distance()
        
        if distance < 100:
            # Close obstacle - red light and warning beep
            hub.light.on(Color.RED)
            hub.speaker.beep(1000, 100)
        elif distance < 300:
            # Medium distance - yellow light
            hub.light.on(Color.YELLOW)
        else:
            # Clear path - green light
            hub.light.on(Color.GREEN)
            
        wait(200)`
        }
      ]
    }
  },
  6: {
    id: 6,
    title: "Advanced Programming",
    description: "Complex topics like PID controllers and line followers",
    icon: "🚀",
    duration: "120 min",
    content: {
      introduction: "Master advanced robotics programming concepts including PID control, line following, autonomous navigation, and complex sensor fusion techniques.",
      objectives: [
        "Implement PID controllers for smooth movement",
        "Create line-following algorithms",
        "Build autonomous navigation systems",
        "Combine multiple sensors for complex behaviors"
      ],
      sections: [
        {
          title: "PID Controllers",
          content: "Learn to implement Proportional-Integral-Derivative controllers for smooth and accurate robot movement.",
          codeExample: `class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp  # Proportional gain
        self.ki = ki  # Integral gain
        self.kd = kd  # Derivative gain
        
        self.previous_error = 0
        self.integral = 0
    
    def calculate(self, setpoint, current_value):
        # Calculate error
        error = setpoint - current_value
        
        # Proportional term
        proportional = self.kp * error
        
        # Integral term
        self.integral += error
        integral_term = self.ki * self.integral
        
        # Derivative term
        derivative = self.kd * (error - self.previous_error)
        self.previous_error = error
        
        # Combine all terms
        output = proportional + integral_term + derivative
        return output

# Use PID for straight-line driving
def drive_straight_pid(target_distance):
    pid = PIDController(kp=2.0, ki=0.1, kd=0.5)
    base_speed = 200
    
    distance_traveled = 0
    
    while distance_traveled < target_distance:
        # Get current heading (would use gyro sensor)
        current_heading = hub.imu.heading()
        target_heading = 0  # Drive straight
        
        # Calculate correction
        correction = pid.calculate(target_heading, current_heading)
        
        # Apply correction to motors
        left_speed = base_speed - correction
        right_speed = base_speed + correction
        
        left_motor.run(left_speed)
        right_motor.run(right_speed)
        
        distance_traveled += 0.5  # Update based on encoder
        wait(50)`
        },
        {
          title: "Line Following",
          content: "Implement sophisticated line-following algorithms using color sensors and PID control.",
          codeExample: `class LineFollower:
    def __init__(self):
        self.color_sensor = ColorSensor(Port.D)
        self.pid = PIDController(kp=1.5, ki=0.0, kd=0.8)
        self.base_speed = 150
        
        # Calibrate sensor values
        self.black_value = 5   # Reflection on black line
        self.white_value = 95  # Reflection on white surface
        self.target_value = (self.black_value + self.white_value) / 2
    
    def follow_line(self):
        while True:
            # Read sensor value
            current_reflection = self.color_sensor.reflection()
            
            # Calculate error from center of line
            error = self.target_value - current_reflection
            
            # Get PID correction
            turn_rate = self.pid.calculate(0, error)
            
            # Apply to motors
            left_speed = self.base_speed - turn_rate
            right_speed = self.base_speed + turn_rate
            
            # Ensure speeds are in valid range
            left_speed = max(-300, min(300, left_speed))
            right_speed = max(-300, min(300, right_speed))
            
            left_motor.run(left_speed)
            right_motor.run(right_speed)
            
            wait(10)  # Fast loop for responsive control
    
    def detect_intersection(self):
        # Detect intersection by looking for wide black area
        reflection = self.color_sensor.reflection()
        return reflection < self.black_value + 10

# Advanced line following with intersections
line_follower = LineFollower()

def navigate_course():
    intersection_count = 0
    
    while intersection_count < 3:  # Navigate 3 intersections
        line_follower.follow_line()
        
        if line_follower.detect_intersection():
            intersection_count += 1
            print(f"Intersection {intersection_count} detected")
            
            # Stop and decide direction
            left_motor.stop()
            right_motor.stop()
            wait(500)
            
            # Make decision based on intersection number
            if intersection_count == 1:
                turn_angle(90)   # Turn right
            elif intersection_count == 2:
                move_distance(10)  # Go straight through
            else:
                turn_angle(-90)  # Turn left
            
            wait(1000)  # Pause before continuing`
        },
        {
          title: "Autonomous Navigation",
          content: "Create robots that can navigate complex environments using multiple sensors and decision-making algorithms.",
          codeExample: `class AutonomousRobot:
    def __init__(self):
        self.distance_sensor = UltrasonicSensor(Port.C)
        self.color_sensor = ColorSensor(Port.D)
        self.gyro = hub.imu
        
        self.state = "exploring"  # exploring, following_wall, line_following
        self.waypoints = []
        self.current_waypoint = 0
    
    def explore_environment(self):
        """Random exploration with obstacle avoidance"""
        while self.state == "exploring":
            distance = self.distance_sensor.distance()
            
            if distance > 300:  # Clear path
                move_forward()
                
                # Check for line
                if self.color_sensor.reflection() < 20:
                    self.state = "line_following"
                    break
                    
            elif distance > 150:  # Approaching obstacle
                move_forward_slow()
            else:  # Obstacle close
                self.avoid_obstacle()
            
            wait(50)
    
    def avoid_obstacle(self):
        """Smart obstacle avoidance"""
        # Back up a bit
        move_backward()
        wait(500)
        
        # Check both directions
        turn_angle(-45)
        left_distance = self.distance_sensor.distance()
        
        turn_angle(90)
        right_distance = self.distance_sensor.distance()
        
        # Turn toward clearer path
        if left_distance > right_distance:
            turn_angle(-90)  # Go left
        else:
            turn_angle(0)    # Go right (already turned)
        
        move_forward()
        wait(1000)
    
    def wall_following(self):
        """Follow wall at consistent distance"""
        target_distance = 150  # 15 cm from wall
        
        while self.state == "following_wall":
            wall_distance = self.distance_sensor.distance()
            error = target_distance - wall_distance
            
            # Adjust path based on wall distance
            if abs(error) < 20:  # Good distance
                move_forward()
            elif error > 0:  # Too far from wall
                turn_angle(-5)
                move_forward()
            else:  # Too close to wall
                turn_angle(5)
                move_forward()
            
            wait(100)
    
    def run_mission(self):
        """Main navigation loop"""
        while True:
            if self.state == "exploring":
                self.explore_environment()
            elif self.state == "line_following":
                line_follower.follow_line()
            elif self.state == "following_wall":
                self.wall_following()
            
            # Check for mission completion
            if self.mission_complete():
                break
    
    def mission_complete(self):
        # Define mission completion criteria
        return False  # Placeholder

# Create and run autonomous robot
robot = AutonomousRobot()
robot.run_mission()`
        }
      ]
    }
  }
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UnitPage({ params }: Props) {
  const { id } = await params;
  const unitId = parseInt(id);
  const unit = units[unitId];

  if (!unit) {
    notFound();
  }

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
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{unit.duration}</span>
              <div className="flex items-center space-x-2">
                {unitId > 1 && (
                  <Link 
                    href={`/units/${unitId - 1}`}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {unitId < 6 && (
                  <Link 
                    href={`/units/${unitId + 1}`}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Unit Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl">{unit.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Unit {unit.id}: {unit.title}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{unit.description}</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">{unit.content.introduction}</p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Objectives</h2>
          <ul className="space-y-3">
            {unit.content.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        {unit.content.sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>            
            {section.codeExample && (
              <CodeBlock 
                code={section.codeExample}
                language="python"
                title="Python Code Example"
              />
            )}
          </div>
        ))}

        {/* Navigation */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-6">
          <div>
            {unitId > 1 && (
              <Link 
                href={`/units/${unitId - 1}`}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <span>←</span>
                <span>Previous Unit</span>
              </Link>
            )}
          </div>
          <div>
            {unitId < 6 && (
              <Link 
                href={`/units/${unitId + 1}`}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <span>Next Unit</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params for all units
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];
}
