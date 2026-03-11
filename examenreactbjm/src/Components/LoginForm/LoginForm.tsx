import "./LoginForm.css"
import axios from "axios";
import {useActionState} from "react";
function LoginForm(){

    const action = async (_prevState: unknown, formData: FormData) => {
        const nomEscrit = formData.get("username") as string;
        const contrasenyaEscrita = formData.get("contrasenya") as string;

        const res = await axios.post("http://158.158.16.145:3000/login",
            {nomEscrit, contrasenyaEscrita});

        if (!res.data.error){
            return {ok: true, missatge: "Username o contrasenya Incorrectes"};
        }
        return {ok: true, missatge: "Login Correcte..."};
    }

    const [state, formAction] = useActionState(action, null);

    return (
        <div>
            <form action={formAction} id={"login"}>
                <img src={"./IconoLogin.png"}/>
                <div>
                    <label htmlFor={"Usuari"}>Nom d'usuari</label>
                    <input type="text" name="nom"/>
                </div>
                <div>
                    <label htmlFor={"Contrasenya"}>Contrasenya </label>
                    <input type="password" name="contrasenya"/>
                </div>
                <button type="submit">Log In</button>
            </form>
            {state && (
                <p style={{color: state.ok ? "green" : "red"}}>
                    {state.missatge}
                </p>
            )}
        </div>
    );
}
export default LoginForm;