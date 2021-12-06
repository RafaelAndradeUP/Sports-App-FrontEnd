import { useState } from "react";
import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

const TopBar = () => {

    const [searchCriteria, setSearchCriteria] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setSearchCriteria(e.target.value);
    }

    const handleSubmit = () => {
        if(searchCriteria === '') {
            toast.warning('Introduzca un valor');
            return;
        }
        window.location.href = `/search/${searchCriteria.replaceAll(' ', '-')}`;
    }

   return(
    <>
        <div  className="container-fluid bg-dark p-3 d-flex justify-content-between align-items-center">
            <div className='d-flex align-items-center'>
                <h1 className="text-left m-3" style={{ color:'#fbb141'}}>yarder</h1>
                {window.location.href === '/feed' ? null : <AiOutlineHome style={{color: '#fbb141', cursor: 'pointer'}} size={50} onClick={() => history.push('/feed')}/>}
            </div>
            <div className='d-flex justify-content-center align-items-center m-3'>
                <input 
                placeholder="Buscar usuarios o equipos" 
                id="first_name" 
                type="text" 
                className="validate text-white"
                style={{width: 500}}
                value={searchCriteria}
                onChange={handleChange}
                />
                <BiSearchAlt2 color='white' size={40} className='m-3' style={{cursor: 'pointer'}} onClick={handleSubmit}/>
            </div>
        </div>
    </>
   );
}

export default TopBar;

