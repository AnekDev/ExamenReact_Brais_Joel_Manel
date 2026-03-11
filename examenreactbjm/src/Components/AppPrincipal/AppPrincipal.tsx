import "./AppPrincipal.css"
import MissatgesChat from "../MissatgesChat/MissatgesChat.tsx";
import ContactesLlista from "../ContactesList/ContactesLlista.tsx";
import LoginForm from "../LoginForm/LoginForm.tsx";
import {useState} from "react";
function AppPrincipal(){

    const [pagina, setPagina] = useState("login");
    const [idActual, setIdActual] = useState(0);

    function enviarMissatge(id: number){
        setIdActual(id);
    }

    function onLoginSuccess(){
        setPagina("inici");
    }

    return(
        <>
            {pagina === "inici" && <div id={"appPrincipal"}>
                <ContactesLlista contacteId={enviarMissatge}></ContactesLlista>
                <MissatgesChat id={idActual}></MissatgesChat>
            </div>}

            {pagina === "login" &&
                <LoginForm onLogin={onLoginSuccess}></LoginForm>
            }
        </>


    )
}
export default AppPrincipal