if(typeof base_isArr == "undefined")
{
	alert("require base js");
}

function det_check(det)
{
	if(!base_isArr(det))
	{
		console.log("det is not a array");
		return false;
	}
	if(det.length ==0)
	{
		console.log("det is empty");
		return false;
	}
	if(det.length == 1)
	{
		return !base_isArr(det[0]);
	}
	if(!base_isArr(det[0]))
	{
		console.log("det is not a determinant");
		return false;
	}
	var m = det.length;
	var j;
	for(var i=0;i<m;i++)
	{
		if(!base_isArr(det[i]))
		{
			console.log("row index:"+i+" is not a array");
			return false;
		}
		j = det[i].length;
		if(j != m)
		{
			console.log("row index:"+i+" length("+j+") is not equals to rows:"+m);
			return false;
		}
	}
	return true;	
}

function det_sub(det,a,b,check)
{
	if(check)
	{
		if(!det_check(det))
			return [];
	}
	var ret=[];
	for(var i=0;i<det.length;i++)
	{
		if(i==a)continue;
		var r=[];
		for(var j=0;j<det[i].length;j++)
		{
			if(j==b)continue;
			r.push(det[i][j]);
		}
		ret.push(r);
	}
	return ret;
}

function det_get_val(det)
{
	if(!det_check(det))
		return;
	var n = det.length;
	if(n == 1)return n[0];	
	else if(n == 2)
	{
		return det[0][0] * det[1][1] - det[0][1] * det[1][0];
	}
	else
	{
		var r = 0;
		for(var i=0;i<n;i++)
		{
			r = r + (i % 2 == 0 ? 1 : -1) * det[0][i] * det_get_val(det_sub(det,0,i));
		}
		return r;
	}
}