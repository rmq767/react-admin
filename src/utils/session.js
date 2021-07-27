export function setToken(name = "adminToken", value) {
	sessionStorage.setItem(name, value);
}

export function getToken(name = "adminToken") {
	return sessionStorage.getItem(name);
}
