import React from "react";
import { Switch } from "react-router-dom";

import PrivateRouter from "../privateRouter/index"; //私有组件
import FileComponent from "./components";

class ContainerMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Switch>
				{FileComponent.map((item) => {
					return (
						<PrivateRouter
							exact
							key={item.path}
							path={item.path}
							component={item.component}
						/>
					);
				})}
			</Switch>
		);
	}
}

export default ContainerMain;
