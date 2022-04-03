import { useState } from "react";
import { Typography, Autocomplete, TextField, Box } from "@mui/material";
import { Details } from "./country-details";

function Search() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  const handleChange = async (country) => {
    if (country && country.length > 0) {
      const fetcheCountries = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const data = await fetcheCountries.json();
      setCountries(data.status ? [] : data);
    }
  };

  return (
    <Box
      margin="auto"
      padding="10px"
      maxWidth="600px"
      display="flex"
      flexDirection="column"
    >
      <Autocomplete
        onInputChange={(event, newInputValue) => {
          handleChange(newInputValue);
        }}
        onChange={(event, country) => setSelectedCountry(country)}
        getOptionLabel={(option) => option?.name?.common}
        options={countries}
        renderInput={(params) => (
          <TextField {...params} label="Search country" />
        )}
      />
      <Box padding={5}>
        {selectedCountry ? (
          <Details country={selectedCountry} />
        ) : (
          <Typography variant="h5" color={"blue"} textAlign="center">
            you can see the details as soon as you select a cuontry :)
          </Typography>
        )}
      </Box>
    </Box>
  );
}
export { Search };
