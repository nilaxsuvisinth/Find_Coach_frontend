import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/messages');
        if (response.status === 200) {
          setMessages(response.data.messages);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!isLoading && error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {!isLoading && !error && (
            <div className="bg-white rounded p-3 mt-4">
              <h2>Messages</h2>
              <table className="table table-bordered" style={{ border: "2px solid #333" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length > 0 ? (
                    messages.map((message, index) => (
                      <tr key={index}>
                        <td>{message.name}</td>
                        <td>{message.email}</td>
                        <td>{message.message}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No messages available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
