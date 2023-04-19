export const PersonsForm = ({onSubmit,newName,handlerNameChange,newNumber,handlerNumberChange}) => {
    return (
        <form className='formInput' onSubmit={onSubmit}>
          <div>
            name: <input className='input' value={newName} onChange={handlerNameChange} required/>
          </div>
          <div>
            number: <input className='input' value={newNumber} onChange={handlerNumberChange} type="tel" required/>
          </div>
          <div>
            <button className="botonSubmit" type="submit">add</button>
          </div>
        </form>
    )
}