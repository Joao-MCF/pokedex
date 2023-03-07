import React from "react"
import useService from "../../Api/api"
import {
  MenuSectionContainer,
  MenuSectionItem,
  PokemonContainer,
  PokemonImg,
  PokemonNameContainer,
  PokemonSection,
  PokemonStatsContainer,
  PokemonXP,
} from "./style"

import pokeball from "../../assets/pokeball.svg"
import Text from "../Form/Text"
import Title from "../Form/Title"
import About from "./About"
import Stats from "./Stats"
import Evolution from "./Evolution"

export interface PokemonLinksProps {
  urlPokemon: string
  urlSpecies: string
}

const Pokemon = ({ urlPokemon, urlSpecies }: PokemonLinksProps) => {
  const { pokemonFull, evolution, getEvolution, getPokemonFull } = useService()
  const [currentPage, setCurrentPage] = React.useState<string>("about")

  const handleChildClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  React.useEffect(() => {
    getPokemonFull(urlPokemon, urlSpecies)
  }, [])

  React.useEffect(() => {
    if (pokemonFull?.evolutionChainURL)
      getEvolution(pokemonFull.evolutionChainURL)
  }, [pokemonFull])

  return (
    <>
      {pokemonFull && (
        <PokemonContainer
          color={pokemonFull?.color}
          src={pokeball}
          onClick={handleChildClick}
        >
          <PokemonSection>
            <PokemonNameContainer>
              <PokemonImg
                src={pokemonFull.imgFull || pokemonFull.imgFullAlternative}
              />
              <Title
                capitalize
                size={14 / Math.sqrt(pokemonFull.name.length)}
                weight={900}
                color={`${pokemonFull.color}-hover`}
              >
                {pokemonFull.name.replaceAll("-", " ")}
              </Title>
            </PokemonNameContainer>
          </PokemonSection>
          <PokemonStatsContainer>
            <MenuSectionContainer>
              <MenuSectionItem
                onClick={() => setCurrentPage("about")}
                active={currentPage === "about" && true}
              >
                About
              </MenuSectionItem>
              <MenuSectionItem
                onClick={() => setCurrentPage("stats")}
                active={currentPage === "stats" && true}
              >
                Stats
              </MenuSectionItem>
              <MenuSectionItem
                onClick={() => setCurrentPage("evolution")}
                active={currentPage === "evolution" && true}
              >
                Evolution
              </MenuSectionItem>
            </MenuSectionContainer>
            {currentPage === "about" && <About pokemon={pokemonFull} />}
            {currentPage === "stats" && (
              <Stats stats={pokemonFull.stats} color={pokemonFull.color} />
            )}
            {currentPage === "evolution" && (
              <Evolution
                evolutions={evolution}
                currentPokemon={pokemonFull.name}
              />
            )}
          </PokemonStatsContainer>
        </PokemonContainer>
      )}
    </>
  )
}

export default Pokemon