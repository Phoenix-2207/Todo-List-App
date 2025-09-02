let Input = document.getElementById('input');
let Button = document.getElementById('addbutton');
let MainList = document.getElementById('mainlist');

let ListStored = JSON.parse(localStorage.getItem('tasks')) || [];
ListStored.forEach(element => { RenderTask(element) });

Button.addEventListener('click', function () {
    let TaskInputted = Input.value.trim()
    if (TaskInputted === '') return
    let Identity = Date.now()
    let ObjectInputted = { id: Identity, task: TaskInputted, checkboxstatus: false, colorstatus: 0 }
    RenderTask(ObjectInputted)
    ListStored.push(ObjectInputted)
    SaveTask(ListStored)
    Input.value = ''
})

// {id: identity , task: name , checkboxstatus: true , colourstatus: 0}
function RenderTask(element) {
    if (element === '') return
    let TaskList = document.createElement('li');
    let DeleteButton = document.createElement('button')
    DeleteButton.innerText = 'Delete'
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('checkbox')
    let ColourButton = document.createElement('button')
    ColourButton.innerText = 'Change'
    let TaskName = document.createTextNode(element.task)

    TaskList.append(checkbox, TaskName, DeleteButton, ColourButton)
    MainList.append(TaskList)
    let colourlist = ['', 'yellow', 'blue', 'red', 'green']
    if (element.checkboxstatus) {
        TaskList.classList.add('completed')
        checkbox.checked = element.checkboxstatus
    }
    let Index = element.colorstatus % colourlist.length
    TaskList.classList.remove('yellow', 'blue', 'red', 'green')
    if (Index !== 0) {
        console.log(Index)
        console.log(colourlist[Index])
        TaskList.classList.add(colourlist[element.colorstatus % colourlist.length])
    }

    DeleteButton.addEventListener('click', function () {
        TaskList.remove()
        for (let i = 0; i < ListStored.length; i++) {
            if (ListStored[i].id === element.id) {
                ListStored.splice(i, 1)
            }
        }
        SaveTask(ListStored)
    })

    checkbox.addEventListener('change', function () {
        TaskList.classList.toggle('completed')
        for (let i = 0; i < ListStored.length; i++) {
            if (ListStored[i].id === element.id) {
                ListStored[i].checkboxstatus = checkbox.checked
            }
        }
        SaveTask(ListStored)
    })


    ColourButton.addEventListener('click', function () {
        for (let i = 0; i < ListStored.length; i++) {
            if (ListStored[i].id === element.id) {
                ListStored[i].colorstatus += 1
                let multiplied = ListStored[i].colorstatus % colourlist.length
                if (multiplied === 0) {
                    TaskList.classList.remove('yellow', 'blue', 'red', 'green')
                } else if (multiplied !== 0) {
                    TaskList.classList.remove('yellow', 'blue', 'red', 'green')
                    TaskList.classList.add(colourlist[multiplied])
                }
            }
        }
        SaveTask(ListStored)
    })

    element.domRef = TaskList
}

function SaveTask(Complete) {
    localStorage.setItem('tasks', JSON.stringify(Complete))
}

let CompletedButton = document.getElementById('showCompleted')
let PendingButton = document.getElementById('showPending')

CompletedButton.addEventListener('change', function () {
    if (CompletedButton.checked) {
        for (let i = 0; i < ListStored.length; i++) {
            let Li = ListStored[i].domRef
            if (ListStored[i].checkboxstatus) {
                Li.style.display = 'list-item'
            } else {
                Li.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < ListStored.length; i++) {
            let Li = ListStored[i].domRef
            Li.style.display = 'list-item'
        }
    }
})

PendingButton.addEventListener('change',function(){
    if (PendingButton.checked){
        for (let i = 0 ; i < ListStored.length ; i++){
            Li = ListStored[i].domRef 
            if (ListStored[i].checkboxstatus){
                Li.style.display = 'none'
            } else {
                Li.style.display = 'list-item'
            }
        }
    } else {
        for (let i = 0 ; i < ListStored.length ; i++){
            Li = ListStored[i].domRef
            Li.style.display = 'list-item'
        }
    }
})