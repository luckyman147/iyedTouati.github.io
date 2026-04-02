import React from 'react';
import StatusBadge from './contact/StatusBadge';
import { useContactForm } from '../hooks/useContactForm';

export default function ContactForm() {
  const {
    formData,
    loading,
    status,
    handleInputChange,
    handleSubmit,
    clearStatus,
  } = useContactForm();

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      {status && (
        <StatusBadge
          type={status.type}
          message={status.message}
          onClose={clearStatus}
        />
      )}
      <div className="row gx-3 gy-4">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              name="name"
              placeholder="Name *"
              className="form-control"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input
              name="email"
              placeholder="Email *"
              className="form-control"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              name="subject"
              placeholder="Subject *"
              className="form-control"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label">Your message</label>
            <textarea
              name="message"
              placeholder="Your message *"
              rows={4}
              className="form-control"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="send">
            <button
              className={`px-btn w-100 ${loading ? 'px-btn--loading' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading && <span className="btn-spinner" />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
