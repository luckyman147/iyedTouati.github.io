import { useState } from 'react';
import emailjs from '@emailjs/browser';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearStatus = () => setStatus(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        event.target,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      );
      setFormData(INITIAL_FORM);
      setStatus({
        type: 'success',
        message: 'Message sent successfully!',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send. Please try again.',
      });
    } finally {
      setLoading(false);
      setTimeout(clearStatus, 5000);
    }
  };

  return {
    formData,
    loading,
    status,
    handleInputChange,
    handleSubmit,
    clearStatus,
  };
}
