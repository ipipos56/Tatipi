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
rotCnt = 0;


direction = 0;



ml = brick.motor(M4).setPower; 
mr = brick.motor(M3).setPower; 
el = brick.encoder(E4); 
er = brick.encoder(E3); 
a1=brick.sensor(A1).read;
a2=brick.sensor(A2).read;
a3=brick.sensor(A3).read;
a4=brick.sensor(A4).read;
a5middle=brick.sensor(A5).read;
inverted_section=false;
delay=script.wait
abs=Math.abs


ml(-100)
mr(-100)
delay(400)
ml(0)
mr(0)

rot=1
begin=true
pathminus=0

el.reset()
er.reset()

move_to_x=-3
move_to_y=3

pos_x=

//path_check()
//left()
//forward()
//path_check()

fullRot = 0;


map = new Array(36);
mapPaint = new Array(36);


sz = [0,0,0];


xpos=0;
ypos=0;

xfin=0;
yfin=0;

point = 0;

err=false;
walllen = 6;


//ml(-100)
//mr(-100)
//delay(500)

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();
	
	for(var i = 0;i<36;i++)
	{
		map[i] = [2,2,2,2];
	}
	
	xpos=3
	ypos=0
	rot=1
	iznrot = rot - 1;
	iznrot = cuboid(iznrot);
	xfin=ypos
	yfin=xpos
	point = ypos * walllen + xpos;
	
	print(xpos+" "+ypos+" "+rot+" "+xfin+" "+yfin+"\n")
	valSen();
	newInfo();
	right();
	valSen();
	newInfo();
	check = false;
	while(!check)
	{
		mindvi = 100000;
	minrot = -1;
	for(var i = 0;i<4;i++)
	{
		var ddi = 0;
		ddi = sqrt(sqr(vichX(point) - xfin) + sqr(vichY(point) - yfin))
		if(map[point][i] && ddi < mindvi)
		{
			mindvi = ddi;
			minrot = i;
		}
	}
	if(minrot != rot)
	{
		if(abs(rot - minrot) == 2)
		{
				right();
				right();
		}
		else if(rot - minrot == -1)
			left();
		else if(rot - minrot == 1)
			right();
	}
	valSen();
	newInfo();
		oldpoint = point;
		forward();
		for(var i =0;i<4;i++)
			if(map[point][i] != 2)
				check = true;
		valSen();
		newInfo();
	}
}

