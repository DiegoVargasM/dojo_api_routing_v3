import React from "react";
import { useState, useEffect } from "react";
import { getAllResources } from "../services/getswapi-service";

export const Home = () => {
	// 1. Creamos una variable de estado array para
	// guardar los recursos de la API
	const [resources, setResources] = useState([]);

	// 2. Definimos una funcion de flecha asincrona para
	// traer los datos de la API y asignarlos a nuestra variable
	const getSwapi = async () => {
		try {
			const swapiData = await getAllResources();
			console.log("copydata", swapiData);
			// el método '.keys' de los objetos, nos permiten extraer solo
			// la key del par key:value de un objeto
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
	});

	return (
		<div>
			<form action="">
				<select name="" id="">
					{resources.length > 0 && resources.map((value, index) => (
						/* Capitalizamos la primera letra del desplegable, para que sea más estetico */
						<option key={index} value={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</option>
					))}
				</select>
			</form>
		</div>
	)
};
