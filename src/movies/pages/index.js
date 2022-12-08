import $ from "jquery"
import styles from "./index.module.less"
import {createList} from "../list";
import {getMovies} from "../../api"
let container;
function init(){
    container = $("<div>").addClass(styles.pager).appendTo("#app")
}
init()
export function createPages(page,limit,total){
    let maxPage = Math.ceil(total/limit);
    container.empty()
    function createTag(text,status,to){
        const item = $("<span>").text(text).addClass(status?styles[status]:"").appendTo(container)
        if(!status){
            item.on("click",async function(){
                let data = await getMovies(to,limit)
                createList(data.data.movieList)
                createPages(to,limit,data.data.movieTotal)
            })
        }
    }
    //首页
    createTag("首页",page===1?"disabled":"",1)
    //上一页
    createTag("上一页",page===1?"disabled":"",page-1)
    //中间页
    let maxCount = 10
    let min = page-maxCount/2
    min<1 && (min=1)
    let max = min+maxCount-1
    max>maxPage && (max=maxPage)
    for(let i = min;i<=max;i++){
        createTag(i,page===i?"active":"",i)
    }
    //下一页
    createTag("下一页",page===maxPage?"disabled":"",page+1)
    //尾页
    createTag("尾页",page===maxPage?"disabled":"",maxPage)
}