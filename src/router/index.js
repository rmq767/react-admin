const router = [
	{
		title: "控制台",
		icon: "index",
		key: "/index",
	},
	{
		title: "用户管理",
		icon: "laptop",
		key: "/index/user",
		child: [
			{ key: "/index/user/list", title: "用户列表", icon: "" },
			{
				key: "/index/user/add",
				title: "添加用户",
				icon: "",
			},
		],
	},
	{
		title: "部门管理",
		icon: "bars",
		key: "/index/department",
		child: [
			{ key: "/index/department/list", title: "部门列表", icon: "" },
			{
				key: "/index/department/add",
				title: "添加部门",
				icon: "",
			},
		],
	},
	{
		title: "职位管理",
		icon: "edit",
		key: "/home/entry",
		child: [
			{ key: "/home/entry/basic-form", title: "职位列表", icon: "" },
			{ key: "/home/entry/step-form", title: "添加职位", icon: "" },
		],
	},
	{
		title: "请假",
		icon: "info-icon-o",
		key: "/home/about1",
	},
	{
		title: "加班",
		icon: "info-icon-o",
		key: "/home/about",
	},
];

export default router;
