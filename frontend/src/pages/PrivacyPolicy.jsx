import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6 pt-24">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy describes how we collect, use, and protect your information when you use our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1. Information We Collect</h2>
        <p className="text-gray-700 mb-3">
          We may collect non-personal data such as browser type, device type, and pages visited for analytics and improving user experience. We do not collect any personal information unless you provide it voluntarily.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2. Cookies</h2>
        <p className="text-gray-700 mb-3">
          Our website may use cookies to enhance your browsing experience. You can disable cookies through your browser settings.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3. Google AdSense</h2>
        <p className="text-gray-700 mb-3">
          We use Google AdSense to display ads. Google may use cookies to serve ads based on your visits to this and other websites. You can opt out of personalized ads by visiting{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-indigo-600 underline">
            Google Ads Settings
          </a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4. Data Security</h2>
        <p className="text-gray-700 mb-3">
          We take reasonable precautions to protect your data. However, please note that no online platform can guarantee complete security.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <span className="font-semibold text-indigo-600">support@allinonetools.com</span>
        </p>

        <p className="text-gray-500 text-sm mt-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
