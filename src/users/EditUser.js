import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, user);
      navigate(`/viewuser/${id}`);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="mb-4">Edit User</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={user.name}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              name="username"
              value={user.username}
              onChange={onInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              E-mail
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your e-mail address"
              name="email"
              value={user.email}
              onChange={onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <Link className="btn btn-secondary mx-2" to={`/viewuser/${id}`}>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
