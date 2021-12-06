
const NotFound = ({history}) => {
    return (
        <div className="d-flex justify-content-center align-items-center bg-default">
            <h1 className="text-center montserrat-font text-white">Esta pagina no existe :(</h1>
            <button className="btn btn-primary m-5" onClick={() => history.push('/feed')}>Volver</button>
        </div>
    )
}

export default NotFound;