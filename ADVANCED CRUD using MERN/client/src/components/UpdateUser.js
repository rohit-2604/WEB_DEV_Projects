import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateUser = () => {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/api/updateStudent/' + id)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setAge(result.data.age)
                setImage(result.data.image)
                setImagePreview(`http://localhost:4000/${result.data.image}`)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('age', age)
        if (image) {
            formData.append('image', image)
        }
        axios.put('http://localhost:4000/api/editStudent/' + id, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log(result)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center align-items-center'>
            <div className='w-50 h-100 bg-white rounded p-3 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label>Image</label>
                        <img
                            src={imagePreview ? imagePreview : '/default-profile.png'}
                            alt="Profile"
                            className="rounded-circle mb-3"
                            style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #fff' }}
                        />
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="form-control mb-3"
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input type='text' placeholder='Enter Your Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='mb-2'>
                        <label>Email</label>
                        <input type='email' placeholder='Enter Your Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='mb-2'>
                        <label>Age</label>
                        <input type='number' placeholder='Enter Your Age' className='form-control' value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser
