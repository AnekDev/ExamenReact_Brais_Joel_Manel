import axios from "axios";
import {useActionState} from "react";

function CanviContrasenya() {

    const action = async (_prevState:unknown, formData:FormData) =>{
        const  antiga_contrasenya= formData.get("antiga_contrasenya");
        const contrasenya = formData.get("contrasenya");
        const nova_contrasenya = formData.get("nova_contrasenya");

        const res = await axios.post("http://localhost:3000/setCanviContrasenya",
            {antiga_contrasenya:antiga_contrasenya, contrasenya:contrasenya, nova_contrasenya:nova_contrasenya});

        return {ok: !res.data.error, message: res.data.message}
    }

    const [state, formAction] = useActionState(action, null);

    return (
        <div>
            <form action={formAction}>
                <label>antiga_contrasenya: <input type={"text"} name={"antiga_contrasenya"}/></label>
                <label>Contrasenya Actual: <input type={"password"} name={"contrasenya"}/></label>
                <label>Nova Contrasenya: <input type={"password"} name={"nova_contrasenya"}/></label>
                <button type={"submit"}>Canvia Contrasenya</button>
            </form>
            {state && (
                <p style={{
                    color: state.ok ? "green" : "red"
                }}>
                    {state.message}
                </p>
            )}
        </div>
    )
}

export default CanviContrasenya