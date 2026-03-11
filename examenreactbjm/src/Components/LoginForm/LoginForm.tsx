import "./LoginForm.css"
function LoginForm(){

    return(
        <form id={"login"}>
            <img src={"./IconoLogin.png"}/>
            <div>
                <label htmlFor={"Usuari"}>Nom d'usuari </label>
                <input name={"Usuari"} type={"text"}/>
            </div>
            <div>
                <label htmlFor={"Contrasenya"}>Contrasenya </label>
                <input name={"Contrasenya"} type={"password"}/>
            </div>
            <input type={"submit"} value={"Log in"}/>
        </form>
    )
}

export default LoginForm;