// Reads the logged-in user's token from localStorage (or null if logged out)
export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
};

export const getUserEmail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.email : null;
};
