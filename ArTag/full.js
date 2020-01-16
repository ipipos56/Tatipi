var __interpretation_started_timestamp__;
var pi = 3.141592653589793;

var motor_l = brick.motor(M4).setPower; 
var motor_r = brick.motor(M3).setPower; 
var enc_l = brick.encoder(E4); 
var enc_r = brick.encoder(E3); 

var s[3];
s[0] = brick.sensor(A1);
s[1] = brick.sensor(A2);
s[2] = brick.sensor(A3);


var mLeft = brick.motor(M1).setPower; 
var mRight = brick.motor(M2).setPower; 
var eLeft = brick.encoder(E1); 
var eRight = brick.encoder(E2); 

var stDist = SL.read();

rotCnt = 0;

function stop(){
	motor_r(0)
	motor_l(0)
	script.wait(50)
}

function dvish()
{
		gyro = brick.gyroscope().read()[6]/1000;
		if (direction == -2) {
			err = gyro + sign(gyro) * direction * 90
		} else {
			err =  gyro - direction * 90;	
		}
		motor_l(50-err*1)
		motor_r(50+err*1)
		script.wait(1);
		//print(SU.read());
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

function dvishNaz()
{
		gyro = brick.gyroscope().read()[6]/1000;
		if (direction == -2) {
			err = gyro + sign(gyro) * direction * 90
		} else {
			err =  gyro - direction * 90;	
		}
		motor_l(-50-err*1)
		motor_r(-50+err*1)
		script.wait(1);
		//print(SU.read());
}


var obshMass = 0;
var encdvi = 0;
var ind = 0;
var cuind = 0;
var bh = 0;

function forward() {

	deg = (700/(pi*56))*360;
	
	direction = (rotCnt + 2) % 4 - 2;
	while( SL.read() - 10 <= stDist ) 
	{
		dvish();
		//print("1");
	}
	var pro = enc_l.read();
	var glu = 0;
	var check = false;
	while( SL.read() > stDist + 10 )
	{
		//print("2");
		dvish();
		if(SL.read() > glu)
			glu = SL.read();
	}
	stop();
	if(check == false)
	{
		if(glu > obshMass)
		{
			obshMass = glu;
			bh = enc_l.read() - pro;
			encdvi = enc_l.read();
			cuind = ind;
		}
		print((enc_l.read() - pro));
		print(glu);
		print(bh);
		print(encdvi);
		print(cuind);
		print(ind);
		var she = 0;
		while(she < 30) 
		{
			dvish();
			she++;
			//print("1");
		}
		stop();
		ind++;
		//script.wait(500);
	}
	else
		stop();
}



var main = function()
{
	__interpretation_started_timestamp__ = Date.now();
	
	enc_r.reset()
	enc_l.reset()
	
	brick.gyroscope().calibrate(2000);
	script.wait(2050);
	
	while(SU.read() > 80)
		forward();
	print(SU.read());
	print("_______________________");
	print(cuind+1);
	while(enc_l.read() > encdvi - (bh / 2) + 100)
		dvishNaz();
	stop();
	script.wait(100);
	turn_left();
	script.wait(100);
	while(SU.read() > 30)
	{
		deg = (700/(pi*56))*360;
	
		direction = (rotCnt + 2) % 4 - 2;
		dvish();
	}
	stop();
	print("finish");
	brick.display().addLabel("finish",1,1);
	brick.display().redraw();
	script.wait(1000);
	return;
}
