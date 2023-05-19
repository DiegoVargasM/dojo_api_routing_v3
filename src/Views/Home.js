import React from "react";
import { useState, useEffect } from "react";
import { getAllResources } from "../services/getswapi-service";
import axios from "axios";

export const Home = () => {
	// 1. Creamos una variable de estado array para guardar los recursos de la API
	const [resources, setResources] = useState([]);
	// 6. Creamos estado para guardar el ID del input
	const [inputId, setinputId] = useState("");
	// 7. Creamos estado para guardar el valor de la opcion seleccionada
	const [selectedOption, setSelectedOption] = useState("");
	// 8.3 Creamos el estado para guardar la data devuelta por nuestras API dinamicas
	const [data, setData] = useState(null)
	// 2. Definimos una funcion asincrona para traer datos de la API y guardarlos
	const getSwapi = async () => {
		try {
			const swapiData = await getAllResources();
			console.log("copydata", swapiData);
			// el método '.keys' permite extraer la key del "key:value" de un Obj.
			setResources(Object.keys(swapiData.data));
		} catch (error) {
			console.log(error);
		}
	};

	// 3. Hacemos uso del gancho useEffect para llamar a nuestra funcion async
	// solamente cuando se carga la pagina por primera vez.
	// (por eso los [] a final)
	useEffect(() => {
		getSwapi();
	}, []);

	// 6.1 Definimos la funcion para manejar los cambios en el valor del input
	const handleInputChange = (e) => {
		setinputId(e.target.value)
	}
	// 7.1 Definimos la funcion para manejar los cambios en el valor de la opcion seleccionada
	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value)
	}

	// 8. Definimos la funcion de envío de formulario como asíncnrona porque la usaremos para llamar una API
	const handleSubmit = async (e) => {
		e.preventDefault()
		// 8.1 Creamos una variable con el formato de la URL que necesitamos
		const url = `https://swapi.dev/api/${selectedOption}/${inputId}`
		console.log(url)
		try {
			const response = await axios.get(url)
			setData(response.data)
		} catch (error) {
			setData(null)
		}
		console.log(data)
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="dropdown">Search for:</label>
					<select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
						{resources.length > 0 && resources.map((value, index) => (
							/* 4.Capitalizamos la primera letra del desplegable, para que sea más estetico */
							<option key={index} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</option>
						))}
					</select>
				</div>
				<div>
					{/* 5. Creamos input para guardar el id necesario para consultar la API*/}
					<label htmlFor="idInput">Id:</label>
					<input type="text" id="idInput" onChange={handleInputChange} />
				</div>
				<button>Send Request</button>
			</form>
		</div>
	)
};
