/*************************************************
作者：子牛连
类名：Str
说明：字符串
创建日期：27-七月-2016 12:30:04
版本号：1.0
*************************************************/

LZR.load([
	"LZR.Base"
], "LZR.Base.Str");
LZR.Base.Str = function (obj) {
	if (obj && obj.lzrGeneralization_) {
		obj.lzrGeneralization_.prototype.init_.call(this);
	} else {
		this.init_(obj);
	}
};
LZR.Base.Str.prototype.className_ = "LZR.Base.Str";
LZR.Base.Str.prototype.version_ = "1.0";

LZR.load(null, "LZR.Base.Str");

// 构造器
LZR.Base.Str.prototype.init_ = function (obj/*as:Object*/) {
	if (obj) {
		LZR.setObj (this, obj);
		this.hdObj_(obj);
	}
};
LZR.Base.Str.prototype.init_.lzrClass_ = LZR.Base.Str;

// 对构造参数的特殊处理
LZR.Base.Str.prototype.hdObj_ = function (obj/*as:Object*/) {

};
LZR.Base.Str.prototype.hdObj_.lzrClass_ = LZR.Base.Str;

// 转固定宽度的字符
LZR.Base.Str.prototype.format = function (s/*as:string*/, width/*as:int*/, subs/*as:string*/)/*as:string*/ {
	var r = s;
	var n = s.length;
	if (width > n) {
		n = width - n;
		for (var i = 0; i < n; i++) {
			r = subs + r;
		}
	}
	return r;
};
LZR.Base.Str.prototype.format.lzrClass_ = LZR.Base.Str;

// 判断字符串是否以start字串开头
LZR.Base.Str.prototype.startWith = function (s/*as:string*/, start/*as:string*/)/*as:boolean*/ {
	var reg = new RegExp("^"+start);
	return reg.test(s);
};
LZR.Base.Str.prototype.startWith.lzrClass_ = LZR.Base.Str;

// 判断字符串是否以end字串结束
LZR.Base.Str.prototype.endWith = function (s/*as:string*/, end/*as:string*/)/*as:boolean*/ {
	var reg = new RegExp(end+"$");
	return reg.test(s);
};
LZR.Base.Str.prototype.endWith.lzrClass_ = LZR.Base.Str;

// 将一个 Unicode 码转换为 UTF-8 码
LZR.Base.Str.prototype.unicode2Utf8 = function (ch/*as:int*/)/*as:Array*/ {
	var h=0;	// 占用的字节数
	var v=0;	// 临时变量
	var mak = 0x3F;	// 最高位可用值域
	var r;

	if (ch < 0x80) {
		r = ch;
	} else {
		r = 0x80;
		while (ch > mak) {
			r = r >> 1 | 0x80;
			mak >>= 1;
			if (h) {
				v = (ch & 0x3F | 0x80) << 8 | v;
			} else {
				v = ch & 0x3F | 0x80;
			}
			ch >>= 6;
			h ++;
		}
		r = (r | ch) << (8 * h) | v;
	}
	// return r;
	h++;
	return [r, h];
};
LZR.Base.Str.prototype.unicode2Utf8.lzrClass_ = LZR.Base.Str;

// 将一个 UTF-8 码转换为 Unicode 码
LZR.Base.Str.prototype.utf82Unicode = function (ch/*as:int*/)/*as:int*/ {
	var r, h, v, mak;

	if (ch < 0x80) {
		r = ch;
	} else {
		h = 0;
		r = 0;
		mak = 0x3F;
		v = ch & 0xFF;
		while (ch > 0 && v < 0xC0) {
			if (h) {
				r = (v & 0x3F) << 6 | r;
			} else {
				r = v & 0x3F;
			}
			h++;
			ch >>= 8;
			mak >>= 1;
			v = ch & 0xFF;
		}
		r = (ch & mak) << (6 * h) | r;
	}

	return r;
};
LZR.Base.Str.prototype.utf82Unicode.lzrClass_ = LZR.Base.Str;

