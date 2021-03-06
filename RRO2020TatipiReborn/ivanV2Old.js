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

terr=false;
begin=true
pathminus=0

el.reset()
er.reset()


x_start=3
y_start=0



x_start_base=y_start
y_start_base=x_start


x_relative=x_start_base-x_start
y_relative=y_start_base-y_start

rot=1
x_pos=15
y_pos=15

x_base=x_pos+x_relative*2
y_base=y_pos+y_relative*2

x_fin=x_base
y_fin=y_base

map = new Array(30);
mapPaint = new Array(30);
mapVisit = new Array(30);
mapCross = new Array(30);

for(var i=0;i<30;i++){
	map[i]=new Array(30);
	mapVisit[i]=new Array(30);
	mapCross[i]=new Array(30);
	for(var j=0;j<30;j++){
		map[i][j]=0;
		mapVisit[i][j]=0;
		mapCross[i][j]=0;
	}
}

minx=15-x_start*2
miny=15-y_start*2

maxx=minx+5*2
maxy=miny+5*2

for(var i=0;i<11;i++){
	map[minx-1][miny+i]=1;
	map[minx+i][miny-1]=1;
	map[maxx+1][miny+i]=1;
	map[minx+i][maxy+1]=1;
}
var main = function(){
	go_to_coordinates()
	for(var i=x_base-4;i<=x_base+4;i+=2){
		for(var j=y_base-4;j<=y_base+4;j+=2){
			if(i>=0 && j>=0 && i<30 && j<30 && mapVisit[i][j]!=1){
				x_fin=i
				y_fin=j
				go_to_coordinates()
			}
		}
	}
	path_check();
	ml(-100)
	mr(-100)
	delay(400)
}

