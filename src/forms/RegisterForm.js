
const RegisterForm = ({
    values,
    handleChange,
    handleSubmit,
    history
}) => {

    const { nombre_usuario, email, password } = values;

    return(
        <>
        <div className="d-flex justify-content-center align-items-center m-3 flex-wrap">
            <h1 className="text-center m-3 text-white" style={{display: 'block', width: '100%'}}>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    style={{ width: '100%'}}
                    placeholder="Nombre"
                    type='text'
                    value={nombre_usuario}
                    name='nombre_usuario'
                    onChange={handleChange}
                    className="m-1 text-white"
                />
                <input 
                    style={{ width: '100%'}}
                    placeholder="Email"
                    type='email'
                    value={email}
                    name='email'
                    onChange={handleChange}
                    className="m-1 text-white"
                />
                <input 
                    style={{ width: '100%'}}
                    placeholder="Contraseña"
                    type='password'
                    value={password}
                    name='password'
                    onChange={handleChange}
                    className="m-1 text-white"
                />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary m-1" onClick={() => window.location.href = '/'}>Iniciar sesión</button>
                    <button type="submit" className="btn btn-primary m-1" onClick={handleSubmit}>Registrarse</button>
                </div>
            </form>
        </div>
        </>
    )

}

export default RegisterForm;