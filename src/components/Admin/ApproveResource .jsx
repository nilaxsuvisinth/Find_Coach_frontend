import React, { useState, useEffect } from 'react';

const ApproveResource = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/getResources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      setResources(data.resources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/resources/approve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to approve resource');
      }
      // Update resources state after approval
      const updatedResources = resources.map(resource => {
        if (resource._id === id) {
          return { ...resource, approved: true };
        }
        return resource;
      });
      setResources(updatedResources);
    } catch (error) {
      console.error('Error approving resource:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/deleteResource/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      // Filter out the deleted resource from resources state
      const updatedResources = resources.filter(resource => resource._id !== id);
      setResources(updatedResources);
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Resources</h1>
      {resources.map(resource => (
        <div key={resource._id} className="resource">
          <h2>{resource.name}</h2>
          <p>{resource.description}</p>
          {!resource.approved && (
            <button onClick={() => handleApprove(resource._id)}>Approve</button>
          )}
          <button onClick={() => handleDelete(resource._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ApproveResource;
