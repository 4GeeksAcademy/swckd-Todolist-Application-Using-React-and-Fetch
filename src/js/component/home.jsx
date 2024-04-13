import React, { useState, useEffect } from "react";

const Home = () => {

	const [todo, setTodo] = useState({});
	const [todos, setTodos] = useState([]);

	const [inputValue, setInputValue] = useState("");

	const handleInputValue = (event) => {
		setInputValue(event.target.value);
		// console.log(inputValue);
	}

	const handleSubmit = (event) => {
		if (event.key === "Enter") {
			postTodo(inputValue);
			// console.log(inputValue);
			setInputValue("");
		}
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

		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://playground.4geeks.com/todo/users/alejandro");
				const data = await response.json();
				setTodos(data.todos);
		
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [todos]);

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
						<span className="me-2 badge text-bg-secondary">X</span>
						{item.label}
					</li>
				))}

			</ul>
			{todos ? <p>Tareas pendientes:  {todos.length}</p> : ""}

		</div >
	);
};

export default Home;