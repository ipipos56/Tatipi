var __interpretation_started_timestamp__;
pi = 3.141592653589793;
wait = script.wait;
err_global=0
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

inversed_section=false
rotCnt = 0;
move_beginning=true

direction = 0;

x = 0
y = 0;
h = 6;
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
	brick.display().clear();
	
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
	
	brick.gyroscope().calibrate(2000);
	script.wait(2050);
	//moveSmall();
	
	//var raw = script.readAll("input.txt");
	//raw2=raw[1];
	//raw = raw[0].split(" ");
	//raw2 = raw2.split(" ");
	
	xpos=0//parseInt(raw[0],10)*2+1;
	ypos=0//parseInt(raw[1],10)*2+1;
	rot=1//parseInt(raw[2],10);
	iznrot = rot - 1;
	iznrot = cuboid(iznrot);
	xfin = 0;
	yfin = 0;
	tt = 0;
	while(tt == 0)
	{
		while(Math.abs(xfin - xpos) <= 2 && Math.abs(yfin-ypos) <=2)
		{
			xfin=script.random(0, h-1)//parseInt(raw2[0],10)*2+1;
			yfin=script.random(0, h-1)//parseInt(raw2[1],10)*2+1;
		}
		tt = findPath(point,yfin * h + xfin);
		if(tt == 0)
			print("Cant destinate this point");
	}
	//print(xpos+" "+ypos+" "+rot+" "+xfin+" "+yfin+"\n")
	ML(-20);
	MR(-20);
	script.wait(900);
	MR(0);
	ML(0);
	
	brick.display().clear();
    brick.display().addLabel(" finish ",1,1);
    brick.display().redraw();
	
	
    script.wait(10000);
	
	brick.display().clear();
    brick.display().addLabel("finish",1,1);
    brick.display().redraw();
	script.wait(1000);


    return;
}


function findPath(stPoin,fnPoin)
{
	var q = [];
	var dis = [];
	var par = [];
	for(var _i = 0;_i<36;_i++)
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
		
		for(var er = 0;er<4;er++)
		{
			var poiDel = 0;
			if(er == 0)
				poiDel = (-1 * h);
			else if(er == 1)
				poiDel = 1;
			else if(er == 2)
				poiDel = h;
			else if(er == 3)
				poiDel = -1;
			
			var pri = abs(par[vert][1] - er);
			
			if( pri == 1 || pri == 3)
                pri = 2;
            else if(pri == 2)
                pri = 3;
            else if(pri == 0)
                pri = 1;
			
			//print(vert + " " + (vert + poiDel) +" "+map[vert][i] + " " + dis[vert + poiDel] + " " + pri + " " + par[vert][0]+" "+ par[vert][1]);
				
			if((parseInt(map[vert][er],10) == 1) && (dis[(vert + poiDel)] > (dis[vert] + pri)))
			{
				par[(vert + poiDel)][0] = vert;
				par[(vert + poiDel)][1] = er;
				dis[(vert + poiDel)] = dis[vert] + pri;
				q.push(vert + poiDel);
			}
		}
	}
	//print(fnPoin);
	if(dis[fnPoin] != 100000)
	{
		var para = fnPoin;
		q.push(para);

		while(par[para][0] != -1)
		{
			para = par[para][0];
			q.push(para);
		}
		if(q.length > 0)
		{
			var viv = "";
			for(var i = 0;i<q.length;i++)
				if(i != q.length - 1)
					viv += String(q[q.length-i-1]) + ",";
				else
					viv += String(q[q.length-i-1]);
				
			brick.display().addLabel("(" + xfin + ";" + yfin + ")",1,1)
			brick.display().redraw()
			//script.wait(3000)
				
			brick.display().addLabel(viv,1,25)
			brick.display().redraw()
			script.wait(3100)
			brick.display().clear();
			brick.display().redraw()
		}
		var previs = q.pop();
		var prib = 0;
		//print(previs);

		while(q.length > 0)
		{
			var cur = q.pop();

			//print(cur);
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
		//newInfo();
		return 1;
	}
	else
	{	
		//print("No path");
		
		brick.display().addLabel("(" + xfin + ";" + yfin + ")",1,1)
		brick.display().addLabel("-1",1,25)
		brick.display().redraw()
		script.wait(3000)
		return 0;
	}
}

function valMap(){
	valSen();
		if(!sz[1]){
			if(rot==0 && map[xpos][ypos-1]!=1){
				//print("Wall Up")
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
				//print("Wall Right")
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
				//print("Wall Down")
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
				//print("Wall Left")
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
				//print("Wall Up")
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
				//print("Wall Right")
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
				//print("Wall Down")
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
				//print("Wall Left")
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
				//print("Wall Up")
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
				//print("Wall Right")
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
				//print("Wall Down")
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
				//print("Wall Left")
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
	move_beginning=false
	ER.reset()
	EL.reset()
	
	//print("rot " + rot);
	deg = (700/(pi*56))*360;
	deg/=2.12;
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
	additional_move=0
	while(((EL.read()+ER.read())/2+additional_move/20 < deg)) //&& (s[1].read() > 25 ))
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
		err=err*2
		a1v=brick.sensor(A1).read()
		a2v=brick.sensor(A2).read()
		if((a1v<50&&a2v<50)){
			inversed_section=false
		}
		if((a1v>50&&a2v>50)){
			inversed_section=true
		}
		if(!inversed_section){
			err=err+(a1v-a2v)*1
		}else{
			err=err-(a1v-a2v)*1
		}
		additional_move=additional_move+abs(err)
		ML(100+(err*1))
		MR(100-(err*1))
		wait(2);
	}
	stop();
	err_global=direction - brick.gyroscope().read()[6]/1000
	
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

	//deg = (174/56)*90
	deg = (164/56)*(90-err_global)
	ML(-100)
	MR(100)
	if(!move_beginning){
		while(abs(ER.read()) < deg/1.3)
		{
			wait(2)
		}
	}else{
		while(abs(ER.read()) < deg)
		{
			wait(2)
		}
	}
	
	stop()

	rot-=1; 
	rot = cuboid(rot);
	err_global=0
	move_beginning=false
}

function turn_right() 
{
	
	ER.reset()
	EL.reset()
	
	//deg = (174/56)*90;
	deg = (164/56)*(90+err_global)
	ML(100);
	MR(-100);
	if(!move_beginning){
		while(abs(EL.read()) < deg/1.3) {
			script.wait(2);
		}
	}else{
		while(abs(EL.read()) < deg) {
			script.wait(2);
		}
	}
	
	/*if(inversed_section){
		while(brick.sensor(A3).read()<20)
		{
			wait(2)
		}
	}else{
		while(brick.sensor(A3).read()>80)
		{
			wait(2)
		}
	}*/
	stop();
	
	rot+=1; 
	rot = cuboid(rot);
	err_global=0
	move_beginning=false

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
