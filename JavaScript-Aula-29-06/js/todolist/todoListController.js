let TodoListController = ((TodoListModel, TodoListView)=>{
    
    let renderAllTasks = (p_list) => {
        TodoListView.renderList(p_list)
    }

    let taskUpdatedClicked = (p_key, p_task) => {
        TodoListModel.updateTask(p_key, p_task.title, 'done', renderAllTasks)
    }

    let taskDeleteClicked = (p_key) => {
        TodoListModel.deleteTask(p_key, renderAllTasks)
    }

    let formCadSubmited = (p_title) => {
        TodoListModel.newTask(p_title, 'doing', renderAllTasks)
    }

    TodoListModel.getAllTasks(renderAllTasks)

    return {
        taskDeleteClicked : taskDeleteClicked,
        taskUpdatedClicked : taskUpdatedClicked,
        formCadSubmited : formCadSubmited
    }
    

})(TodoListModel, TodoListView)