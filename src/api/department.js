import service from "../utils/request";

// 添加部门
export function DepartmentAddApi(data) {
	return service.request({
		url: "/department/add/",
		method: "post",
		data, //请求为post
		// params:data  //请求为get
	});
}
// 部门列表
export function DepartmentListApi(data) {
	return service.request({
		url: "/department/list/",
		method: "post",
		data, //请求为post
		// params:data  //请求为get
	});
}
// 部门列表删除
export function DepartmentDeleteApi(data) {
	return service.request({
		url: "/department/delete/",
		method: "post",
		data, //请求为post
		// params:data  //请求为get
	});
}
