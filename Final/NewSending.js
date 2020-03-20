var __interpretation_started_timestamp__;
var pi = 3.141592653589793;
wait = script.wait;

var bortnum = mailbox.myHullNumber();

sz=[];


s = new Array(4);

s0=15;
s2=15;

if(bortnum==0)
{
	s[0] = brick.sensor(A1);
	s[1] = brick.sensor(D1);
	s[2] = brick.sensor(A2);
	s[3] = brick.sensor(D2);
	sz = [0,0,0,0];
}
else
{
	s[0] = brick.sensor(A1);
	s[1] = brick.sensor(D1);
	s[2] = brick.sensor(A2);
	sz = [0,0,0];
}

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
//


function valSen()
{
	switch(bortnum)
	{
		case 0;
			for(var _i = 0;_i<4;_i++)
			{
				sz[_i] = s[_i].read();

				{
					if(sz[_i] < 20&&sz[_i]>0)
						sz[_i] = 0;
					else
						sz[_i] = 1;
				}
			}
		break;
		case 1;
			for(var _i = 0;_i<3;_i++)
			{
				sz[_i] = s[_i].read();

				{
					if(sz[_i] < 20&&sz[_i]>0)
						sz[_i] = 0;
					else
						sz[_i] = 1;
				}
			}
		break;
	}
}


abs = Math.abs;
sin = Math.sin;
cos = Math.cos;
round = Math.round;
var main = function()
{
	if(bortnum==0)
	{
		robo_goriz=false;
		valSen();
		robot_orient=[sz[0],sz[1],sz[2],sz[3]];
		curent_orient=[];
		curent_orient=robot_orient;
		message = "";
		mailbox.connect("192.168.77.1");
		while(robo_goriz==false)
		{
			while(mailbox.hasMessages()==false)
			{
				wait(50);
			}
			message = mailbox.receive();
			if(message=="Check")
			{
				valSen();
				curent_orient=[sz[0],sz[1],sz[2],sz[3]];
				sensInd=0;
				for(_sen=0;_sen<4;_sen++)
				{
					if(curent_orient[_sen]!=robot_orient[_sen])
					{
						sensInd=_sen;
						robo_goriz=true;
						break;
					}
				}
				if(robo_goriz==true)
				{
					wait(100);
					io="Look "+String(sensInd);
					mailbox.send(1,io);
					wait(200);
				}
				else
				{
					wait(100);
					io="No -1";
					mailbox.send(1,io);
					wait(200);
				}
			}
		}
		message=mailbox.receive();
	}
	else
	{
		wait(50);
		mailbox.send(0,"Check");
		wait(100);
		message =mailbox,receive();
		message =message.split(" ");
		if(message[0]=="look")
		{
			
		}
		//zapros na dviqgh
	}
	/*
	x=0;
	iod=[0,0,0,0];
	do{
		wait(500);
		but=brick.keys().buttonCode(1);
		if(but==105)
		{
			x=abs(x-1)%4;
		}
		else
			if(but==106)
			{
				x=abs(x+1)%4;
			}
		else
			if(but==103)
			{
				iod[x]=abs(iod[x]+1)%2;
			}
		else
			if(but==105)
			{
				iod[x]=abs(iod[x]-1)%2;
			}
		print(iod+"\n");
	}
	while(but!=28);
	*/
	
}
