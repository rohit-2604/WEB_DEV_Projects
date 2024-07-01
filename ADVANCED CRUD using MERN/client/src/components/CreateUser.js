import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', age);
    if (image) {
      formData.append('image', image);
    }

    await axios.post("http://localhost:4000/api/createStudent", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((result) => {
        alert("Data Saved");
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
      <div className="w-50 h-70 bg-white rounded p-3 m-auto">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter Your Age"
              className="form-control"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label>Profile Picture</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #fff' }}
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="form-control mb-3"
            />
          </div>

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
