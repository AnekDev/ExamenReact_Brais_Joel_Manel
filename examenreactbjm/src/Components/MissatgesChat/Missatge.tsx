import "./MissatgesChat.css"
type Msg={
    msg:string,
    data: string,
    id_usuari_emisor:number
}

export default function Missatge(msg:Msg){
    return(
        <div className={"msg"}>
            <p>{msg.msg}</p>
        </div>
    )
}


