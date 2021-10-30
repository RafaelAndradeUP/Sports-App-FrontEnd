import { useState } from "react";
import RegisterForm from "../forms/RegisterForm";
import {toast} from "react-toastify";
import {register} from '../actions/auth';


const Register = ({ history }) => {
    const [values, setValues] = useState({
        nombre_usuario: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const {nombre_usuario, email, password} = values;
        try {
          let res = await register({
            nombre_usuario,
            email,
            password,
          });
          console.log(res);
          toast.success("Registro exitoso, inicie sesión");
          history.push("/");
        } catch (err) {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        }
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