function newInfo()
{
	if(sz[0])
	{
		if(rot == 0)
		{
			map[point][3] = 1;
			map[point - 1][1] = 1;
		}
		else if(rot == 1)
		{
			map[point - walllen][2] = 1;
			map[point][0] = 1;
		}
		else if(rot == 2)
		{
			map[point][1] = 1;
			map[point + 1][3] = 1;
		}
		else if(rot == 3)
		{
			map[point][2] = 1;
			map[point + walllen][0] = 1;
		}
	}
	else if(!sz[0])
	{
		if(rot == 0)
		{
			if(map[point][3] == 2)
				map[point][3] = 0;
			if(map[point - 1][1] == 2)
				map[point - 1][1] = 0;
		}
		else if(rot == 1)
		{
			if(map[point - walllen][2] == 2)
				map[point - walllen][2] = 0;
			if(map[point][0] == 2)
				map[point][0] = 0;
		}
		else if(rot == 2)
		{
			if(map[point][1] == 2)
				map[point][1] = 0;
			if(map[point + 1][3] == 2)
				map[point + 1][3] = 0;
		}
		else if(rot == 3)
		{
			if(map[point][2] == 2)
				map[point][2] = 0;
			if(map[point + walllen][0] == 2)
				map[point + walllen][0] = 0;
		}
	}
	if(sz[1])
	{
		if(rot == 0)
		{
			map[point][0] = 1;
			map[point - walllen][2] = 1;
		}
		else if(rot == 1)
		{
			map[point + 1][3] = 1;
			map[point][1] = 1;
		}
		else if(rot == 2)
		{
			map[point][2] = 1;
			map[point + walllen][0] = 1;
		}
		else if(rot == 3)
		{
			map[point][3] = 1;
			map[point - 1][1] = 1;
		}
	}
	else if(!sz[1])
	{
		if(rot == 0)
		{
			if(map[point][0] == 2)
				map[point][0] = 0;
			if(map[point - walllen][2] == 2)
				map[point - walllen][2] = 0;
		}
		else if(rot == 1)
		{
			if(map[point + 1][3] == 2)
				map[point + 1][3] = 0;
			if(map[point][1] == 2)
				map[point][1] = 0;
		}
		else if(rot == 2)
		{
			if(map[point][2] == 2)
				map[point][2] = 0;
			if(map[point + walllen][0] == 2)
				map[point + walllen][0] = 0;
		}
		else if(rot == 3)
		{
			if(map[point][3] == 2)
				map[point][3] = 0;
			if(map[point - 1][1] == 2)
				map[point - 1][1] = 0;
		}
	}
	if(sz[2])
	{
		if(rot == 0)
		{
			map[point][1] = 1;
			map[point + 1][3] = 1;
		}
		else if(rot == 1)
		{
			map[point + walllen][0] = 1;
			map[point][2] = 1;
		}
		else if(rot == 2)
		{
			map[point][3] = 1;
			map[point - 1][1] = 1;
		}
		else if(rot == 3)
		{
			map[point][0] = 1;
			map[point - walllen][2] = 1;
		}
	}
	else if(!sz[2])
	{
		if(rot == 0)
		{
			if(map[point][1] == 2)
				map[point][1] = 0;
			if(map[point + 1][3] == 2)
				map[point + 1][3] = 0;
		}
		else if(rot == 1)
		{
			if(map[point + walllen][0] == 2)
			map[point + walllen][0] = 0;
			if(map[point][2] == 2)
			map[point][2] = 0;
		}
		else if(rot == 2)
		{
			if(map[point][3] == 2)
			map[point][3] = 0;
			if(map[point - 1][1] == 2)
			map[point - 1][1] = 0;
		}
		else if(rot == 3)
		{
			if(map[point][0] == 2)
			map[point][0] = 0;
			if(map[point - walllen][2] == 2)
			map[point - walllen][2] = 0;
		}
	}
}

function path_check(){
	ml(0)
	mr(0)
	delay(150)
	
	back_free=true
	if(begin){
		back_free=false
		begin=false
	}
	left_free=false
	right_free=false
	forward_free=true
	fullmoved=false
	deg = (el.read()+er.read())/2 + (700/(pi*56))*110;
	while(true){
		if((el.read()+er.read())/2 > deg){
			fullmoved=true
			break
		}
		if(inverted_section){
			if(a3()<50&&!left_free){
				print("LEFT_FREE")
				left_free=true
			}
			if(a4()<50&&!right_free){
				print("RIGHT_FREE")
				right_free=true
			}
			if(a5middle()>50&&forward_free){
				forward_free=false
			}
		}else{
			if(a3()>50&&!left_free){
				print("LEFT_FREE")
				left_free=true
			}
			if(a4()>50&&!right_free){
				print("RIGHT_FREE")
				right_free=true
			}
			if(a5middle()<10&&forward_free){
				forward_free=false
			}
		}
		if(left_free||right_free){
			if(inverted_section){
				if(a3()>50&&a4()>50){
					break
				}
			}else{
				if(a3()<50&&a4()<50){
					break
				}
			}
		}
		err=0
		ml(100+(err))
		mr(100-(err))
	}
	if(forward_free){
		print("FORWARD_FREE")
	}
	if(fullmoved){
		pathminus=(700/(pi*56))*30
	}else{
		pathminus=0;
	}
	sz = [0,0,0];
	if(forward_free)
		sz[1] = 1;
	if(left_free)
		sz[0] = 1;
	if(right_free)
		sz[2] = 1;
	print("GO!")
	ml(0)
	mr(0)
}

