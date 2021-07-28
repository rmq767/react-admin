import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./styles/main.scss";
import ProvideRouter from "./components/privateRouter/index"; //私有组件
import Login from "./views/login/index";
import Index from "./views/index/Index";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login}></Route>
				<ProvideRouter path="/index" component={Index}></ProvideRouter>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
