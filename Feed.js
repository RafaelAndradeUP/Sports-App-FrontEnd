import { useState, useEffect } from "react";
import PostCard from "../cards/PostCard";
import CreatePostForm from "../forms/CreatePostForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Avatar, formLabelClasses} from "@mui/material";
import { newPost, getPosts, deletePost, like, dislike, getMyPL } from '../actions/posts';
import { getMyST, getMySU } from '../actions/auth';
import {toast} from "react-toastify";
import TopBar from '../components/TopBar';
import Dropdown from 'react-bootstrap/Dropdown'


const Feed = ({history}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [posts, setPosts] = useState([]);
    const [pl, setPL] = useState([]);
    const [su, setSU] = useState([]);
    const [st, setST] = useState([]);
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState('');

    const { auth } = useSelector((state) => ({ ...state }));

    const [post, setPost] = useState({
        tema: '',
        texto: '',
        imagen: '',
        usuarioId: auth.user._id
    });

    const dispatch = useDispatch();

    const { tema, texto } = post;

    useEffect(() => {
        if(window.innerWidth < 800){
            setIsMobile(true);
        }
        loadPosts();
        loadSU();
        loadST();
        console.log(posts);
    }, []);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const loadPosts = async () => {
        try{
            let res =  await getPosts(auth.user._id);
            console.log(res.data);
            setPosts(res.data);
            loadPL();
        }
        catch(e){
            console.log(e);
        }
    }

    const loadPL = async () => {
        try{
            let res =  await getMyPL(auth.user._id);
            setPL(res.data);
        }
        catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    const loadSU = async () => {
        try{
            let res =  await getMySU(auth.user._id);
            setSU(res.data);
        }
        catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    const loadST = async () => {
        try{
            let res =  await getMyST(auth.user._id);
            setST(res.data);
        }
        catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const postData= new FormData();
        postData.append('tema', post.tema);
        postData.append('texto', post.texto);
        post.imagen && postData.append('imagen', post.imagen);
        postData.append('usuarioId', post.usuarioId);

        if(!post.tema || !post.texto){
            toast.warning(`Por favor rellena los campos`);
            return;
        }

        try {
            await newPost(postData);
            toast.success(`¡Post creado!`);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }

    };

    const handleDelete = async (id) => {
        try{
            await deletePost(id);
            toast.success(`¡Post eliminado!`);
            setTimeout(() => {
                window.location.reload();
            },1000);
        }
        catch(error){
            console.log(error);
        }
    }

    const handleLike = async (usuarioId, postId) => {

        const plData = new FormData();
        plData.append('postId', postId);
        plData.append('usuarioId', usuarioId);

        try {
            await like(plData);
            loadPosts();
        } catch (error) {
            console.log(error);
            toast.error('Ups! algo salió mal :(');
        }
    }

    const handleDislike = async (postId, docId) => {
        const data = {
            postId: postId,
            docId: docId
        }
        try {
            await dislike(data);
            loadPosts();
        } catch (error) {
            console.log(error);
            toast.error('Ups! algo salió mal :(');
        }
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        if(!e.target.files[0]) return;
        setPreview(URL.createObjectURL(e.target.files[0]));
        setPost({ ...post, imagen: e.target.files[0] });
    };

    const removeImage = (e) => {
        e.preventDefault();
        setPreview('');
        setPost({ ...post, imagen: '' });
    };

    const logout = () => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        window.localStorage.removeItem("auth");
        history.push("/");
      };

    
    const responsive = () => {
        return (
            <>
                <div className="container-relative div-1 p-3 bg-dark">
                        <h1 className="text-left m-3" style={{ color:'#fbb141' }} onClick={() => history.push('/feed')}>yarder</h1>

                        <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                            Menú
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item
                               className="text-center m-3" onClick={logout} style={{cursor: 'pointer', color:"orange", width: '100%', padding:'0%'}}>Cerrar sesión
                        </Dropdown.Item>
                        <Dropdown.Item className="text-center m-3" style={{cursor: 'pointer', color:"orange", width: '100%', padding :'0%'}} onClick={() => history.push('/my-profile/edit')}>Editar perfil </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="d-flex justify-content-center card m-0" style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}>
                    <CreatePostForm values={post} handleChange={handleChange} handleSubmit={handleSubmit} handleImageChange={handleImageChange} preview={preview} removeImage={removeImage}/>
                    {
                        posts.length > 0 ? posts.map(p => {
                            let liked = false;
                            let docPL = {}
                            pl.forEach(postlike => {
                                if(postlike.postId === p._id) {
                                    docPL = postlike;
                                    liked = true;
                                }
                            })
                            return <PostCard p={p} key={p._id} handleDelete={handleDelete} handleLike={handleLike} handleDislike={handleDislike} liked={liked} docPL={docPL}/>
                        }) : <p className="text-white text-center">Aun no tienes posts por mostrar :(</p>
                    }
                    
        
                </div>                        
            </>
        )
    }

    const notResponsive = () => {
        return (
            <>
                <TopBar/>
                <div>
                    <div  className="row m-5">
                        <div className="col-2  d-flex justify-content-center flex-wrap">
                            {auth.user.imagen && auth.user.imagen.contentType ? <Avatar src={`http://localhost:8000/usuario/imagen/${auth.user._id}`} sx={{ width: 70, height: 70 }}/> : <Avatar src={auth.user.imagen} sx={{ width: 70, height: 70 }}>{auth.user.nombre_usuario[0]}</Avatar>}
                            <h2 className=" m-3" style={{color:"orange",fontSize: auth.user.nombre_usuario.length > 11 ? '1rem' : '1.5rem'}}>{auth.user.nombre_usuario}</h2>
                            <span> 
                                
                                <h4 className='text-orange' style={{color:"orange"} }>{auth.user.nseguidores} seguidores</h4> 
                            </span>
                        <div>
                        <span className="text-center m-3" style={{cursor: 'pointer', color:"orange", width: '100%', padding :'0%'}} onClick={() => history.push('/my-profile/edit')}>Editar perfil </span>
                        </div>
                        <div>
                            <span  className="text-center m-3" onClick={logout} style={{cursor: 'pointer', color:"orange", width: '100%', padding:'0%'}}>Cerrar sesión</span>
                                
                            </div>
                        </div>       
                        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}} className="col-7 d-flex justify-content-center card">
                            <CreatePostForm values={post} handleChange={handleChange} handleSubmit={handleSubmit}  handleImageChange={handleImageChange} preview={preview} removeImage={removeImage}/>
                            <h2 className="m-2 montserrat-font"style={{display: 'block',   color:'#fbb141'}}>Últimas Noticias</h2>
                            {
                                posts.length > 0 ? posts.map(p => {
                                    let liked = false;
                                    let docPL = {}
                                    pl.forEach(postlike => {
                                        if(postlike.postId === p._id) {
                                            docPL = postlike;
                                            liked = true;
                                        }
                                    })
                                    return <PostCard p={p} key={p._id} handleDelete={handleDelete} handleLike={handleLike} handleDislike={handleDislike} liked={liked} docPL={docPL}/>
                                }) : <h2 className="text-white  text-center m-5"style={{fontSize:'200%'}}>Aun no tienes posts por mostrar :(</h2>
                            }
                
                        </div>       
                        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}  className="col-3 card">
                            <div className="m-5">
                                <h4 className='text-orange'style={{display: 'block',   color:'#fbb141'}}>Personas a las que sigues</h4>
                                <div className='d-flex'>
                                    {
                                        su.map(s => {
                                            return s.Seguido.imagen && s.Seguido.imagen.contentType ? <Avatar alt={s.Seguido.nombre_usuario} src={`http://localhost:8000/usuario/imagen/${s.Seguido._id}`} sx={{ width: 50, height: 50 }}/> : <Avatar alt={s.Seguido.nombre_usuario} sx={{ width: 50, height: 50 }}>{s.Seguido.nombre_usuario[0]}</Avatar>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="m-5">
                                <h4 className='text-orange'style={{display: 'block',   color:'#fbb141'}}>Equipos Seguidos</h4>
                                <div className='d-flex'>
                                    {
                                        st.map(s => {
                                            return <Avatar alt={s.equipoId} src={s.imagenEquipo} sx={{ width: 50, height: 50 }}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>       
                    </div>            
                </div>
            </>
        )
    }

    return (
        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}>
            {
                loading ? <h1 className="text-white" >Cargando...</h1> : isMobile ? responsive() : notResponsive()
            }
        </div>
    )
}

export default Feed;