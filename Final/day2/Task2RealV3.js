var __interpretation_started_timestamp__;
var pi = 3.141592653589793;
var trick=false;
var bortnum = mailbox.myHullNumber();
sensorDist=0;

wait = script.wait;
trueLeft=0;
trueRight=0;
rot = 0;

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

sz = [0,0,0];

ML = brick.motor(M3).setPower;
MR = brick.motor(M4).setPower;
EL = brick.encoder(E3);
ER = brick.encoder(E4);
ER.reset();
EL.reset();

xpos=15;
ypos=15;

xfin=1;
yfin=1;

terr=false;

map = new Array(30);
mapPaint = new Array(30);

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
		print("ERR!!!")
	}else{
		terr=false;
	}
}
function movementStep(){
			wait(500);
				
			print("valSen");
			
			//brick.keys().buttonCode(1);
			valMap();
			//print((maxx-minx)+" "+(maxy-miny))
			//printMapPaint(mapPaint)
			//printMapPaint(map)
			//print()
			movedir=-1;
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
			//print("MovementStep");
			//print(movedir);
			
			if(rot==0 && movedir==0){
				
			}
			if(rot==0 && movedir==1){
				print("right");
				//brick.keys().buttonCode(1);
				Right_();

			}
			if(rot==0 && movedir==2){
				print("return");
				//brick.keys().buttonCode(1);
				robotRotation(0);
			}
			if(rot==0 && movedir==3){
				print("left");
				//brick.keys().buttonCode(1);
				Left_();
			}
			
			
			if(rot==1 && movedir==0){
				print("left");
				//brick.keys().buttonCode(1);
				Left_();				
			}
			if(rot==1 && movedir==1){
				
			}
			if(rot==1 && movedir==2){
				print("right");
				//brick.keys().buttonCode(1);
				Right_();
			}
			if(rot==1 && movedir==3){
				print("return");
				//brick.keys().buttonCode(1);
				robotRotation(0);
			}
			
			
			if(rot==2 && movedir==0){
				print("return");
				//brick.keys().buttonCode(1);
				robotRotation(0);
			}
			if(rot==2 && movedir==1){
				print("left");
				//brick.keys().buttonCode(1);
				Left_();
			}
			if(rot==2 && movedir==2){
				
			}
			if(rot==2 && movedir==3){
				print("right");
				//brick.keys().buttonCode(1);
				Right_();
			}
			
			
			if(rot==3 && movedir==0){
				print("right");
				//brick.keys().buttonCode(1);
				Right_();
			}
			if(rot==3 && movedir==1){
				print("return");
				//brick.keys().buttonCode(1);
				robotRotation(0);
			}
			if(rot==3 && movedir==2){
				print("left");
				//brick.keys().buttonCode(1);
				Left_();
			}
			if(rot==3 && movedir==3){
				
			}
			
			wait(500);
			print("valSen");
			//brick.keys().buttonCode(1);
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
				print("forward");
				//brick.keys().buttonCode(1);
				forward(1);
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
				}
			}
			if(rot==1){
				if(map[xpos+1][ypos]!=1){
					map[xpos+1][ypos]=1;
				}
			}
			if(rot==2){
				if(map[xpos][ypos+1]!=1){
					map[xpos][ypos+1]=1;
				}
			}
			if(rot==3){
				if(map[xpos-1][ypos]!=1){
					map[xpos-1][ypos]=1;
				}
			}
			//print("Wall badLuck=new Wall();")
		}
		
		if(!sz[0]){
			if(rot==1){
				if(map[xpos][ypos-1]!=1){
					map[xpos][ypos-1]=1;
				}
			}
			if(rot==2){
				if(map[xpos+1][ypos]!=1){
					map[xpos+1][ypos]=1;
				}
			}
			if(rot==3){
				if(map[xpos][ypos+1]!=1){
					map[xpos][ypos+1]=1;
				}
			}
			if(rot==0){
				if(map[xpos-1][ypos]!=1){
					map[xpos-1][ypos]=1;
				}
			}
			//print("Wall badLuck=new Wall();")
		}
		if(!sz[2]){
			if(rot==3){
				if(map[xpos][ypos-1]!=1){
					map[xpos][ypos-1]=1;
				}
			}
			if(rot==0){
				if(map[xpos+1][ypos]!=1){
					map[xpos+1][ypos]=1;
				}
			}
			if(rot==1){
				if(map[xpos][ypos+1]!=1){
					map[xpos][ypos+1]=1;
				}
			}
			if(rot==2){
				if(map[xpos-1][ypos]!=1){
					map[xpos-1][ypos]=1;
				}
			}
			//print("Wall badLuck=new Wall();")
		}
		
		calculatePath();
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
		if(sz[_i] < 24)
			sz[_i] = 0;
		else
			sz[_i] = 1;
	}
}
//


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
boolDist=false;
function forward(_path_deg)
{
	EL.reset();
	ER.reset();
	path_sm=42;
	var path_deg = 591;//path_sm * 240/(8.2*pi);
	EL.reset();
	ER.reset();
	lLast = EL.read();
	rLast = ER.read();
	var speed=30;
	var err_sensor=0;
	var err_sensor1=0
	var err_sensor2=0
	var err_sensor3=0
	var err_sensor4=0
	var err_sensor5=0
	//print(path_deg);
	var curL=abs(EL.read());
	var curR=abs(ER.read())
	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.3
		_s0 = s[0].read();
		_s2 = s[2].read();
		
		if(_s0<20)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.1
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-_s0;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/3+err_sensor*1.7,speed-err/3-err_sensor*1.7)
		}
		else
		{
			_s2=s[2].read();
			if(_s2<20)
			{
				
				err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.1
				err_sensor3=err_sensor2;
				err_sensor2=err_sensor1;
				err_sensor1=s2-_s2;
				err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
				motors(speed+err/3-err_sensor*1.7,speed-err/3+err_sensor*1.7)	
			}
			else
			{
				err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.1
				motors(speed+err,speed-err)
			}
		}
		wait(30);
	}
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
			if(sz[_i] > 20)
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

