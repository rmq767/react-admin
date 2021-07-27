// 自动化工程
const fileComponent = [];
const files = require.context("../../views/", true, /\.js$/); //(目录，是否查找子级目录，查找指定文件)
files.keys().map((key) => {
	if (key.includes("./index/") || key.includes("./login/")) {
		return false;
	}
	const fileName = key.split(".");
	const path = `/index${fileName[1].toLowerCase()}`;
	const component = files(key).default;
	const fileObj = {};
	fileObj.path = path;
	fileObj.component = component;
	fileComponent.push(fileObj);
	return true;
});

export default fileComponent;
