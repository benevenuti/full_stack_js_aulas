let TodoListModel = (() => {
    let server = "https://nameless-gorge-47145.herokuapp.com/"

    let getAllTasks = (callback) => {
        $.ajax({
            url: server
        }).done((data)=>{
            if(typeof callback == "function") callback(data)
        })
    }

    let newTask = (p_title, p_status, callback) => {
        $.post(server + 'newtask', {title: p_title, status:p_status}, 
        (data)=>{
            if(typeof callback == "function") callback(data)
        })
    }

    let updateTask = (p_key, p_title, p_status, callback) => {
        console.info(p_key)
        $.ajax({
            url : server + 'updateTask/' + p_key,
            type : 'PUT',
            data : {title : p_title, status : p_status}
        }).done((data) =>{
            callback(data)
        })
    }

    let deleteTask = (p_key, callback) => {
        $.ajax({
            url : server + 'deleteTask/' + p_key,
            type : 'DELETE'
        }).done((data) =>{
            callback(data)
        })
    }

    return {
        getAllTasks : getAllTasks,
        newTask: newTask,
        updateTask : updateTask,
        deleteTask : deleteTask
    }
})()