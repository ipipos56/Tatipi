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

fullRot = 0;



var main = function()
{
    __interpretation_started_timestamp__ = Date.now();
	
	ER.reset()
	EL.reset()
	
	brick.gyroscope().calibrate(4000);
	script.wait(4050);
	moveSmall();
	
	var raw = script.readAll("input.txt");
	raw = raw[0].split(" ");
	
	for(var i = 0;i<raw.length;i++)
	{
		if(raw[i] == '3')
			forward();
		else if(raw[i] == '2')
			turn_right();
		else if(raw[i] == '1')
			turn_left();
	}
	
    brick.display().addLabel("finish",1,1) //вывод ответа
    brick.display().redraw()
    script.wait(10000)

    return;
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
	deg = (700/(pi*56))*360;
	if(rot == 0)
		direction = -90;
	else if(rot == 1)
		direction = 0;
	else if(rot == 2)
		direction = 90;
	else if(rot == 3)
		direction = -180;
	while(((EL.read()+ER.read())/2 < deg)) //&& (s[1].read() > 25 ))
	{
		gyro = brick.gyroscope().read()[6]/1000;
		if(rot == 3)
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