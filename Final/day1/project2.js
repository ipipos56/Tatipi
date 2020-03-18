var __interpretation_started_timestamp__;
pi = 3.141592653589793;
wait = script.wait;
sign = function(n)
{
    return n > 0 ? 1 : n = 0 ? 0 : -1;
}
sqr = function(n)
{
    return n * n;
}
sqrt = Math.sqrt;
min = function(a, b)
{
    return a < b ? a : b;
}
max = function(a, b)
{
    return a > b ? a : b;
}

abs = Math.abs;
sin = Math.sin;
cos = Math.cos;
round = Math.round;
var code;


s = new Array(3);
s[0] = brick.sensor(A2);
s[1] = brick.sensor(D1);
s[2] = brick.sensor(A1);

sz = [0,0,0];

ML = brick.motor(M4).setPower; 
MR = brick.motor(M3).setPower; 
EL = brick.encoder(E4); 
ER = brick.encoder(E3); 

rotCnt = 0;


direction = 0;

x = 0
y = 0;
h = 17;
point = 144;
pointFn = 0;

rot = 1;
iznrot = 1;
map = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
nonplace = [];

fullRot = 0;



var main = function()
{
    __interpretation_started_timestamp__ = Date.now();
	
	//for(var i = 0;i<289;i++)
	//	map[i] = [-1,-1,-1,-1];
	
	//print(map);

    /*var otv = getARTagValue(0);//inp[1]);
	if(otv >= 8)
		y = otv-8;
	else
		x=otv;
	var otv = getARTagValue(1);//inp[1]);
	if(otv >= 8)
		y = otv-8;
	else
		x=otv;
    print(x+" "+y);
	*/
	
	var raw = script.readAll("input.txt");
	var texp = raw[1].split(" ");	
	var teer = raw[0].split(" ");	
	
	rot = parseInt(teer[2],10);
	x = parseInt(texp[0], 10);
	y = parseInt(texp[1], 10);
	pointFn = y * h + y;
	point = parseInt(teer[1],10) * h +  parseInt(teer[0], 10);
	
	print(point);
	print(pointFn);
	
	xmax = 0;
	ymax = 0;
	xmin = 0;
	ymin = 0;
	
	ER.reset()
	EL.reset()
	
	brick.gyroscope().calibrate(4000);
	script.wait(4050);
	moveSmall();
	
	var pa = true;
	var test = false;
	var iter = 0;
	
	
	while(pa)
	{
		valSen();
		pa = false;
		var info = [map[point][0],map[point][1],map[point][2],map[point][3]];
		for(i = 0;i<3;i++)
		{
			print(sz[0]+" "+sz[1]+" "+sz[2]);
			var curre = rot + i - 1;
			curre = cuboid(curre);
			if(sz[i] == 1 && info[curre] == -1)
			{
				test = true;
				pa = true;
				print(point+" "+curre + " " + pointFn);
				if(point == pointFn)
				{
					brick.display().addLabel("finish",1,1); //вывод ответа
					brick.display().redraw();
					script.wait(10000);
					return 0;
				}
				if(i == 0)
				{
					turn_left();
					wait(500);
					forward();
				}
				else if(i == 1)
				{
					forward();
				}
				else if(i == 2)
				{
					turn_right();
					wait(500);
					forward();
				}
				break;
			}
		}
		wait(300);
		if(!test && iter == 0 && !pa)
		{
			pa = true;
			turn_right();
			turn_right();
			test = true;
			print("razv");
		}
		iter++;
	}
	
	newInfo();
	
	
	var pqw = 0;
	while(nonplace.length > 0)
	{
		if(point == pointFn)
		{
			brick.display().addLabel("finish",1,1); //вывод ответа
			brick.display().redraw();
			script.wait(10000);
			return 0;
		}
		pqw = nonplace.pop();
		print(pqw);
		var tt = 0;
		if(map[pqw][0] == -1 || map[pqw][1] == -1 || map[pqw][2] == -1 || map[pqw][3] == -1)
		{
			print("turn into " + point);
			tt = findPath(point,pqw);
		}
		if(tt == 1 && (map[pqw][0] == -1 || map[pqw][1] == -1 || map[pqw][2] == -1 || map[pqw][3] == -1))
		{	
			turn_right();
			newInfo();
		}
	}
	
	//map[151] = [0,0,1,0];
	//map[224] = [0,1,1,0];
	
	print(map);
	
	//print("_________________");
	var pqw = 0;
	var le=1000;
	var ur=1000;
	for(var i = 0;i<289;i++)
	{
		if(map[i][0] != -1 && map[i][1] != -1 && map[i][2] != -1 && map[i][3] != -1)
		{
			print(i);
			//print(Math.floor(i/h));
			var temp = i/h
			if((temp - (temp%1)) < ur)
			{
				print("ur " + i);
				ur = (temp - (temp%1));
			}
			if(i%h < le)
			{
				print("le " + i);
				le = i%h;
			}
		}
	}
	print(ur + " " + le);
	
	pqw = ((ur * h) + le);
	
	
	print(pqw + " " + ((y*h)+x));
	
	findPath(point,((y*h)+x+pqw));
	
    brick.display().addLabel("finish",1,1) //вывод ответа
    brick.display().redraw()
    script.wait(10000)

    return;
}

function valSen()
{
	for(var _i = 0;_i<3;_i++)
	{
		sz[_i] = s[_i].read();
		if(sz[_i] < 50)
			sz[_i] = 0;
		else
			sz[_i] = 1;
	}
	
}


function stop(){
	MR(0)
	ML(0)
	wait(50)
}

