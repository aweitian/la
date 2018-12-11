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
