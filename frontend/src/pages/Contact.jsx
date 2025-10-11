import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_f2d6inf", // 🔹 তোমার Service ID
        "template_lkh9etb", // 🔹 তোমার Template ID
        form.current,
        "HsXOFa5HXG0Tb4VTB" // 🔹 তোমার Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setSent(true);
        },
        (error) => {
          console.error(error.text);
          alert("❌ Failed to send message!");
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-6 pt-24">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-6">
          We'd love to hear from you! Fill out the form below 👇
        </p>

        {!sent ? (
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full border border-gray-300 p-2 rounded-md h-32 outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-medium flex flex-col items-center">
            <CheckCircle size={40} className="mb-3" />
            ✅ Message Sent Successfully!
            <p className="text-gray-500 text-sm mt-2">
              We'll get back to you soon via email.
            </p>
          </div>
        )}

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p className="flex justify-center items-center gap-1">
            <Mail size={16} /> mamuntech0@gmail.com
          </p>
          {/* <p className="flex justify-center items-center gap-1">
            <MessageCircle size={16} /> +91 98765 43210
          </p> */}
        </div>
      </div>
    </div>
  );
}
