var __interpretation_started_timestamp__;
var pi = 3.141592653589793;


ml = brick.motor(M4).setPower; 
mr = brick.motor(M3).setPower; 
el = brick.encoder(E4); 
er = brick.encoder(E3); 
a1=brick.sensor(A1).read;
a2=brick.sensor(A2).read;
a3=brick.sensor(A3).read;
a4=brick.sensor(A4).read;
a5middle=brick.sensor(A5).read;
inverted_section=false;
delay=script.wait
abs=Math.abs


ml(-100)
mr(-100)
delay(400)

rot=1
begin=true
pathminus=0

el.reset()
er.reset()

move_to_x=-3
move_to_y=3

pos_x=

path_check()
forward()
path_check()
right()
forward()
path_check()
right()
forward()
path_check()
left()
forward()
path_check()
right()
forward()
path_check()
right()
forward()
path_check()
left()
forward()
path_check()
right()
forward()

path_check()
left()
forward()
path_check()
left()
forward()
path_check()
forward()
path_check()
left()
forward()
path_check()


ml(-100)
mr(-100)
delay(500)


function path_check(){
	ml(0)
	mr(0)
	delay(150)
	
	back_free=true
	if(begin){
		back_free=false
		begin=false
	}
	left_free=false
	right_free=false
	forward_free=true
	fullmoved=false
	deg = (el.read()+er.read())/2 + (700/(pi*56))*110;
	while(true){
		if((el.read()+er.read())/2 > deg){
			fullmoved=true
			break
		}
		if(inverted_section){
			if(a3()<50&&!left_free){
				print("LEFT_FREE")
				left_free=true
			}
			if(a4()<50&&!right_free){
				print("RIGHT_FREE")
				right_free=true
			}
			if(a5middle()>50&&forward_free){
				forward_free=false
			}
		}else{
			if(a3()>50&&!left_free){
				print("LEFT_FREE")
				left_free=true
			}
			if(a4()>50&&!right_free){
				print("RIGHT_FREE")
				right_free=true
			}
			if(a5middle()<10&&forward_free){
				forward_free=false
			}
		}
		if(left_free||right_free){
			if(inverted_section){
				if(a3()>50&&a4()>50){
					break
				}
			}else{
				if(a3()<50&&a4()<50){
					break
				}
			}
		}
		err=0
		ml(100+(err))
		mr(100-(err))
	}
	if(forward_free){
		print("FORWARD_FREE")
	}
	if(fullmoved){
		pathminus=(700/(pi*56))*30
	}else{
		pathminus=0;
	}
	print("GO!")
	ml(0)
	mr(0)
}

function forward(){
	
	deg = (el.read()+er.read())/2 + (700/(pi*56))*90-pathminus;
	while((el.read()+er.read())/2 < deg){
		if(a3()>50&&a4()>50){
			inverted_section=true
		}
		if(a3()<50&&a4()<50){
			inverted_section=false
		}
		err=(a2()-a1())/4
		if(err!=0){
			err=err*err*(abs(err)/err)
		}
		if(inverted_section){
			err=-err;
		}
		ml(100+(err))
		mr(100-(err))
	}

	ml(0)
	mr(0)
	print()
}
function right(){
	ml(100)
	mr(-60)
	delay(500)
}
function left(){
	ml(-60)
	mr(100)
	delay(500)
}