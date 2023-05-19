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


	// 2. Definimos una async arrow func traer datos de la API y guardarlos
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


	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label htmlFor="dropdown">Search for:</label>
					<select id="dropdown" onChange={handleOptionChange}>
						{resources.length > 0 && resources.map((value, index) => (
							/* 4.Capitalizamos la primera letra del desplegable, para que sea más estetico */
							<option key={index} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</option>
						))}
					</select>
				</div>
				<div>
					{/* 5. Creamos input para guardar el id necesario para consultar la API*/}
					<label htmlFor="idInput">Id:</label>
					<input type="number" id="idInput" onChange={handleInputChange} />
				</div>
				<button>Send Request</button>
			</form>
		</div>
	)
};
