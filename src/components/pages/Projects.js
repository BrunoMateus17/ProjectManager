import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import styles from "./Projects.module.css"
import ProjectCard from "../project/ProjectCard"
import { useState,useEffect } from "react"
function Projects(){
    const [project,setProject] = useState([])
    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message
    }
    useEffect(()=>{
        fetch('http://localhost:5000/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProject(data)
            console.log(project.length)
        })
        .catch((err) => console.log(err))
    },[])
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                {project.length > 0 && 
                    project.map((project) =>
                        ( <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                        />)
                    )}
            </Container>
        </div>
    )
}

export default Projects
 