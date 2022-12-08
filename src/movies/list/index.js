import styles from "./index.module.less"
import $ from "jquery"
let container;
function init(){
    container = $("<div>").addClass(styles.container).appendTo("#app")
}
init()
export function createList(movieData) {
    let str = movieData.map(item=>{
        return `<div>
            <a href=${item.url} target="_blank"><img src="${item.cover}"></a> 
            <a href=${item.url} target="_blank"><p class="${styles.title}">${item.title}</p></a>
            <p class="${styles.rate}">评分 ${item.rate}</p>
        </div>`
    }).join("")
    container.html(str)
}