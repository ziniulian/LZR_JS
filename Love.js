
/**
 * 通过对一个人的感觉判断是否爱上他的方法
 * @author 子牛连
 * @time 2016-10-8 10:05:17
 * @version 0.0.1
 * @param feel 对一个人的感觉
 * @return
 *	true : 表示 爱
 *	false : 表示 不爱
 */
function isLoveByFeel (feel) {
	switch (feel) {
		case "淡淡的忧伤":
			return true;
		default:
			return false;
	}
}
