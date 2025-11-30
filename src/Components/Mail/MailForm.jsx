import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';

export default function MailForm() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // EmailJS configuration - Using your actual values
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS
  useEffect(() => {
    console.log('EmailJS Config Check:', {
      SERVICE_ID,
      TEMPLATE_ID,
      PUBLIC_KEY: PUBLIC_KEY ? 'Set' : 'Missing'
    });
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, [PUBLIC_KEY]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    
    if (!name.trim()) {
      toast.error('Name is required');
      return false;
    }
    
    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (!message.trim()) {
      toast.error('Message is required');
      return false;
    }
    
    if (message.trim().length < 10) {
      toast.error('Message must be at least 10 characters long');
      return false;
    }
    
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Check if EmailJS is configured
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error('Email service not properly configured');
      console.error('Missing EmailJS configuration:', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      return;
    }
    
    setIsLoading(true);
    console.log('Sending email with data:', formData);
    
    try {
      // Send email using the exact template parameters from your EmailJS template
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          order_id: `SR-${Date.now()}`,
          orders: `Contact Form Submission from ${formData.name}`,
          image_url: 'https://smartroute.com/logo.png', // You can replace with actual logo
          name: formData.name,
          units: formData.subject || 'General Inquiry',
          price: 'Free Consultation',
          cost: 'No charge',
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          // Additional useful fields
          customer_name: formData.name,
          customer_email: formData.email,
          reply_to: formData.email
        },
        PUBLIC_KEY
      );

      console.log('Email sent successfully:', result);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(`Failed to send message: ${error.text || error.message || 'Please try again later.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#004225]">Get in Touch</h2>
        <p className="text-gray-600">
          Have questions about SmartRoute? We'd love to hear from you!
        </p>
      </div>

      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="mb-2 flex items-center gap-2 font-semibold text-[#004225]">
            <FaUser className="text-[#39ff14]" />
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#39ff14] focus:outline-none focus:ring-2 focus:ring-[#39ff14]/20"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-2 flex items-center gap-2 font-semibold text-[#004225]">
            <FaEnvelope className="text-[#39ff14]" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#39ff14] focus:outline-none focus:ring-2 focus:ring-[#39ff14]/20"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="mb-2 flex items-center gap-2 font-semibold text-[#004225]">
            <FaPhone className="text-[#39ff14]" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#39ff14] focus:outline-none focus:ring-2 focus:ring-[#39ff14]/20"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="mb-2 flex items-center gap-2 font-semibold text-[#004225]">
            <FaComment className="text-[#39ff14]" />
            Subject (Optional)
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="What is this about?"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#39ff14] focus:outline-none focus:ring-2 focus:ring-[#39ff14]/20"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="mb-2 flex items-center gap-2 font-semibold text-[#004225]">
            <FaComment className="text-[#39ff14]" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your inquiry, feedback, or how we can help you..."
            rows={6}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-[#39ff14] focus:outline-none focus:ring-2 focus:ring-[#39ff14]/20"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Minimum 10 characters ({formData.message.length}/10)
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004225] px-6 py-4 font-semibold text-white transition hover:bg-[#004225]/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Send Message
            </>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-center text-sm text-gray-500">
          Your information is secure and will only be used to respond to your inquiry.
          We respect your privacy and won't spam you.
        </p>
      </form>
    </div>
  );
}
