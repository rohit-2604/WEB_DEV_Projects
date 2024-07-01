import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
     
  const [users,setUsers]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/api')
    .then(result => {
      setUsers(result.data)
      console.log(result.data)
    }
    )
    .catch(err => console.log(err))
  },[])
  
  const handleDelete=(id)=>{
    axios.delete('http://localhost:4000/api/deleteStudent/'+id)
    .then(res =>{
        console.log(res)
        window.location.reload()
    })
    .catch(err => console.log(err))
  }
  
  
  
    return (
    <div className='d-flex vh-100 bg-primary justify-content-center alig-items-center'>
      <div className='w-50 h-50 bg-white rounded p-3 m-auto'>
      <Link to='/create' className='btn btn-success'>Add +</Link>
        <table className='table'>
            <thead>
                <tr>
                <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {users.map((user,index)=>{
                return<tr key={index}>
                <td><img
                src={user.image ? `http://localhost:4000/${user.image}` : '/default-profile.png'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #fff' }}
              /></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                    <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                    <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                    </td>
                </tr>
            })}

            </tbody>
            </table>
      </div>
    </div>
  )
}

export default Users
