var pi = 3.141592653589793



s = new Array(3);
s[0] = brick.sensor(A1);
s[1] = brick.sensor(D1);
s[2] = brick.sensor(A2);

sz = [0,0,0];

ML = brick.motor(M3).setPower;
MR = brick.motor(M4).setPower;
EL = brick.encoder(E3);
ER = brick.encoder(E4);




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



ML_REQUIRED=0;
MR_REQUIRED=0;


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

// RIGHT

var right=function(){
	ER.reset();
	EL.reset();
	MAIN_ACCEL=0.1;
	ML_REQUIRED=0;
	MR_REQUIRED=0;
	ML_FINISH=-235;
	MR_FINISH=235;
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
}


var left=function(){
	ER.reset();
	EL.reset();
	MAIN_ACCEL=0.1;
	ML_REQUIRED=0;
	MR_REQUIRED=0;
	ML_FINISH=235;
	MR_FINISH=-235;
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
}




var forward=function(){
	ER.reset();
	EL.reset();
	MAIN_ACCEL=0.1;
	ML_REQUIRED=0;
	MR_REQUIRED=0;
	ML_FINISH=-410;
	MR_FINISH=-410;
	ML_SPEED=0;
	MR_SPEED=0;
	ERR=100000;
	REAL_ERR=100000;
	while(ERR>20){
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
		
		if(s[0].read()<22 && s[2].read()<22){
			SENSOR_CORR=(s[0].read()-s[2].read())*5;
			ML_POWER+=SENSOR_CORR
			MR_POWER-=SENSOR_CORR
		}
		if(s[0].read()<22){
			SENSOR_CORR=(s[0].read()-13)*5;
			ML_POWER-=SENSOR_CORR
			MR_POWER+=SENSOR_CORR
		}
		if(s[2].read()<22){
			SENSOR_CORR=(s[2].read()-13)*5;
			ML_POWER+=SENSOR_CORR
			MR_POWER-=SENSOR_CORR
		}
		
		ML(ML_POWER,false)
		MR(MR_POWER,false)
		
		ERR=abs(abs(ER_NEW+EL_NEW)-abs(MR_FINISH+ML_FINISH));
		REAL_ERR=abs(ER_NEW-MR_REQUIRED)+abs(EL_NEW-ML_REQUIRED);
		
		ER_OLD=ER_NEW;
		EL_OLD=EL_NEW;
		
		script.wait(DT);
	}
}
var main=function(){
	while(true){
		forward();
	}
}
