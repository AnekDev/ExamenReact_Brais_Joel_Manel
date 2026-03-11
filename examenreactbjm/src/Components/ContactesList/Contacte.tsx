type prop = {
    id:number,
    username:string
    contactePassar: (id:number) => void;
}
function Contacte(prop:prop){

    function canviarId(){
        prop.contactePassar(prop.id);
    }

    return(
        <div>
            <div>
                <h1>{prop.username}</h1>
                <button onClick={canviarId}>Enviar Missatge</button>
            </div>
        </div>
    )
}
export default Contacte