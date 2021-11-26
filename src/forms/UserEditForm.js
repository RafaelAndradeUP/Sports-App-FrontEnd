import {Avatar} from "@mui/material";
import { useRef } from "react";

const UserEditForm = ({
    values,
    handleChange,
    handleSubmit,
    handleImageChange,
    preview
}) => {

    const { nombre_usuario, email } = values;
    const fileInputRef = useRef();
    
    return(
        <>
            <div className='d-flex justify-content-center flex-wrap'>
                <div className='d-flex justify-content-center' style={{ width: '100%'}}>
                        {
                            preview ? <Avatar sx={{ width: 400, height: 400 }} alt={nombre_usuario} src={preview}/> :
                            <Avatar sx={{ width: 400, height: 400 }} alt={nombre_usuario} style={{ fontSize: '9rem'}}>{nombre_usuario[0]}</Avatar>
                        }
                </div>
                <label htmlFor="upload-photo">
                    <input
                        hidden
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                    <button className="btn btn-primary m-5" onClick={() => fileInputRef.current.click()}>Cambiar foto de perfil</button>
                </label>
            </div>
            <form onSubmit={handleSubmit} className='d-flex justify-content-center flex-wrap m-5'>
                <input 
                placeholder="Nombre" 
                id="first_name" 
                type="text" 
                className="validate text-white"
                value={nombre_usuario}
                name='nombre_usuario'
                onChange={handleChange}
                />

                <input 
                placeholder="Nombre" 
                id="first_name" 
                type="text" 
                className="validate text-white"
                value={email}
                name='email'
                onChange={handleChange}
                />
                <div className='d-flex jistify-content-center'>
                    <button type='submit' className='btn btn-primary m-5' onClick={handleSubmit}> Guardar</button>
                </div>
            </form>
        </>
    );
}

export default UserEditForm;