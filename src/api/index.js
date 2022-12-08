import axios from "axios"
axios.interceptors.response.use(config=>{
        console.log(config);

    return config
})
async function getMovies(page,limit){
    let result = await axios.get("/api/movies",{params:{page:page,size:limit}})
    return result.data
}

export {getMovies}