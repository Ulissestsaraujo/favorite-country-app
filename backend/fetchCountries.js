const fetch = require("node-fetch");

async function fetchCountries() {
  const query = `
    {
      countries {
        edges {
          node {
            id
            name
            capital
            population
            flag
          }
        }
      }
    }
  `;

  const response = await fetch("https://graphql.country/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData.data.countries.edges.map((edge) => edge.node);
}

async function fetchCountryById(countryId) {
  const query = `
    query Country($id: ID!) {
      country(id: $id) {
        id
        name
        capital
        population
        flag
      }
    }
  `;

  const variables = { id: countryId };

  const response = await fetch("https://graphql.country/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData.data.country;
}

module.exports = { fetchCountries, fetchCountryById };
