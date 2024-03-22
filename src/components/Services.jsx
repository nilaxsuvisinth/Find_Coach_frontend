import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/getresources');
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      setResources(data.resources);

      const uniqueCategories = ['All', ...new Set(data.resources.map(resource => resource.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setFilteredResources([]);
    } else {
      const filtered = resources.filter(resource => resource.category === category);
      setFilteredResources(filtered);
    }
  };

  return (
    <>
      <div>
        <section id="service">
          <div className="container my-5 py-5">
            <div className="row">
              <div className="col-12">
                <h3 className="fs-5 text-center mb-0">Our Services</h3>
                <h1 className="display-6 text-center mb-4">Our <b>Awesome</b> Services</h1>
                <hr className="w-25 mx-auto" />
              </div>
            </div>
            <div className="row mt-5 mr-4">
              {categories.map(category => (
                <div className="col-md-2" key={category} >
                  <button
                    className="btn btn-danger me-4 rounded-pill px-4 py-2"
                    style={{ width: '150px', height: '40px' }}
                    onClick={() => handleCategoryChange(category)}>
                    {category}
                  </button>

                </div>
              ))}
            </div>
            <div className="row mt-3">
              {(filteredResources.length > 0 ? filteredResources : resources).map(resource => (
                <div className="col-md-4 mt-4" key={resource._id}>
                  <div className="card p-3">
                    {resource.image && resource.image.url && (
                      <img src={resource.image.url} className="card-img-top" alt={resource.name} />
                    )}
                    <div className="card-body text-center">
                      <h5 className="card-title mb-3 fs-3 fw-bold">{resource.courseName}</h5>
                      <h7 className="card-title mb-3 fs-4  fw-bold">{resource.name}</h7>
                      <p className="card-text lead">{resource.courseDescription}</p>
                      <Link to={`/details/${resource._id}`} className="btn btn-outline-danger">View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;