var calculatePath=function(){
	
	for(var i=0;i<walllen;i++){
		mapPaint[i]=new Array(walllen);
		for(var j=0;j<walllen;j++){
			mapPaint[i][j]=1000000;
		}
	}
	mapPaint[xfin][yfin]=0
	var iter=0;
	while(mapPaint[xpos][ypos]==1000000 && iter<10000){
		iter++;
		for(var i=1;i<16;i++){
			for(var j=1;j<16;j++){
				if(mapPaint[i][j]!=-1){
					if(mapPaint[i+1][j]>mapPaint[i][j] && map[i+1][j]==0){
						mapPaint[i+1][j]=mapPaint[i][j]+1;
					}
					if(mapPaint[i-1][j]>mapPaint[i][j] && map[i-1][j]==0){
						mapPaint[i-1][j]=mapPaint[i][j]+1;
					}
					if(mapPaint[i][j+1]>mapPaint[i][j] && map[i][j+1]==0){
						mapPaint[i][j+1]=mapPaint[i][j]+1;
					}
					if(mapPaint[i][j-1]>mapPaint[i][j] && map[i][j-1]==0){
						mapPaint[i][j-1]=mapPaint[i][j]+1;
					}
				}
			}
		}
	}
	if(iter>=10000){
		err=true;
		print("ERR!!!")
	}else{
		err=false;
	}
}


function forward(){
	
	deg = (el.read()+er.read())/2 + (700/(pi*56))*90-pathminus;
	while((el.read()+er.read())/2 < deg){
		if(a3()>50&&a4()>50){
			inverted_section=true
		}
		if(a3()<50&&a4()<50){
			inverted_section=false
		}
		err=(a2()-a1())/4
		if(err!=0){
			err=err*err*(abs(err)/err)
		}
		if(inverted_section){
			err=-err;
		}
		ml(100+(err))
		mr(100-(err))
	}

	ml(0)
	mr(0)
	print()
	
	if(rot == 0)
		point-=h;
	else if(rot == 1)
		point+=1;
	else if(rot == 2)
		point+=h;
	else if(rot == 3)
		point-=1;
}
function right(){
	ml(100)
	mr(-60)
	delay(500)
	rot++;
	rot = cuboid(rot);
}
function left(){
	ml(-60)
	mr(100)
	delay(500)
	rot--;
	rot = cuboid(rot);
}

