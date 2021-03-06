var __interpretation_started_timestamp__;
var pi = 3.141592653589793;
var trick=false;
var bortnum = mailbox.myHullNumber();
sensorDist=0;
	if(bortnum==0)
		{
			s0=14;
			s2=14;
		}
		else
		{
			s0=15;
			s2=15;
		}
wait = script.wait;
sign = function(n)
{
    return n > 0 ? 1 : n = 0 ? 0 : -1;
}
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


s = new Array(3);
s[0] = brick.sensor(A1);
s[1] = brick.sensor(D1);
s[2] = brick.sensor(A2);

sz = [0,0,0];

ML = brick.motor(M3).setPower;
MR = brick.motor(M4).setPower;
EL = brick.encoder(E3);
ER = brick.encoder(E4);
ER.reset();
EL.reset();

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
	var speed=28;
	var err_sensor=0;
	var err_sensor1=0
	var err_sensor2=0
	var err_sensor3=0
	var err_sensor4=0
	var err_sensor5=0
	//print(path_deg);
	var curL=abs(EL.read());
	var curR=abs(ER.read());
	if(bortnum==0)
	{
		kSen=3;
		defOt=-1;
	}
	else
	{
		kSen=2.8;
		defOt=2;
	}
	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
		_s0 = s[0].read();
		_s2 = s[2].read();
		
		if(_s0<17)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-_s0;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/3+err_sensor*kSen,speed-err/3-err_sensor*kSen)
		}
		else if(_s2<18)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s2-_s2;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/2-err_sensor*kSen,speed-err/2+err_sensor*kSen)	
		}
		else
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			motors(speed+err,speed-err)
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
	if(bortnum==0)
	{
		kSen=3;
		defOt=-1;
	}
	else
	{
		kSen=3;
		defOt=2;
	}
	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
		_s0 = s[0].read();
		_s2 = s[2].read();
		
		if(_s0<17&&_off==0)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-_s0;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/3+err_sensor*kSen,speed-err/3-err_sensor*kSen)
		}
		else if(_s2<17&&_off==0)
		{
			
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-3)*1.4
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s2-_s2;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/2-err_sensor*kSen,speed-err/2+err_sensor*kSen)	
		}
		else
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-2)*1.4
			motors(speed+err,speed-err)
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

	if(bortnum==0)
	{
		kSen=3;
		defOt=-1;
	}
	else
	{
		kSen=2.6;
		defOt=2;
	}
	while(((curL-lLast)+(curR-rLast))/2<path_deg)
	{
		curL=abs(EL.read());
		curR=abs(ER.read());
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
		_s0 = s[0].read();
		_s2 = s[2].read();
		
		if(_s0<17)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s0-_s0;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/3+err_sensor*kSen,speed-err/3-err_sensor*kSen)
		}
		else if(_s2<17)
		{
			
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=s2-_s2;
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err/2-err_sensor*kSen,speed-err/2+err_sensor*kSen)	
		}
		else
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast)-defOt)*1.4
			motors(speed+err,speed-err)
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
	ML(-40,false);
	MR(-40,false);
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


var main = function()
{
	forward();
	while(1);
	//Left_()
	//Right_();
	//Right_();
	//Left_();
	//while(1);
	raw = "3 2 3 1 3 2 3 3 2 3 3 1 3 3 1 1 3 2 3 1 3 2 3 1 3";
	raw = raw.split(" ");
	
	for(var i = 0;i<raw.length;i++)
	{
		if(raw[i] == '3')
			forward(1);
		else if(raw[i] == '2')
		{
			if(i != raw.length)
			{
				if(raw[i+1] == '2')
				{
					robotRotation(1);
					i++;
				}
				else
					Right_();
			}
			else
				Right_();
		}
		else if(raw[i] == '1')
		{
			if(i != raw.length)
			{
				if(raw[i+1] == '1')
				{
					robotRotation(0);
					i++;		
				}
				else
					Left_();
			}
			else
				Left_();
		}
	}
    brick.display().addLabel("finish",1,1) //вывод ответа
    brick.display().redraw()
    script.wait(10000);
}
