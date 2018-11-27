const HOST = "http://localhost:3000";

const ENDPOINTS = {
    HOME: HOST + "/api/getTables",
    ADD_ENTITY: HOST + "/api/addEntity"
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