import { useState,useEffect } from 'react'
import { Filter } from './components/Filter'
import { Persons } from './components/Persons'
import { PersonsForm } from './components/PersonsForm'
import Notification from './components/Notification'
import {getAll,create,update,delatePerson} from "./services/persons" 

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message,setMessage] = useState({text:'',successful:true})

  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons=()=>{
    getAll()
    .then(persons=>{setPersons(persons)})
  }
  const checkName = () => {
    let ckeck=false
    persons.forEach(person=>ckeck = ckeck || person.name===newName)
    return !ckeck
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(checkName()){
      const personObjet={name: newName , number: newNumber}
      create(personObjet)
      .then(returnedPerson=>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage({text:`Added ${returnedPerson.name}`,successful:true})
          setTimeout(()=>setMessage({text:''}),3000)
        } 
      )
      .catch(error=>{
          setMessage({text:`${error.response.data.error}`,successful:false})
          setTimeout(()=>setMessage({text:''}),3000)
      })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebok replace the olde number with a new one?`)) {
        const oldPerson=persons.find(person=>person.name===newName)
        const newPersonObjet={...oldPerson,number:newNumber}
        update(oldPerson.id,newPersonObjet)
        .then(returnedPerson=>{
          const newPersons=persons.map(person=>person.id===returnedPerson.id?returnedPerson:person)
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setMessage({text:`Update ${returnedPerson.name}`,successful:true})
          setTimeout(()=>setMessage({text:''}),3000)
        })
        .catch(error=>{
          setMessage({text:`${error.response.data.error}`,successful:false})
          setTimeout(()=>setMessage({text:''}),3000)
      })
      }  
    }  
  }

  const handlerNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlerNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlerFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personToShow =persons.filter(person => {
      let equal=true
      for (let i = 0; i < newFilter.length; i++) {
        equal= equal && newFilter.charAt(i).toLowerCase()===person.name.charAt(i).toLowerCase()
      }
      return equal
    })

  const handlerDeletePerson=(event,id,name)=>{
    event.preventDefault()
    if (window.confirm(`Delate ${name} ?`)) {
      delatePerson(id)
      .then(()=>{
          const personsAfterDelate=persons.filter(person => {
              return person.id!==id
            }
          )
          setPersons(personsAfterDelate)
        }
      )
    }
  }

  return (
    <div className='app'>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFilter={newFilter} handlerFilterChange={handlerFilterChange}/>
      <h3>Add a new</h3>
      <PersonsForm onSubmit={addPerson} newName={newName} handlerNameChange={handlerNameChange} newNumber={newNumber} handlerNumberChange={handlerNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personToShow} handlerDeletePerson={handlerDeletePerson}/>      
    </div>
  )
}

export default App