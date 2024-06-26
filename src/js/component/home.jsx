import React, { useState, useEffect } from "react";

const Home = () => {

	const [todo, setTodo] = useState({});
	const [todos, setTodos] = useState([]);

	const [inputValue, setInputValue] = useState("");

	const handleInputValue = (event) => {
		setInputValue(event.target.value);
	}

	const handleSubmit = (event) => {
		if (event.key === "Enter") {
			postTodo(inputValue);
			setInputValue("");
		}
	}

	const handleOnClick = (todo) => {
		deleteTodo(todo);

	}

	const postTodo = async (tarea) => {
		try {
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({
				"label": tarea,
				"is_done": false
			});

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			};

			const response = await fetch("https://playground.4geeks.com/todo/todos/alejandro", requestOptions)
			const result = await response.text();
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	const deleteTodo = async (todo) => {
		try {
			const requestOptions = {
				method: "DELETE",
				redirect: "follow"
			};
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${todo}`, requestOptions)
			const result = await response.text();
			fetchTodos();
		} catch (error) {
			console.log(error);
		}
	}

	const fetchTodos = () => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://playground.4geeks.com/todo/users/alejandro");
				const data = await response.json();
				setTodos(data.todos);

			} catch (error) {
				console.log(error);
			}

		}
		fetchData();;
	}
	useEffect(() => {

		fetchTodos();
	}, [inputValue]);

	return (

		<div className="d-flex flex-column justify-content-center align-items-center text-center w-50 m-auto" >

			<h1 className="text-center mt-5">lista de tareas</h1>
			<ul className="list-group list-group-flush">
				<li className="list-group-item">
					<input type="text" className="border-0 text-center" placeholder="Añade una tarea"
						value={inputValue}
						onChange={handleInputValue}
						onKeyDown={handleSubmit}
					/>
				</li>
				{!todos ? <li className="list-group-item">No hay tareas pendientes</li> : ""}

				{todos && todos.map((item, index) => (
					<li className="list-group-item text-start" key={index}>
						<span className="me-2 badge text-bg-secondary" onClick={() => { handleOnClick(item.id) }}>X</span>
						{item.label}
					</li>
				))}

			</ul>
			{todos ? <p>Tareas pendientes:  {todos.length}</p> : ""}

		</div >
	);
};

export default Home;