function findPath(stPoin,fnPoin)
{
	var q = [];
	var dis = [];
	var par = [];
	for(var _i = 0;_i<289;_i++)
	{
		dis[_i] = 100000;
		par[_i] = [-1,-1];
	}
	q.push(stPoin);
	dis[stPoin] = 0;
	par[stPoin][0] = -1;
	par[stPoin][1] = rot;
	while(q.length > 0)
	{
		var vert = q.pop();
		
		for(var _er = 0;_er<4;_er++)
		{
			var poiDel = 0;
			if(_er == 0)
				poiDel = (-1 * h);
			else if(_er == 1)
				poiDel = 1;
			else if(_er == 2)
				poiDel = h;
			else if(_er == 3)
				poiDel = -1;
			
			var pri = abs(par[vert][1] - _er);
			
			if( pri == 1 || pri == 3)
                pri = 2;
            else if(pri == 2)
                pri = 3;
            else if(pri == 0)
                pri = 1;
			
			//print(vert + " " + (vert + poiDel) +" "+map[vert][i] + " " + dis[vert + poiDel] + " " + pri + " " + par[vert][0]+" "+ par[vert][1]);
				
			if((parseInt(map[vert][_er],10) == 1) && (dis[(vert + poiDel)] > (dis[vert] + pri)))
			{
				par[(vert + poiDel)][0] = vert;
				par[(vert + poiDel)][1] = _er;
				dis[(vert + poiDel)] = dis[vert] + pri;
				q.push(vert + poiDel);
			}
		}
	}
	print(fnPoin);
	if(dis[fnPoin] != 100000)
	{
		var para = fnPoin;
		q.push(para);

		while(par[para][0] != -1)
		{
			para = par[para][0];
			q.push(para);
		}
		
		//print(q.length);

		var previs = q.pop();
		var prib = 0;
		print(previs);

		while(q.length > 0)
		{
			var cur = q.pop();

			print(cur);
			if(abs(dis[cur]-dis[previs]) == 3)
			{
				for(var j = 0;j<2;j++)
				{
					turn_right();
				}
			}
			else if(abs(dis[cur]-dis[previs]) == 2)
			{
				if(rot == 0 || rot == 1)
				{
					if((cur - previs) > 0)
						turn_right();
					else if(cur - previs < 0)
						turn_left();
				}
				else if(rot == 2 || rot == 3)
				{
					if(cur - previs > 0)
						turn_left();
					else if(cur - previs < 0)
						turn_right();
				}
			}
			forward();
			previs = cur;
		}
		newInfo();
		return 1;
	}
	else
	{	
		print("No path");
		return 0;
	}
}

function forward()
{
	newInfo();
		
	ER.reset()
	EL.reset()
	deg = (700/(pi*56))*360;
	if(rot == 0)
		direction = -90;
	else if(rot == 1)
		direction = 0;
	else if(rot == 2)
		direction = 90;
	else if(rot == 3)
		direction = -180;
	while(((EL.read()+ER.read())/2 < deg) && (s[1].read() > 25 ))
	{
		gyro = brick.gyroscope().read()[6]/1000;
		if(rot == 3)
		{
			if(gyro < 0)
				direction = -180;
			else 
				direction = 180;
		}
		err = direction - gyro;
		ML(100+(err*1))
		MR(100-(err*1))
		wait(2);
	}
	stop();
	
	if(rot == 0)
		point-=h;
	else if(rot == 1)
		point+=1;
	else if(rot == 2)
		point+=h;
	else if(rot == 3)
		point-=1;
	
	//newInfo();
}

function turn_left() {
	
	newInfo();
	
	ER.reset()
	EL.reset()

	deg = (174/56)*90
	//deg = 280
	ML(-100)
	MR(100)
	while(abs(ER.read()) < deg)
		wait(2);

	stop();

	rot-=1;
	rot = cuboid(rot);
}

function turn_right() 
{
	newInfo();
	
	ER.reset()
	EL.reset()
	
	deg = (174/56)*90;
	ML(100);
	MR(-100);
	while(abs(EL.read()) < deg) 
		wait(2);
	
	stop();
	
	rot+=1;
	rot = cuboid(rot);
}

function newInfo()
{
	valSen();
	//print(sz[0]+" "+sz[1]+" "+sz[2]);
	for(var _i = 0;_i < 3;_i++)
	{
		var curre = (rot + _i - 1);
		//print(curre);
		curre = cuboid(curre);
		map[point][curre] = sz[_i];
		if(curre == 0)
		{
			if(map[(point - h)][2] == -1 && sz[_i] == 1)
			{
				map[(point - h)][2] = sz[_i];
				nonplace.push(point-h);
			}
		}
		else if(curre == 1)
		{
			if(map[(point + 1)][3] == -1 && sz[_i] == 1)
			{
				map[(point + 1)][3] = sz[_i];
				nonplace.push(point+1);
			}
		}
		else if(curre == 2)
		{
			if(map[(point+ h)][0] == -1 && sz[_i] == 1)
			{
				map[(point + h)][0] = sz[_i];
				nonplace.push(point+h);
			}
		}
		else if(curre == 3)
		{
			if(map[(point - 1)][1] == -1 && sz[_i] == 1)
			{
				map[(point - 1)][1] = sz[_i];
				nonplace.push(point-1);
			}
		}
		//print(map[pr]);
	}
}



function moveSmall()
{
	ER.reset();
	EL.reset();
	deg = (88/(pi*56))*360;

	while((EL.read()+ER.read())/2 < deg)
	{
		err =  brick.gyroscope().read()[6]/1000 - fullRot;
		ML(50-err*0.5);
		MR(50+err*0.5);
		script.wait(1);
	}
	stop();
}

function cuboid(_a)
{
	if(_a > 3)
		return _a-4;
	if(_a < 0)
		return _a+4;
	return _a;
}