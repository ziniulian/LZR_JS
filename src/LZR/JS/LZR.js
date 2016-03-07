/*************************************************
作者：子牛连
类名：LZR
说明：
创建日期：15-二月-2016 17:09:26
版本号：1.0
*************************************************/

LZR = function (obj) {
	if (obj && obj.super_) {
		this.init_();
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

// Ajax 形式加载文本
LZR.loadByAjax = function (path/*as:string*/) {
	path = this.curPath + path;

	if (this.spAjax === null) {
		try{
			this.spAjax = new XMLHttpRequest();
		} catch (MSIEx) {
			var activeX = [ "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
			for (var i=0; i < activeX.length; i++) {
				try {
					this.spAjax = new ActiveXObject( activeX[i] );
				} catch (e) {}
			}
		}
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

// 构造器
LZR.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		this.setObj (this, obj);
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
			this.afterLoad[self] = undefined;
			delete this.afterLoad[self];
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
							this.existedClasses[cn] = txt;
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

// 闭包调用
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

// 复制一个对象
LZR.clone = function (src/*as:Object*/, tag/*as:Object*/, objDep/*as:boolean*/, aryDep/*as:boolean*/)/*as:Object*/ {
	var s;
	switch ( this.getClassName(src) ) {
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
			break;
	}
	return tag;
};

// 构造属性
LZR.setObj = function (obj/*as:Object*/, pro/*as:Object*/) {
	for (var s in pro) {
		var t = obj[s];
		if (t !== undefined) {
			var value = pro[s];
			switch (this.exist (t, "className_")) {
				case "LZR.Base.Val":
				case "LZR.Base.Val.Ctrl":
					// 调用值控制器赋值
					t.set (value, false);
					break;
				default:
					// 普通赋值
					obj[s] = value;
					break;
			}
		}
	}
};

// 获取类名
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

// 父类构造器
LZR.initSuper = function (obj/*as:Object*/) {
	for (var i=0; i<obj.super_.length; i++) {
		obj.super_[i].call(obj, {super_: obj.super_[i]});
	}
};

// 判断一个对象的属性是否存在
LZR.exist = function (obj/*as:Object*/, pro/*as:string*/)/*as:Object*/ {
	var ps = pro.split(".");
	for (var i = 0; i<ps.length; i++) {
		if (undefined === obj || null === obj) {
			return undefined;
		}
		obj = obj[ps[i]];
	}
	return obj;
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
