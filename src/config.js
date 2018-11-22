const HOST = "http://localhost";
const PORT = "3000";

const ENDPOINTS = {
    HOME: HOST + ":" + PORT + "/api/init_data"
}

const POST_REQUEST = (...params) => ({
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params })
})

export default{
    ENDPOINTS,
    POST_REQUEST
}