import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, UserCheck, Info } from "lucide-react";
import MetaManager from "../components/MetaManager";

export default function PrivacyPolicy() {
  return (
    <>
      <MetaManager
        title="Privacy Policy | QuickTools"
        description="Learn how QuickTools ensures your privacy. We never store or share your files. 100% secure, browser-based processing."
        keywords="privacy policy, data protection, secure online tools, user privacy"
        url="https://quicktoolspro.in/privacypolicy"
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-100 flex justify-center items-center px-6 pt-24 pb-20">
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Your privacy matters to us. QuickTools ensures a secure, ad-light experience where your data stays yours.
          </p>

          {/* Sections */}
          <div className="space-y-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-indigo-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  No Data Storage
                </h2>
                <p className="text-gray-600">
                  All tools on QuickTools work directly in your browser.  
                  We do <b>not</b> upload, save, or store any of your files or input data on our servers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Lock className="text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Secure and Private
                </h2>
                <p className="text-gray-600">
                  All operations, such as compression or conversion, happen locally on your device.  
                  This ensures maximum privacy and security.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserCheck className="text-green-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  No Account Required
                </h2>
                <p className="text-gray-600">
                  You don’t need to sign up or log in to use QuickTools.  
                  Just open, use, and go — simple and safe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Info className="text-cyan-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  Cookies and Analytics
                </h2>
                <p className="text-gray-600">
                  We use minimal cookies (if any) for analytics to understand how users interact with our tools,  
                  helping us improve performance — without tracking personal data.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 mt-10 pt-6 text-center">
            <p className="text-gray-600">
              This policy is regularly updated to reflect improvements and transparency.  
              Last updated: <b>October 2025</b>.
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
