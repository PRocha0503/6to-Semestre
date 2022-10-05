import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:8090/api",
	// baseURL: "https://localhost/api",
	withCredentials: true,
});
