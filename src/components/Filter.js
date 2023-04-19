export const Filter = ({newFilter,handlerFilterChange}) =>{
    return (
        <form className='formInput' onSubmit={(event)=>event.preventDefault()}>
          <div >
            filter shown with <input className='input' value={newFilter} onChange={handlerFilterChange} required/>
          </div>
        </form>
    )
}