function go_to_coordinates(){
	
	calculate_path()
	if(terr){
		return
	}
	
	while(!(x_pos==x_fin&&y_pos==y_fin)){
			print(x_pos+" "+y_pos)
			print(x_fin+" "+y_fin)
			path_check();
			calculate_path()
			if(terr){
				ml(-100)
				mr(-100)
				delay(400)
				return
			}
			
			movedir=0;
			if(mapPaint[x_pos+1][y_pos]<mapPaint[x_pos][y_pos]){
				movedir=1;
			}else{
				if(mapPaint[x_pos-1][y_pos]<mapPaint[x_pos][y_pos]){
					movedir=3;
				}else{
					if(mapPaint[x_pos][y_pos+1]<mapPaint[x_pos][y_pos]){
						movedir=2;
					}else{
						if(mapPaint[x_pos][y_pos-1]<mapPaint[x_pos][y_pos]){
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
				turn_right();
			}
			if(rot==0 && movedir==2){
				rotate();
			}
			if(rot==0 && movedir==3){
				turn_left();
			}
			
			
			if(rot==1 && movedir==0){
				turn_left();
			}
			if(rot==1 && movedir==1){
				
			}
			if(rot==1 && movedir==2){
				turn_right();
			}
			if(rot==1 && movedir==3){
				rotate();
			}
			
			
			if(rot==2 && movedir==0){
				rotate();
			}
			if(rot==2 && movedir==1){
				turn_left();
			}
			if(rot==2 && movedir==2){
				
			}
			if(rot==2 && movedir==3){
				turn_right();
			}
			
			
			if(rot==3 && movedir==0){
				turn_right();
			}
			if(rot==3 && movedir==1){
				rotate();
			}
			if(rot==3 && movedir==2){
				turn_left();
			}
			if(rot==3 && movedir==3){
				
			}
			
			forward();
		}
}


function printMapPaint(msn){
	for(var i=0;i<msn.length;i++){
		var st="";
		for(var j=0;j<msn[i].length;j++){
			if(j==x_pos&&i==y_pos)st+="  X";
				else if(msn[j][i]>=100)st+="   ";
				else if(msn[j][i]>=10)st+=" "+msn[j][i];
				else if(msn[j][i]>=0)st+="  "+msn[j][i];
		}
		print(st)
	}
}

function calculate_path(){
	//print(xfin+" "+yfin)
	for(var i=0;i<30;i++){
		mapPaint[i]=new Array(30);
		for(var j=0;j<30;j++){
			mapPaint[i][j]=1000000;
		}
	}
	mapPaint[x_fin][y_fin]=0
	var iter=0;
	while(mapPaint[x_pos][y_pos]==1000000 && iter<100){
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
	if(iter>=100){
		terr=true;
		print("terr!!!")
	}else{
		terr=false;
	}
	printMapPaint(map)
}

function path_check(){
	
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
	//ml(0)
	//mr(0)
	
	if(rot==0){
		if(!left_free){
			map[x_pos-1][y_pos]=1
			map[x_pos-1][y_pos-1]=1
			map[x_pos-1][y_pos+1]=1
		}
		if(!forward_free){
			map[x_pos][y_pos-1]=1
			map[x_pos-1][y_pos-1]=1
			map[x_pos+1][y_pos-1]=1
		}
		if(!right_free){
			map[x_pos+1][y_pos]=1
			map[x_pos+1][y_pos-1]=1
			map[x_pos+1][y_pos+1]=1
		}
	}
	if(rot==1){
		if(!left_free){
			map[x_pos][y_pos-1]=1
			map[x_pos-1][y_pos-1]=1
			map[x_pos+1][y_pos-1]=1
		}
		if(!forward_free){
			map[x_pos+1][y_pos]=1
			map[x_pos+1][y_pos-1]=1
			map[x_pos+1][y_pos+1]=1
		}
		if(!right_free){
			map[x_pos][y_pos+1]=1
			map[x_pos-1][y_pos+1]=1
			map[x_pos+1][y_pos+1]=1
			
		}
	}
	if(rot==2){
		if(!right_free){
			map[x_pos-1][y_pos]=1
			map[x_pos-1][y_pos-1]=1
			map[x_pos-1][y_pos+1]=1
		}
		if(!left_free){
			map[x_pos+1][y_pos]=1
			map[x_pos+1][y_pos-1]=1
			map[x_pos+1][y_pos+1]=1
		}
		if(!forward_free){
			map[x_pos][y_pos+1]=1
			map[x_pos-1][y_pos+1]=1
			map[x_pos+1][y_pos+1]=1
		}
	}
	if(rot==3){
		if(!forward_free){
			map[x_pos-1][y_pos]=1
			map[x_pos-1][y_pos-1]=1
			map[x_pos-1][y_pos+1]=1
		}
		if(!right_free){
			map[x_pos][y_pos-1]=1
			map[x_pos-1][y_pos-1]=1
			map[x_pos+1][y_pos-1]=1
		}
		if(!left_free){
			map[x_pos][y_pos+1]=1
			map[x_pos-1][y_pos+1]=1
			map[x_pos+1][y_pos+1]=1
		}
	}
	
	ml(0)
	mr(0)
	delay(2000)
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

	if(rot==0){
		y_pos-=2;
	}
	if(rot==1){
		x_pos+=2;
	}
	if(rot==2){
		y_pos+=2;
	}
	if(rot==3){
		x_pos-=2;
	}
	ml(0)
	mr(0)
	print()
}
function turn_right(){
	ml(100)
	mr(-60)
	delay(500)
	rot+=1; 
	rot = cuboid(rot);
}
function turn_left(){
	ml(-60)
	mr(100)
	delay(500)
	rot-=1; 
	rot = cuboid(rot);
}
function rotate(){
	ml(-100)
	mr(100)
	delay(1000)
	rot-=2; 
	rot = cuboid(rot);
}
function cuboid(_a)
{
	if(_a > 3)
		return _a-4;
	if(_a < 0)
		return _a+4;
	return _a;
}