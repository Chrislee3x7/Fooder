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
    
    const value = await SecureStore.getItemAsync('user');
    const user = JSON.parse(value);
    
    // update user's roomCode
    if (user == null) {
      console.error("unable to get user")
      return false;
    }
    return this.joinRoom(res.data.code);
  }

  async joinRoom(roomCode) {
    try {
      const value = await SecureStore.getItemAsync('user');
      const user = JSON.parse(value);
      if (user !== null) {
        // We have data!!
      }
      user.roomCode = roomCode
      // save user with roomCode
      try {
        // console.log(user);
        await SecureStore.setItemAsync("user", JSON.stringify(user));
        const roomCode = user.roomCode
        const userId = user._id
        const res = await axios.post(`${API_URL}/room/join`, { roomCode: roomCode, userId: userId });
        if (res.status == 200) {
          console.log("joined room successfully", roomCode);
          return roomCode;
        } else {
          console.error("couldnt join room")
          return null;
        }
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
    return axios.get(`${API_URL}/room/${roomCode}`,)
  }

  async leaveRoom(roomCode) {
    const userId = JSON.parse(await SecureStore.getItemAsync("user"))._id;
    const res = await axios.post(`${API_URL}/room/leave`, {roomCode, userId});
    console.log(res.data)
    return res;
  }

  async closeRoom(roomCode) {
    console.log("CLOSING ROOM")
    const res = await axios.delete(`${API_URL}/room/close`, {
      data: {
        roomCode: roomCode
      },
      headers: {}
    });
    console.log("room closed")
    return res;
  }

  async saveAnswer(questionId, answer) {
    await SecureStore.setItemAsync(questionId, answer);
  }

  async getAnswer(questionId) {
    return await SecureStore.getItemAsync(questionId);
  }

  async getRestaurants(location, distance, price) {
    console.log("location in get res", location);
    console.log(price);
    const obj = {
      longitude: location.coords.longitude, 
      latitude: location.coords.latitude, 
      radius: distance, 
      price: price
    };
    return await axios.post(`${API_URL}/yelp/restaurants`, 
      {
        longitude: location.coords.longitude, 
        latitude: location.coords.latitude, 
        radius: distance, 
        prices: price
      }); 
  }

  async getGptQuestions(businessIds) {
    console.log(businessIds);
    return await axios.post(`${API_URL}/gpt/question`, {businessIds});
  }

  async getGptResult(answers, userPrompt, assistantPrompt) {
    return await axios.post(`${API_URL}/gpt/answer`, { answers, userPrompt, assistantPrompt })
  }

  async finishedRoom(restaurants) {
    const {userId, roomCode} = await this.getUserFromStorage();
    return await axios.post(`${API_URL}/room/finish`, { roomCode, userId, restaurants })
  }

  async getUserFromStorage() {
    return { userId, roomCode } = JSON.parse(await SecureStore.getItemAsync("user"));
  }
}

export default new UserService();