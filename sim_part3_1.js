var __interpretation_started_timestamp__;
var pi = 3.1415926535897931;
var states = [];


var robot1_pos = 0;
var robot1_dir = 0;

var ins=[],iny;
var w=160,h=120;
var n = 19200;
var d = [];
var PIdiv2 = Math.PI / 2;
var img = new Array(h);
var imgThe = new Array(h);
var xMin, yMin, xMax, yMax;
var xMin2, yMin2, xMax2, yMax2;
var borders = new Array(h);
var bordersPoints = new Array(w*h);
var positionCount = 0;
var cornersCoodinates = new Array(4);
var gray = 50;
var xP, yP, xC, yC;
var a, blueColor, c;
var xi, yi;
var NumberOfCordes = new Array(9); 
var matrix = new Array(3); 
var decodeValue = 0;
var cornV = 30;


var bortnum;
var sum = 0;
var maxbort = 2;
var bort = maxbort;
var map = new Array(64);
var startX=0,startY=0,stdir=1;
var finishX=5,finishY=6;
var distan = new Array(64);
var visib = new Array(64);
var predok = new Array(64);
var tra = new Array(3);
var cel = 12;
var maxcheck = 0;
var cheX=-1,cheY=-1;

var queue = [];
var march = [];
var SR = brick.sensor(A2);
var SL = brick.sensor(A1);
var SU = brick.sensor(D1);

var mLeft = brick.motor(M1).setPower; 
var mRight = brick.motor(M2).setPower; 
var eLeft = brick.encoder(E1); 
var eRight = brick.encoder(E2); 

var v = 65;

var dir;

fullRot = 0;

var SR = brick.sensor(A2);
var SL = brick.sensor(A1);
var SU = brick.sensor(D1);

var motor_l = brick.motor(M1).setPower; 
var motor_r = brick.motor(M2).setPower; 
var enc_l = brick.encoder(E1); 
var enc_r = brick.encoder(E2); 

rotCnt = 0;

function sign(x) {
	if (x > 0) {
		return 1;
	} else if (x < 0) {
		return -1;
	} else {
		return 0;
	}
}

var URDL = function(firs,seco)
{
	var stt = seco - firs;
	if(stt == 8)
		finRoad(3);
	else if(stt == -8)
		finRoad(1);
	else if(stt == 1)
		finRoad(2);
	else
		finRoad(0);
}

var finRoad = function(driv)
{
	if(dir == 0)
	{
		if(driv == 0)
		{
			//march.push(1);
			march.push("F");
		}
		else if(driv == 1)
		{
			//march.push(2);
			//march.push(1);
			march.push("R");
			march.push("F");
			dir = 1;
		}
		else if(driv == 2)
		{
			//march.push(0);
			//march.push(0);
			//march.push(1);
			march.push("R");
			march.push("R");
			march.push("F");
			dir = 2;
		}
		else if(driv == 3)
		{
			//march.push(0);
			//march.push(1);
			march.push("L");
			march.push("F");
			dir = 3;
		}
	}
	else if(dir == 1)
	{
		if(driv == 0)
		{
			//march.push(0);
			//march.push(1);
			march.push("L");
			march.push("F");
			dir = 0;
		}
		else if(driv == 1)
		{
			//march.push(1);
			march.push("F");
		}
		else if(driv == 2)
		{
			//march.push(2);
			//march.push(1);
			march.push("R");
			march.push("F");
			dir = 2;
		}
		else if(driv == 3)
		{
			//march.push(2);
			//march.push(2);
			//march.push(1);
			march.push("R");
			march.push("R");
			march.push("F");
			dir = 3;
		}	
	}
	else if(dir == 2)
	{
		if(driv == 0)
		{
			//march.push(0);
			//march.push(0);
			//march.push(1);
			march.push("R");
			march.push("R");
			march.push("F");
			dir = 0;
		}
		else if(driv == 1)
		{
			//march.push(0);
			//march.push(1);
			march.push("L");
			march.push("F");
			dir = 1;
		}
		else if(driv == 2)
		{
			//march.push(1);
			march.push("F");
		}
		else if(driv == 3)
		{
			//march.push(2);
			//march.push(1);
			march.push("R");
			march.push("F");
			dir = 3;
		}
	}
	else if(dir == 3)
	{
		if(driv == 0)
		{
			//march.push(2);
			//march.push(1);
			march.push("R");
			march.push("F");
			dir = 0;
		}
		else if(driv == 1)
		{	
			//march.push(0);
			//march.push(0);
			//march.push(1);
			march.push("R");
			march.push("R");
			march.push("F");
			dir = 1;
		}
		else if(driv == 2)
		{
			//march.push(0);
			//march.push(1);
			march.push("L");
			march.push("F");
			dir = 2;
		}
		else if(driv == 3)
		{
			//march.push(1);
			march.push("F");
		}	
	}
}


function moveSmall(){ 
	enc_r.reset()
	enc_l.reset()
	deg = (88/(pi*56))*360

	while((enc_l.read()+enc_r.read())/2 < deg){

		err =  brick.gyroscope().read()[6]/1000 - fullRot;

		motor_l(50-err*0.5)

		motor_r(50+err*0.5)

		script.wait(1);

		}
	stop()
}


