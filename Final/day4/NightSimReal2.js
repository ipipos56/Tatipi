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

var bortnum = mailbox.myHullNumber();

sz=[];

mapPath = "";

vivo ="";

s = new Array(4);

rightArtag = false;

s0=15;
s2=15;



if(bortnum==0)
{
	s[0] = brick.sensor(A1);
	s[1] = brick.sensor(D1);
	s[2] = brick.sensor(A2);
	s[3] = brick.sensor(D2);
	sz = [0,0,0,0];
}
else
{
	s[0] = brick.sensor(A1);
	s[1] = brick.sensor(D1);
	s[2] = brick.sensor(A2);
	sz = [0,0,0];
}


abs = Math.abs;
sin = Math.sin;
cos = Math.cos;
round = Math.round;


ML = brick.motor(M4).setPower; 
MR = brick.motor(M3).setPower; 
EL = brick.encoder(E4); 
ER = brick.encoder(E3); 


x = 0
y = 0;
h = 17;
point = 144;
rot = 3;
iznrot = 1;

fullRot = 0;
robotFound = false;

map = new Array(30);
mapPaint = new Array(30);



s = new Array(3);
s[0] = brick.sensor(A2);
s[1] = brick.sensor(D1);
s[2] = brick.sensor(A1);

sz = [0,0,0];


xpos=15;
ypos=15;

xfin=1;
yfin=1;

terr=false;

