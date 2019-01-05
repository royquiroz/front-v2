import axios from "axios";

const base_url =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://spacio.herokuapp.com/api";

const headers = {
  "Content-Type": "multipart/form-data",
  "x-access-token": localStorage.getItem("token")
};

export const register = auth => {
  return axios
    .post(`${base_url}/auth/register`, auth)
    .then(() => {
      return {
        error: false,
        msg: "Usuario creado con éxito"
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const login = auth => {
  return axios
    .post(`${base_url}/auth/login`, auth)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return {
        error: false,
        msg: "Haz iniciado sesión correctamente"
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const profile = user => {
  let formData;

  if (!user.profile_image) {
    formData = user;
    headers["Content-Type"] = "application/json";
  } else {
    formData = new FormData();
    Object.keys(user).forEach(key => {
      formData.append(key, user[key]);
    });
  }
  console.log(formData);
  return axios
    .patch(`${base_url}/auth/${user._id}`, formData, { headers })
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return {
        error: false,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const places = () => {
  return axios
    .get(`${base_url}/place`)
    .then(res => {
      return res.data.places;
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const newPlace = place => {
  let formData = new FormData();
  if (place.photos) {
    for (let file of place.photos) {
      formData.append("photos", file);
    }
    delete place.photos;
  }
  for (let k in place) {
    formData.append(k, place[k]);
  }

  return axios
    .post(`${base_url}/place`, formData, { headers })
    .then(res => {
      return {
        place: res.data.place,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const place = id => {
  return axios
    .get(`${base_url}/place/${id}`)
    .then(res => {
      return {
        place: res.data.place,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const review = review => {
  return axios
    .post(`${base_url}/review`, review)
    .then(res => {
      return {
        place: res.data.place,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const rent = rent => {
  return axios
    .post(`${base_url}/rent`, rent)
    .then(res => {
      return {
        place: res.data.place,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const sentMessages = id => {
  return axios
    .get(`${base_url}/message/sender/${id}`)
    .then(res => {
      return {
        messages: res.data.messages,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};

export const receivedMessages = id => {
  return axios
    .get(`${base_url}/message/addressee/${id}`)
    .then(res => {
      return {
        messages: res.data.messages,
        msg: res.data.msg
      };
    })
    .catch(err => {
      return {
        error: err.response.status,
        msg: err.response.data.msg
      };
    });
};
