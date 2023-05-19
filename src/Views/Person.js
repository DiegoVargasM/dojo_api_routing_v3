import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Person = () => {
    // 12. obtenemos el parametro "id" de la URL usando useParams
    const { id } = useParams();

    // 13. variable de estado para almacenar datos de persona
    const [person, setPerson] = useState(null);

    // 15. Agregamos variable de carga de datos (?)
    const [loading, setLoading] = useState(true);

    // 14. realizamos la solicitud cada que cambie el id con useEffect
    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${id}`)
                setPerson(response.data)
                /* Si se consigue cambiar el estado de loading */
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPerson()
    }, [id])

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{person.name}</h2>
            {Object.entries(person).map(([key, value]) => (
                <div key={key}>
                    <p>
                        <strong>{key}:</strong> {value}
                    </p>
                </div>
            ))}
        </div>
    );
}
