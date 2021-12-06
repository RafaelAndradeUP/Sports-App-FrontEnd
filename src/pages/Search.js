import { useState, useEffect } from "react";
import {toast} from "react-toastify";
import { getTeams } from '../actions/posts';
import { getUsers, followUser, getMySU, unfollowUser, followTeam, getMyST, unfollowTeam } from '../actions/auth';
import TopBar from '../components/TopBar';
import UserCard from '../cards/UserCard';
import TeamCard from '../cards/TeamCard';
import { useSelector } from "react-redux";


const Search = ({ history, match }) => {
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [SUS, setSUS] = useState([]);
    const [STS, setSTS] = useState([]);
    const [loadingTeams, setLoadingTeams] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);

    const { auth } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUsers();
        loadTeams();
        console.log(STS);
    },[])

    const loadTeams = async () => {
        let res = await getTeams();
        let aux = res.data.teams.filter(t => t.strAlternate.toLowerCase().includes(match.params.searchCriteria.toLowerCase()));
        setTeams(aux);
        setLoadingTeams(false);
        loadSTS();
    }

    const loadSUS = async () => {
        try{
            let res =  await getMySU(auth.user._id);
            setSUS(res.data);
        }
        catch(e){
            console.log(e);
        }
    }

    const loadSTS = async () => {
        try{
            let res =  await getMyST(auth.user._id);
            setSTS(res.data);
        }
        catch(e){
            console.log(e);
        }
    }

    const loadUsers = async () => {
        let res = await getUsers(match.params.searchCriteria.replaceAll('-', ' '));
        console.log(res.data);
        setUsers(res.data);
        setLoadingUsers(false);
        loadSUS();
    }

    
    const handleFollow = async (followedId) => {
        let suData = new FormData();
        suData.append('seguidor', auth.user._id);
        suData.append('Seguido', followedId);

        let res = await followUser(suData);
        loadUsers();
    }

    const handleFollowTeam = async (followedId, image) => {
        let suData = new FormData();
        suData.append('followerId', auth.user._id);
        suData.append('equipoId', followedId);
        suData.append('imagenEquipo', image);

        let res = await followTeam(suData);
        loadTeams();
    }

    const handleUnfollow = async (SeguidoID, docId) => {
        const data = {
            SeguidoID: SeguidoID,
            docId: docId
        }
        try {
            await unfollowUser(data);
            loadUsers();
        } catch (error) {
            console.log(error);
            toast.error('Ups! algo salió mal :(');
        }
    }

    const handleUnfollowTeam = async (equipoId, docId) => {
        const data = {
            equipoId: equipoId,
            docId: docId
        }
        try {
            await unfollowTeam(data, docId);
            loadTeams();
        } catch (error) {
            console.log(error);
            toast.error('Ups! algo salió mal :(');
        }
    }

    return (
        <div className='bg-default'>
            <TopBar/>
            <div className="d-flex justify-content-center">
                <h4 className='montserrat-font text-white'>Resultados de búsqueda</h4>
            </div>
            <div>
                {
                    loadingUsers ? <h1 className='text-white'>Cargando ...</h1> :
                    <div className='card m-3 d-flex justify-content-center' style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}>
                        <h4 className='text-white m-3'>Usuarios</h4>
                        {
                            users.length > 0 ? users.map(u => {
                                let followed = false;
                                let docSU = {}
                                SUS.forEach(su => {
                                    if(su.Seguido._id === u._id) {
                                        docSU = su;
                                        followed = true;
                                    }
                                })
                                return <UserCard u={u} key={u._id} handleFollow={handleFollow} followed={followed} handleUnfollow={handleUnfollow} docSU={docSU}/>
                            }) : <p className='text-white m-2'>No se encontraron resultados.</p>
                        }
                    </div>
                }
                {
                    loadingTeams ? <h1 className='text-white'>Cargando ...</h1> :
                    <div className='card m-3' style={{backgroundColor: "rgb(29, 30, 36)", borderColor:"rgb(54, 56, 69)"}}>
                        <h4 className='text-white m-3'>Equipos</h4>
                        {
                            teams.length > 0 ? teams.map(t => {
                                let followed = false;
                                let docST = {}
                                STS.forEach(st => {
                                    if(st.equipoId === t.idTeam) {
                                        docST = st;
                                        followed = true;
                                    }
                                })
                                return <TeamCard t={t} key={t.idTeam} handleFollow={handleFollowTeam} followed={followed} handleUnfollow={handleUnfollowTeam} docST={docST}/>
                            }) : <p className='text-white m-2'>No se encontraron resultados.</p>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Search;