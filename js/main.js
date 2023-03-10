const elForm = document.querySelector('#add-form');
const ul = document.querySelector('#todos');
const errSpan = document.querySelector('#span');
const elInput = document.querySelector("#input-id");
const themeBtn = document.querySelector('#btn-theme');
const elTime = document.querySelector("#input-id-1")




function genereteDate(time) {
	const date = new Date(time);
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minutes = date.getMinutes();

	if (day < 10) {
		day = "0" + day;
	};
	if (month < 10) {
		month = "0" + month;
	}
	if (hour < 10) {
		hour = "0" + hour;
	};
	if (minutes < 10) {
		minutes = "0" + minutes;
	}


	return `${hour}:${minutes} / ${day}.${month}.${year}`;
}


function renderTodos(array) {
	ul.textContent = '';



	for (let i = 0; i < array.length; i++) {

		const FullDate = genereteDate(array[i].date);

		const newLi = document.createElement('li');
		newLi.className = 'list-group-item d-flex justify-content-between';
		newLi.innerHTML = `
		<div>			
						<h3 style='${array[i].completed ? 'text-decoration:line-through' : ''}'>${array[i].title
			}</h3>
        
		<p class="">${FullDate}  </p>
		</div>
						<div>
							<button data-id=${array[i].id} class=" complete-btn btn btn-info text-white">
								Completed
							</button>
							<button data-id=${array[i].id}   class="btn btn-primary">Edit</button>
							<button  data-id=${array[i].id}   class="btn btn-danger">Delete</button>
						</div>
	`;

		ul.appendChild(newLi);
	}
}

renderTodos(todos);

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();

	let input = evt.target.todo;

	let date = evt.target.date;


	if (input.value === '') {
		span.style.display = 'block';
		input.className += ' border-danger';

		return;
	}
	span.style.display = 'none';
	input.className = 'form-control';
	const newTodo = {
		id:todos.length>0?todos[todos.length-1].id +1  : 0,
		title: input.value,
		completed: false,
		date: date.value,
	};

	todos.push(newTodo);

	renderTodos(todos);

	elForm.reset();
});

let theme = 'light';

themeBtn.addEventListener('click', function () {
	if (theme === 'dark') {
		document.body.className = 'light';
		theme = 'light';

		themeBtn.textContent = 'Tungi rejim';
	} else if (theme === 'light') {
		document.body.className = 'dark';
		theme = 'dark';
		themeBtn.textContent = 'Kunduzgi rejim';
	}
});

ul.addEventListener('click', function (evt) {
	const element = evt.target;

	if (element.className.includes("complete-btn")) {
		;
		const id = Number(element.dataset.id);



		for (let i = 0; i < todos.length; i++) {
			const todo = todos[i];

			if (todo.id === id) {
				console.log(todo);
				todo.completed = !todo.completed
			}
		}
		renderTodos(todos);


	}

	if (element.className.includes("btn-danger")) {
		const id = Number(element.dataset.id);

		const result = [];

		for (let i = 0; i < todos.length; i++) {
			const todo = todos[i];

	

			if (todo.id !== id) {
				result.push(todo)
			}
		}
      todos=result; 
	 renderTodos(todos)
	}

	if (element.className.includes("btn-primary")) {
		const id = Number(element.dataset.id);
         
		

		for (let i = 0; i < todos.length; i++) {
			const todo = todos[i];

			if (todo.id === id) {
				if( elInput.value !== ''){
				todo.title = elInput.value;
				}
			}
			
			if (todo.id === id) {
				if( elTime.value !== ''){
				todo.date = elTime.value;
				}
			}
		}
   
	renderTodos(todos);
	elForm.reset();
	}
})
