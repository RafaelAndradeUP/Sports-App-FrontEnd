import {Avatar} from "@mui/material";
import { FiTrash } from 'react-icons/fi';
import { useSelector } from "react-redux";
import moment from 'moment';
import "moment/locale/es";

const PostCard = ({
    p,
    handleDelete,
    handleLike,
    handleDislike,
    liked,
    docPL
}) => {

    const { auth } = useSelector((state) => ({ ...state }));

    return(
        <div  className="card m-1 mb-3" style={{ backgroundColor: "rgb(29, 30, 36)",borderColor:"rgb(54, 56, 69)"}}>
            <div  className="card-title d-flex align-items-center justify-content-between p-3">
                <div className='d-flex'>
                    {p.usuarioId.imagen && p.usuarioId.imagen.contentType ? <Avatar alt={p.usuarioId.nombre_usuario} src={`http://localhost:8000/usuario/imagen/${p.usuarioId._id}`} sx={{ width: 50, height: 50 }}/> : <Avatar alt={p.usuarioId.nombre_usuario} sx={{ width: 50, height: 50 }}>{p.usuarioId.nombre_usuario[0]}</Avatar>}
                    <h3 className="card-title m-2">{p.usuarioId.nombre_usuario}</h3>    
                </div>
                {
                    auth.user._id === p.usuarioId._id ? <FiTrash color='white' style={{cursor: 'pointer'}} onClick={() => handleDelete(p._id)}/> : null
                }
            </div>
            <p className="card-title m-3 text-white" style={{ display: 'block'}}>{p.tema}</p>
            {
                p.imagen && <div className="m-3 d-flex justify-content-center">
                                <img className="card-img" src={`http://localhost:8000/posts/imagen/${p._id}`} alt={p.tema} style={{ width: '80%'}}></img>
                            </div>
            }
            <div  className="card-body">
                    <p className="card-text text-white" style={{fontSize: '1.5rem'}}><b>{p.texto}</b></p>
            </div>
            <div className='d-flex justify-content-between m-3'>
                <div>
                    {
                        liked ? <button className="btn btn-primary " onClick={() => handleDislike(p._id, docPL._id)}>Dislike</button> : <button className="btn btn-primary " onClick={() => handleLike(auth.user._id, p._id)}>Like</button>
                    }
                    <span className="m-2 text-white">{p.nlikes} likes</span>
                </div>
                <div>
                    <span className='text-white'>{moment(p.createdAt).fromNow(false)}</span>
                </div>
            </div>
        </div>
    );
}

export default PostCard;