function valMap(){
	valSen();
		if(!sz[1]){
			if(rot==0 && map[xpos * (ypos-1)]!=1){
				print("Wall Up")
				map[xpos][ypos-1]=1;
				map[xpos][ypos-2]=1;
				map[xpos][ypos-3]=1;
				map[xpos-1][ypos-1]=1;
				map[xpos-1][ypos-2]=1;
				map[xpos-1][ypos-3]=1;
				map[xpos+1][ypos-1]=1;
				map[xpos+1][ypos-2]=1;
				map[xpos+1][ypos-3]=1;
			}
			if(rot==1 && map[xpos+1][ypos]!=1){
				print("Wall Right")
				map[xpos+1][ypos]=1;
				map[xpos+2][ypos]=1;
				map[xpos+3][ypos]=1;
				map[xpos+1][ypos-1]=1;
				map[xpos+2][ypos-1]=1;
				map[xpos+3][ypos-1]=1;
				map[xpos+1][ypos+1]=1;
				map[xpos+2][ypos+1]=1;
				map[xpos+3][ypos+1]=1;
			}
			if(rot==2 && map[xpos][ypos+1]!=1){
				print("Wall Down")
				map[xpos][ypos+1]=1;
				map[xpos][ypos+2]=1;
				map[xpos][ypos+3]=1;
				map[xpos-1][ypos+1]=1;
				map[xpos-1][ypos+2]=1;
				map[xpos-1][ypos+3]=1;
				map[xpos+1][ypos+1]=1;
				map[xpos+1][ypos+2]=1;
				map[xpos+1][ypos+3]=1;
			}
			if(rot==3 && map[xpos-1][ypos]!=1){
				print("Wall Left")
				map[xpos-1][ypos]=1;
				map[xpos-2][ypos]=1;
				map[xpos-3][ypos]=1;
				map[xpos-1][ypos-1]=1;
				map[xpos-2][ypos-1]=1;
				map[xpos-3][ypos-1]=1;
				map[xpos-1][ypos+1]=1;
				map[xpos-2][ypos+1]=1;
				map[xpos-3][ypos+1]=1;
			}
			//print("Wall badLuck=new Wall();")
		}
		
		if(!sz[0]){
			if(rot==1 && map[xpos][ypos-1]!=1){
				print("Wall Up")
				map[xpos][ypos-1]=1;
				map[xpos][ypos-2]=1;
				map[xpos][ypos-3]=1;
				map[xpos-1][ypos-1]=1;
				map[xpos-1][ypos-2]=1;
				map[xpos-1][ypos-3]=1;
				map[xpos+1][ypos-1]=1;
				map[xpos+1][ypos-2]=1;
				map[xpos+1][ypos-3]=1;
			}
			if(rot==2 && map[xpos+1][ypos]!=1){
				print("Wall Right")
				map[xpos+1][ypos]=1;
				map[xpos+2][ypos]=1;
				map[xpos+3][ypos]=1;
				map[xpos+1][ypos-1]=1;
				map[xpos+2][ypos-1]=1;
				map[xpos+3][ypos-1]=1;
				map[xpos+1][ypos+1]=1;
				map[xpos+2][ypos+1]=1;
				map[xpos+3][ypos+1]=1;
			}
			if(rot==3 && map[xpos][ypos+1]!=1){
				print("Wall Down")
				map[xpos][ypos+1]=1;
				map[xpos][ypos+2]=1;
				map[xpos][ypos+3]=1;
				map[xpos-1][ypos+1]=1;
				map[xpos-1][ypos+2]=1;
				map[xpos-1][ypos+3]=1;
				map[xpos+1][ypos+1]=1;
				map[xpos+1][ypos+2]=1;
				map[xpos+1][ypos+3]=1;
			}
			if(rot==0 && map[xpos-1][ypos]!=1){
				print("Wall Left")
				map[xpos-1][ypos]=1;
				map[xpos-2][ypos]=1;
				map[xpos-3][ypos]=1;
				map[xpos-1][ypos-1]=1;
				map[xpos-2][ypos-1]=1;
				map[xpos-3][ypos-1]=1;
				map[xpos-1][ypos+1]=1;
				map[xpos-2][ypos+1]=1;
				map[xpos-3][ypos+1]=1;
			}
			//print("Wall badLuck=new Wall();")
		}
		if(!sz[2]){
			if(rot==3 && map[xpos][ypos-1]!=1){
				print("Wall Up")
				map[xpos][ypos-1]=1;
				map[xpos][ypos-2]=1;
				map[xpos][ypos-3]=1;
				map[xpos-1][ypos-1]=1;
				map[xpos-1][ypos-2]=1;
				map[xpos-1][ypos-3]=1;
				map[xpos+1][ypos-1]=1;
				map[xpos+1][ypos-2]=1;
				map[xpos+1][ypos-3]=1;
			}
			if(rot==0 && map[xpos+1][ypos]!=1){
				print("Wall Right")
				map[xpos+1][ypos]=1;
				map[xpos+2][ypos]=1;
				map[xpos+3][ypos]=1;
				map[xpos+1][ypos-1]=1;
				map[xpos+2][ypos-1]=1;
				map[xpos+3][ypos-1]=1;
				map[xpos+1][ypos+1]=1;
				map[xpos+2][ypos+1]=1;
				map[xpos+3][ypos+1]=1;
			}
			if(rot==1 && map[xpos][ypos+1]!=1){
				print("Wall Down")
				map[xpos][ypos+1]=1;
				map[xpos][ypos+2]=1;
				map[xpos][ypos+3]=1;
				map[xpos-1][ypos+1]=1;
				map[xpos-1][ypos+2]=1;
				map[xpos-1][ypos+3]=1;
				map[xpos+1][ypos+1]=1;
				map[xpos+1][ypos+2]=1;
				map[xpos+1][ypos+3]=1;
			}
			if(rot==2 && map[xpos-1][ypos]!=1){
				print("Wall Left")
				map[xpos-1][ypos]=1;
				map[xpos-2][ypos]=1;
				map[xpos-3][ypos]=1;
				map[xpos-1][ypos-1]=1;
				map[xpos-2][ypos-1]=1;
				map[xpos-3][ypos-1]=1;
				map[xpos-1][ypos+1]=1;
				map[xpos-2][ypos+1]=1;
				map[xpos-3][ypos+1]=1;
			}
			//print("Wall badLuck=new Wall();")
		}
}

function valSen()
{
	path_check();
}

function cuboid(_a)
{
	if(_a > 3)
		return _a-4;
	if(_a < 0)
		return _a+4;
	return _a;
}

function vichX(_point)
{
	return _point%walllen;
}

function vichY(_point)
{
	return ((_point/walllen) - (point/walllen%1));
}