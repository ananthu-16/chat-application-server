
//users array to store user data
const users = [];


//adding user details from frontend to array
const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  var ifUserExists = false;
  ifUserExists = users.find((user) => {
    if(name === user.name && room === user.room)
      return true ;
  })

  if(ifUserExists){
    return {error: "username exists!"};
  }
  else{
    const user = {id, name, room};
    users.push(user);
    return user;
  }
};

//removing user from array
const removeUser = (id) => {
  const index = users.findIndex((user) => {
    return user.id === id
  })

  if(index !== -1){
    console.log(users.splice(index,1)[0]);
    return users.splice(index,1)[0];
  }
};

//get user details
const getUser = (id) => {
  console.log(id);
  console.log(users);
  var user = users.find((user) => {
    return user.id === id;
  });
  console.log(user);
  return user;
};

//get user details in specific room
const getUsersInRoom = (room) => {
  return users.filter((user) => {
    return user.room === room;
  });
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
