window.onload = function() {
	//List variables
	let addListToggle = $(".add-list-form-toggle");
	let addListForm = $(".add-list-form");
	let cancelAddListToggle = $(".cancel-add-list-toggle");
	let todoListGroup = $(".todo-list-group");
	let editListToggle = $(".edit-list-form-toggle");
	let editListForm = $(".edit-list-form");
	let deleteListForm = $(".delete-list-form");
	
	//Task variables
	let addTaskToggle = $(".add-task-toggle");
	let addTaskForm = $(".add-tasks-form");
	let editTaskForm = $(".edit-task-form");
	let deleteTaskForm = $(".delete-task-form");
	let completeTaskForm = $(".complete-task-form");
	let editTaskToggle = $(".edit-task-toggle");
	let cancelTaskToggle = $(".cancel-task-toggle");
	let mainTaskArea = $(".main-task-area");

	//Lists
	//List - hide and show add list form and buttons
	addListToggle.on("click", function(event) {
		addListToggle.toggle();
		addListForm.toggle();
	})

	cancelAddListToggle.on("click", function(event) {
		addListToggle.toggle();
		addListForm.toggle();
	})

	//List - AJAX request for creating new list
	addListForm.on("submit", function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listValue = $(event.target)[0].children.listName.value;
		$.ajax({
			type:"POST",
			url:`/users/${userId}/lists/new`,
			data: {listName: listValue},
		}).then(function(res){
			let sourceOne = $("#add_list_template").html();
			let sourceTwo = $("#add_macro_list_template").html();
			let templateOne = Handlebars.compile(sourceOne);
			let templateTwo = Handlebars.compile(sourceTwo);
			let context = {
				user_id: userId,
				list_id: res,
				list_listName: listValue,
			}
			let htmlOne = templateOne(context);
			let htmlTwo = templateTwo(context);
			let appendDivOne = $("#to-do-list")
			let appendDivTwo = $("#to-do-task-list")
			appendDivOne.append(htmlOne);
			appendDivTwo.append(htmlTwo);
			addListForm.trigger("reset");
			addListToggle.toggle();
			addListForm.toggle();
		})
	})

	//GLOBAL - List - hide and show edit list form and buttons
	todoListGroup.on("click",".edit-list-form-toggle",function(event) {
		event.preventDefault();
		console.log("I am being clicked");
		let listId = $(event.target)[0].id;
		let listForm = $(`#form_${listId}`);
		let listText = $(`#list_${listId}`);
		listForm.toggle();
		listText.toggle();
	})

	//GLOBAL - List - edit list
	todoListGroup.on("submit",".edit-list-form", function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listValue = $(event.target)[0].children.listName.value;
		let listId = $(event.target)[0].children.list_id.value;
		$.ajax({
			type:"PATCH",
			url: `/users/${userId}/lists/${listId}`,
			data: {listName: listValue},
		}).then(function(res){
			console.log("list name edited")
			let listText = $(`#list_name_${listId}`);
			let listBox = $(`#list_${listId}`);
			let listForm = $(`#form_${listId}`);
			listText.text(`${listValue}`)
			listForm.toggle();
			listBox.toggle();
		})
	})

	//GLOBAL - LIST - delete list
	todoListGroup.on("submit", ".delete-list-form", function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listId = $(event.target)[0].children.list_id.value;
		$.ajax({
			type:"DELETE",
			url:`/users/${userId}/lists/${listId}`,
		}).then(function(res) {
			console.log("list deleted")
			let listForm = $(`#form_${listId}`)
			let listText = $(`#list_${listId}`)
			let listDiv = $(`#holding_div_${listId}`)
			listForm.remove();
			listText.remove();
			listDiv.remove();
		})
	})

	//GLOBAL - Task hide/show
	mainTaskArea.on("click",".add-task-toggle",function(event) {
		let toggleText = $(event.target).text();
		if (toggleText === "add task") {
			$(event.target).text("cancel")
		} else {
			$(event.target).text("add task")
		}
		let formId = $(event.target)[0].id
		let taskForm = $(`#form_${formId}`)
		taskForm.toggle();
	})

	//GLOBAL - Task edit toggle show form hide item
	mainTaskArea.on("click",".edit-task-toggle", function(event) {
		let taskId = $(event.target)[0].id;
		let taskItem = $(`#task_item_${taskId}`);
		let taskForm = $(`#form_${taskId}`);
		taskItem.toggle();
		taskForm.toggle();
	})

	//GLOBAL - Task edit toggle hide form show item
	mainTaskArea.on("click",".cancel-task-toggle",function(event) {
		let taskId = $(event.target)[0].id;
		let taskItem = $(`#task_item_${taskId}`);
		let taskForm = $(`#form_${taskId}`);
		taskItem.toggle();
		taskForm.toggle();
	})

	//GLOBAL Task - AJAX - request to make new task for a given list
	mainTaskArea.on("submit",".add-tasks-form",function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listId = $(event.target)[0].children.list_id.value;
		let taskText = $(event.target)[0].children.taskName.value;
		let dateValue = $(event.target)[0].children.isDue.value;
		$.ajax({
			type:"POST",
			url:`/users/${userId}/lists/${listId}/tasks/new`,
			data: {
				taskName: taskText,
				isDue: dateValue,
				user: userId,
				list: listId
			}
		}).then(function(res){
			let source = $("#add_task_template").html();
			let template = Handlebars.compile(source);
			let context = {
				user_id: userId,
				list_id: listId,
				task_id: res,
				task_taskName: taskText,
				task_isDue: dateValue
			}
			let html = template(context);
			let appendDiv = $(`#tasklist_${listId}`)
			let addFormToggle = $(`#add_task_${listId}`)
			appendDiv.append(html);
			addFormToggle.text("add task");
			$(event.target).trigger("reset");
			$(event.target).toggle();
		})
	})

	//GLOBAL - Task - AJAX = request to edit task for a given task item
	mainTaskArea.on("submit", ".edit-task-form", function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listId = $(event.target)[0].children.list_id.value;
		let taskId = $(event.target)[0].children.task_id.value;
		let taskText = $(event.target)[0].children.taskName.value;
		let dateValue = $(event.target)[0].children.isDue.value;
		$.ajax({
			type:"PATCH",
			url:`/users/${userId}/lists/${listId}/tasks/${taskId}`,
			data: {
				taskName: taskText,
				isDue: dateValue,
			}
		}).then(function(res) {
			let updateTaskText = $(`#taskName_${taskId}`)
			let updateTaskDate = $(`#isDue_${taskId}`)
			let taskItem = $(`#task_item_${taskId}`);
			let taskForm = $(`#form_${taskId}`);
			updateTaskText.text(taskText);
			updateTaskDate.text(dateValue);
			taskItem.toggle();
			taskForm.toggle();
		})
	})

	//GLOBAL - AJAX = request to delete task for a given task item
	mainTaskArea.on("submit",".delete-task-form", function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listId = $(event.target)[0].children.list_id.value;
		let taskId = $(event.target)[0].children.task_id.value;
		$.ajax({
			type:"DELETE",
			url:`/users/${userId}/lists/${listId}/tasks/${taskId}`,
		}).then(function(res) {
			let taskItem = $(`#task_item_${taskId}`);
			let taskForm = $(`#form_${taskId}`);
			taskItem.remove();
			taskForm.remove();
		})
	})

	//GLOBAL - AJAX = request to complete task for a given task item
	mainTaskArea.on("submit",".complete-task-form", function(event){
		event.preventDefault();
		console.log("I have been clicked!");
		let userId = $(event.target)[0].children.user_id.value;
		let listId = $(event.target)[0].children.list_id.value;
		let taskId = $(event.target)[0].children.task_id.value;
		$.ajax({
			type:"PATCH",
			url:`/users/${userId}/lists/${listId}/tasks/${taskId}/complete`,
		}).then(function(res){
			let taskItem = $(`#task_item_${taskId}`);
			let taskForm = $(`#form_${taskId}`);
			taskItem.remove();
			taskForm.remove();
		})
	})
}