"use client";

import { useState } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-slate-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" />
              <span>ryangpt@umich.edu</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-yellow-500" />
              <span>+1 (530) 786–9574</span>
            </div>
            <div className="flex items-center gap-4">
              <Linkedin className="text-blue-700" />
              <a
                href="https://www.linkedin.com/in/ryan--gupta/"
                target="_blank"
                className="hover:underline"
              >
                View LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Github className="text-black" />
              <a
                href="https://github.com/rryyan21"
                target="_blank"
                className="hover:underline"
              >
                View GitHub
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 bg-white p-8 rounded-xl shadow-md"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold w-full"
            >
              Send Message
            </button>
            {submitted && (
              <p className="text-green-600 font-medium text-center">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
