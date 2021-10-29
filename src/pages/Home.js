import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import image1 from "../img/fondo1.jpg";



const Home = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        //const { email, password } = values;

        try {
            //let res = await login({ email, password });
      
            if (true) {
              window.localStorage.setItem("auth", JSON.stringify(values));
              dispatch({
                type: "LOGGED_IN_USER",
                payload: values,
              });
              toast.success(`¡Bienvenido de nuevo!`);
              setTimeout(() => {
                window.location.href = "/feed";
              }, 1000);
            }
          } catch (err) {
            console.log(err);
            if (err.response.status === 400) toast.error(err.response.data);
          }
    };

    return (
        <div>
            <div className="container-fluid bg-dark d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex justify-content-center align-items-center">
                    <span className="text-white">¿No tienes una cuenta? Registrate!</span>
                    <button className="btn btn-primary m-2" onClick={() => history.push('/register')}>Registrarse</button>
                </div>
                <LoginForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </div>
            <img src={image1} width="100%" height="60%"></img>
        </div>
      
    )


}

export default Home;