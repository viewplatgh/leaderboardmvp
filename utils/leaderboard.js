import fetch from "isomorphic-unfetch";

export const create = async ({ displayName, url }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ displayName })
    });
    if (response.ok) {
      return response.json();
    } else {
      // https://github.com/developit/unfetch#caveats
      let error = new Error(response.statusText);
      error.response = response;
      return Promise.reject(error);
    }
  } catch (error) {
    console.error("Failed to create leaderboard", error);
    throw new Error(error);
  }
};

export const fetchAll = async ({ url }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Failed to fetch all data", error);
    throw new Error(error);
  }
};
