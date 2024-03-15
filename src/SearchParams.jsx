import { useContext, useEffect, useState, useTransition } from "react";
// import useBreedList from "./useBreedList";
import Results from "./Result";
import useBreedListReactQuery from "./useBreedListReactQuery";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSerch";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  // const breeds = useBreedList(animal);
  const breeds = useBreedListReactQuery(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [isPending, startTransition] = useTransition();

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          startTransition(() => {
            setRequestParams(obj);
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt="" />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="Location"
            name="location"
            type="text"
            className="search-input"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            className="search-input grayed-out-disable"
            id="breed"
            name="breed"
          >
            <option />
            {breeds[0].map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">###</h2>
          </div>
        ) : (
          <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
            Submit
          </button>
        )}
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
