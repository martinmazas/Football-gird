import { useState } from 'react'
import axios from 'axios'
const server = process.env.NODE_ENV === 'production' ? 'https://football-grid-edd30e867195.herokuapp.com' : 'http://localhost:8080'

const styles = {
    label: {
        display: 'block',
        marginBottom: 10,
        color: 'white',
    },
    form: {
        padding: '20vh',
    },
    input: {
        width: '100%',
        padding: 10,
        marginTop: 5,
        marginBottom: 10
    }
}

export default function AddPlayer() {
    const [formData, setFormData] = useState({ firstName: '', secondName: '', imgPath: '', country: '', team: '' })

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post(`${server}/players/newPlayer`, {
            formData
        })
            .then(data => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    return (
        <>
            <form style={styles.form} onSubmit={handleSubmit} >
                <label style={styles.label} htmlFor='First Name'>First Name:
                    <input style={styles.input} type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} />
                </label>

                <label style={styles.label} htmlFor='Second Name'>Second Name:
                    <input style={styles.input} type='text' id='secondName' name='secondName' value={formData.secondName} onChange={handleChange} />
                </label>

                <label style={styles.label} htmlFor='Image Path'>Image Path:
                    <input style={styles.input} type='text' id='imgPath' name='imgPath' value={formData.imgPath} onChange={handleChange} />
                </label>

                <label style={styles.label} htmlFor='Country'>Country:
                    <input style={styles.input} type='text' id='country' name='country' value={formData.country} onChange={handleChange} />
                </label>

                <label style={styles.label} htmlFor='Team'>Team:
                    <input style={styles.input} type='text' id='team' name='team' value={formData.team} onChange={handleChange} />
                </label>

                <button type='submit'>submit</button>
            </form>
        </>
    )
}