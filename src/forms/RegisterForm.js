
const RegisterForm = ({
    values,
    handleChange,
    handleSubmit,
    history
}) => {

    const { name, email, password } = values;

    return(
        <>
        <div className="d-flex justify-content-center align-items-center m-3 flex-wrap">
            <h1 className="text-center m-3" style={{display: 'block', width: '100%'}}>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    style={{ width: '100%'}}
                    placeholder="Nombre"
                    type='text'
                    value={name}
                    name='name'
                    onChange={handleChange}
                    className="m-1"
                />
                <input 
                    style={{ width: '100%'}}
                    placeholder="Email"
                    type='email'
                    value={email}
                    name='email'
                    onChange={handleChange}
                    className="m-1"
                />
                <input 
                    style={{ width: '100%'}}
                    placeholder="Contraseña"
                    type='password'
                    value={password}
                    name='password'
                    onChange={handleChange}
                    className="m-1"
                />
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary m-1">Registrarse</button>
                    <button className="btn btn-primary m-1" onClick={() => window.location.href = '/'}>Iniciar sesión</button>
                </div>
            </form>
        </div>
        </>
    )

}

export default RegisterForm;