import Link from "next/link";

export default function HelpPage() {
  const faqs = [
    {
      question: "What do I need to get started?",
      answer: "You'll need a LEGO Mindstorms Robot Inventor set or compatible LEGO hub, a computer with internet access, and this learning platform. All software requirements are covered in Unit 2."
    },
    {
      question: "Do I need prior programming experience?",
      answer: "No! This course is designed for beginners. We start with basic programming concepts and gradually build up to more advanced topics."
    },
    {
      question: "What programming language do we use?",
      answer: "We use Python with the PyBricks library, which is specifically designed for LEGO robotics programming."
    },
    {
      question: "How long does each unit take?",
      answer: "Each unit has an estimated completion time, ranging from 30 minutes to 2 hours. You can work at your own pace and take breaks as needed."
    },
    {
      question: "Can I use this with different LEGO sets?",
      answer: "This course is designed for LEGO Mindstorms and SPIKE Prime sets. Some concepts can be adapted to other programmable LEGO sets."
    },
    {
      question: "How do I copy and run the code examples?",
      answer: "Each code example has a copy button. Click it to copy the code to your clipboard, then paste it into your Python development environment."
    }
  ];

  const troubleshooting = [
    {
      issue: "My robot isn't responding to the program",
      solution: "Check that your hub is properly connected, the battery is charged, and motors are connected to the correct ports as specified in the code."
    },
    {
      issue: "I get an error when running Python code",
      solution: "Make sure you have installed PyBricks correctly and that your Python environment is set up as described in Unit 2."
    },
    {
      issue: "The robot moves differently than expected",
      solution: "Double-check your motor connections, wheel attachment, and review the distance/rotation calculations in your code."
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Help & Support</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions and troubleshooting tips for your LEGO programming journey.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">1️⃣</div>
              <h3 className="font-semibold text-gray-900 mb-2">Start with Unit 1</h3>
              <p className="text-sm text-gray-600">Begin with the Overview to understand robotics basics</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">2️⃣</div>
              <h3 className="font-semibold text-gray-900 mb-2">Set Up Your Hardware</h3>
              <p className="text-sm text-gray-600">Follow Unit 2 to configure your LEGO hub and software</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">3️⃣</div>
              <h3 className="font-semibold text-gray-900 mb-2">Code and Build</h3>
              <p className="text-sm text-gray-600">Progress through units, building projects as you learn</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
          <div className="space-y-6">
            {troubleshooting.map((item, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Problem: {item.issue}</h3>
                <p className="text-red-800">
                  <strong>Solution:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">External Links</h3>
              <ul className="space-y-2 text-blue-600">
                <li>
                  <a href="https://primelessons.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    PrimeLessons.org - Original Curriculum
                  </a>
                </li>
                <li>
                  <a href="https://pybricks.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    PyBricks Documentation
                  </a>
                </li>
                <li>
                  <a href="https://www.lego.com/en-us/themes/mindstorms" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LEGO Mindstorms Official Site
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Learning Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Take your time with each unit</li>
                <li>• Practice with the code examples</li>
                <li>• Experiment with modifications</li>
                <li>• Build physical projects to test concepts</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
