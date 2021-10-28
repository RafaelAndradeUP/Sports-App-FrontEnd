
const NotFound = ({history}) => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <h1 className="text-center">Esta pagina no existe :(</h1>
            <button className="btn btn-primary m-5" onClick={() => history.push('/')}>Volver</button>
        </div>
    )
}

export default NotFound;