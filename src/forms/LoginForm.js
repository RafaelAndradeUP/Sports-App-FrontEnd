
const LoginForm = ({
    values,
    handleChange,
    handleSubmit
}) => {

    const { email,password } = values;

    return(
        <>
        <div className="d-flex justify-content-center align-items-center m-3 flex-wrap">
            <p className="text-white text-center" style={{display: 'block', width: '100%'}}>Iniciar sesión</p>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center">
                <input 
                    placeholder="Email"
                    type='email'
                    value={email}
                    name='email'
                    onChange={handleChange}
                    className="m-1 text-white"
                />
                <input 
                    placeholder="Contraseña"
                    type='password'
                    value={password}
                    name='password'
                    onChange={handleChange}
                    className="m-1 text-white"
                />
                <button class="button" type="submit" className="btn btn-primary m-1">Entrar</button>
                <a className="text-white m-3" href="/forgot-password" style={{ textDecoration: 'none' }}>Olvidé mi contraseña</a>
            </form>
        </div>
        </>
    )

}

export default LoginForm;