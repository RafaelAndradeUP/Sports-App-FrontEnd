import { useState } from "react";
import RegisterForm from "../forms/RegisterForm";


const Register = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    return (
        <div>
            <div className="container-fluid bg-dark p-3">
                <h1 className="text-white text-center">¡Registrate en Yarder!</h1>
                <p className="text-white text-center">Y únete a la mejor comunidad deportiva</p>
            </div>
            <div className="d-flex justify-content-center">
                <RegisterForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}

export default Register;