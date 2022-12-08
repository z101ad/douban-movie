import {createList} from "./list"
import {createPages} from "./pages"
import {getMovies} from "../api"
async function init(){
    const data = await getMovies(1,30)
    createList(data.data.movieList)
    createPages(1,30,data.data.movieTotal)
}
init()