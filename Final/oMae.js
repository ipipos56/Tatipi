var __interpretation_started_timestamp__;
var pi = 3.141592653589793;
var trick=false;
var bortnum = mailbox.myHullNumber();


wait = script.wait;
sign = function(n)
{
    return n > 0 ? 1 : n = 0 ? 0 : -1;
}
trueLeft=0;
trueRight=0;

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

function motors(_ml,_mr)
{
	ML(_ml,false);
	MR(_mr,false);
}

function forward()
{
	path_sm=42;
	var path_deg = path_sm * 240/(8.2*pi);
	EL.reset();
	ER.reset();
	lLast = EL.read();
	rLast = ER.read();
	var speed=15;
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
		print((abs(EL.read())-lLast)+"\n");
		err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast))*0.5
		_s0=s[0].read();
		_s2=s[2].read();
		if(_s0<20)
		{
			err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast))*0.5
			err_sensor3=err_sensor2;
			err_sensor2=err_sensor1;
			err_sensor1=18-s[0].read();
			err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
			motors(speed+err+err_sensor*2,speed-err-err_sensor*2)
			
		}
		else
		{
			_s2=s[2].read();
			if(_s2<20)
			{
				err=((abs(ER.read())-rLast)-(abs(EL.read())-lLast))*0.5
				err_sensor3=err_sensor2;
				err_sensor2=err_sensor1;
				err_sensor1=18-s[2].read();
				err_sensor=(err_sensor1+err_sensor2+err_sensor3)/3;
				motors(speed+err-err_sensor*2,speed-err+err_sensor*2)	
			}
			else
			{
				motors(speed+err,speed-err)
			}
		}
		wait(50);
	}
	print((abs(EL.read())-lLast)+"\n");
	extraStop();
	stop();
}
//



function turnForw(_dist)
{
	_dist += (trueLeft+trueRight)/2;
    erol = abs(ER.read());
    elol = abs(EL.read());
    sp=20;
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
	trueLeft = EL.read();
	trueRight = ER.read();
    extraStop();
	stop();

}
//

function doWhall()
{
    sp=40;
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

/*function robot()
{
	if(trick)
	{
		switch(bortnum)
		{
			case 0:
			break;
			case 1:
			break;
		}
	}
	
}
//
*/
function extraStop()
{
	ML(-50,false);
	MR(-50,false);
	wait(20);
}
//
function stop()
{
    MR(0,false) 
    ML(0,false)
    wait(75)
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
    if(sgn>0)
        _rot=224
	else
		 _rot=224
	while((abs(leftEnc)+abs(rightEnc))/2<_rot)
		{
			rightEnc=ER.read()-erLast;
			leftEnc=EL.read()-elLast;
			_err=(abs(leftEnc)-abs(rightEnc));
			ML((25-_err)*sgn,false);
			MR((-25-_err)*sgn,false);
			wait(5);
		}
    ML((-50)*sgn,false);
    MR((50)*sgn,false);
    wait(20);
    stop();
}
//

var main = function()
{
	//ML(5,true);
	//MR(5,true);
	//forward();
	doWhall();
	while(1);
	{
		script.wait(10);
	}
	return;
}
