import { BiSearchAlt2 } from 'react-icons/bi';

const TopBar = ({history}) => {
   return(
    <>
        <div  className="container-fluid bg-dark p-3 d-flex justify-content-between align-items-center">
            <h1 className="text-left m-3" style={{ color:'#fbb141', cursor: 'pointer' }}>yarder</h1>
            <div className='d-flex justify-content-center align-items-center m-3'>
                <input 
                placeholder="Buscar" 
                id="first_name" 
                type="text" 
                className="validate text-white"
                style={{width: 500}}
                />
                <BiSearchAlt2 color='white' size={40} className='m-3' style={{cursor: 'pointer'}}/>
            </div>
        </div>
    </>
   );
}

export default TopBar;