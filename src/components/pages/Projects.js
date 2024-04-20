import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import styles from "./Projects.module.css"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"
import { useState,useEffect } from "react"
function Projects(){
    const [projects,setProjects] = useState([])
    const [removeLoading,setRemoveLoading] = useState(false)
    const [projectsMessage, setProjectsMessage] = useState('')

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
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
    },[])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(projects.filter((projects) => projects.id !== id))
            setProjectsMessage('Projeto removido com sucesso!')
          })
      }
    
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectsMessage && <Message type="success" msg={projectsMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((projects) =>
                        ( <ProjectCard 
                            id={projects.id}
                            name={projects.name}
                            budget={projects.budget}
                            category={projects.category.name}
                            key={projects.id}
                            handleRemove={removeProject}
                        />)
                    )}
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrado</p>
                    )}
            </Container>
        </div>
    )
}

export default Projects
 