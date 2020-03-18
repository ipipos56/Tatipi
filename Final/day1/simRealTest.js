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
h = 17;
point = 144;
rot = 1;
iznrot = 1;

fullRot = 0;

map = new Array(17);
mapPaint = new Array(17);



s = new Array(3);
s[0] = brick.sensor(A2);
s[1] = brick.sensor(D1);
s[2] = brick.sensor(A1);

sz = [0,0,0];


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
	
	
	for(var i=0;i<17;i++){
		map[i]=new Array(17);
		for(var j=0;j<17;j++){
			map[i][j]=0;
		}
	}
	for(var i=0;i<17;i++){
		map[0][i]=1;
		map[16][i]=1;
		map[i][0]=1;
		map[i][16]=1;
	}
	
	ER.reset()
	EL.reset()
	
	brick.gyroscope().calibrate(4000);
	script.wait(4050);
	moveSmall();
	
	var raw = script.readAll("C:/Users/ipipos/Desktop/Tatipi/Final/input.txt");
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
		
		//Right_();
		//Left_();
		//forward(1);
		//robotRotation(<0==left>)
		
		if(!(rot==0 && movedir==3) && (rot<movedir || (rot==3 && movedir==0))){
			//while(rot!=movedir){
			if(abs(rot-movedir)<2){
				//valMap();
				turn_right();
			}else{
				turn_left();
				turn_left();
			}
		}else{
			if(abs(rot-movedir)<2){
				//valMap();
				turn_left();
			}else{
				turn_left();
				turn_left();
			}
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



function motors(_ml,_mr)
{
	ML(_ml,false);
	MR(_mr,false);
}
//
function forward(_path_deg)
{
	path_sm=42;
	var path_deg = 590;//path_sm * 240/(8.2*pi);
	EL.reset();
	ER.reset();
	lLast = EL.read();
	rLast = ER.read();
	var speed=25;
	var err_sensor=0;
	var err_sensor1=0
	var err_sensor2=0
	var err_sensor3=0
	var err_sensor4=0
	var err_sensor5=0
	print(path_deg);
	var curL=abs(EL.read());
	var curR=abs(ER.read());
	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)+0.3)*1.2
		_s0 = s[0].read();
		_s2 = s[2].read();
		if(bortnum==0)
		{
			s0=14;
			s2=14;
		}
		else
		{
			s0=14;
			s2=14;
		}
		if(_s0<20)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)+0.3)*1.2
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-s[0].read();
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err+err_sensor*2.5,speed-err-err_sensor*2.5)
			
		}
		else
		{
			_s2=s[2].read();
			if(_s2<20)
			{
				err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)+0.3)*1.2
				err_sensor3=err_sensor2;
				err_sensor2=err_sensor1;
				err_sensor1=s2-s[2].read();
				err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
				motors(speed+err-err_sensor*2.5,speed-err+err_sensor*2.5)	
			}
			else
			{
				motors(speed+err,speed-err)
			}
		}
		wait(30);
	}
	print((abs(EL.read())-lLast)+"\n");
	extraStop();
	stop();
}
//

function valSen()
{
    for(var _i = 0; _i<3; _i++)
    {
		if(_i==0||_i==2)
		{
			sz[_i] = s[_i].read();
			if(sz[_i] > 24)
				sz[_i] = 1;
			else
				sz[_i] = 0;
		}
		else
		{
			sz[_i] = s[_i].read();
			if(sz[_i] > 21)
				sz[_i] = 1;
			else
				sz[_i] = 0;
		}
			
    }

}
//

//function left()
//{
//}
//
//function right()
//{
//}
//
function turnForw(_dist)
{
	ER.reset();
	EL.reset();
    erol = abs(ER.read());
    elol = abs(EL.read());
	lerr=0;
    sp=25;
    while((erol+elol)/2<_dist)
    {
        erol = abs(ER.read());
        elol = abs(EL.read());
        err = (erol) - (elol) + 0.2;
        P = err * 1.1;
        I = (lerr + err) * 0;
        D = (lerr - err) * 0;
        mot = P+I+D;
        MR(sp - mot,false);
        ML(sp + mot,false);
        lerr = err;
        wait(10);
    }
	trueLeft = EL.read();
	trueRight = ER.read();
    extraStop();
	stop();

}
//

