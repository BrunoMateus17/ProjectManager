import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
function Projects(){
    const location = useLocation();
    let message = '';
    console.log(location)
    if(location.state){
        message = location.state.message
    }
    console.log(message);
    return (
        <div>
            <h1>Meus Projetos</h1>
            {message && <Message type="success" msg={message} />}
        </div>
    )
}

export default Projects
 