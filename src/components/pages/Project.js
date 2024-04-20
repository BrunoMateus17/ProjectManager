import styles from './Project.module.css'
import Loading from './../layout/Loading'
import Container from './../layout/Container'
import ProjectForm from './../project/ProjectForm'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
function Project(){
    const {id} = useParams()
    const [project,setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            // setServices(data.services)
          })
        
    },[id])

    function editPost(){

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    return (
        <>
            {project.name ? (
                <div>
                    <Container customClass="column">
                        <div className={styles.project_details}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm  ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.form}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> {project.budget}
                                    </p>
                                    <p>
                                        <span>Total Ultilizado:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.form}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>



            ):(
                <Loading/>
            )}
        </>
    )
}
export default Project