function forward(robot) {
	enc_r.reset()
	enc_l.reset()

	deg = (700/(pi*56))*360
	
	direction = (rotCnt + 2) % 4 - 2;
	while((enc_l.read()+enc_r.read())/2 < deg) {
		gyro = brick.gyroscope().read()[6]/1000;
		if (direction == -2) {
			err = gyro + sign(gyro) * direction * 90
		} else {
			err =  gyro - direction * 90;	
		}
		motor_l(50-err*0.5)
		motor_r(50+err*0.5)
		script.wait(1);
	}
	stop()
}


function turn_right() {
	enc_r.reset()
	enc_l.reset()
	
	deg = (174/56)*90
	motor_l(50)
	motor_r(-50)
	while(enc_l.read() < deg) {
		script.wait(1)
	}
	
	stop()
	
	rotCnt += 1;
}

 
function turn_left() {
	enc_r.reset()
	enc_l.reset()

	deg = (174/56)*90
	deg = 280
	motor_l(-50)
	motor_r(50)
	while(enc_r.read() < deg)
		script.wait(1)
	stop()
	
	rotCnt -= 1;
}

function stop(){
	motor_r(0)
	motor_l(0)
	script.wait(50)
}

var main = function() {
	brick.gyroscope().calibrate(2000);
	script.wait(2050)

	moveSmall()
	
	var inp = script.readAll("input.txt");
	
	startX = Number(inp[0][0]);
	startY = Number(inp[0][2]);
	stdir = Number(inp[0][4]) + 1;
	if(stdir > 3)
		stdir = 0;
	dir = stdir;
	
	finishX = Number(inp[1][0]);
	finishY = Number(inp[1][2]);
	
	for(var i = 0; i < map.length; i++)
		map[i] = new Array(64);
	
	for(var i = 0; i < visib.length; i++)
		visib[i] = 0;
	
	for(var i = 0; i < distan.length; i++)
		distan[i] = 10000000;
	
	map[0][1]=map[0][8]=map[1][0]=map[1][2]=map[2][1]=map[2][3]=map[2][10]=map[3][2]=map[3][4]=map[4][3]
	=map[4][5]=map[5][4]=map[5][13]=map[7][15]=map[8][0]=map[8][16]=map[10][2]=map[10][18]=map[11][19]
	=map[13][5]=map[13][14]=map[13][21]=map[14][13]=map[14][15]=map[15][7]=map[15][14]=map[16][8]=map[16][17]
	=map[17][18]=map[17][16]=map[18][10]=map[18][17]=map[18][26]=map[19][11]=map[19][20]=map[19][27]
	=map[20][19]=map[20][21]=map[21][13]=map[21][20]=map[21][29]=map[23][31]=map[24][32]=map[26][18]=map[26][34]
	=map[27][19]=map[29][21]=map[29][30]=map[29][37]=map[30][29]=map[30][31]=map[31][30]=map[31][23]=map[31][39]
	=map[32][24]=map[32][33]=map[32][40]=map[33][32]=map[33][34]=map[34][26]=map[34][33]=map[34][35]=map[34][42]
	=map[35][34]=map[35][36]=map[36][35]=map[36][37]=map[36][44]=map[37][29]=map[37][36]=map[37][45]=map[39][31]
	=map[40][32]=map[42][34]=map[42][50]=map[44][36]=map[44][45]=map[45][37]=map[45][44]=map[45][46]=map[45][53]
	=map[46][45]=map[46][47]=map[47][46]=map[47][55]=map[48][49]=map[48][56]=map[49][48]=map[49][50]=map[50][42]
	=map[50][49]=map[50][51]=map[50][58]=map[51][50]=map[51][59]=map[53][45]=map[55][47]=map[55][63]=map[56][48]
	=map[58][50]=map[58][59]=map[59][51]=map[59][58]=map[59][60]=map[60][59]=map[60][61]=map[61][60]=map[61][62]
	=map[62][61]=map[62][63]=map[63][55]=map[63][62]=1;
	
	queue.push(startY * 8 + startX);
	distan[startY * 8 + startX] = 0;
	visib[startY * 8 + startX] = 0;
	predok[startY * 8 + startX] = -1;
	
	while(queue.length > 0)
	{
		var ver = queue.pop();
		
		for(var i = 0;i<map[ver].length;i++)
		{
			if(map[ver][i] == 1 && distan[ver] + map[ver][i] < distan[i])
			{
					distan[i] = distan[ver] + map[ver][i];
					predok[i] = ver;
					queue.push(i);
			}
		}
	}
	
	var df = finishY * 8 + finishX;
	var ss = df;
	var sf = 0;
	var queueRev = [];
	queueRev.push(ss);
	
	while(predok[df] != -1)
	{
		sf = predok[df];
		queueRev.push(sf);
		ss = sf;
		df = sf;
	}
	
	sf = queueRev.pop();
	
	while(queueRev.length > 0)
	{
		ss = queueRev.pop();
		//print(ss);
		URDL(sf,ss);
		sf = ss;
	}
	
	var allpath="";
	
	while(march.length > 0)
	{
		var tec = march.shift();
		//print(tec);
		allpath+=tec;
		if(tec == "L")
		{
			turn_left();
			script.wait(100);
		}
		else if(tec == "F")
		{
			forward();
		}
		else if(tec == "R")
		{
			turn_right();
			script.wait(100);
		}
	}
	
	stop();
	
	print(allpath);
	brick.display().addLabel(allpath,1,1);
	brick.display().redraw();
	script.wait(1000);
}