var g_base_pad_type = true;
var g_base_pad_string = '0';


function base_isArr(a)
{
	return typeof a == "object" && a.constructor === Array;
}

function base_isUndefined(a)
{
	return typeof a == "undefined";
}

function base_padding(string,length,pad_string,pad_type)
{
	if (typeof pad_type == "undefined") 
	{
		pad_type = g_base_pad_type;
	}
	if (typeof pad_string == "undefined") 
	{
		pad_string = g_base_pad_string;
	}
	var pad = new Array( length + 1 ).join( pad_string );
	string = string + "";
	if (pad_type) 
	{
		return pad.substring(0, pad.length - string.length) + string;
	}
	else
	{
		return string + pad.substring(0, pad.length - string.length);
	}	
}

//返回 [min,max]
function base_random(min,max)
{
	/**
		var hash={}
		for(i=0;i<10000;i++)
		{
			var a=base_random(5,10);
			if(a in hash)
			{
				hash[a]++;
			}else{
				hash[a] = 0;
			}
		}
		console.log(hash)

	*/
	return Math.ceil(Math.random() * (max - min + 1)) + min - 1;
}

function base_arr_del(arr,i)
{
	/**
	a=[1,2,3,4,5]
	base_arr_del(a,1)
	*/
	arr.splice(i,1);
}

function base_gen(len,repeat,min,max)
{
	min = min || 10;
	max = max || 99;
	var a;
	if(!repeat)
	{
		if (max - min < len) {
			console.log('可选数据不够');
			return [];
		}
	}
	if (len < 1) {
		console.log('len长度:'+len);
		return [];
	}
	var ret = [];

	if(repeat)
	{
		while(len)
		{
			a = base_random(min,max);
			ret.push(a);
			len--;
		}
		return ret;
	}


	//如果数据稀疏
	if (max - max > 2 * len) 
	{
		var hash = {};
		while(len)
		{
			a = base_random(min,max);
			if (!(a in hash)) 
			{
				ret.push(a);
				hash[a] = 1;
				len--;
			}
		}
	}
	else
	{
		var hash = [];
		for(var i=min;i<max;i++)
		{
			hash.push(i);
		}
		while(len)
		{
			a = base_random(0,hash.length-1);
			ret.push(hash[a]);
			base_arr_del(hash,a);
			len--;
		}
	}
	return ret;
}

function base_gen_det(len,repeat,min,max)
{
	var ret = [];
	for(var i=0;i<len;i++)
	{
		ret.push(base_gen(len,repeat,min,max));
	}
	return ret;
}

function base_print_det(det,len,line)
{
	if (!base_isArr(det)) {
		console.log("det 不是数组");
		return;
	}
	if (det.length && !base_isArr(det[0])) {
		console.log("det 不是数组");
		return;
	}
	if (typeof len == "undefined") 
	{
		len = 0;
	}
	if (typeof line == "undefined") 
	{
		line = "<br>";
	}
	var out = [];
	for(var i=0;i<det.length;i++)
	{
		for(var j=0;j<det[i].length;j++)
		{
			if(len)
			{
				out.push(base_padding(det[i][j],len));
			}
			else
			{
				out.push(det[i][j]);
			}
			out.push(" ");
		}
		out.push(line);
	}
	console.log(out.join("").replace(/<br>/g,"\n"));
	return out.join("");
}