function turnForw(_dist,_off)
{
	path_sm=42;
	var path_deg = _dist;//path_sm * 240/(8.2*pi);
	EL.reset();
	ER.reset();
	lLast = EL.read();
	rLast = ER.read();
	var speed=27;
	var err_sensor=0;
	var err_sensor1=0
	var err_sensor2=0
	var err_sensor3=0
	var err_sensor4=0
	var err_sensor5=0
	var curL=abs(EL.read());
	var curR=abs(ER.read());

	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.2
		_s0 = s[0].read();
		_s2 = s[2].read();
		if(_s0<20&&_off==0)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.2
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-_s0;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/3+err_sensor*2.3,speed-err/3-err_sensor*2.3)
		}
		else
		{
			_s2=s[2].read();
			if(_s2<20&&_off==0)
			{
				err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.2
				err_sensor3=err_sensor2;
				err_sensor2=err_sensor1;
				err_sensor1=s2-_s2;
				err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
				motors(speed+err/3-err_sensor*2.3,speed-err/3+err_sensor*2.3)	
			}
			else
			{
				motors(speed+err,speed-err)
			}
		}
		wait(30);
	}
	extraStop();
	stop();
}
//
function turnForward(_dist)//dlya povorota
{
	path_sm=42;
	var path_deg = _dist;//path_sm * 240/(8.2*pi);
	EL.reset();
	ER.reset();
	lLast = EL.read();
	rLast = ER.read();
	var speed=30;
	var err_sensor=0;
	var err_sensor1=0
	var err_sensor2=0
	var err_sensor3=0
	var err_sensor4=0
	var err_sensor5=0
	var curL=abs(EL.read());
	var curR=abs(ER.read());

	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.2
		_s0 = s[0].read();
		_s2 = s[2].read();
		if(_s0<20)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.2
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-_s0;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/3+err_sensor*1.7,speed-err/3-err_sensor*1.7)
		}
		else
		{
			_s2=s[2].read();
			if(_s2<20)
			{
				err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.2
				err_sensor3=err_sensor2;
				err_sensor2=err_sensor1;
				err_sensor1=s2-_s2;
				err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
				motors(speed+err/3-err_sensor*1.7,speed-err/3+err_sensor*1.7)	
			}
			else
			{
				motors(speed+err,speed-err)
			}
		}
		wait(30);
	}
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
//
function extraStop()
{
	ML(-30,false);
	MR(-30,false);
	wait(30);
}
//

ML_REQUIRED=0;
MR_REQUIRED=0;





function Left_()
{
	doupor=false;
	if(s[2].read()<25)
		doupor=true;
	turnForward(135);
	rotate(-90);
	if(doupor==false)
		turnDown(150);
	else
	{
		print("doupor")
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
		turnForw(60,1);	
	}
	rot--;
	rot = cuboid(rot);
}
//
function Right_()
{
	doupor=false;
	if(s[0].read()<25)
		doupor=true;
	turnForward(130);
	rotate(90);
	stop();
	if(doupor==false)
		turnDown(150);
	else
	{
		print("doupor")
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
			err = (elol) - (erol) + 2;
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
		script.wait(800);
		ML(30,false);
		MR(30,false);
		wait(20);
		stop();
		turnForw(60,1);	
	}	
	rot++;
	rot = cuboid(rot);
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
				MR(sp+5,false);
				ML(sp+5,false);
				script.wait(900);
				extraStop();
				stop();
				turnDown(100);
				wait(100);
				left(469,-468)
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
				script.wait(800);
				ML(30,false);
				MR(30,false);
				wait(20);
				stop();
				turnForw(60,1);
			}
			else
			{
				turnForw(120,0);
				left(471,-469)
				turnDown(140);
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
				right(-468,469)
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
				turnForw(60,1);
			}
			else
			{
				turnForw(120,0);
				right(-469,470);
				turnDown(140);
			}
		break;
	}
	rot+=2;
	rot = cuboid(rot);
}
//


