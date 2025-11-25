//Getting all elements
const start_btn = document.querySelector(".start_btn button")
const info_box = document.querySelector(".info_box")
const exit_btn = info_box.querySelector(".buttons .quit")
const continue_btn = info_box.querySelector(".buttons .restart")

//Start button click
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

//Exit button click
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}