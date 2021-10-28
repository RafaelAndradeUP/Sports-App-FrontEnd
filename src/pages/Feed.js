import { useState, useEffect } from "react";
import PostCard from "../cards/PostCard";
import CreatePostForm from "../forms/CreatePostForm";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";


const Feed = ({history}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [values, setValues] = useState({
        tema: '',
        texto: '',
        imagen: ''
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if(window.innerWidth < 800){
            setIsMobile(true);
        }
    }, []);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


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
                <div className="container-fluid bg-dark p-3">
                        <h1 className="text-white text-center">Yarder (aqui podría ir el logo)</h1>
                </div>
                <div className="container-fluid">
                    <div className="row">   
                        <div className="col d-flex justify-content-center card">
                            <CreatePostForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
                            {
                                prevPosts.map(p => {
                                    return <PostCard p={p} key={p.id}/>
                                })
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
                <div className="container-fluid bg-dark p-3">
                    <h1 className="text-white text-center">Yarder (aqui podría ir el logo)</h1>
                </div>
                <div className="container-fluid">
                    <div className="row m-5">
                        <div className="col-3  d-flex justify-content-center">
                            <h1>Perfil del usuario (Borrar)</h1>
                            <span onClick={logout} style={{cursor: 'pointer'}}>Cerrar sesión</span>
                        </div>       
                        <div className="col-6 d-flex justify-content-center card">
                            <CreatePostForm values={values} handleChange={handleChange} handleSubmit={handleSubmit}/>
                            <h2 className="m-2">Últimas Noticias</h2>
                            {
                                prevPosts.map(p => {
                                    return <PostCard p={p} key={p.id}/>
                                })
                            }
                
                        </div>       
                        <div className="col-3 card">
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
        <>
            {
                isMobile ? responisive() : notResponisive()
            }
        </>
    )
}

export default Feed;