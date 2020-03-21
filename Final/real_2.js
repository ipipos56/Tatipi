var __interpretation_started_timestamp__;
pi = 3.141592653589793;
wait = script.wait;



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

//s = new Array(3);
//s[0] = brick.sensor(A3);
//s[1] = brick.sensor(A1);
//s[2] = brick.sensor(A2);

//sz = [0,0,0];

ML = brick.motor(M3).setPower; 
MR = brick.motor(M4).setPower; 
EL = brick.encoder(E3); 
ER = brick.encoder(E4); 
bortnum =1;



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
			 left(237,-237)
	}
	stop();
}

rotCnt = 0;


direction = 0;

x = 0
y = 0;
h = 17;
point = 144;
rot = 1;
map = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
nonplace = [];

fullRot = 0;

var numbers = [49];
for(i=0;i<49;i++)
	numbers[i]=[0,0];



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
	print((abs(EL.read())-lLast)+"\n");
	extraStop();
	stop();

}
//

function extraStop()
{
	ML(-30,false);
	MR(-30,false);
	wait(30);
}
var main = function()
{
	
	
	var d2=brick.sensor(D2).read();
	wait(50);
	if(d2<40)
	{
		save();
		var otv = getARTagValue(0);
	}
    else
	{
		rotate(-90);
		var d2=brick.sensor(D2).read();
		wait(50);
		if(d2<40)
		{
			save();
			var otv = getARTagValue(0);
		}
		else
		{
			rotate(-90);
			
			var d2=brick.sensor(D2).read();
			wait(50);
			if(d2<40)
			{
				save();
				var otv = getARTagValue(0);
			}
			else
			{
				rotate(-90);
				save();
				var otv = getARTagValue(0);
			}
		}
	}//
	//for(var i = 0;i<289;i++)
	//	map[i] = [-1,-1,-1,-1];
	
	//print(map);

    //inp[1]);
	ER.reset()
	EL.reset()
	
	//brick.gyroscope().calibrate(5000);
	//script.wait(5100);
	//moveSmall();
	
	var pa = true;
	var test = false;
	var iter = 0;
	
	//forward();
	
	
	/*
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
				//print(point+" "+curre)
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
			test = true;
		}
		iter++;
	}
	
	newInfo();
	
	
	var pqw = 0;
	while(nonplace.length > 0)
	{
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
    script.wait(5000)

    script.wait(2000)
    return;
	*/
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
			
			print(vert + " " + (vert + poiDel) +" "+map[vert][i] + " " + dis[vert + poiDel] + " " + pri + " " + par[vert][0]+" "+ par[vert][1]);
				
			if((parseInt(map[vert][er],10) == 1) && (dis[(vert + poiDel)] > (dis[vert] + pri)))
			{
				par[(vert + poiDel)][0] = vert;
				par[(vert + poiDel)][1] = er;
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
	var raw = getPhoto();//script.readAll("input.txt");
	var mn;
	//raw = raw[0].split(" ");
    for (i = 0; i < height; ++i)
    {
        image[i] = [];
        for (j = 0; j < width; ++j)
        {
            color = raw[i * width + j];
            //color='0x'+color;
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

function binarization()
{
    sum = 0;
    for (i = 0; i < height; ++i)
        for (j = 0; j < width; ++j)
            sum += image[i][j];
    mean = sum / height / width;
    for (i = 0; i < height; ++i)
        for (j = 0; j < width; ++j)
            image[i][j] = (4 * image[i][j] > mean ? 0 : 1);
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



function save()
{
	ER.reset();
	EL.reset();
	erol = abs(ER.read());
	elol = abs(EL.read());
	_dist=50;
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
	MR(sp+10,false);
	ML(sp+10,false);
	script.wait(900);
	extraStop();
	stop();
	turnDown(120);
	wait(100);
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
    getCorners();
    findPoint();
	
    printSelectedImage();
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
		print("val")
	//for(lo=0;lo<7;lo++)
	//print(values[lo])
	//print(" ");
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
	
	
	
	kom = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	kom[0] = values[0][3] * 2 + values[1][0];
	kom[1] = values[1][1] * 2 + values[1][2];
	kom[2] = values[1][4] * 2 + values[1][5];
	kom[3] = values[2][0] * 2 + values[2][1];
	kom[4] = values[2][2] * 2 + values[2][3];
	kom[5] = values[2][4] * 2 + values[3][0];
	kom[6] = values[3][1] * 2 + values[3][2];
	kom[7] = values[3][3] * 2 + values[3][4];
	kom[8] = values[3][5] * 2 + values[4][0];
	kom[9] = values[4][1] * 2 + values[4][2];
	kom[10] = values[4][3] * 2 + values[4][4];
	kom[11] = values[4][5] * 2 + values[5][1];
	kom[12] = values[5][2] * 2 + values[5][3];
	vivo = "";
	for(var i = 0;i<13;i++)
		if(i != 12)
			vivo += String(kom[i]) + String(" ");
		else
			vivo += String(kom[i]);
	print(vivo);
	brick.playSound("media/beep.wav");
	wait(1000);
	brick.display().addLabel(vivo,1,1) //вывод ответа
    brick.display().redraw()
    script.wait(15000)
    return 0;
}