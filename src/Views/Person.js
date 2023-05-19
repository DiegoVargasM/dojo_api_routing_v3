import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Person = () => {
    // 12. obtenemos el parametro "id" de la URL usando useParams
    const { id } = useParams();

    // 13. variable de estado para almacenar datos de persona
    const [person, setPerson] = useState(null);

    // 14. realizamos la solicitud cada que cambie el id con useEffect
    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${id}`)
                setPerson(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPerson()
    }, [id])

    return (
        <div>
            <h2>{person.name}</h2>
            {Object.entries(person).map(([key, value]) => (
                <p key={key}>
                    {key}: {value}
                </p>
            ))}
        </div>
    );
}
