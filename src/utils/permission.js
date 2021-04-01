import Cookies from 'js-cookie'

const pKey = 'jiujiu_admin_permission'

export function getPermission() {
	return Cookies.get(pKey)
}

export function setPermission(p) {
	return Cookies.set(pKey, p)
}

export function removePermission() {
	return Cookies.remove(pKey)
}

export const PERMISSION_ENUM = {
	ADMIN: 1, //所有权限
	ORDER_SEARCH: 2, //订单查询
	FREIGHT: 3, //物流管理
	ORDER_DELIVER: 4, //订单派单
	PERMISSION: 5, //人员及权限
	ORDER_DELIVER_ALL: 6, //派单总览/分配
	ORDER_DELIVER_ASSIGN: 7, //派单分配(废弃)
	ORDER_DELIVER_CHUKU: 8, //出库单
	ORDER_DELIVER_PRODUCE: 9, //生产派单
	ORDER_DELIVER_PAICHE: 10, //派车
	CUSTOMER: 11 //客户管理
}

Object.freeze(PERMISSION_ENUM)

export function hasPermission(needPermission) {
	//如果不需要权限，直接返回true
	if (!needPermission) {
		return true
	}
	let myPermission = getPermission()
	if (!myPermission) {
		return false
	}
	let myPermissions = myPermission.split(',')
	//不能用forEach，因为forEach是异步的
	for (var i in myPermissions) {
		if (myPermissions[i] == PERMISSION_ENUM.ADMIN) {
			return true
		}
		//只要有一个权限匹配就返回true
		for (var j in needPermission) {
			if (needPermission[j] == myPermissions[i]) {
				return true
			}
		}
	}
	return false
}
