import { useSelector } from "react-redux";
import "moment/locale/es";
import {Avatar} from "@mui/material";

const UserCard = ({
    u,
    handleFollow,
    followed,
    handleUnfollow,
    docSU
}) => {

    const { auth } = useSelector((state) => ({ ...state }));

    return(
        <div  className="card m-1 mb-3" style={{ backgroundColor: "rgb(29, 30, 36)",borderColor:"rgb(54, 56, 69)"}}>
            <div className='col-3'>
                {u.imagen && u.imagen.contentType ? <Avatar alt={u.nombre_usuario} src={`http://localhost:8000/usuario/imagen/${u._id}`} sx={{ width: 150, height: 150 }}/> : <Avatar alt={u.nombre_usuario} sx={{ width: 150, height: 150 }}>{u.nombre_usuario[0]}</Avatar>}
            </div>
            <div className='col-9'>
                    <p className="card-text text-white" style={{fontSize: '1.5rem'}}><b>{u.nombre_usuario}</b></p>
                    {auth.user._id === u._id ? <p className="text-white">Tú</p> : followed ? <button className='btn btn-primary m-1' onClick={() => handleUnfollow(u._id, docSU._id)}>Dejar de seguir</button> : <button className='btn btn-primary m-1' onClick={() => handleFollow(u._id)}>Seguir</button>}
                    <span className='text-white'>{u.nseguidores} seguidores</span>
            </div>
        </div>
    );
}

export default UserCard;