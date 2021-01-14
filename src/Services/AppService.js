const API_ROOT = "https://todoisnt-api.herokuapp.com/";

async function client(path, method, { body, user } = {}) {
  const endpoint = `${API_ROOT}${path}`;

  const headers = { "Content-Type": "application/json" };

  const config = {
    method: `${method}`,
    headers: {
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  if (user) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${user.token}`,
    };
  }

  let responseData;

  try {
    const response = await fetch(endpoint, config);
    responseData = await response.json();

    if (responseData) {
      if (response.ok) {
        return { data: responseData };
      } else {
        return { error: responseData.errors };
      }
    }
  } catch (error) {
    return { error: "Network error" };
  }
}

export { client };
