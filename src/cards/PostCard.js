import {Avatar} from "@mui/material";

const PostCard = ({
    p
}) => {
    return(
        <div  className="card mb-3" style={{width: '100%', backgroundColor: "rgb(29, 30, 36)",borderColor:"rgb(54, 56, 69)"}}>
            <div  className="card-title d-flex flex-wrap p-3">
                <Avatar alt={p.createdBy} src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg" sx={{ width: 50, height: 50 }}/>
                <h3 className="card-title m-2">{p.createdBy}</h3>
                <p className="card-title mt-2 text-white" style={{ display: 'block', width: '100%'}}>{p.tema}</p>
            </div>
            {
                p.imagen && <div className="m-3 d-flex justify-content-center">
                                <img className="card-img" src={p.imagen} alt={p.tema} style={{ width: '80%'}}></img>
                            </div>
            }
            <div  className="card-body">
                <p className="card-text text-white" style={{fontSize: '1.5rem'}}><b>{p.texto}</b></p>
                <button className="btn btn-primary ">Like</button>
                <span className="m-2 text-white">{p.likes} likes</span>
            </div>
        </div>
    );
}

export default PostCard;