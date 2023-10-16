const pencils = ["small","medium","large"]
let currPencil = pencils[0]
const colors = ["red","blue","green","yellow"]
let currColor = colors[0]
let eraserActive = false
const HEADER_HEIGHT = 71
const ERASER_OFFSET = 10

let isMouseDown = false
document.onmousedown = function() { isMouseDown = true  }
document.onmouseup   = function() { isMouseDown = false }
document.onmousemove = function(e) {
  if(!isMouseDown) { return } 
  paint(e)
}
document.onclick = function handleClick(e) {
  paint(e)
}
document.addEventListener("DOMContentLoaded", function() {
  getById("pencilsmall").addEventListener("click", function(){
    currPencil=pencils[0]
    eraserActive = false
    updateCurrent()
  })
  getById("pencilmedium").addEventListener("click", function(){
    currPencil=pencils[1]
    eraserActive = false
    updateCurrent()
  })
  getById("pencillarge").addEventListener("click", function(){
    currPencil=pencils[2]
    eraserActive = false
    updateCurrent()
  })
  getById("colorred").addEventListener("click", function(){
    currColor=colors[0]
    eraserActive = false
    updateCurrent()
  })
  getById("colorblue").addEventListener("click", function(){
    currColor=colors[1]
    eraserActive = false
    updateCurrent()
  })
  getById("colorgreen").addEventListener("click", function(){
    currColor=colors[2]
    eraserActive = false
    updateCurrent()
  })
  getById("coloryellow").addEventListener("click", function(){
    currColor=colors[3]
    eraserActive = false
    updateCurrent()
  })
  getById("eraser").addEventListener("click", function(){
    eraserActive = true
    updateCurrent()
  })
  getById("clean").addEventListener("click", function(){
    getById("screen").innerHTML=''
  })
  updateCurrent()
})

function updateCurrent(){
  const txt = eraserActive ? "eraser" : currPencil + " " + currColor
  getById('current').innerText = "current: " + txt
}

function paint(e){
  if(eraserActive){
    erase(e.clientX, e.clientY)
  } else {
    paintDot(e.clientX, e.clientY)
  }
}

function paintDot(clientX, clientY) {
  if(clientY <= HEADER_HEIGHT) { return }
  let dot = document.createElement('div')
  dot.className = 'dot '+currPencil+' '+currColor
  const top = clientY-HEADER_HEIGHT
  dot.style.left = clientX+'px'
  dot.style.top = top+'px'
  dot.style.transform = 'translate(-50%,-50%)'
  getScreen().appendChild(dot)
}

function erase(clientX,clientY){
  const dots = getScreen().children;
  for(let i=0;i<dots.length;i++){
    if((clientX-parseInt(dots[i].style.left) <= ERASER_OFFSET)
        && (clientX-parseInt(dots[i].style.left) > -ERASER_OFFSET)
        && (clientY-parseInt(dots[i].style.top)-HEADER_HEIGHT <= ERASER_OFFSET)
        && (clientY-parseInt(dots[i].style.top)-HEADER_HEIGHT > -ERASER_OFFSET)){
      dots[i].remove()
    }
  }
}

function getScreen(){
  return document.getElementById("screen")
}

function getById(id) {
  try {
    return document.getElementById(id)
  } catch(e) {
    console.log("element with id not found")
  }
}