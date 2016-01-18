LZR.load = function (clsName/*as:Array*/, self/*as:string*/) {};
LZR.bind = function (self/*as:Object*/, fun/*as:fun*/, args/*as:___*/)/*as:fun*/ {
	var arg = Array.prototype.slice.call ( arguments, 2 );
	return function () {
		var i, args = [];
		for ( i=0; i<arg.length; i++ ) {
			args.push ( arg[i] );
		}
		for ( i=0; i<arguments.length; i++ ) {
			args.push ( arguments[i] );
		}
		return fun.apply ( self, args );
	};
};
LZR.clone = function (src/*as:Object*/, tag/*as:Object*/, objDep/*as:boolean*/, aryDep/*as:boolean*/)/*as:Object*/ {
	var s;
	switch ( LZR.getClassName(src) ) {
		case "number":
		case "string":
		case "boolean":
		case "function":
		case "null":
		case "undefined":
			tag = src;
			break;
		case "Array":
			if (tag === null || tag === undefined) {
				tag = [];
			}
			for (s in src) {
				if (aryDep) {
					tag[s] = LZR.clone (src[s], tag[s], objDep, aryDep);
				} else {
					tag[s] = src[s];
				}
			}
			break;
		default:
			if (tag === null || tag === undefined) {
				tag = {};
			}
			for (s in src) {
				if (objDep) {
					tag[s] = LZR.clone (src[s], tag[s], objDep, aryDep);
				} else {
					tag[s] = src[s];
				}
			}
			break;
	}
	return tag;
};
LZR.setObj = function (obj/*as:Object*/, pro/*as:Object*/) {
	for (var s in pro) {
		var t = obj[s];
		if (t !== undefined) {
			var value = pro[s];

			if ( (LZR.getClassName (t) === "LZR.Base.ValCtrl") && (LZR.getClassName (value) !== "LZR.Base.ValCtrl") ) {
				// 调用值控制器赋值
				t.set (value, false);
			} else {
				// 普通赋值
				obj[s] = value;
			}
		}
	}
};
LZR.getClassName = function (obj/*as:Object*/)/*as:string*/ {
	if (null === obj)  return "null";

	var type = typeof obj;
	if (type != "object")  return type;

	var c = Object.prototype.toString.apply ( obj );
	c = c.substring( 8, c.length-1 );

	if ( c == "Object" ) {
		if (obj.className_) return obj.className_;	// 自定义类属性

		var con = obj.constructor;
		if (con == Object) {
			return c;
		}

		if (obj.prototype && "classname" in obj.prototype.constructor && typeof obj.prototype.constructor.classname == "string") {
			return con.prototype.classname;
		}
	}

	return c;
};
LZR.initSuper = function (obj/*as:Object*/) {
	for (var i=0; i<obj.super_.length; i++) {
		obj.super_[i].call(obj, {super_: obj.super_[i]});
	}
};
LZR.exist = function (obj/*as:Object*/, pro/*as:string*/)/*as:Object*/ {
	var ps = pro.split(".");
	for (var i = 0; i<ps.length; i++) {
		obj = obj[ps[i]];
		if (obj === undefined) {
			return null;
		}
	}
	return obj;
};
