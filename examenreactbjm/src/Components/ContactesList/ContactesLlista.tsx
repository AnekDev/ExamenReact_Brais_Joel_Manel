import "./ContactesLLista.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Contacte from "./Contacte";

type Contacte = {
    ID: number;
    username: string;
}

type Props = {
    contacteId: (id: number) => void;
}

function ContactesLlista(prop:Props){

    const [contacte, setContactes] = useState<Contacte[]>([]);
    function enviar(id:number){
        prop.contacteId(id);
    }
    useEffect(()=>{
        axios.get("http://158.158.16.145:3000/getAllUsuaris")
            .then(res =>{setContactes(res.data.data)}
                );
    }, [])

    return (
        <div>
            {contacte.map((c, i) =>(
                <div key={i}>
                    <Contacte id={c.ID} username={c.username} contactePassar={enviar}></Contacte>
                </div>
            ))}
        </div>
    )
}
export default ContactesLlista;