function doWhall()
{
    sp=30;
    _s1=s[1].read();
	ER.reset();
	EL.reset();
	lerr=0;
    while(_s1>7)
    {
        _s1=s[1].read();
        erol = abs(ER.read());
        elol = abs(EL.read());
        err = (erol) - (elol) - 0;
        P = err * 1.2;
        I = (lerr + err) * 0;
        D = (lerr - err) * 0;
        mot = P+I+D;
        MR(sp - mot);
        ML(sp + mot);
        lerr = err;
        wait(15);
    }
	extraStop();
	stop();
}
//


function turnDown(_dist)
{
    ER.reset();
    EL.reset();
    erol = abs(ER.read());
    elol = abs(EL.read());
	lerr=0;
    sp=-25;
    while((erol+elol)/2<_dist)
    {
        erol = abs(ER.read());
        elol = abs(EL.read());
        err = (elol) - (erol) - 1;
        P = err * 1.1;
        I = (lerr + err) * 0;
        D = (lerr - err) * 0;
        mot = P+I+D;
        MR(sp - mot,false);
        ML(sp + mot,false);
        lerr = err;
        wait(10);
    }
    ML(30,false);
    MR(30,false);
    wait(20);
	stop();

}


function valSens()
{
}
function extraStop()
{
	ML(-30,false);
	MR(-30,false);
	wait(20);
}
//

ML_REQUIRED=0;
MR_REQUIRED=0;





function Left_()
{
	turnForw(140);
	rotate(-90);
	turnDown(140);
}
//
function Right_()
{
	turnForw(140);
	rotate(90);
	turnDown(140);
}
EL_OLD=0;
ER_OLD=0;
EL_NEW=0;
ER_NEW=0;
ML_INTEGRAL=0;
MR_INTEGRAL=0;

MAX_INTEGRAL=20;

KP=2;
KI=0.3;
KD=1;
DT=5;


