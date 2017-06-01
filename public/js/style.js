window.onload = function() {
	//List variables
	let addListToggle = $(".add-list-form-toggle")
	let addListForm = $(".add-list-form")
	let cancelAddListToggle = $(".cancel-add-list-toggle")
	let todoListGroup = $(".todo-list-group")
	let editListToggle = $(".edit-list-form-toggle")
	let editListForm = $(".edit-list-form")
	let deleteListForm = $(".delete-list-form")
	
	//Task variables
	let editToggle = $(".edit-toggle");
	let cancelToggle = $(".cancel-toggle");
	let addToggle = $(".add-toggle");
	let cancelAddToggle = $(".cancel-add-toggle");
	let completeForm = $(".complete-task-form");

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
	//List - AJAX request for creating new task
	addListForm.on("submit", function(event) {
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let listValue = $(event.target)[0].children.listName.value;
		$.ajax({
			type:"POST",
			url:`/users/${userId}/lists/new`,
			data: {listName: listValue},
		}).then(function(res){
			console.log("List added")
			let $li = $("<li>", {
				class: "list-group-item to-do-list-li",
				text: listValue
			})
			todoListGroup.append($li);
			addListForm.trigger("reset");
			addListToggle.toggle();
			addListForm.toggle();
		})
	})

	//List - hide and show edit list form and buttons
	editListToggle.on("click", function(event) {
		event.preventDefault();
		let listId = $(event.target)[0].id;
		let listForm = $(`#form_${listId}`);
		let listText = $(`#list_${listId}`);
		listForm.toggle();
		listText.toggle();
	})

	//List -edit list
	editListForm.on("submit", function(event) {
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
			let listText = $(`#list_${listId}`);
			let listForm = $(`#form_${listId}`);
			listText.text(`${listValue}`)
			listForm.toggle();
			listText.toggle();
		})
	})
	//List - delete list
	deleteListForm.on("submit", function(event) {
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
			listForm.remove();
			listText.remove();
		})
	})

	//Task hide/show
	completeForm.on("submit", function(event){
		event.preventDefault();
		let userId = $(event.target)[0].children.user_id.value;
		let taskId = $(event.target)[0].children.task_id.value;
		$.ajax({
			type:"PATCH",
			url: `/users/${userId}/tasks/${taskId}/complete`,
		}).then(function(res){
			$(event.target).parent().parent().parent().parent().parent().remove()
		})
	});


	editToggle.on("click", function(event) {
		let taskId = $(event.target)[0].id;
		let taskForm = $(`#form_${taskId}`)
		let taskText = $(`#task_${taskId}`)
		taskForm.toggle();
		taskText.toggle();
	});

	cancelToggle.on("click", function(event) {
		let taskId = $(event.target)[0].id;
		let taskForm = $(`#form_${taskId}`)
		let taskText = $(`#task_${taskId}`)
		taskForm.toggle();
		taskText.toggle();
	});

	addToggle.on("click", function(event){
		let addForm = $(".add-task-form");
		addForm.toggle();
		addToggle.toggle();
	});

	cancelAddToggle.on("click", function(event) {
		let addForm = $(".add-task-form");
		addForm.toggle();
		addToggle.toggle();
	});
}