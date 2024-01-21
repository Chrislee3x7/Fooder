import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
// import { API_URL } from 'react-native-dotenv';

API_URL = "https://fooder-rl87.onrender.com/api";

class UserService {
  
  async createUser(username) {
    const user = await axios.post(`${API_URL}/user/create`, { username });
    console.log(user.data.username, user.data._id, user.data.roomCode);
    if (!user) {
      console.error('User not created');
      return;
    }
    try {
      // console.log(user);
      await SecureStore.setItemAsync("user", JSON.stringify(user.data));
      return true;
    } catch (error) {
      console.error("couldnt save data :(");
      return false;
      // Error saving data
    }
  }

  async createRoom() {
    // create room
    const res = await axios.post(`${API_URL}/room/create`);
    console.log(res.data);
    const value = await SecureStore.getItemAsync('user');
    const user = JSON.parse(value);
    
    // update user's roomCode
    if (user == null) {
      console.error("unable to get user")
      return false
    }

    user.roomCode = res.data.roomCode;
    console.log(user, "NEW USER NEW CODE");
    try {
      // console.log(user);
      await SecureStore.setItemAsync("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("couldnt save data :(((((", error);
      return false;
    }
    // join creator of room
    await this.joinRoom()
  }

  async joinRoom() {
    try {
      const value = await SecureStore.getItemAsync('user');
      const user = JSON.parse(value);
      if (user !== null) {
        // We have data!!
        console.log(user);
      }
      const roomCode = user.roomCode
      const userId = user._id
      console.log(await axios.post(`${API_URL}/room/join`, { roomCode: roomCode, userId: userId }));
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