var calculatePath=function(){
	//print(xfin+" "+yfin)
	for(var i=0;i<30;i++){
		mapPaint[i]=new Array(30);
		for(var j=0;j<30;j++){
			mapPaint[i][j]=1000000;
		}
	}
	mapPaint[xfin][yfin]=0
	var iter=0;
	while(mapPaint[xpos][ypos]==1000000 && iter<10000){
		iter++;
		for(var i=1;i<30-1;i++){
			for(var j=1;j<30-1;j++){
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
		terr=true;
		print("terr!!!")
	}else{
		terr=false;
	}
}

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();
	
	if(bortnum==0)
	{
		getARTagValue(0);
		if(rightArtag)
		{
			save();
			getARTagValue(0);
		}
		if(!rightArtag)
		{
			rotate(-90);
			getARTagValue(0);
			if(rightArtag)
			{
				save();
				getARTagValue(0);
			}
			if(!rightArtag)
			{
				rotate(-90);
				getARTagValue(0);
				if(rightArtag)
				{
					save();
					getARTagValue(0);
				}
				if(!rightArtag)
				{	
					rotate(-90);
					getARTagValue(0);
					if(rightArtag)
					{
						save();
						getARTagValue(0);
					}	
				}	
			}
		}
		
		for(var i = 0;i<vivo.length;i++)
		{
			if(vivo[i] == '3')
				forward();//forward
			else if(vivo[i] == '2')
				turn_right();//left
			else if(vivo[i] == '1')
				turn_left();//right
			wait(200);
		}
		mailbox.send(1,vivo);
		robo_goriz=false;
		valSen();
		robot_orient=[sz[0],sz[1],sz[2],sz[3]];
		curent_orient=[];
		curent_orient=robot_orient;
		message = "";
		mailbox.connect("192.168.77.1");
		while(robo_goriz==false)
		{
			while(mailbox.hasMessages()==false)
			{
				wait(50);
			}
			message = mailbox.receive();
			if(message=="Check")
			{
				valSen();
				curent_orient=[sz[0],sz[1],sz[2],sz[3]];
				sensInd=0;
				for(_sen=0;_sen<4;_sen++)
				{
					if(curent_orient[_sen]!=robot_orient[_sen])
					{
						sensInd=_sen;
						robo_goriz=true;
						break;
					}
				}
				if(robo_goriz==true)
				{
					wait(100);
					io="Look "+String(sensInd);
					mailbox.send(1,io);
					wait(200);
				}
				else
				{
					wait(100);
					io="No -1";
					mailbox.send(1,io);
					wait(200);
				}
			}
		}
		message=mailbox.receive();
		brick.display().addLabel(message,1,1)
		brick.display().redraw()
		script.wait(15000)
	}
	else
	{

	pathSecX = mailbox.receive();
	
	arrSecX=pathSecX.split(" ")
	rotSecX = 0;
	
	for(var i=0;i<arrSecX.length;i++){
		if(arrSecX[i]=="2"){
			rotSecX+=1;
			rotSecX=cuboid(rotSecX);
		}
		if(arrSecX[i]=="1"){
			rotSecX-=1;
			rotSecX=cuboid(rotSecX);
		}
	}
	print(rotSecX)
	
	visits=new Array(30);
	for(var i=0;i<30;i++)
	{
		visits[i]=new Array(30)
		for(var j=0;j<30;j++)
		{
			visits[i][j]=0;
		}
	}
	
	for(var i=0;i<30;i++){
		map[i]=new Array(30);
		for(var j=0;j<30;j++){
			map[i][j]=0;
		}
	}
	
	ER.reset()
	EL.reset()
	
	//brick.gyroscope().calibrate(4000);
	//script.wait(4050);
	//moveSmall();

	//var raw = script.readAll("C:/Users/ipipos/Desktop/Tatipi/Final/input.txt");
	//raw2=raw[1];
	//raw = raw[0];
	//raw2 = raw2.split(" ");
	
	//xpos=parseInt(raw[0],10)*2+1;
	//ypos=parseInt(raw[1],10)*2+1;
	rot=2;//parseInt(raw,10);//pos292
	iznrot = rot - 1;
	iznrot = cuboid(iznrot);
	//xfinpre=6;//parseInt(raw2[0],10);
	//yfinpre=7;//parseInt(raw2[1],10);
	
	//print(xpos+" "+ypos+" "+rot+" "+xfin+" "+yfin+"\n")
	
	minx=100
	miny=100
	maxx=0
	maxy=0
	
	while(maxx-minx<7||maxy-miny<7){
		terr=false
		calculatePath();
		while((maxx-minx<7||maxy-miny<7)){
			
			
			maxx=max(maxx,xpos);
			maxy=max(maxy,ypos);
			minx=min(minx,xpos);
			miny=min(miny,ypos);
			
			sendRec();
			visits[xpos][ypos]=1
			movementStep();
			visits[xpos][ypos]=1
			
			maxx=max(maxx,xpos);
			maxy=max(maxy,ypos);
			minx=min(minx,xpos);
			miny=min(miny,ypos);
		}
		terr=false
		
		xfin=28;
		yfin=28;
	}
	
	
	for(var i=0;i<8;i++){
		map[minx-1][miny+i]=1;
		map[minx+i][miny-1]=1;
		map[maxx+1][miny+i]=1;
		map[minx+i][maxy+1]=1;
	}
	//endlocal
	
	
	
		secX=-1; // IvanQuestion343
		secY=-1;
		xfin=-1;
		yfin=-1;
		while(secX==-1||secY==-1){
			while(!(xpos==xfin&&ypos==yfin))
			{
				sendRec();
				
				
				//print(xfin+" "+yfin)
				for(var i=0;i<30;i++){
					mapPaint[i]=new Array(30);
					for(var j=0;j<30;j++){
						mapPaint[i][j]=1000000;
					}
				}
				mapPaint[xpos][ypos]=0
				var iter=0;
				var foundFreePath=false;
				while(!foundFreePath && iter<10000){
					iter++;
					for(var i=1;i<30-1;i++){
						for(var j=1;j<30-1;j++){
							if(mapPaint[i][j]!=-1){
								if(mapPaint[i+1][j]>mapPaint[i][j] && map[i+1][j]==0){
									mapPaint[i+1][j]=mapPaint[i][j]+1;
									if(visits[i+1][j]==0){
										foundFreePath=true;
										xfin=i+1;
										yfin=j;
									}
								}
								if(mapPaint[i-1][j]>mapPaint[i][j] && map[i-1][j]==0){
									mapPaint[i-1][j]=mapPaint[i][j]+1;
									if(visits[i-1][j]==0){
										foundFreePath=true;
										xfin=i-1;
										yfin=j;
									}
								}
								if(mapPaint[i][j+1]>mapPaint[i][j] && map[i][j+1]==0){
									mapPaint[i][j+1]=mapPaint[i][j]+1;
									if(visits[i][j+1]==0){
										foundFreePath=true;
										xfin=i;
										yfin=j+1;
									}
								}
								if(mapPaint[i][j-1]>mapPaint[i][j] && map[i][j-1]==0){
									mapPaint[i][j-1]=mapPaint[i][j]+1;
									if(visits[i][j-1]==0){
										foundFreePath=true;
										xfin=i;
										yfin=j-1;
									}
								}
							}
						}
					}
				}
				if(iter>=10000){
					terr=true;
					print("ERRNOVISIT!!!")
				}else{
					terr=false;
				}
				
				
				visits[xpos][ypos]=1
				movementStep(); //413 NOsendRec
				visits[xpos][ypos]=1
			}
		}
		
	
	xfin=secX+minx
	yfin=secY+miny
	print("finished! Now moving to "+xfin+" "+yfin)
	calculatePath();
	terr=false
	while(!  ( (abs(xfin-xpos)<=1 && abs(yfin-ypos)<=0) ||  (abs(xfin-xpos)<=0 && abs(yfin-ypos)<=1)  )){
		map[xfin][yfin]=0;
		movementStep();
	}
	
	map[xfin][yfin]=1;
	
	print("finish!")

	
	
	//secX = 4;
	//secY = 6;

	rotSecX+=2
	rotSecX=cuboid(rotSecX)
	print(rotSecX)
	//xfin=secX ////////////////
	//yfin=secY ////////////////
	for(var i=arrSecX.length-1;i>=0;i--){
		if(arrSecX[i]=="2"){
			rotSecX-=1;
			rotSecX=cuboid(rotSecX);
		}
		if(arrSecX[i]=="1"){
			rotSecX+=1;
			rotSecX=cuboid(rotSecX);
		}
		if(arrSecX[i]=="3"){
			if(rotSecX==0){
				yfin-=1;
			}
			if(rotSecX==1){
				xfin+=1;
			}
			if(rotSecX==2){
				yfin+=1;
			}
			if(rotSecX==3){
				xfin-=1;
			}
		}
		
		//print(xfin+" "+yfin)
	}
	
	
	print("finished! Now moving to StartSecond "+xfin+" "+yfin)
	
	map[xfin][yfin]=0;
	calculatePath();
	terr=false
	while(xpos!=xfin||ypos!=yfin){
		map[xfin][yfin]=0;
		movementStep();
	}
	
	//481 CheckSecondPoint
	
    brick.display().addLabel("finish",1,1) //вывод ответа
    brick.display().redraw()
    script.wait(10000)
	}
    return 0;
}

function save()
{
	ER.reset();
	EL.reset();
	erol = abs(ER.read());
	elol = abs(EL.read());
	_dist=50;
	lerr=0;
	sp=35;
	while((erol+elol)/2<_dist)
	{
		erol = abs(ER.read());
		elol = abs(EL.read());
		err = (erol) - (elol) - 2;
		P = err * 1.2;
		I = (lerr + err) * 0;
		D = (lerr - err) * 0;
		mot = P+I+D;
		MR(sp - mot,false);
		ML(sp + mot,false);
		lerr = err;
		wait(10);
	}
	MR(sp+10,false);
	ML(sp+10,false);
	script.wait(900);
	extraStop();
	stop();
	turnDown(135);
	wait(100);
}
function movementStep(){
	
			valMap();
			print((maxx-minx)+" "+(maxy-miny))
			printMapPaint(mapPaint)
			printMapPaint(map)
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
					ypos-=1;
				}
				if(rot==1){
					xpos+=1;
				}
				if(rot==2){
					ypos+=1;
				}
				if(rot==3){
					xpos-=1;
				}
			}
			
}
function valMap(){
	valSen();
		if(!sz[1]){
			if(rot==0){
				if(map[xpos][ypos-1]!=1){
					map[xpos][ypos-1]=1;
					calculatePath();
				}
			}
			if(rot==1){
				if(map[xpos+1][ypos]!=1){
					map[xpos+1][ypos]=1;
					calculatePath();
				}
			}
			if(rot==2){
				if(map[xpos][ypos+1]!=1){
					map[xpos][ypos+1]=1;
					calculatePath();
				}
			}
			if(rot==3){
				if(map[xpos-1][ypos]!=1){
					map[xpos-1][ypos]=1;
					calculatePath();
				}
			}
			//print("Wall badLuck=new Wall();")
		}
		
		if(!sz[0]){
			if(rot==1){
				if(map[xpos][ypos-1]!=1){
					map[xpos][ypos-1]=1;
					calculatePath();
				}
			}
			if(rot==2){
				if(map[xpos+1][ypos]!=1){
					map[xpos+1][ypos]=1;
					calculatePath();
				}
			}
			if(rot==3){
				if(map[xpos][ypos+1]!=1){
					map[xpos][ypos+1]=1;
					calculatePath();
				}
			}
			if(rot==0){
				if(map[xpos-1][ypos]!=1){
					map[xpos-1][ypos]=1;
					calculatePath();
				}
			}
			//print("Wall badLuck=new Wall();")
		}
		if(!sz[2]){
			if(rot==3){
				if(map[xpos][ypos-1]!=1){
					map[xpos][ypos-1]=1;
					calculatePath();
				}
			}
			if(rot==0){
				if(map[xpos+1][ypos]!=1){
					map[xpos+1][ypos]=1;
					calculatePath();
				}
			}
			if(rot==1){
				if(map[xpos][ypos+1]!=1){
					map[xpos][ypos+1]=1;
					calculatePath();
				}
			}
			if(rot==2){
				if(map[xpos-1][ypos]!=1){
					map[xpos-1][ypos]=1;
					calculatePath();
				}
			}
			//print("Wall badLuck=new Wall();")
		}
}

