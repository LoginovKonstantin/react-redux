const HOST = "http://localhost:3000";
const S = ["connecting", "success", "error"];

const ENDPOINTS = {
    HOME: HOST + "/api/getTables",
    ADD_ENTITY: HOST + "/api/addEntity",
    UPDATE_ENTITY: HOST + "/api/updateEntity",
    REMOVE_ENTITY: HOST + "/api/removeEntity"
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
    S,
    ENDPOINTS,
    POST_REQUEST,
}