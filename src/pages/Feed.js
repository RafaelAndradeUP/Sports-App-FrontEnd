import { useState, useEffect } from "react";
import PostCard from "../cards/PostCard";
import CreatePostForm from "../forms/CreatePostForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Avatar} from "@mui/material";


const Feed = ({history}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [values, setValues] = useState({
        tema: '',
        texto: '',
        imagen: ''
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { auth } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch();

    useEffect(() => {
        if(window.innerWidth < 800){
            setIsMobile(true);
        }
        loadPosts();
    }, []);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const loadPosts = async () => {
        console.log('funcion loadingPosts');
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    };

    const prevPosts = [{
        createdBy: 'Josue Olmos',
        tema: 'PSG',
        texto:'Creo que el PSG puede ganar facil con Messi #AlezParis!',
        imagen:'https://media.ambito.com/p/d26c977a841fca6c7434175bf7942789/adjuntos/239/imagenes/039/399/0039399303/lionel-messi.jpg',
        likes: 15,
        createdAt: new Date('2021/09/28'),
        id:0
    },
    {
        createdBy: 'Rafa Andrade',
        tema: 'PSG',
        texto:'Messi no es el mismo fuera del barca :(',
        imagen:'https://static.dw.com/image/54576763_303.jpg',
        likes: 18,
        createdAt: new Date('2021/09/21'),
        id:1
    },
    {
        createdBy: 'Arlette Garcia',
        tema: 'Alfa Romeo',
        texto:'Traigan de vuelta a Hulkenberg!',
        imagen:'',
        likes: 20,
        createdAt: new Date('2021/09/19'),
        id:2
    },
    {
        createdBy: 'Jomi De León',
        tema: 'MLB World Series',
        texto:'Vamos Atlanta! #GoBraves',
        imagen:'https://www.mystateline.com/wp-content/uploads/sites/17/2021/10/Photo-WS.jpg?w=2560&h=1440&crop=1',
        likes: 23,
        createdAt: new Date('2021/09/27'),
        id:3
    }];

    const logout = () => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        window.localStorage.removeItem("auth");
        history.push("/");
      };

    
    const responisive = () => {
        return (
            <>
                <div class="div-1" className="container-fluid  p-3 bg-dark">
                        <h1 className=" text-left">yarder</h1>
                </div>
                <div style={{backgroundColor: "rgb(29, 30, 36)"}}>
                    <div className="row">   
                        <div className="col d-flex justify-content-center card">
                            <CreatePostForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
                            {
                                posts.length > 0 ? posts.map(p => {
                                    return <PostCard p={p} key={p.id}/>
                                }) : <p className="text-white text-center">Aun no tienes posts por mostrar :(</p>
                            }
                
                        </div>             
                    </div>            
                </div>
            </>
        )
    }

    const notResponisive = () => {
        return (
            <>
                <div  className="container-fluid bg-dark p-3">
                    <h1 className=" text-left">yarder</h1>
                </div>
                <div>
                    <div  className="row m-5">
                        <div className="col-3  d-flex justify-content-center flex-wrap">
                            {auth.user.imagen ? <Avatar src={auth.user.imagen} sx={{ width: 50, height: 50 }}/> : <Avatar src={auth.user.imagen} sx={{ width: 50, height: 50 }}>{auth.user.nombre_usuario[0]}</Avatar>}
                            <p className="text-white p-2">{auth.user.nombre_usuario}</p>
                            <span className="text-center" onClick={logout} style={{cursor: 'pointer', color:"white", width: '100%'}}>Cerrar sesión</span>
                        </div>       
                        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}} className="col-6 d-flex justify-content-center card">
                            <CreatePostForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
                            <h2 className="m-2">Últimas Noticias</h2>
                            {
                                posts.length > 0 ? posts.map(p => {
                                    return <PostCard p={p} key={p.id}/>
                                }) : <p className="text-white text-center">Aun no tienes posts por mostrar :(</p>
                            }
                
                        </div>       
                        <div style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}  className="col-3 card">
                            <div className="row m-5">
                                <h3>Equipos seguidos</h3>
                            </div>
                            <div className="row m-5">
                                <h3>Personas a las que sigues</h3>
                            </div>
                        </div>       
                    </div>            
                </div>
            </>
        )
    }

    return (
        <div style={{backgroundColor: "rgb(29, 30, 36)", height: '100vh'}} >
            {
                loading ? <h1 className="text-white">Cargando...</h1> : isMobile ? responisive() : notResponisive()
            }
        </div>
    )
}

export default Feed;