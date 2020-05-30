let TodoListView = (() => {
    let containerList = $('.js-container-list'),
        itemTemplate = $('#tpl-task'),
        formCad = $('.js-form-cad'),
        inputTask = $('.js-input-task')

        formCad.on('submit', (e) => {
            e.preventDefault()
            TodoListController.formCadSubmited(inputTask.val())
            inputTask.val('')
        })

    let renderList = (p_list) => {
        containerList.empty()

        for (let i = 0; i < p_list.length; i++) {
            let itemClass = (p_list[i].status == "done" ? "alert-success" : "alert-info")
            let classTitle = (p_list[i].status == "done" ? "done" : "")
            let tmpElement = itemTemplate
                .html()
                .replace(/{{class}}/g, itemClass)
                .replace(/{{title}}/g, p_list[i].title)
                .replace(/{{classTitle}}/g, classTitle)

            tmpElement = $(tmpElement)

            tmpElement.find('.js-update-btn').on('click', { key : i, task : p_list[i] }, (e) => {
                e.preventDefault()
                console.warn(`atualiza a task ${e.data.task.title} em key ${e.data.key}`)
                TodoListController.taskUpdatedClicked(e.data.key, e.data.task)
            })

            tmpElement.find('.js-delete-btn').on('click', { key : i }, (e) => {
                e.preventDefault()
                console.warn(`apaga a task em key ${e.data.key}`)
                TodoListController.taskDeleteClicked(e.data.key)
            })

            containerList.append(tmpElement)
        }
    }

    return {
        renderList: renderList
    }
})()