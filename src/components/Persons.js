export const Persons = ({persons,handlerDeletePerson}) => {
    return (
        <div className="persons">
            {persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handlerDeletePerson={handlerDeletePerson}/>)}
        </div>
    )
}
const Person = ({id,name,number,handlerDeletePerson}) => {
    return (
        <div className="person">
            <>{name} {number}</> <button className="botonDelate" onClick={(event)=>handlerDeletePerson(event,id,name)}>delate</button>
        </div>
    )
}