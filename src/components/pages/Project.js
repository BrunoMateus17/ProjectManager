import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
function Project(){
    const {id} = useParams()
    console.log(id)
    const [project,setProject] = useState([])
    useEffect(()=>{

    },[id])
    return (
        <div>asd</div>
    )
}
export default Project