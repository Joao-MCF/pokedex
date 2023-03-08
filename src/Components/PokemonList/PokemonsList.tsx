import React, { SetStateAction } from "react"

import { PokemonsListContainer } from "./style"

import { PokemonLinksProps } from "../PokemonSpecs/Pokemon"
import { PokemonsProps } from "../../Api/api"

import PokemonCard from "./PokemonCard"

interface PokemonsListProps {
  pokemons: Array<PokemonsProps>
  setLinks: React.Dispatch<SetStateAction<PokemonLinksProps | null>>
  setModal: React.Dispatch<SetStateAction<string | null>>
}

const PokemonsList = ({ pokemons, setLinks, setModal }: PokemonsListProps) => {
  return (
    <PokemonsListContainer>
      {pokemons.map(
        (pokemon) =>
          pokemon && (
            <PokemonCard
              setLinks={setLinks}
              setModal={setModal}
              url={pokemon.url}
              key={pokemon.url}
            />
          )
      )}
    </PokemonsListContainer>
  )
}

export default PokemonsList
