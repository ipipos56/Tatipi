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


//s = new Array(3);
//s[0] = brick.sensor(A3);
//s[1] = brick.sensor(A1);
//s[2] = brick.sensor(A2);

//sz = [0,0,0];

ML = brick.motor(M4).setPower; 
MR = brick.motor(M3).setPower; 
EL = brick.encoder(E4); 
ER = brick.encoder(E3); 

rotCnt = 0;


direction = 0;

x = 0
y = 0;
h = 5;
point = 0;
rot = 1;
iznrot = 1;

fullRot = 0;

//map = new Array(5);
map = [
[0,1,1,0],
[0,0,1,1],
[0,1,1,0],
[0,0,1,1],
[0,1,1,0],
[0,0,1,1],
[1,0,1,0],
[1,1,1,0],
[1,1,1,1],
[1,0,1,1],
[1,1,1,0],
[1,0,1,1],
[1,1,1,0],
[1,0,0,1],
[1,0,1,0],
[1,1,0,0],
[1,0,0,1],
[1,0,1,0],
[1,1,1,0],
[0,1,1,1],
[1,0,0,1],
[0,1,1,0],
[0,0,1,1],
[1,0,1,0],
[1,1,0,0],
[1,0,0,1],
[0,1,1,0],
[1,1,0,1],
[1,1,1,1],
[1,0,0,1],
[0,1,0,0],
[0,1,0,1],
[1,1,0,1],
[0,1,0,1],
[1,1,0,1],
[0,0,0,1]
]
mapPaint = new Array(5);



s = new Array(2);
s[0] = brick.sensor(A2);
//s[1] = brick.sensor(D1);
s[1] = brick.sensor(A1);

sz = [0,0];


xpos=0;
ypos=0;

xfin=0;
yfin=0;

err=false;

var calculatePath=function(){
	
	for(var i=0;i<17;i++){
		mapPaint[i]=new Array(17);
		for(var j=0;j<17;j++){
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

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();
	
	/*
	for(var i=0;i<5;i++){
		map[i]=new Array(4);
		for(var j=0;j<4;j++){
			map[i][j]=0;
		}
	}
*/
	
	ER.reset()
	EL.reset()
	
	brick.gyroscope().calibrate(4000);
	script.wait(4050);
	moveSmall();
	
	var raw = script.readAll("input.txt");
	raw2=raw[1];
	raw = raw[0].split(" ");
	raw2 = raw2.split(" ");
	
	xpos=parseInt(raw[0],10)*2+1;
	ypos=parseInt(raw[1],10)*2+1;
	rot=parseInt(raw[2],10);
	iznrot = rot - 1;
	iznrot = cuboid(iznrot);
	xfin=parseInt(raw2[0],10)*2+1;
	yfin=parseInt(raw2[1],10)*2+1;
	
	print(xpos+" "+ypos+" "+rot+" "+xfin+" "+yfin+"\n")
	
	while(!(xpos==xfin&&ypos==yfin)){
		valMap();
		calculatePath();
		//printMapPaint(mapPaint)
		//printMapPaint(map)
		print()
		movedir=0;
		if(mapPaint[xpos+1][ypos]<mapPaint[xpos][ypos]){
			movedir=1;
		}else{
			if(mapPaint[xpos-1][ypos]<mapPaint[xpos][ypos]){
				movedir=3;
			}else{
				if(mapPaint[xpos][ypos+1]<mapPaint[xpos][ypos]){
					movedir=2;
				}else{
					if(mapPaint[xpos][ypos-1]<mapPaint[xpos][ypos]){
						movedir=0;
					}else{
						//break;
					}
				}
			}
		}
		
		
		
		if(rot==0 && movedir==0){
			
		}
		if(rot==0 && movedir==1){
			turn_right();
		}
		if(rot==0 && movedir==2){
			turn_right();
			turn_right();
		}
		if(rot==0 && movedir==3){
			turn_left();
		}
		
		
		if(rot==1 && movedir==0){
			turn_left();
		}
		if(rot==1 && movedir==1){
			
		}
		if(rot==1 && movedir==2){
			turn_right();
		}
		if(rot==1 && movedir==3){
			turn_right();
			turn_right();
		}
		
		
		if(rot==2 && movedir==0){
			turn_right();
			turn_right();
		}
		if(rot==2 && movedir==1){
			turn_left();
		}
		if(rot==2 && movedir==2){
			
		}
		if(rot==2 && movedir==3){
			turn_right();
		}
		
		
		if(rot==3 && movedir==0){
			turn_right();
		}
		if(rot==3 && movedir==1){
			turn_right();
			turn_right();
		}
		if(rot==3 && movedir==2){
			turn_left();
		}
		if(rot==3 && movedir==3){
			
		}
		
		
		valMap();
		valSen();
		if(sz[1]){
			if(rot==0){
				print("up")
			}
			if(rot==1){
				print("right")
			}
			if(rot==2){
				print("down")
			}
			if(rot==3){
				print("left")
			}
			wait(1000);
			forward();
			if(rot==0){
				ypos-=2;
			}
			if(rot==1){
				xpos+=2;
			}
			if(rot==2){
				ypos+=2;
			}
			if(rot==3){
				xpos-=2;
			}
		}
	}
	
    brick.display().addLabel("finish",1,1) //вывод ответа
    brick.display().redraw()
    script.wait(10000)

    return;
}
function valMap(){
	valSen();
		if(!sz[1]){
			if(rot==0 && map[xpos][ypos-1]!=1){
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
function printMapPaint(msn){
	for(var i=0;i<msn.length;i++){
		var st="";
		for(var j=0;j<msn[i].length;j++){
			if(msn[j][i]>=100)st+="   ";
				else if(msn[j][i]>=10)st+=" "+msn[j][i];
				else if(msn[j][i]>=0)st+="  "+msn[j][i];
		}
		print(st)
	}
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

function forward()
{
		
	ER.reset()
	EL.reset()
	
	print("rot " + rot);
	deg = (700/(pi*56))*360;
	newrot = rot - iznrot;
	newrot = cuboid(newrot);
	if(newrot == 0)
		direction = -90;
	else if(newrot == 1)
		direction = 0;
	else if(newrot == 2)
		direction = 90;
	else if(newrot == 3)
		direction = -180;
	while(((EL.read()+ER.read())/2 < deg)) //&& (s[1].read() > 25 ))
	{
		gyro = brick.gyroscope().read()[6]/1000;
		if(newrot == 3)
		{
			if(gyro < 0)
				direction = -180;
			else 
				direction = 180;
		}
		err = direction - gyro;
		ML(50+(err*1))
		MR(50-(err*1))
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

}

function turn_left() {
	
	
	ER.reset()
	EL.reset()

	deg = (174/56)*90
	ML(-50)
	MR(50)
	while(abs(ER.read()) < deg)
	{
		wait(2)
	}
	stop()

	rot-=1; 
	rot = cuboid(rot);

}

function turn_right() 
{
	
	ER.reset()
	EL.reset()
	
	deg = (174/56)*90;
	ML(50);
	MR(-50);
	while(abs(EL.read()) < deg) 
		script.wait(2);
	stop();
	
	rot+=1; 
	rot = cuboid(rot);

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
