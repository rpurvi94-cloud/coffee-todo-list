//Select dom elements
const input=document.getElementById('todo-input')
const addBtn=document.getElementById('add-btn')
const list=document.getElementById('todo-list')
// to save todo func
//try to load saved todos from local storage (if any)
const saved=localStorage.getItem('todos');
const todos=saved? JSON.parse(saved):[];// it means if ternory is true it is saved then use it export it if it is false then provide us with an array

function saveTodos(){
    // save current storage to local storage
localStorage.setItem('todos', JSON.stringify(todos));
}

//craete a dom node for a todo object and append ut to the list
function createTodoNode(todo,index){
const li=document.createElement('li');
//check box to create toggle completion
const checkbox=document.createElement('input');
checkbox.type='checkbox';
checkbox.checked=!! todo.completed;
//!! double inout to convert boolean to exact boolean 
//truth value true hogi and falsish value false 
checkbox.addEventListener("change",()=>{
    todo.completed=checkbox.checked;
    //TODO: visual feedback :strike through when completed
saveTodos();
//todo m jo change hoga wo global todo m reflect hoga

})
//text of the todo
const textSpan= document.createElement("span");
textSpan.textContent=todo.text;
textSpan.style.margin='0 8px';
if(todo.completed){
    textSpan.style.textDecoration=todo.completed?'line-through':"";
}
    // add double-click event listener
    textSpan.addEventListener("dblclick",()=>{
const newText=prompt("Edit todo", todo.text);
if(newText!==null){
    todo.text=newText.trim()
    textSpan.textContent= todo.text;
    saveTodos();
}
    })
     //delete todo button
     const delBtn=document.createElement('button');
     delBtn.textContent="delete";
     delBtn.addEventListener('click',()=>{
        todos.splice(index,1);
        render();
        saveTodos();
     })
     li.appendChild(checkbox);
     li.appendChild(textSpan);
     li.appendChild(delBtn);
     return li

}

//render the whole todo list from todos array
function render(){
    list.innerHTML='';// empty the list first
    //recreate each item
    todos.forEach((todo,index)=>{
      // node is created with the inforrmation inside the todo in the form of node
        const node= createTodoNode(todo, index);

        list.appendChild(node)
    }
    );
} 
function addTodo(){
const text = input.value.trim();
if(!text){
    return
}
//push a new todo object
todos.push({text, completed:false});
input.value='';
render()
saveTodos()
}
addBtn.addEventListener("click",addTodo);
input.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'){
        addTodo();
    }
})
render();
