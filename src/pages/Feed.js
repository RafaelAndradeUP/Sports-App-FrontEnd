import { useState, useEffect } from "react";
import PostCard from "../cards/PostCard";
import CreatePostForm from "../forms/CreatePostForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Avatar, formLabelClasses} from "@mui/material";
import { newPost, getPosts, deletePost, like, dislike, getMyPL } from '../actions/posts';
import {toast} from "react-toastify";
import TopBar from '../components/TopBar';


const Feed = ({history}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [posts, setPosts] = useState([]);
    const [pl, setPL] = useState([]);
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
    }, []);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const loadPosts = async () => {
        try{
            let res =  await getPosts();
            setPosts(res.data);
            loadPL();
        }
        catch(e){
            console.log(e);
        }
    }

    const loadPL = async () => {
        try{
            console.log('entro');
            let res =  await getMyPL(auth.user._id);
            console.log(res.data);
            setPL(res.data);
            console.log(res);
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
                <div className="container-fluid div-1 p-3 bg-dark">
                        <h1 className="text-left m-3" style={{ color:'#fbb141' }} onClick={() => history.push('/feed')}>yarder</h1>
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
                            <p className="text-white m-3" style={{fontSize: auth.user.nombre_usuario.length > 11 ? '1rem' : '1.5rem'}}>{auth.user.nombre_usuario}</p>
                            <div>
                                <span className="text-center m-3" onClick={logout} style={{cursor: 'pointer', color:"white", width: '100%'}}>Cerrar sesión</span>
                                <span className="text-center m-3" style={{cursor: 'pointer', color:"white", width: '100%'}} onClick={() => history.push('/my-profile/edit')}>Editar perfil</span>
                            </div>
                        </div>       
                        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}} className="col-7 d-flex justify-content-center card">
                            <CreatePostForm values={post} handleChange={handleChange} handleSubmit={handleSubmit}  handleImageChange={handleImageChange} preview={preview} removeImage={removeImage}/>
                            <h2 className="m-2 montserrat-font">Últimas Noticias</h2>
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
                                }) : <p className="text-white text-center m-5">Aun no tienes posts por mostrar :(</p>
                            }
                
                        </div>       
                        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}  className="col-3 card">
                            <div className="row m-5">
                                <h4 className='text-white montserrat-font'>Equipos seguidos</h4>
                            </div>
                            <div className="row m-5">
                                <h4 className='text-white montserrat-font'>Personas a las que sigues</h4>
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