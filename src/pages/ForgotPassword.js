import { useState } from "react";

const ForgotPassword = ({ history }) => {
    const [values, setValues] = useState({
        email: ''
    });


    const handleChange = (e) => {
        console.log(e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

    };


    const { email } = values; 

    return (
        <div>
            <div className="container-fluid bg-dark p-3">
                <h1 className="text-white text-center">Recuperar contraseña</h1>
            </div>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center m-5 flex-wrap">
                <input
                    style={{ width: '80%'}}
                    type='email'
                    value={email}
                    name="email"
                    onChange={handleChange}
                    placeholder="Correo de recuperación"
                    className="m-1"
                />
                <button className="btn btn-primary">Recuperar contraseña</button>
            </form>
            <div className="d-flex justify-content-center m-5">
                <button className="btn btn-primary" onClick={() => history.push('/')}>Iniciar sesión</button>
            </div>
        </div>
    )
}

export default ForgotPassword;