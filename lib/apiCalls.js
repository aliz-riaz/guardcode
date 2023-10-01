// CV-Search

export const getUsersAccountConfiguration = async (userToken) => {
  const res = await fetch(
    `${process.env.API_URL}employer/additional_features`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
    }
  );
  if (!res.ok) {
    new Error();
  } else {
    const data = await res.json();
    return data.data;
  }
};
