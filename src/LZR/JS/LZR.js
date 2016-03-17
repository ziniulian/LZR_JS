/*************************************************
作者：子牛连
类名：LZR
说明：
创建日期：11-三月-2016 13:37:40
版本号：1.0
*************************************************/

LZR = function (obj) {
	if (obj && obj.super_) {
		obj.super_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.prototype.className_ = "LZR";
LZR.prototype.version_ = "1.0";

// 库所在的当前路径
LZR.curPath = "/myLib";	/*as:string*/

// 已存在的类集合
LZR.existedClasses = {};	/*as:Object*/

// 已存在类集合的存储方式
LZR.ecTyp = 0;	/*as:int*/

// 加载方式
LZR.loadTyp = 0;	/*as:int*/

// 用于同步加载其它类的简易 Ajax 对象
LZR.spAjax = null;	/*as:Object*/

// 延后加载内容
LZR.afterLoad = {};	/*as:Object*/

// 单件对象集合
LZR.singletons = {
	nodejsTools:{}
};	/*as:Object*/

// 构造器
LZR.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.setObj (this, obj);
		this.hdObj_(obj);
	}
};

// 对构造参数的特殊处理
LZR.prototype.hdObj_ = function (obj/*as:Object*/) {
	
};

// 获得一个ajax对象
LZR.getAjax = function ()/*as:Object*/ {
	var xmlHttp = null;
	try{
		xmlHttp = new XMLHttpRequest();
	} catch (MSIEx) {
		var activeX = [ "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
		for (var i=0; i < activeX.length; i++) {
			try {
				xmlHttp = new ActiveXObject( activeX[i] );
			} catch (e) {}
		}
	}
	return xmlHttp;
};

// Ajax 形式加载文本
LZR.loadByAjax = function (path/*as:string*/) {
	path = this.curPath + path;

	if (this.spAjax === null) {
		this.spAjax = this.getAjax();
		if (this.spAjax === null) {
			this.spAjax = "null";
			return null;
		} else {
			this.spAjax.LZR_domHead_ = document.getElementsByTagName("HEAD").item(0);
		}
	} else if (this.spAjax === "null") {
		return null;
	}

	//采用同步加载
	this.spAjax.open("GET", path, false);

	//发送同步请求
	this.spAjax.send(null);

	//4代表数据发送完毕
	if ( this.spAjax.readyState == 4 ) {
		//0为访问的本地，200到300代表访问服务器成功，304代表没做修改访问的是缓存
		if((this.spAjax.status >= 200 && this.spAjax.status <300) || this.spAjax.status === 0 || this.spAjax.status == 304) {
// console.log (path);
			return this.spAjax.responseText;
		}
	}
	return null;
};

// Node.js 形式加载文本
LZR.loadByNode = function (uri/*as:string*/) {
	if (uri) {
		var nfs = this.getSingleton (null, null, "fs");
		var npt = this.getSingleton (null, null, "path");
// console.log (uri);
		var filePath = npt.join(this.curPath, uri);
// console.log (filePath);
		try {
			return nfs.readFileSync(filePath, "utf8");
		} catch (e) {
// console.log (e);
			return null;
		}
	} else {
		return null;
	}
};

// 加载文本
LZR.loadTxt = function (path/*as:string*/) {
	var txt;
	switch (this.loadTyp) {
		case 0:	// Ajax
			txt = this.loadByAjax (path);
			break;
		case 1:	// Node.js
			txt = this.loadByNode (path);
			break;
	}
	return txt;
};

// 加载js
LZR.loadToJs = function (txt/*as:string*/) {
	switch (this.loadTyp) {
		case 0:	// Ajax
			window.eval(txt);
			break;
		case 1:	// Node.js
			eval(txt);
			break;
	}
};

// 加载css样式
LZR.loadToCss = function (txt/*as:string*/) {
	var myJs = document.createElement( "style" );
	txt = txt.replace(/@LZR_CssPath/g, this.curPath + "/css");
	try{
		//IE8以及以下不支持这种方式，需要通过text属性来设置
		myJs.appendChild(document.createTextNode(txt));
	} catch (ex){
		myJs.text = txt;
	}
	this.spAjax.LZR_domHead_.appendChild( myJs );
};

// 加载其它类
LZR.load = function (clsName/*as:Array*/, self/*as:string*/) {
	var name, i, k, front = [];
	if (self) {
		if (clsName) {
			i = self + ".";
			this.afterLoad[self] = [];
			for (k = 0; k<clsName.length; k++) {
				name = clsName[k];
				if (name.match(i) === null) {
					front.push(name);
				} else {
					this.afterLoad[self].push(name);
				}
			}
		} else {
			this.load(this.afterLoad[self]);
			this.del(this.afterLoad, self);
			return;
		}
	} else {
		if (clsName) {
			front = clsName;
		} else {
			return;
		}
	}

	for (k = 0; k<front.length; k++) {
		name = front[k];
		if (this.existedClasses[name] === undefined) {
			var txt;
			if (name[0] == "/") {
				// 后缀名检查
				var file, suffix = name.lastIndexOf(".");
				if (suffix) {
					file = name.lastIndexOf("/") + 1;
					file = name.substring(file, suffix);
					suffix = name.substring(suffix + 1);
					switch (suffix) {
						case "css":
							break;
						case "js":
							try {
								file = eval(file);
								if (file !== null) {
									switch (typeof(file)) {
										case "object":
										case "function":
											// this.existedClasses[name] = file;
											this.existedClasses[name] = true;
											file = -1;
											break;
									}
								}
							} catch (e) {}
							break;
						default:
							break;
					}
					if (file === -1) {
						continue;
					}
				} else {
					continue;
				}

				txt = this.loadTxt (name);
				if (txt) {
					this.existedClasses[name] = true;
					switch (suffix) {
						case "css":
							this.loadToCss(txt);
							break;
						default:
							this.loadToJs(txt);
							break;
					}
				}
			} else {
				var cn="", path = "", cns = name.split(".");
				for (i=0; i<cns.length; i++) {
					path += "/" + cns[i];
					if (i === 0) {
						cn = cns[i];
					} else {
						cn += "." + cns[i];
					}
					if (this.existedClasses[path + ".js"] === undefined) {
						txt = this.loadTxt (path + ".js");
						if (txt) {
							this.existedClasses[path + ".js"] = true;
							if (cn != "LZR") {
								this.loadToJs(txt);
							}
							switch (this.ecTyp) {
								case 1:
									this.existedClasses[cn] = txt;
									break;
								default:
									this.existedClasses[cn] = true;
									break;
							}
						}
					} else if (this.existedClasses[cn] === undefined) {
						// this.existedClasses[cn] = eval(cn);
						this.existedClasses[cn] = true;
					}
				}
			}
		}
	}
};

// 父类构造器
LZR.initSuper = function (obj/*as:Object*/) {
	for (var i=0; i<obj.super_.length; i++) {
		obj.super_[i].call(obj, {super_: obj.super_[i]});
	}
};

// 构造属性
LZR.setObj = function (obj/*as:Object*/, pro/*as:Object*/) {
	for (var s in pro) {
		var t = obj[s];
		if (t !== undefined) {
			var value = pro[s];
			switch (this.getClassName (t)) {
				case "LZR.Base.Val":
				case "LZR.Base.Val.Ctrl":
					switch (this.getClassName(value)) {
						case "LZR.Base.Val":
						case "LZR.Base.Val.Ctrl":
							obj[s] = value;
							break;
						default:
							// 调用值控制器赋值
							t.set (value, false);
							break;
					}
					break;
				default:
					// 普通赋值
					obj[s] = value;
					break;
			}
		}
	}
};

// 获取一个单件对象
LZR.getSingleton = function (cls/*as:fun*/, obj/*as:Object*/, nodejsClassName/*as:string*/)/*as:Object*/ {
	var o;
	if (nodejsClassName) {
		o = LZR.singletons.nodejsTools[nodejsClassName];
		if (!o) {
			o = require(nodejsClassName);
			LZR.singletons.nodejsTools[nodejsClassName] = o;
		}
	} else {
		o = LZR.singletons[cls.prototype.className_];
		if (!o) {
			o = new cls(obj);
			LZR.singletons[o.className_] = o;
		}
	}
	return o;
};

// 复制一个对象
LZR.clone = function (src/*as:Object*/, tag/*as:Object*/, objDep/*as:boolean*/, aryDep/*as:boolean*/)/*as:Object*/ {
	var s = this.getClassName(src);
	switch ( s ) {
		case "number":
		case "string":
		case "boolean":
		case "function":
		case "null":
		case "undefined":
			tag = src;
			break;
		case "Date":
			tag = new Date(src.valueOf());
			break;
		case "Array":
			// 普通数组克隆
			if (tag === null || tag === undefined) {
				tag = [];
			}
			for (s in src) {
				if (aryDep) {
					tag[s] = this.clone (src[s], tag[s], objDep, aryDep);
				} else {
					tag[s] = src[s];
				}
			}
			break;
		default:
			if (s.indexOf("LZR.") === 0 && src !== src.constructor.prototype) {
				// new 对象克隆
				if (src.clone) {
					// 有特殊克隆方法的对象克隆
					tag = src.clone(tag);
				} else {
					var p = src.constructor.prototype;
					var obj = {};
					for (s in src) {
						if (p[s] !== undefined) {
							if (tag) {
								// 深度克隆
								if (tag[s]) {
									// 不需要深度克隆的特定属性
									obj[s] = tag[s];
								} else {
									obj[s] = this.clone(src[s], true);
								}
							} else {
								obj[s] = src[s];
							}
						}
					}
					tag = new src.constructor (obj);
				}
			} else {
				// 普通对象克隆
				if (tag === null || tag === undefined) {
					tag = {};
				}
				for (s in src) {
					if (objDep) {
						tag[s] = this.clone (src[s], tag[s], objDep, aryDep);
					} else {
						tag[s] = src[s];
					}
				}
			}
			break;
	}
	return tag;
};

// 获取类名
LZR.getClassName = function (obj/*as:Object*/)/*as:string*/ {
	if (null === obj)  return "null";

	var type = typeof obj;
	if (type != "object")  return type;

	// 自定义类属性
	type = obj.className_;
	if (type) {
		// if (type.indexOf("LZR.") === 0) {
			return type;
		// }
	}

	// Dom类型
	var c = Object.prototype.toString.apply ( obj );
	c = c.substring( 8, c.length-1 );

	// 其它类型
	if ( c == "Object" ) {
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

// 删除一个对象的属性
LZR.del = function (obj/*as:Object*/, proName/*as:string*/) {
	var note;
	// obj[proName] = undefined;
	delete obj[proName];
};
