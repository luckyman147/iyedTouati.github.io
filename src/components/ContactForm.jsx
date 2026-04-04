import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../hooks/useContactForm';

const InputField = ({ label, name, type = "text", placeholder, value, onChange, required, disabled, isTextArea = false }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-mono text-plasma/60 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-plasma">
      {label}
    </label>
    <div className="relative">
      {isTextArea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          rows={4}
          className="w-full bg-void/40 border border-plasma/20 rounded-none p-4 font-rajdhani text-white 
                     focus:border-plasma focus:ring-1 focus:ring-plasma/30 transition-all outline-none resize-none
                     placeholder:text-white/20 disabled:opacity-50"
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full bg-void/40 border border-plasma/20 rounded-none p-4 font-rajdhani text-white 
                     focus:border-plasma focus:ring-1 focus:ring-plasma/30 transition-all outline-none
                     placeholder:text-white/20 disabled:opacity-50"
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      )}
      {/* Decorative scanline on focus */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-plasma shadow-[0_0_10px_#00d4ff] w-0 group-focus-within:w-full transition-all duration-500" />
    </div>
  </div>
);

export default function ContactForm() {
  const {
    formData,
    loading,
    status,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputField 
        label="Username"
        name="name"
        placeholder="ENTER USERNAME"
        value={formData.name}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
      <InputField 
        label="Email"
        name="email"
        type="email"
        placeholder="ENTER EMAIL"
        value={formData.email}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
      <InputField 
        label="Subject"
        name="subject"
        placeholder="ENTER SUBJECT"
        value={formData.subject}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
      <InputField 
        label="Body"
        name="message"
        placeholder="WRITE YOUR MESSAGE..."
        value={formData.message}
        onChange={handleInputChange}
        required
        disabled={loading}
        isTextArea
      />

      <div className="relative mt-4">
        <button
          className={`w-full py-4 bg-plasma/10 border border-plasma/40 text-plasma font-orbitron font-bold 
                     tracking-[0.3em] uppercase hover:bg-plasma hover:text-void transition-all duration-500
                     disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden`}
          type="submit"
          disabled={loading}
        >
          <span className="relative z-10">
            {loading ? 'Transmitting...' : 'Initiate Transmission'}
          </span>
          {/* Progress Bar Animation */}
          {loading && (
            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 bg-plasma origin-left opacity-30"
            />
          )}
        </button>
        
        {/* Status Messages */}
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-3 font-mono text-[10px] uppercase text-center border ${
                status.type === 'success' ? 'bg-plasma/10 border-plasma/40 text-plasma' : 'bg-solar/10 border-solar/40 text-solar'
              }`}
            >
              {status.type === 'success' ? 'Transmission Successful // Status: OK' : `Error: ${status.message}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
