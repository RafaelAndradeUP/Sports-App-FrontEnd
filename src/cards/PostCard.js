import {Avatar} from "@mui/material";

const PostCard = ({
    p
}) => {
    return(
        <div class="card mb-3" style={{width: '100%'}}>
            <div className="card-title p-3 d-flex flex-wrap">
                <Avatar alt={p.createdBy} src="https://www.diethelmtravel.com/wp-content/uploads/2016/04/bill-gates-wealthiest-person.jpg" sx={{ width: 50, height: 50 }}/>
                <h2 class="card-title m-2">{p.createdBy}</h2>
                <p class="card-title mt-2" style={{ display: 'block', width: '100%'}}>{p.tema}</p>
            </div>
            {
                p.imagen && <div className="m-3 d-flex justify-content-center">
                                <img class="card-img" src={p.imagen} alt={p.tema} style={{ width: '80%'}}></img>
                            </div>
            }
            <div class="card-body">
                <p class="card-text" style={{fontSize: '1.5rem'}}><b>{p.texto}</b></p>
                <button class="btn btn-primary">Like</button>
                <span className="m-2">{p.likes} likes</span>
            </div>
        </div>
    );
}

export default PostCard;