function right(_ML_FINISH,_MR_FINISH){
	
	ER.reset();
	EL.reset();
	MAIN_ACCEL=0.1;
	ML_REQUIRED=0;
	MR_REQUIRED=0;
	ML_FINISH=_ML_FINISH;
	MR_FINISH=_MR_FINISH;
	//ML_FINISH=-236;
	//MR_FINISH=235;
	ML_SPEED=0;
	MR_SPEED=0;
	ERR=100000;
	REAL_ERR=100000;
	while(ERR>4){
		EL_NEW=-EL.read();
		ER_NEW=-ER.read();
		
		if(ML_FINISH<ML_REQUIRED){
			if(abs(ML_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				ML_SPEED-=MAIN_ACCEL
			}else{
				ML_SPEED+=MAIN_ACCEL
			}
		}else{
			if(abs(ML_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				ML_SPEED+=MAIN_ACCEL
			}else{
				ML_SPEED-=MAIN_ACCEL
			}
		}
		
		if(MR_FINISH<MR_REQUIRED){
			if(abs(MR_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				MR_SPEED-=MAIN_ACCEL
			}else{
				MR_SPEED+=MAIN_ACCEL
			}
		}else{
			if(abs(MR_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				MR_SPEED+=MAIN_ACCEL
			}else{
				MR_SPEED-=MAIN_ACCEL
			}
		}
		
		//print((abs(ML_REQUIRED-ML_FINISH)+abs(MR_REQUIRED-MR_FINISH))+"\n")
		if(abs(ML_REQUIRED-ML_FINISH)+abs(MR_REQUIRED-MR_FINISH)>abs(MR_SPEED)+abs(ML_SPEED)){
			ML_REQUIRED+=ML_SPEED;
			MR_REQUIRED+=MR_SPEED;
		}
		
		if(EL_NEW<ML_REQUIRED){
			ML_INTEGRAL+=KI;
		}else{
			ML_INTEGRAL-=KI;
		}
		if(ER_NEW<MR_REQUIRED){
			MR_INTEGRAL+=KI;
		}else{
			MR_INTEGRAL-=KI;
		}
		if(MR_INTEGRAL>MAX_INTEGRAL)MR_INTEGRAL=MAX_INTEGRAL;
		if(MR_INTEGRAL<-MAX_INTEGRAL)MR_INTEGRAL=-MAX_INTEGRAL;
			
		if(ML_INTEGRAL>MAX_INTEGRAL)ML_INTEGRAL=MAX_INTEGRAL;
		if(ML_INTEGRAL<-MAX_INTEGRAL)ML_INTEGRAL=-MAX_INTEGRAL;
		
		ML_POWER=(EL_NEW-ML_REQUIRED)*KP-ML_INTEGRAL-(EL_OLD-EL_NEW)*KD;
		MR_POWER=(ER_NEW-MR_REQUIRED)*KP-MR_INTEGRAL-(ER_OLD-ER_NEW)*KD;
		
		ML(ML_POWER,false)
		MR(MR_POWER,false)
		
		ERR=abs(ER_NEW-MR_FINISH)+abs(EL_NEW-ML_FINISH);
		REAL_ERR=abs(ER_NEW-MR_REQUIRED)+abs(EL_NEW-ML_REQUIRED);
		
		ER_OLD=ER_NEW;
		EL_OLD=EL_NEW;
		
		script.wait(DT);
	}
	ML(-20,false);
	MR(20,false);
	script.wait(20);
	stop();
}
//


function left(_ML_FINISH,_MR_FINISH){
	ER.reset();
	EL.reset();
	MAIN_ACCEL=0.1;
	ML_REQUIRED=0;
	MR_REQUIRED=0;
	ML_FINISH=_ML_FINISH;
	MR_FINISH=_MR_FINISH;
	//ML_FINISH=231;
	//MR_FINISH=-231;
	ML_SPEED=0;
	MR_SPEED=0;
	ERR=100000;
	REAL_ERR=100000;
	while(ERR>4){
		EL_NEW=-EL.read();
		ER_NEW=-ER.read();
		
		if(ML_FINISH<ML_REQUIRED){
			if(abs(ML_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				ML_SPEED-=MAIN_ACCEL
			}else{
				ML_SPEED+=MAIN_ACCEL
			}
		}else{
			if(abs(ML_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				ML_SPEED+=MAIN_ACCEL
			}else{
				ML_SPEED-=MAIN_ACCEL
			}
		}
		
		if(MR_FINISH<MR_REQUIRED){
			if(abs(MR_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				MR_SPEED-=MAIN_ACCEL
			}else{
				MR_SPEED+=MAIN_ACCEL
			}
		}else{
			if(abs(MR_REQUIRED)<=abs((MR_FINISH*1.1)/2)){
				MR_SPEED+=MAIN_ACCEL
			}else{
				MR_SPEED-=MAIN_ACCEL
			}
		}
		
		//print((abs(ML_REQUIRED-ML_FINISH)+abs(MR_REQUIRED-MR_FINISH))+"\n")
		if(abs(ML_REQUIRED-ML_FINISH)+abs(MR_REQUIRED-MR_FINISH)>abs(MR_SPEED)+abs(ML_SPEED)){
			ML_REQUIRED+=ML_SPEED;
			MR_REQUIRED+=MR_SPEED;
		}
		
		if(EL_NEW<ML_REQUIRED){
			ML_INTEGRAL+=KI;
		}else{
			ML_INTEGRAL-=KI;
		}
		if(ER_NEW<MR_REQUIRED){
			MR_INTEGRAL+=KI;
		}else{
			MR_INTEGRAL-=KI;
		}
		if(MR_INTEGRAL>MAX_INTEGRAL)MR_INTEGRAL=MAX_INTEGRAL;
		if(MR_INTEGRAL<-MAX_INTEGRAL)MR_INTEGRAL=-MAX_INTEGRAL;
			
		if(ML_INTEGRAL>MAX_INTEGRAL)ML_INTEGRAL=MAX_INTEGRAL;
		if(ML_INTEGRAL<-MAX_INTEGRAL)ML_INTEGRAL=-MAX_INTEGRAL;
		
		ML_POWER=(EL_NEW-ML_REQUIRED)*KP-ML_INTEGRAL-(EL_OLD-EL_NEW)*KD;
		MR_POWER=(ER_NEW-MR_REQUIRED)*KP-MR_INTEGRAL-(ER_OLD-ER_NEW)*KD;
		
		ML(ML_POWER,false)
		MR(MR_POWER,false)
		
		ERR=abs(ER_NEW-MR_FINISH)+abs(EL_NEW-ML_FINISH);
		REAL_ERR=abs(ER_NEW-MR_REQUIRED)+abs(EL_NEW-ML_REQUIRED);
		
		ER_OLD=ER_NEW;
		EL_OLD=EL_NEW;
		
		script.wait(DT);
	}
	ML(20,false);
	MR(-20,false);
	script.wait(20);
	stop();
}
//


function robotRotation(_r)
{
	switch(_r)
	{
		case 0:
			var doupor=false;
			if(s[1].read()<23)
				doupor=true;
			//turnForw(140);
			if(doupor==1)
			{
				ER.reset();
				EL.reset();
				erol = abs(ER.read());
				elol = abs(EL.read());
				_dist=120;
				lerr=0;
				sp=25;
				while((erol+elol)/2<_dist)
				{
					erol = abs(ER.read());
					elol = abs(EL.read());
					err = (erol) - (elol) - 0;
					P = err * 1.2;
					I = (lerr + err) * 0;
					D = (lerr - err) * 0;
					mot = P+I+D;
					MR(sp - mot,false);
					ML(sp + mot,false);
					lerr = err;
					wait(10);
				}
				MR(sp,false);
				ML(sp,false);
				script.wait(800);
				extraStop();
				stop();
				turnDown(100);
				wait(100);
				left(470,-468)
				_dist=150;
				ER.reset();
				EL.reset();
				erol = abs(ER.read());
				elol = abs(EL.read());
				lerr=0;
				sp=-25;
				while((erol+elol)/2<_dist)
				{
					erol = abs(ER.read());
					elol = abs(EL.read());
					err = (elol) - (erol) - 1;
					P = err * 1.1;
					I = (lerr + err) * 0;
					D = (lerr - err) * 0;
					mot = P+I+D;
					MR(sp - mot,false);
					ML(sp + mot,false);
					lerr = err;
					wait(10);
				}
				ML(sp,false);
				MR(sp,false);
				script.wait(650);
				ML(30,false);
				MR(30,false);
				wait(20);
				stop();
				turnForw(60);
			}
			else
			{
				turnForw(120);
				left(470,-468);
				turnDown(125);
			}
		break;
		case 1:
			var doupor=false;
			if(s[1].read()<23)
				doupor=true;
			//turnForw(140);
			if(doupor==1)
			{
				ER.reset();
				EL.reset();
				erol = abs(ER.read());
				elol = abs(EL.read());
				_dist=120;
				lerr=0;
				sp=25;
				while((erol+elol)/2<_dist)
				{
					erol = abs(ER.read());
					elol = abs(EL.read());
					err = (erol) - (elol) - 0;
					P = err * 1.2;
					I = (lerr + err) * 0;
					D = (lerr - err) * 0;
					mot = P+I+D;
					MR(sp - mot,false);
					ML(sp + mot,false);
					lerr = err;
					wait(10);
				}
				MR(sp,false);
				ML(sp,false);
				script.wait(800);
				extraStop();
				stop();
				turnDown(100);
				wait(100);
				left(-468,470)
				_dist=150;
				ER.reset();
				EL.reset();
				erol = abs(ER.read());
				elol = abs(EL.read());
				lerr=0;
				sp=-25;
				while((erol+elol)/2<_dist)
				{
					erol = abs(ER.read());
					elol = abs(EL.read());
					err = (elol) - (erol) - 1;
					P = err * 1.1;
					I = (lerr + err) * 0;
					D = (lerr - err) * 0;
					mot = P+I+D;
					MR(sp - mot,false);
					ML(sp + mot,false);
					lerr = err;
					wait(10);
				}
				ML(sp,false);
				MR(sp,false);
				script.wait(650);
				ML(30,false);
				MR(30,false);
				wait(20);
				stop();
				turnForw(60);
			}
			else
			{
				turnForw(120);
				left(-468,470);
				turnDown(125);
			}
		break;
	}
}
//


function stop()
{
    MR(0,false) 
    ML(0,false)
    wait(150)
}
//
function rotate(_deg)
{
    var elLast=EL.read();
    var erLast=ER.read();
    var rightEnc=0;
    var leftEnc=0;
    var _err=0;
    var sgn=sign(_deg);
	if(bortnum==0)
	{
		if(sgn>0)
			_rot=224
		else
			 _rot=224
	}
	else
	{
		if(sgn>0)
			right(-234,235)
		else
			 left(234,-233)
	}
}
//
