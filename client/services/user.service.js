import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

API_URL = "https://fooder-rl87.onrender.com/api";
// API_URL = "https://localhost:5000/api";

class UserService {
  
  async createUser(username) {
    let user;
    try {
      const res = await axios.post(`${API_URL}/user/create`, { username });
      user = res.data
    } catch (error) {
      console.log(error);
    }
    // console.log(user)
    console.log(user.username, user._id, user.roomCode);
    if (!user) {
      console.error('User not created');
      return;
    }
    try {
      // console.log(user);
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("couldnt save data :( HERE");
      return false;
      // Error saving data
    }
  }

  async createRoom() {
    // create room
    const res = await axios.post(`${API_URL}/room/create`);
    console.log("!!!! DATA", res.data)
    
    const value = await SecureStore.getItemAsync('user');
    const user = JSON.parse(value);
    
    // update user's roomCode
    if (user == null) {
      console.error("unable to get user")
      return false;
    }
    this.joinRoom(res.data.code);
  }

  async joinRoom(roomCode) {
    try {
      const value = await SecureStore.getItemAsync('user');
      const user = JSON.parse(value);
      console.log(user)
      if (user !== null) {
        // We have data!!
        console.log(user);
      }
      user.roomCode = roomCode
      console.log(user);
      // save user with roomCode
      try {
        // console.log(user);
        await SecureStore.setItemAsync("user", JSON.stringify(user));
        const roomCode = user.roomCode
        const userId = user._id
        const res = await axios.post(`${API_URL}/room/join`, { roomCode: roomCode, userId: userId });
      } catch (error) {
        console.error("couldnt save data :(((((", error);
        return false;
      }
      // try to join the room
      
    } catch (error) {
      console.error("couldnt retrieve data :(", error);
      // Error retrieving data
    }
  }

  async getRoom(roomCode) {
    return axios.post(`${API_URL}/rooms`, { roomCode })
  }

  async saveAnswer(questionId, answer) {
    await SecureStore.setItemAsync(questionId, answer);
  }

  async getAnswer(questionId) {
    return await SecureStore.getItemAsync(questionId);
  }
}

export default new UserService();