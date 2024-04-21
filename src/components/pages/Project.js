import styles from './Project.module.css'
import Loading from './../layout/Loading'
import Container from './../layout/Container'
import ProjectForm from './../project/ProjectForm'
import Message from './../layout/Message'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
function Project(){
    const {id} = useParams()
    const [project,setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')


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

    function editPost(project) {
        setMessage('')
        // budget validation
        if (project.budget < project.cost) {
          setMessage('O Orçamento não pode ser menor que o custo do projeto!')
          setType('error')
          return false
        }
    
        fetch(`http://localhost:5000/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessage('Projeto atualizado!')
            setType('success')
          })
      }
    

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
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
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm  ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {!showServiceForm && <div>Formulario</div>}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>teste</p>
                        </Container>
                    </Container>
                </div>



            ):(
                <Loading/>
            )}
        </>
    )
}
export default Project