function stop()
{
	brick.motor(M3).brake(100);
	brick.motor(M4).brake(100);
    //MR(0) 
    //ML(0)
    //wait(200)
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
			right(-236,237)
		else
			 left(237,-236)
	}
	else
	{
		if(sgn>0)
			right(-236,237)
		else
			 left(237,-236)
	}
}
//
function sendRec()
{
	if(!robotFound)
	{
		mailbox.send(0,"Need");
		coor = mailbox.receive();
		coor = coor.split(" ");
		//print("EEEEEEEEEEEEEE");
		chesum = 0;
		indizm = -1;
		for(var tes = 0;tes < 4;tes++)
		{
			if(abs(senrob2[tes] - coor[tes]) > 10)
			{
				chesum++;
				indizm = tes;
			}
		}
		if(senrob2[0] != -1 && senrob2[1] != -1 && senrob2[2] != -1 && senrob2[3] != -1 && chesum == 1)
		{
			mailbox.send(0,"Found");
			robotFound = true;
			if(indizm == 3){
				secX=xpos+1
				secY=ypos
			}
			if(indizm == 0){
				secX=xpos
				secY=ypos+1
			}
			if(indizm == 1){
				secX=xpos-1
				secY=ypos
			}
			if(indizm == 2){
				secX=xpos
				secY=ypos-1
			}
			mailbox.send(0,"(" + secX + "," + secY + ")");
			
			map[secX][secY] = 1;
			
		}
		else
		{
			for(var tes = 0;tes < 4;tes++)
				senrob2[tes] = coor[tes];
		}
	}
	//print(s2);
}

s = new Array(4);

s[0] = brick.sensor(A1);
s[1] = brick.sensor(D1);
s[2] = brick.sensor(A2);
s[3] = brick.sensor(D2);
s0=16;
s2=16;

var main = function()
{

	visits=new Array(30);
	for(var i=0;i<30;i++)
	{
		visits[i]=new Array(30)
		for(var j=0;j<30;j++)
		{
			visits[i][j]=0;
		}
	}
	rot = 1;
	secX = -1;
	secY = -1;
	senrob2 = [-1,-1,-1,-1];
	robotFound = false;
	//print(bortnum);
	if(bortnum == 0)
	{
		mailbox.connect("192.168.77.1");
		mes = "";
		while(mes != "Found")
		{
			mes = mailbox.receive();
			wait(100);
			if(mes == "Need")
			{
				brick.display().addLabel("Sending",1,1);
				brick.display().redraw();
				var tt = "";
				tt += String(s[0].read()) + " ";
				tt += String(s[1].read()) + " ";
				tt += String(s[2].read()) + " ";
				tt += String(s[3].read());
				mailbox.send(1,tt);
			}
			wait(50);
		}
		wait(100);
		mes = mailbox.receive();
		brick.display().addLabel(mes,1,1);
		brick.display().redraw();
		mes = mailbox.receive();
		brick.playSound("media/beep.wav");
		brick.display().addLabel("(" + xpos + "," + ypos + ")",1,1);
		brick.display().redraw();
		script.wait(12000);
	}
	else
	{
		for(var i=0;i<30;i++)
		{
			map[i]=new Array(30);
			for(var j=0;j<30;j++)
			{
				map[i][j]=0;
			}
		}
		
		minx=100
		miny=100
		maxx=0
		maxy=0
		while(maxx-minx<7||maxy-miny<7)
		{
			terr=false
			calculatePath();
			while((maxx-minx<7||maxy-miny<7))
			{
				
				
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
		
		
		for(var i=0;i<8;i++)
		{
			map[minx-1][miny+i]=1;
			map[minx+i][miny-1]=1;
			map[maxx+1][miny+i]=1;
			map[minx+i][maxy+1]=1;
		}
		
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
				movementStep();
				visits[xpos][ypos]=1
			}
		}
		
		xfin=secX
		yfin=secY
		print("finished! Now moving to "+xfin+" "+yfin)
		map[secX][secY] = 0;
		calculatePath();
		terr=false
		while(!  ( (abs(xfin-xpos)<=1 && abs(yfin-ypos)<=0) ||  (abs(xfin-xpos)<=0 && abs(yfin-ypos)<=1)  ))
		{
			map[xfin][yfin]=0;
			movementStep();
		}
		print("finish!")
		brick.playSound("media/beep.wav");
		texr = "(" + (secX - xmin) + "," + (secY-ymin) + ")"; 
		mailbox.send(0,texr);
		brick.display().addLabel("(" + (xpos - xmin) + "," + (ypos-ymin) + ")",1,1);
		brick.display().redraw();
		script.wait(12000);
	}
}
