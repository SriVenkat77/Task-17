import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    setFormData(user || {}); // Populate form data when user changes
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          autoComplete="name"
          value={formData.name || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          autoComplete="username"
          value={formData.username || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          autoComplete="phone"
          value={formData.phone || ''}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Save</Button>
      <Button variant="secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
    </Form>
  );
};

export default UserForm;
