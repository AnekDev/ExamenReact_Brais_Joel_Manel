import "./AppPrincipal.css"
import ContactesLlista from "../../../../../../Downloads/src/src/Components/ContactesList/ContactesLlista.tsx";
import MissatgesChat from "../../../../../../Downloads/src/src/Components/MissatgesChat/MissatgesChat.tsx";
function AppPrincipal(){

    return(
        <div id={"appPrincipal"}>
            <div id={"conf"}></div>
            <ContactesLlista></ContactesLlista>
            <MissatgesChat></MissatgesChat>
        </div>
    )
}
export default AppPrincipal