const Notification =({message})=>{
    if (message.text === '') {
        return null
    }
    if(message.successful){
        return <div className='successful'>{message.text}</div>
    }
    return (
        <div className='error'>
            {message.text}
        </div>
    )
}
export default Notification