function sendRec()
{
		mailbox.send(0,"Check");
		wait(100);
		message =mailbox.receive();
		message =message.split(" ");
		if(message[0]=="Look")
		{
			robotFound = true;
			tecRot = cuboid(rotSecX - 1);
			if(parseInt(message[1],10) == tecRot){
				secX=xpos+1
				secY=ypos
				print("na0")
			}
			if(parseInt(message[1],10) == rotSecX){
				secX=xpos
				secY=ypos+1
				print("na1")
			}
			tecRot = cuboid(rotSecX + 1);
			if(parseInt(message[1],10) == tecRot){
				secX=xpos-1
				secY=ypos
				print("na2")
			}
			tecRot = cuboid(rotSecX + 2);
			if(parseInt(message[1],10) == tecRot){
				secX=xpos
				secY=ypos-1
				print("na3")
			}
						
			map[secX][secY] = 1;
			
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
	
	direction = 0;
	
	//print("rot " + rot);
	deg = (690/(pi*56))*360;
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
	while(((EL.read()+ER.read())/2 < deg))
	{
		gyro = brick.gyroscope().read()[6]/1000;
		if(newrot == 3)
		{
			if(gyro < 0)
				direction = -180;
			else 
				direction = 180;
		}
		simerr = direction - gyro;
		ML(100+(simerr*1))
		MR(100-(simerr*1))
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

	deg = (167/56)*90
	ML(-100)
	MR(100)
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
	
	deg = (167/56)*90;
	ML(100);
	MR(-100);
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
		simerr =  brick.gyroscope().read()[6]/1000 - fullRot;
		ML(50-simerr*0.5);
		MR(50+simerr*0.5);
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




height = 120, width = 160;

image = [];

values = [	[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0]];

iMin = 0, iMax = 0, jMin = 0, jMax = 0;

k1Min = 0, k1Max = 0, k2Min = 0, k2Max = 0;

iA = 0, jA = 0, iB = 0, jB = 0, iC = 0, jC = 0, iD = 0, jD = 0;


function getData(num)
{
	var raw = getPhoto();
	//var raw = script.readAll("C:/Users/ipipos/Desktop/Tatipi/Final/input.txt");
	var mn;
	//raw = raw[0].split(" ");
    for (i = 0; i < height; ++i)
    {
        image[i] = [];
        for (j = 0; j < width; ++j)
        {
            color = raw[i * width + j];
            color='0x'+color;
            image[i][j] = ((color & 0xff0000) >> 18) + ((color & 0xff00) >> 10) + ((color & 0xff)>>2);
        }
    }
    for (i = 0; i < height; ++i)
    {
        for (j = 0; j < 4; j++)
        {
            image[i][j] = 255 + 255 + 255;
        }

    }
  /*  for (i = 0; i < width; ++i)
    {
        for (j = 0; j < 4; j++)
        {
            image[j][i] = 255 + 255 + 255;
			
        }
    }*/

    for (i = 0; i < height; ++i)
    {
        for (j = width-2; j < width; j++)
        {
            image[i][j] = 255 + 255 + 255;
        }

    }

}

function checkRotArTag()
{
    getData(number);
    binarization();
    //printImage();
	if(rightArtag)
	{
		getCorners();
		findPoint();
		
		//printSelectedImage();
		if (values[0][0] == 1 && values[0][5] == 0 && values[5][5] == 0 && values[5][0] == 0)
		{ 
			rotate_clockwise(2);
		}
		else if (values[0][5] == 1 && values[0][0] == 0 && values[5][5] == 0 && values[5][0] == 0)
		{
			rotate_clockwise(1);
		}
		else if (values[5][5] == 1 && values[0][5] == 0 && values[0][0] == 0 && values[5][0] == 0)
		{
		}
		else if (values[5][0] == 1 && values[0][5] == 0 && values[5][5] == 0 && values[0][0] == 0)
		{
			rotate_clockwise(3)
		}
		//else
		//{
			//print("Error: Incorrect ARTag\n");
		//    return [X, Y, NUM];
		//}
		//print(values[0][0]+" "+values[0][1]+" "+values[0][2]);
		//print(values[1][0]+" "+values[1][1]+" "+values[1][2]);
		//print(values[2][0]+" "+values[2][1]+" "+values[2][2]);
		//code ="";
		//code=(values[0][1]*8+values[1][0]*4+values[1][2]*2+values[2][1]);
		//print(code);
		//if(code>=8)
		//	code=code-8;
		//X = values[1][3] * 4 + values[2][0] * 2 + values[2][2];
		//Y = values[2][3] * 4 + values[3][1] * 2 + values[3][2];
		//NUM = values[1][0] * 2 + values[1][2];
	   // string = "" + X + " " + Y + " " + NUM;

		// brick.display().addLabel(string,10,10);
		
		lineValues=[0,values[0][1],values[0][2],values[0][3],values[0][4],values[1][0],values[1][1],values[1][2],values[1][3],values[1][4],values[1][5],values[2][0],values[2][1],values[2][2],values[2][3],values[2][4],values[2][5],values[3][0],values[3][1],values[3][2],values[3][3],values[3][4],values[3][5],values[4][0],values[4][1],values[4][2],values[4][3],values[4][4],values[4][5],values[5][1],values[5][2],values[5][3],values[5][4]]
		controlBits=[0,0,0,0,0,0]
		for(var i=1; i<=32;i++){
			if(i%2==1 && i != 1)
			{
				controlBits[0]+=lineValues[i];
				controlBits[0]=controlBits[0]%2;
			}
			if(i%4>=2 && i !=2)
			{
				controlBits[1]+=lineValues[i];
				controlBits[1]=controlBits[1]%2;
			}
			if(i%8>=4 && i!= 4){
				controlBits[2]+=lineValues[i];
				controlBits[2]=controlBits[2]%2;
			}
			if(i%16>=8 && i!= 8){
				controlBits[3]+=lineValues[i];
				controlBits[3]=controlBits[3]%2;
			}
			if(i%32>=16 && i!= 16){
				controlBits[4]+=lineValues[i];
				controlBits[4]=controlBits[4]%2;
			}
		}
		controlBits[5]+=lineValues[32];
		controlBits[5]%=2;
		
		tusum = 0;
		if(controlBits[0] != lineValues[1])
			tusum +=1;
		if(controlBits[1] != lineValues[2])
			tusum +=2;
		if(controlBits[2] != lineValues[4])
			tusum +=4;
		if(controlBits[3] != lineValues[8])
			tusum +=8;
		if(controlBits[4] != lineValues[16])
			tusum +=16;
		if(controlBits[5] != lineValues[32])
			tusum +=32;
		print(tusum);
		
		if(lineValues[tusum]==1){
			lineValues[tusum]=0
		}else{
			lineValues[tusum]=1
		}
		
		

		kom = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		kom[0] = lineValues[3] * 2 + lineValues[5];
		kom[1] = lineValues[6] * 2 + lineValues[7];
		kom[2] = lineValues[9] * 2 + lineValues[10];
		kom[3] = lineValues[11] * 2 + lineValues[12];
		kom[4] = lineValues[13] * 2 + lineValues[14];
		kom[5] = lineValues[15] * 2 + lineValues[17];
		kom[6] = lineValues[18] * 2 + lineValues[19];
		kom[7] = lineValues[20] * 2 + lineValues[21];
		kom[8] = lineValues[22] * 2 + lineValues[23];
		kom[9] = lineValues[24] * 2 + lineValues[25];
		kom[10] = lineValues[26] * 2 + lineValues[27];
		kom[11] = lineValues[28] * 2 + lineValues[29];
		kom[12] = lineValues[30] * 2 + lineValues[31];
		vivo = "";
		for(var i = 0;i<13;i++)
			if(i != 12)
				vivo += String(kom[i]) + String(" ");
			else
				vivo += String(kom[i]);
		print(vivo);
		vivo = vivo.split(" ");
	}
	else
	{
		print("No ArTag");
		wait(1000);
		getARTagValue(0);
	}	
}

function binarization()
{
	rightArtag = false;
	checkWhite = 0;
    sum = 0;
    for (i = 0; i < height; ++i)
        for (j = 0; j < width; ++j)
            sum += image[i][j];
    mean = sum / height / width;
    for (i = 0; i < height; ++i)
        for (j = 0; j < width; ++j)
		{
            image[i][j] = (4 * image[i][j] > mean ? 0 : 1);
			if(image[i][j] == 0)
				checkWhite++;
		}
	print(checkWhite);
	if(checkWhite > 11000)
		rightArtag = true;
}

function printImage()
{
    for (i = 0; i < height; ++i)
    {
        str = "";
        for (j = 0; j < width; ++j)
            str += ".#ABCD*"[image[i][j]] + " ";//
        print(str);
    }
}

function printSelectedImage()
{
    for (i = iMin; i <= iMax; ++i)
    {
        str = "";
        for (j = jMin; j <= jMax; ++j)
            str += ".#ABCDo*0123456789"[image[i][j]] + " ";//".#ABCD*"
        print(str);
    }
}

function getCorners()
{
    iMin = 0, iMax = 0, jMin = 0, jMax = 0;
    k1Min = 0, k1Max = 0, k2Min = 0, k2Max = 0;
    iMin = height - 1, iMax = 0;
    jMin = width - 1, jMax = 0;
    k1Min = height + width, k1Max = 0;
    k2Min = height + width, k2Max = -width;
    for (i = 0; i < height; ++i)
        for (j = 0; j < width; ++j)
            if (image[i][j])
            {
                iMin = min(iMin, i);
                iMax = max(iMax, i);
                jMin = min(jMin, j);
                jMax = max(jMax, j);
                k1Min = min(k1Min, i + j);
                k1Max = max(k1Max, i + j);
                k2Min = min(k2Min, i - j);
                k2Max = max(k2Max, i - j);
            }
    //if (iMax - iMin < 35 || jMax - jMin < 35) {
    //	print("Error: ARTag is too small to read it\n");
//
    //	iA = 0, jA = 0;

    //	iB = 0, jB = width - 1;
//
    //	iC = height - 1, jC = width - 1;

    //	iD = height - 1, jD = 0;

    //	return;

    //}

    countOfWhite = 0;
    for (i = iMin; i <= iMax; ++i)
    {
        j = jMin;
        while (j <= jMax && !image[i][j])
            ++j, ++countOfWhite;
        if (j < jMax)
        {
            j = jMax;
            while (j >= jMin && !image[i][j])
                --j, ++countOfWhite;
        }
    }
    if (countOfWhite * 2 > (iMax - iMin + 1) * (jMax - jMin + 1))
    {
        // Point A
        i1 = iMin, i2 = iMax;
        while (!image[i1][jMin]) ++i1;
        while (!image[i2][jMin]) --i2;
        iA = round((i1 + i2) / 2), jA = jMin;
        // Point B
        j1 = jMin, j2 = jMax;
        while (!image[iMin][j1]) ++j1;
        while (!image[iMin][j2]) --j2;
        iB = iMin, jB = round((j1 + j2) / 2);
        // Point C
        i1 = iMin, i2 = iMax;
        while (!image[i1][jMax]) ++i1;
        while (!image[i2][jMax]) --i2;
        iC = round((i1 + i2) / 2), jC = jMax;
        // Point D
        j1 = jMin, j2 = jMax;
        while (!image[iMax][j1]) ++j1;
        while (!image[iMax][j2]) --j2;
        iD = iMax, jD = round((j1 + j2) / 2);
    }
    else
    {
        // Point A
        i1 = iMin, i2 = k1Min - jMin;
        while (!image[i1][k1Min - i1]) ++i1;
        while (!image[i2][k1Min - i2]) --i2;
        iA = round((i1 + i2) / 2), jA = k1Min - iA;
        // Point B
        i1 = iMin, i2 = k2Min + jMax;
        while (!image[i1][i1 - k2Min]) ++i1;
        while (!image[i2][i2 - k2Min]) --i2;
        iB = round((i1 + i2) / 2), jB = iB - k2Min;
        // Point C
        i1 = k1Max - jMax, i2 = iMax;
        while (!image[i1][k1Max - i1]) ++i1;
        while (!image[i2][k1Max - i2]) --i2;
        iC = round((i1 + i2) / 2), jC = k1Max - iC;
        // Point D
        i1 = k2Max + jMin, i2 = iMax;
        while (!image[i1][i1 - k2Max]) ++i1;
        while (!image[i2][i1 - k2Max]) --i2;
        iD = round((i1 + i2) / 2), jD = iD - k2Max;
    }
    image[iA][jA] = 2;
    image[iB][jB] = 3;
    image[iC][jC] = 4;
    image[iD][jD] = 5;
}

function intersect1(i1, j1, i2, j2, i3, j3, di, dj)
{
    k1 = (i1 == i2 ? 1e6 : (j2 - j1) / (i2 - i1));
    b1 = j1 - k1 * i1;
    k2 = (i3 + di == i3 ? 1e6 : dj / di);
    b2 = j3 - k2 * i3;
    x3 = (b2 - b1) / (k1 - k2);
    y3 = k1 * x3 + b1;
    return [round(x3), round(y3)];
}

function intersect2(i1, j1, i2, j2, i3, j3, i4, j4)
{
    k1 = (i1 == i2 ? 1e6 : (j2 - j1) / (i2 - i1));
    b1 = j1 - k1 * i1;
    k2 = (i3 == i4 ? 1e6 : (j4 - j3) / (i4 - i3));
    b2 = j3 - k2 * i3;
    i = (b2 - b1) / (k1 - k2);
    j = k1 * i + b1;
    return [round(i), round(j)];
}

function findPoint()
{
    A = [iA, jA];
    B = [iB, jB];
    C = [iC, jC];
    D = [iD, jD];


    AB = [B[0] - A[0], B[1] - A[1]];
    BC = [C[0] - B[0], C[1] - B[1]];
    DC = [C[0] - D[0], C[1] - D[1]];
    AD = [D[0] - A[0], D[1] - A[1]];

	O = intersect2(A[0], A[1], C[0], C[1], B[0], B[1], D[0], D[1]);
	
	
    E = intersect1(B[0], B[1], C[0], C[1], O[0], O[1], AB[0] + DC[0], AB[1] + DC[1]);
    K = intersect1(A[0], A[1], D[0], D[1], O[0], O[1], -AB[0] - DC[0], -AB[1] - DC[1]);
    L = intersect1(C[0], C[1], D[0], D[1], O[0], O[1], AD[0] + BC[0], AD[1] + BC[1]);
    M = intersect1(A[0], A[1], B[0], B[1], O[0], O[1], -AD[0] - BC[0], -AD[1] - BC[1]);

	OA = intersect2(A[0], A[1], C[0], C[1], M[0], M[1], K[0], K[1]);
	OB = intersect2(M[0], M[1], E[0], E[1], B[0], B[1], D[0], D[1]);
	OC = intersect2(A[0], A[1], C[0], C[1], E[0], E[1], L[0], L[1]);
	OD = intersect2(K[0], K[1], L[0], L[1], B[0], B[1], D[0], D[1]);
	AM = [];
	MB = [];
	BE = [];
	EC = [];
	CL = [];
	LD = [];
	DK = [];
	KA = [];
	
	AM[0] = Math.floor((A[0]+M[0])/2);
	AM[1] = Math.floor((A[1]+M[1])/2);
	MB[0] =	Math.floor((M[0]+B[0])/2);
	MB[1] =	Math.floor((M[1]+B[1])/2);
	BE[0] = Math.floor((B[0]+E[0])/2);
	BE[1] = Math.floor((B[1]+E[1])/2);
	EC[0] = Math.floor((E[0]+C[0])/2);
	EC[1] = Math.floor((E[1]+C[1])/2);
	CL[0] = Math.floor((C[0]+L[0])/2);
	CL[1] = Math.floor((C[1]+L[1])/2);
	LD[0] = Math.floor((L[0]+D[0])/2);
	LD[1] = Math.floor((L[1]+D[1])/2);
	DK[0] = Math.floor((D[0]+K[0])/2);
	DK[1] = Math.floor((D[1]+K[1])/2);
	KA[0] = Math.floor((K[0]+A[0])/2);
	KA[1] = Math.floor((K[1]+A[1])/2);
	OM = []
	OE = []
	OL = []
	OK = []
	
	OM[0] = Math.floor((O[0]+M[0])/2);
	OM[1] = Math.floor((O[1]+M[1])/2);
	OE[0] = Math.floor((O[0]+E[0])/2);
	OE[1] = Math.floor((O[1]+E[1])/2);
	OL[0] = Math.floor((O[0]+L[0])/2);
	OL[1] = Math.floor((O[1]+L[1])/2);
	OK[0] = Math.floor((O[0]+K[0])/2);
	OK[1] = Math.floor((O[1]+K[1])/2);
	
	numbers[0] =	intersect2(A[0], A[1], OA[0], OA[1], AM[0],AM[1], KA[0], KA[1]);	
	numbers[1][0] =	Math.floor((AM[0]+OA[0])/2);
	numbers[1][1] =	Math.floor((AM[1]+OA[1])/2);
	numbers[2] =	intersect2(AM[0], AM[1], OM[0], OM[1], M[0],M[1], OA[0], OA[1]);	
	numbers[3][0] =	Math.floor((M[0]+OM[0])/2);
	numbers[3][1] =	Math.floor((M[1]+OM[1])/2);
	numbers[4] =	intersect2(M[0], M[1], OB[0], OB[1], MB[0],MB[1], OM[0], OM[1]);	
	numbers[5][0] =	Math.floor((MB[0]+OB[0])/2);
	numbers[5][1] =	Math.floor((MB[1]+OB[1])/2);
	numbers[6] =	intersect2(MB[0], MB[1], BE[0], BE[1], B[0],B[1], OB[0], OB[1]);	
	
	
	numbers[7][0] =	Math.floor((KA[0]+OA[0])/2);
	numbers[7][1] =	Math.floor((KA[1]+OA[1])/2);
	numbers[8] = OA;
	numbers[9][0] =	Math.floor((OA[0]+OM[0])/2);
	numbers[9][1] =	Math.floor((OA[1]+OM[1])/2);
	numbers[10][0] = OM[0];
	numbers[10][1] = OM[1];
	numbers[11][0] = Math.floor((OM[0]+OB[0])/2);
	numbers[11][1] = Math.floor((OM[1]+OB[1])/2);
	numbers[12] = OB;
	numbers[13][0] = Math.floor((OB[0]+BE[0])/2);
	numbers[13][1] = Math.floor((OB[1]+BE[1])/2);
	
	numbers[14] =	intersect2(KA[0], KA[1], OK[0], OK[1], OA[0],OA[1], K[0], K[1]);	
	numbers[15][0] =	Math.floor((OA[0]+OK[0])/2);
	numbers[15][1] =	Math.floor((OA[1]+OK[1])/2);
	numbers[16] =	intersect2(OA[0], OA[1], O[0], O[1], OM[0],OM[1], OK[0], OK[1]);	
	numbers[17][0] =	Math.floor((OM[0]+O[0])/2);
	numbers[17][1] =	Math.floor((OM[1]+O[1])/2);
	numbers[18] =	intersect2(OM[0], OM[1], OE[0], OE[1], OB[0],OB[1], O[0], O[1]);	
	numbers[19][0] =	Math.floor((OB[0]+OE[0])/2);
	numbers[19][1] =	Math.floor((OB[1]+OE[1])/2);
	numbers[20] =	intersect2(OB[0], OB[1], E[0], E[1], BE[0],BE[1], OE[0], OE[1]);
	
	numbers[21][0] =	Math.floor((K[0]+OK[0])/2);
	numbers[21][1] =	Math.floor((K[1]+OK[1])/2);
	numbers[22] = OK;
	numbers[23][0] =	Math.floor((OK[0]+O[0])/2);
	numbers[23][1] =	Math.floor((OK[1]+O[1])/2);
	numbers[24][0] = O[0];
	numbers[24][1] = O[1];
	numbers[25][0] = Math.floor((O[0]+OE[0])/2);
	numbers[25][1] = Math.floor((O[1]+OE[1])/2);
	numbers[26] = OE;
	numbers[27][0] = Math.floor((OE[0]+E[0])/2);
	numbers[27][1] = Math.floor((OE[1]+E[1])/2);


	numbers[28] =	intersect2(K[0], K[1], OD[0], OD[1], OK[0],OK[1], DK[0], DK[1]);	
	numbers[29][0] =	Math.floor((OK[0]+OD[0])/2);
	numbers[29][1] =	Math.floor((OK[1]+OD[1])/2);
	numbers[30] =	intersect2(OK[0], OK[1], OL[0], OL[1], O[0],O[1], OD[0], OD[1]);	
	numbers[31][0] =	Math.floor((O[0]+OL[0])/2);
	numbers[31][1] =	Math.floor((O[1]+OL[1])/2);
	numbers[32] =	intersect2(O[0], O[1], OC[0], OC[1], OE[0],OE[1], OL[0], OL[1]);	
	numbers[33][0] =	Math.floor((OE[0]+OC[0])/2);
	numbers[33][1] =	Math.floor((OE[1]+OC[1])/2);
	numbers[34] =	intersect2(OE[0], OE[1], EC[0], EC[1], E[0],E[1], OC[0], OC[1]);	
	
	numbers[35][0] =	Math.floor((DK[0]+OD[0])/2);
	numbers[35][1] =	Math.floor((DK[1]+OD[1])/2);
	numbers[36] = OD;
	numbers[37][0] =	Math.floor((OD[0]+OL[0])/2);
	numbers[37][1] =	Math.floor((OD[1]+OL[1])/2);
	numbers[38][0] = OL[0];
	numbers[38][1] = OL[1];
	numbers[39][0] = Math.floor((OL[0]+OC[0])/2);
	numbers[39][1] = Math.floor((OL[1]+OC[1])/2);
	numbers[40] = OC;
	numbers[41][0] = Math.floor((OC[0]+EC[0])/2);
	numbers[41][1] = Math.floor((OC[1]+EC[1])/2);
	
	numbers[42] =	intersect2(DK[0], DK[1], LD[0], LD[1], OD[0],OD[1], D[0], D[1]);	
	numbers[43][0] =	Math.floor((OD[0]+LD[0])/2);
	numbers[43][1] =	Math.floor((OD[1]+LD[1])/2);
	numbers[44] =	intersect2(OD[0], OD[1], L[0], L[1], OL[0],OL[1], LD[0], LD[1]);	
	numbers[45][0] =	Math.floor((OL[0]+L[0])/2);
	numbers[45][1] =	Math.floor((OL[1]+L[1])/2);
	numbers[46] =	intersect2(OL[0], OL[1], CL[0], CL[1], OC[0],OC[1], L[0], L[1]);	
	numbers[47][0] =	Math.floor((OC[0]+CL[0])/2);
	numbers[47][1] =	Math.floor((OC[1]+CL[1])/2);
	numbers[48] =	intersect2(OC[0], OC[1], C[0], C[1], EC[0],EC[1], CL[0], CL[1]);
  
	tem = [4];
	for(uf=0;uf<4;uf++)
		tem[uf]=[];
	
	itd=0;
	for(ia=0;ia<6;ia++)
	{
		for(ja=0;ja<6;ja++)
		{
			tem[0]=numbers[itd];
			tem[1]=numbers[itd+8];
			tem[2]=numbers[itd+1];
			tem[3]=numbers[itd+7];
			val = [];
			val = intersect2(tem[0][0],tem[0][1],tem[1][0],tem[1][1],tem[2][0],tem[2][1],tem[3][0],tem[3][1])
			values[ia][ja] = (image[val[0]][val[1]]+1)%2;
			itd++;
		}
		itd++;
	}
	//print("val")
	//for(lo=0;lo<7;lo++)
	//print(values[lo])
	//print(" ");
	
/*	
	
	image[AM[0]][AM[1]]=6
	image[MB[0]][MB[1]]=6
	image[BE[0]][BE[1]]=6
	image[EC[0]][EC[1]]=6
	image[CL[0]][CL[1]]=6
	image[LD[0]][LD[1]]=6
	image[DK[0]][DK[1]]=6
	image[KA[0]][KA[1]]=6
	image[numbers[0][0]][numbers[0][1]]=9
	image[OM[0]][OM[1]]=6
	image[OE[0]][OE[1]]=6
	image[OL[0]][OL[1]]=6
	image[OK[0]][OK[1]]=6
	*/
	//for(i=0;i<7;i++)
		//for(j=0;j<7;j++)
		//image[numbers[i*7+j][0]][numbers[i*7+j][1]]=0;
		//image[K[0]][K[1]]=6
	//image[K[0]][K[1]]=6
	
	//image[L[0]][L[1]]=5
	//image[M[0]][M[1]]=6
    /*image[W4[0]][W4[1]]=7;//0
    image[H4[0]][H4[1]]=8;//1
    image[W1[0]][W1[1]]=9;//2
    image[H3[0]][H3[1]]=10;//3
    image[O[0]][O[1]]=11;//4
    image[H1[0]][H1[1]]=12;//5
    image[W3[0]][W3[1]]=13;//6
    image[H2[0]][H2[1]]=14;//7
    image[W2[0]][W2[1]]=15;//8

*/

}

function rotate_clockwise(times)
{
    for (i = 0; i < times; i = i + 1)
    {
        values_temp = [	[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0], 
						[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0],
						[0, 0, 0, 0, 0, 0]];
        for (j = 0; j < 6; j = j + 1)
        {
            for (z = 0; z < 6; z = z + 1)
            {
                values_temp[z][5-j] = values[j][z]
            }
        }
        values = values_temp;
    }
}

function getARTagValue(number)
{
    getData(number);
    binarization();
    //printImage();
	if(rightArtag)
	{
		getCorners();
		findPoint();
		
		//printSelectedImage();
		if (values[0][0] == 1 && values[0][5] == 0 && values[5][5] == 0 && values[5][0] == 0)
		{ 
			rotate_clockwise(2);
		}
		else if (values[0][5] == 1 && values[0][0] == 0 && values[5][5] == 0 && values[5][0] == 0)
		{
			rotate_clockwise(1);
		}
		else if (values[5][5] == 1 && values[0][5] == 0 && values[0][0] == 0 && values[5][0] == 0)
		{
		}
		else if (values[5][0] == 1 && values[0][5] == 0 && values[5][5] == 0 && values[0][0] == 0)
		{
			rotate_clockwise(3)
		}
		
		lineValues=[0,values[0][1],values[0][2],values[0][3],values[0][4],values[1][0],values[1][1],values[1][2],values[1][3],values[1][4],values[1][5],values[2][0],values[2][1],values[2][2],values[2][3],values[2][4],values[2][5],values[3][0],values[3][1],values[3][2],values[3][3],values[3][4],values[3][5],values[4][0],values[4][1],values[4][2],values[4][3],values[4][4],values[4][5],values[5][1],values[5][2],values[5][3],values[5][4]]
		controlBits=[0,0,0,0,0,0]
		for(var i=1; i<=32;i++){
			if(i%2==1 && i != 1)
			{
				controlBits[0]+=lineValues[i];
				controlBits[0]=controlBits[0]%2;
			}
			if(i%4>=2 && i !=2)
			{
				controlBits[1]+=lineValues[i];
				controlBits[1]=controlBits[1]%2;
			}
			if(i%8>=4 && i!= 4){
				controlBits[2]+=lineValues[i];
				controlBits[2]=controlBits[2]%2;
			}
			if(i%16>=8 && i!= 8){
				controlBits[3]+=lineValues[i];
				controlBits[3]=controlBits[3]%2;
			}
			if(i%32>=16 && i!= 16){
				controlBits[4]+=lineValues[i];
				controlBits[4]=controlBits[4]%2;
			}
		}
		controlBits[5]+=lineValues[32];
		controlBits[5]%=2;
		
		tusum = 0;
		if(controlBits[0] != lineValues[1])
			tusum +=1;
		if(controlBits[1] != lineValues[2])
			tusum +=2;
		if(controlBits[2] != lineValues[4])
			tusum +=4;
		if(controlBits[3] != lineValues[8])
			tusum +=8;
		if(controlBits[4] != lineValues[16])
			tusum +=16;
		if(controlBits[5] != lineValues[32])
			tusum +=32;
		print(tusum);
		
		if(lineValues[tusum]==1){
			lineValues[tusum]=0
		}else{
			lineValues[tusum]=1
		}
		
		

		kom = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		kom[0] = lineValues[3] * 2 + lineValues[5];
		kom[1] = lineValues[6] * 2 + lineValues[7];
		kom[2] = lineValues[9] * 2 + lineValues[10];
		kom[3] = lineValues[11] * 2 + lineValues[12];
		kom[4] = lineValues[13] * 2 + lineValues[14];
		kom[5] = lineValues[15] * 2 + lineValues[17];
		kom[6] = lineValues[18] * 2 + lineValues[19];
		kom[7] = lineValues[20] * 2 + lineValues[21];
		kom[8] = lineValues[22] * 2 + lineValues[23];
		kom[9] = lineValues[24] * 2 + lineValues[25];
		kom[10] = lineValues[26] * 2 + lineValues[27];
		kom[11] = lineValues[28] * 2 + lineValues[29];
		kom[12] = lineValues[30] * 2 + lineValues[31];
		vivo = "";
		for(var i = 0;i<13;i++)
			if(i != 12)
				vivo += String(kom[i]) + String(" ");
			else
				vivo += String(kom[i]);
		print(vivo);
		vivo = vivo.split(" ");
	}
	else
	{
		print("No ArTag");
		wait(1000);
		getARTagValue(0);
	}
    return 0;
}
