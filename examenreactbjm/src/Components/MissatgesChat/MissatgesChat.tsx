import "./MissatgesChat.css"
import {useState, useEffect, JSX} from "react";
import axios from "axios";
import Missatge from "./Missatge.tsx";


type Prop = {
    id:number;
}
type msg = {
    data_hora: string,
    id_usuari_emisor: number,
    missatge: string,
}

function MissatgesChat(prop:Prop){
    const [taulaMsg, setTaulaMsg] = useState<JSX.Element[]>([]);

    function carregarMissatges(){
        console.log(prop.id)
        axios.post("http://158.158.16.145:3000/getMissatges", {
            idemissor: 2,
            idRemitent: prop.id
        })
            .then(response => {
                console.log(response.data.data);
                const data: msg[]=response.data.data;
                const array: JSX.Element[] = [];
                data.forEach((obj:msg)=>{array.push(<Missatge data={obj.data_hora} msg={obj.missatge} id_usuari_emisor={obj.id_usuari_emisor}></Missatge>)})
                setTaulaMsg(array)
            })
            .catch(error => console.error(error));
    }
    useEffect(() => {
        carregarMissatges()
    }, [prop.id]);
    return(
        <div id={"missatgesChat"}>
            <div id={"missatges"}>
                {taulaMsg}
            </div>
            <div id={"writeField"}>
                <input type={"text"}/>
                <button>Enviar missatge</button>
            </div>
        </div>
    )
}
export default MissatgesChat;