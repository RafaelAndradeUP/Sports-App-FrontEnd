import { useSelector } from "react-redux";
import "moment/locale/es";
import {Avatar} from "@mui/material";

const TeamCard = ({
    t,
    handleFollow,
    followed,
    handleUnfollow,
    docST
}) => {

    return(
        <div  className="card m-1 mb-3" style={{ backgroundColor: "rgb(29, 30, 36)",borderColor:"rgb(54, 56, 69)"}}>
            <div className='col-3'>
                {t.strTeamBadge ? <Avatar alt={t.strTeam} src={t.strTeamBadge} sx={{ width: 150, height: 150 }}/> : <Avatar alt={t.strTeam} sx={{ width: 150, height: 150 }}>{t.strTeam[0]}</Avatar>}
            </div>
            <div className='col-9'>
                    <p className="card-text text-white" style={{fontSize: '1.5rem'}}><b>{t.strTeam}</b></p>
                    {followed ? <button className='btn btn-primary m-1' onClick={() => handleUnfollow(t.idTeam, docST._id)}>Dejar de seguir</button> : <button className='btn btn-primary m-1' onClick={() => handleFollow(t.idTeam, t.strTeamBadge)}>Seguir</button>}
            </div>
        </div>
    );
}

export default TeamCard;