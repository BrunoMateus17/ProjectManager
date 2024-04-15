import styles from './ProjectForm.module.css'

function ProjectForm() {
    return (
        <form className={styles.form}>
        <input
          type="text"
          text="Nome do projeto"
          name="name"
          placeholder="Insira o nome do projeto"
         
        />
        <input
          type="number"
          text="Orçamento do projeto"
          name="budget"
          placeholder="Insira o orçamento total"
        
        />
        <select
          name="category_id"
          text="Selecione a categoria"
     
        ></select>
        
      </form>
    )
}
export default ProjectForm