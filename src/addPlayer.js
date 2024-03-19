import { useState } from 'react'

export default function AddPlayer() {
    const [formData, setFormData] = useState({ firstName: '', secondName: '', imgPath: '', country: '', team: '', img: '' })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor='First Name'>First Name:</label>
            <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} />

            <label htmlFor='Second Name'>Second Name:</label>
            <input type='text' id='secondName' name='secondName' value={formData.secondName} onChange={handleChange} />

            <label htmlFor='Image Path'>Image Path:</label>
            <input type='text' id='imgPath' name='imgPath' value={formData.imgPath} onChange={handleChange} />

            <label htmlFor='Country'>Country:</label>
            <input type='text' id='country' name='country' value={formData.country} onChange={handleChange} />

            <label htmlFor='Team'>Team:</label>
            <input type='text' id='team' name='team' value={formData.team} onChange={handleChange} />

            <label htmlFor='Image'>Image:</label>
            <input type='text' id='img' name='img' value={formData.img} onChange={handleChange} />

            <button type='submit'>submit</button>
        </form>
    )
}