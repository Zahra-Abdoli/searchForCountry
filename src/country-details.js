import React, { useState } from "react";
import {
  OutlinedInput,
  Button,
  InputAdornment,
  Box,
  Divider,
  ListItemAvatar,
  ListItemText,
  ListItem,
  List,
  Avatar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalculateIcon from "@mui/icons-material/Calculate";
import PublicIcon from "@mui/icons-material/Public";
function Details({ country }) {
  //just for demo purpose key is not hidden
  const access_key = "717eca2b015575285a6defb02386626c";
  const [amount, setAmount] = useState(0);
  const [amountInSelectedCurrency, setAmountInSelectedCurrency] = useState(0);
  const currency = Object.keys(country.currencies)[0];
  const onSubmit = async () => {
    const fetchedRates = await (
      await fetch(`http://data.fixer.io/api/latest?access_key=${access_key}`)
    ).json();
    const euro = amount / fetchedRates.rates["SEK"];
    setAmountInSelectedCurrency(
      (euro * fetchedRates.rates[currency]).toFixed(2)
    );
  };

  return (
    <List
      sx={{
        boxShadow: " 0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PublicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={country.name?.common}
          secondary="name of country"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PeopleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={country.population} secondary="population" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LocationCityIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={country.capital} secondary="capital" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CurrencyExchangeIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText primary={currency} secondary="currency" />
      </ListItem>

      <ListItem>
        <Box>
          <OutlinedInput
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            endAdornment={<InputAdornment position="end">SEK</InputAdornment>}
          />
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ marginLeft: "10px" }}
          >
            confirm
          </Button>
        </Box>
      </ListItem>
      <Divider variant="inset" component="li" />

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CalculateIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={amountInSelectedCurrency}
          secondary="amount in country's currency"
        />
      </ListItem>
    </List>
  );
}
export { Details };
