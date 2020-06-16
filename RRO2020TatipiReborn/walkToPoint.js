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

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();
	

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
		//printMapPaint(mapPaint)
		//printMapPaint(map)
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
			right();
		}
		if(rot==0 && movedir==2){
			right();
			right();
		}
		if(rot==0 && movedir==3){
			left();
		}
		
		
		if(rot==1 && movedir==0){
			left();
		}
		if(rot==1 && movedir==1){
			
		}
		if(rot==1 && movedir==2){
			right();
		}
		if(rot==1 && movedir==3){
			right();
			right();
		}
		
		
		if(rot==2 && movedir==0){
			right();
			right();
		}
		if(rot==2 && movedir==1){
			left();
		}
		if(rot==2 && movedir==2){
			
		}
		if(rot==2 && movedir==3){
			right();
		}
		
		
		if(rot==3 && movedir==0){
			right();
		}
		if(rot==3 && movedir==1){
			right();
			right();
		}
		if(rot==3 && movedir==2){
			left();
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
}

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
