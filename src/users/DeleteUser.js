import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";

const DeleteUser = () => {
  const { id } = useParams();
  const history = useHistory();

  const [user, setUser] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const confirmDelete = () => {
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      history.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2 className="mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the user {user.name}?</p>
        <button className="btn btn-danger" onClick={confirmDelete}>
          Delete
        </button>
        <Link className="btn btn-secondary mx-2" to={`/viewuser/${id}`}>
          Cancel
        </Link>

        {showConfirmation && (
          <div className="modal">
            <div className="modal-content">
              <p>Confirm deletion?</p>
              <button className="btn btn-danger" onClick={deleteUser}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteUser;
