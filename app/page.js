'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    axios("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((res) => {
        const pokemonResults = res.data.results;

        pokemonResults.forEach((pokemon) => {
          axios(pokemon.url)
            .then((res) => {
              setPokemonData((prevData) => [...prevData, res.data]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
         
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12"> 
        {pokemonData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4">
            {pokemonData.map((item, id) => (
              <div
                key={id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <img
                  src={item.sprites.front_default}
                  alt={item.name}
                  className="w-96 h-48 object-cover rounded-t-lg"
                  />
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    Name: {item.name}
                  </p>
                  
                  <p className="text-md text-gray-700 mb-1">
                    Abilities:{" "}
                    {item.abilities.map((ability, index) => (
                      <span key={index}>{ability.ability.name}, </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-4xl font-bold text-gray-700 text-center">
            Loading...
          </h1>
        )}
      </div>
    </>
  );
};

export default Pokemon;