// 通过 UTF-8 的第一个字节判断其所占用的位数
LZR.Base.Str.prototype.getSizeByUtf8Head = function (head/*as:int*/)/*as:int*/ {
	if (head < 0x80) {
		return 1;
	} else if ((head & 0xE0) === 0xC0 ) {
		return 2;
	} else if ((head & 0xF0) === 0xE0) {
		return 3;
	} else if ((head & 0xF8) === 0xF0) {
		return 4;
	} else if ((head & 0xFC) === 0xF8) {
		return 5;
	} else if ((head & 0xFE) === 0xFC) {
		return 6;
	} else if (head === 0xFE) {
		return 7;
	} else {
		return 0;
	}
};
LZR.Base.Str.prototype.getSizeByUtf8Head.lzrClass_ = LZR.Base.Str;

// 将文字 转换为 UTF-8 16进制字串
LZR.Base.Str.prototype.toUtf8Str = function (str/*as:string*/, max/*as:int*/)/*as:string*/ {
	var i, v;
	var h = 0;
	var r = "";
	var len = str.length;
	for (i = 0; i < len; i++) {
		v = this.unicode2Utf8(str.charCodeAt(i));
		if (max) {
			h += v[1];
			if (max < h) {
				// 截断字符串
				h -= v[1];
				break;
			}
		}
		r += v[0].toString(16);
	}
	if (max) {
		// 补位
		for (i = h; i < max; i++) {
			r += "00";
		}
	}
	return r;
};
LZR.Base.Str.prototype.toUtf8Str.lzrClass_ = LZR.Base.Str;

// 将UTF-8 16进制字串 转换为 文字
LZR.Base.Str.prototype.passUtf8Str = function (u8str/*as:string*/)/*as:string*/ {
	var v, s, h, j;
	var i = 0;
	var r = [];
	var len = u8str.length;
	while (i < len) {
		s = u8str[i] + u8str[i+1];
		i += 2;

		h = this.getSizeByUtf8Head (parseInt(s, 16));
		if (h) {
			for (j = 1; j < h; j++) {
				if (u8str[i]) {
					s += u8str[i];
				} else {
					s += "00";
				}

				if (u8str[i+1]) {
					s += u8str[i+1];
				} else {
					s += "00";
				}

				i += 2;
			}
			s = this.utf82Unicode(parseInt(s, 16));
		}

		r.push(s);
	}

	return String.fromCharCode.apply(String, r);
};
LZR.Base.Str.prototype.passUtf8Str.lzrClass_ = LZR.Base.Str;

// 清空字符左边空格
LZR.Base.Str.prototype.ltrim = function (str/*as:string*/)/*as:string*/ {
	return str.replace(/(^\s*)/g, "");
};
LZR.Base.Str.prototype.ltrim.lzrClass_ = LZR.Base.Str;

// 清空字符右边空格
LZR.Base.Str.prototype.rtrim = function (str/*as:string*/)/*as:string*/ {
	return str.replace(/(\s*$)/g, "");
};
LZR.Base.Str.prototype.rtrim.lzrClass_ = LZR.Base.Str;

// 清空字符左右空格
LZR.Base.Str.prototype.trim = function (str/*as:string*/)/*as:string*/ {
	return str.replace(/(^\s*)|(\s*$)/g, "");
};
LZR.Base.Str.prototype.trim.lzrClass_ = LZR.Base.Str;

// 二进制码转16进制字串
LZR.Base.Str.prototype.bytes2Hex = function (bytes/*as:string*/)/*as:string*/ {
    var i, l, o = "", n;
    bytes += "";
    for (i = 0, l = bytes.length; i < l; i++) {
        n = bytes.charCodeAt(i).toString(16);
        o += n.length < 2 ? "0" + n : n;
    }
    return o;
};
LZR.Base.Str.prototype.bytes2Hex.lzrClass_ = LZR.Base.Str;
