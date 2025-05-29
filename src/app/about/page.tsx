import Link from "next/link";

export default function AboutPage() {
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
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About This Platform</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Welcome to our LEGO Python Programming learning platform! This educational resource is designed 
              to teach students the exciting world of robotics programming using LEGO robots and the Python 
              programming language.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We believe that learning robotics should be accessible, engaging, and fun. By combining the 
              hands-on appeal of LEGO building with the power of Python programming, we create an environment 
              where students can learn fundamental programming concepts while building real, working robots.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You&apos;ll Learn</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Python programming fundamentals</li>
              <li>Robotics concepts and applications</li>
              <li>Sensor integration and data processing</li>
              <li>Motor control and movement programming</li>
              <li>Advanced topics like PID control and line following</li>
              <li>Problem-solving and logical thinking</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Curriculum Source</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our curriculum is based on the excellent educational content from{" "}
              <a 
                href="https://primelessons.org/en/PyLessons.html" 
                className="text-blue-600 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                PrimeLessons.org
              </a>
              , adapted for an interactive web-based learning experience. We&apos;re grateful to the 
              contributors              who have made this high-quality educational content available.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ready to begin your robotics journey? Start with Unit 1 to get an overview of robotics 
              concepts, then progress through the units at your own pace. Each unit builds on the 
              previous ones, so we recommend following the suggested order.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800">
                If you have questions or need assistance, check out our help section or feel free 
                to experiment with the interactive code examples throughout the lessons.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
