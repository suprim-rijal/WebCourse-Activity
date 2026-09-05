let userArray = [];
let nextId = 1;

function getAll() {
  return userArray;
}

function addOne(userData) {
  // Destructure the properties from the userData object
  const { name, password, username, address, age } = userData;
  
  // Check if any parameter is empty or undefined
  if (!name || !password || !username || !address || !age) {
    return false;
  }

  const newItem = {
    id: nextId++,
    ...userData, // Spread the incoming data directly
  };

  userArray.push(newItem);
  return newItem;
}

function findById(id) {
  const numericId = Number(id);
  const item = userArray.find((item) => item.id === numericId);
  return item || false;
}

function updateOneById(id, updatedData) {
  const user = findById(id);
  if (user) {
    Object.assign(user, updatedData); 
    return user;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = userArray.length;
    userArray = userArray.filter((item) => item.id !== Number(id));
    return userArray.length < initialLength; 
  }
  return false; 
}

// Your test block remains unchanged here...
// ... (if require.main === module) { ... }

module.exports = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};