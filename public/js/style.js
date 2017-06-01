window.onload = function() {
	let editToggle = $(".edit-toggle");
	let cancelToggle = $(".cancel-toggle");
	let addToggle = $(".add-toggle");
	let cancelAddToggle = $(".cancel-add-toggle");
	let completeForm = $(".complete-task-form");

	completeForm.on("submit", function(event){
		event.preventDefault();
		alert("I have been clicked")
	})


	editToggle.on("click", function(event) {
		let taskId = $(event.target)[0].id;
		let taskForm = $(`#form_${taskId}`)
		let taskText = $(`#task_${taskId}`)
		taskForm.toggle();
		taskText.toggle();
	})

	cancelToggle.on("click", function(event) {
		let taskId = $(event.target)[0].id;
		let taskForm = $(`#form_${taskId}`)
		let taskText = $(`#task_${taskId}`)
		taskForm.toggle();
		taskText.toggle();
	})

	addToggle.on("click", function(event){
		let addForm = $(".add-task-form");
		addForm.toggle();
		addToggle.toggle();
	})

	cancelAddToggle.on("click", function(event) {
		let addForm = $(".add-task-form");
		addForm.toggle();
		addToggle.toggle();
	})
}