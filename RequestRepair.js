import React, { useState } from 'react';
import { motion } from 'framer-motion';

function RequestRepair() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Σφάλμα στην αποστολή');

      alert('Η αίτησή σας καταχωρήθηκε με επιτυχία!');
      setFormData({ name: '', email: '', service: '', description: '' });

      const button = document.querySelector('button[type="submit"]');
      if (button) {
        button.classList.add('flip');
        setTimeout(() => button.classList.remove('flip'), 600);
      }
    } catch (error) {
      alert('Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.');
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Αίτηση Επισκευής</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Όνομα:<br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Email:<br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Υπηρεσία:<br />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">-- Επίλεξε --</option>
            <option value="Επισκευή Laptop">Επισκευή Laptop</option>
            <option value="Αλλαγή Οθόνης Laptop">Αλλαγή Οθόνης Laptop</option>
            <option value="Εγκατάσταση Οθόνης Αυτοκινήτου">Εγκατάσταση Οθόνης Αυτοκινήτου</option>
            <option value="Δημιουργία Ιστοσελίδας">Δημιουργία Ιστοσελίδας</option>
            <option value="Δημιουργία Εφαρμογών">Δημιουργία Εφαρμογών</option>
            <option value="Καθαρισμός από Ιούς">Καθαρισμός από Ιούς</option>
          </select>
        </label>
        <br /><br />

        <label>
          Περιγραφή Προβλήματος:<br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </label>
        <br /><br />

        <button type="submit">Υποβολή Αίτησης</button>
      </form>
    </motion.div>
  );
}

export default RequestRepair;


export default RequestRepair;


