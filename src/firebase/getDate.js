const getDate = ()=>{
    const d = new Date()
    return ` ${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}

export default getDate