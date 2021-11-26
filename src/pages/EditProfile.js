
import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { useSelector } from "react-redux";
import { getUser, hasImage, updateUser } from '../actions/auth';
import UserEditForm from '../forms/UserEditForm';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";


const EditProfile = () => {

    const [values, setValues] = useState({
        nombre_usuario: '',
        email: '',
        imagen: ''
    });
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState('');
    const [imagen, setImagen] = useState('');

    const { auth } = useSelector((state) => ({ ...state }));

    const { token } = auth; 

    const dispatch = useDispatch();

    useEffect(() => {
        loadUser();
    },[]);

    const loadUser = async () => {
        try {
            let res = await getUser(auth.user._id);
            setValues(res.data);
            loadImg();
        } catch (error) {
            console.log(error);
        }
    }

    const loadImg = async () => {
        try {
            let hi = await hasImage(auth.user._id);
            hi.data.ok
              ? setPreview(
                  `http://localhost:8000/usuario/imagen/${auth.user._id}`
                )
              : setPreview(null);
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const { nombre_usuario, email } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = new FormData();
        userData.append('nombre_usuario', nombre_usuario);
        userData.append('email', email);
        imagen && userData.append('imagen', imagen);

        console.log([...userData]);

        try {
            let res = await updateUser(auth.user._id, userData);
            toast.success('¡Información actualizada!');

            const user = res.data;

            window.localStorage.setItem(
                "auth",
                JSON.stringify({
                  token,
                  user,
                })
              );
        
              dispatch({
                type: "LOGGED_IN_USER",
                payload: res.data,
              });

            setTimeout(() => {
                window.location.href = '/feed';
            }, 1000)
        } catch (error) {
            console.log(error);
            toast.error('error al guardar');
        }

    }

    const handleImageChange = (e) => {
        e.preventDefault();
        if(!e.target.files[0]) return;
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImagen(e.target.files[0]);
    };

    return(
        <div className='bg-default'>
            <TopBar/>

            <h1 className='text-center text-yellow montserrat-font' >Editar perfil</h1>
            <div className='container-fluid'>
                {
                    loading ? <h1 className='text-center'>Cargando...</h1> : 
                    <UserEditForm 
                    values={values} 
                    handleChange={handleChange} 
                    handleImageChange={handleImageChange} 
                    handleSubmit={handleSubmit}
                    preview={preview}
                    />
                }
            </div>
        </div>
    );
}

export default EditProfile;