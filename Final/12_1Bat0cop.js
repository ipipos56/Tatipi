var __interpretation_started_timestamp__;
pi = 3.141592653589793;
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

rotCnt = 0;


cprR = 390;
cprL = 390;

rasu = 14;
sectr = 552;

direction = 0;

x = 0
y = 0;
h = 17;
point = 144;
rot = 1;
map = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
nonplace = [];

fullRot = 0;

ER.reset();
EL.reset();

function localiz()
{
	var pa = true;
	var test = false;
	var iter = 0;
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
					left();
					wait(500);
					forward();
				}
				else if(i == 1)
				{
					forward();
				}
				else if(i == 2)
				{
					right();
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
			right();
			test = true;
		}
		iter++;
	}
	
	newInfo();
	
	
	var pqw = 0;
	while(nonplace.length > 0)
	{
		pqw = nonplace.shift();
		print(pqw);
		var tt = 0;
		if(map[pqw][0] == -1 || map[pqw][1] == -1 || map[pqw][2] == -1 || map[pqw][3] == -1)
		{
			print("turn into " + point);
			tt = findPath(point,pqw);
		}
		if(tt == 1 && (map[pqw][0] == -1 || map[pqw][1] == -1 || map[pqw][2] == -1 || map[pqw][3] == -1))
		{	
			right();
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
}


var main = function()
{
	//_1to0();
	
	//forward();
	//left();
	//forward();
	localiz();
	//forward();
	//extra_1to0();
    /*while(1)
    {
    	var bat=brick.battery().readVoltage();
    	print(bat);
    	script.wait(100);
    }
    */
    //forward();
	//right();
	//left();
	//robotRotation();'
	
	
	/*
    while(1);
    valSen();
    while(1)
    {
        print(sz[0]+" "+sz[1]+" "+sz[2]);
        if(sz[0]==1)
        {
            turnForw(125);
            rotate(-90);
            turnDown(130);
            _1to0();
        }
        else if(sz[0]==0&&sz[1]==1)
        {
            pram1();
        }
        else if(sz[0]==0&&sz[1]==0&&sz[2]==1)
        {
            doWhall();
            rotate(90);
            turnDown(140);
            pram1();
        }
        else if(sz[0]==0&&sz[1]==0&&sz[2]==0)
        {
            doWhall();
            rotate(90);
            rotate(90);
            turnDown(130);
            pram1();
        }
        ER.reset();
        EL.reset();
    }
	*/
}
//
function left()
{
	valSen();
	newInfo();
	_1 = s[1].read();
	if(_1>26)
	{
		turnForw(130);
		rotate(-90);
		turnDown(140);
	}
	else
	{
		doWhall();
		rotate(-90);
		turnDown(140);
	}
	rot-=1;
	rot = cuboid(rot);
}
//
function right()
{
	valSen();
	newInfo();
	_1 = s[1].read();
	if(_1>20)
	{
		turnForw(130);
		rotate(90);
		turnDown(135);
	}
	else
	{
		doWhall();
		rotate(90);
		turnDown(135);
	}
	rot+=1;
	rot = cuboid(rot);
}
////

function robotRotation()
{
	_1 = s[1].read();
	if(_1>20)
	{
		turnForw(130);
		rotate(-90);
		rotate(-90);
		turnDown(135);
	}
	else
	{
		doWhall();
		rotate(-90);
		rotate(-90);
		turnDown(135);
	}
	rot-=2;
	rot = cuboid(rot);

		
}
//

function valSen()
{
    for(var _i = 0; _i<3; _i++)
    {
        sz[_i] = s[_i].read();
        if(sz[_i] > 20)
            sz[_i] = 1;
        else
            sz[_i] = 0;
    }

}


function stop()
{
    MR(0)
    ML(0)
    wait(75)
}

function findPath(stPoin,fnPoin)
{
    var q = [];
    var dis = [];
    var par = [];
    for(var _i = 0; _i<289; _i++)
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

        for(var _er = 0; _er<4; _er++)
        {
            var poiD
            _el = 0;
            if(_er == 0)
                poiDel = (-1 * h);
            else if(_er == 1)
                poiDel = 1;
            else if(_er == 2)
                poiDel = h;
            else if(_er == 3)
                poiDel = -1;

            var pri = abs(par[vert][1] - _er);

            if( pri == 1 || pri == 3)
                pri = 2;
            else if(pri == 2)
                pri = 3;
            else if(pri == 0)
                pri = 1;

           // print(vert + " " + (vert + poiDel) +" "+map[vert][i] + " " + dis[vert + poiDel] + " " + pri + " " + par[vert][0]+" "+ par[vert][1]);

            if((parseInt(map[vert][_er],10) == 1) && (dis[(vert + poiDel)] > (dis[vert] + pri)))
            {
                par[(vert + poiDel)][0] = vert;
                par[(vert + poiDel)][1] = _er;
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
                for(var j = 0; j<2; j++)
                {
                   right()
                }
            }
            else if(abs(dis[cur]-dis[previs]) == 2)
            {
                if(rot == 0 || rot == 1)
                {
                    if((cur - previs) > 0)
                        right()
                    else if(cur - previs < 0)
                        left()
                }
                else if(rot == 2 || rot == 3)
                {
                    if(cur - previs > 0)
                        left()
                    else if(cur - previs < 0)
                        right()
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

spST = 47;
spFN = 70;
lerr = 0;

function doWhall()
{
    sp=60;
    sens=s[1].read();
    while(sens>8)
    {
        sens=s[1].read();
        erol = abs(ER.read());
        elol = abs(EL.read());
        err = (erol) - (elol) - 0;
        P = err * 3;
        I = (lerr + err) * 0;
        D = (lerr - err) * 1.5;
        mot = P+I+D;
        MR(sp - mot);
        ML(sp + mot);
        lerr = err;
        wait(35);
    }
    ML(-5);
    MR(-5);
    wait(50);
}
//



function extra_1to0()
{
    EL.reset();
    ER.reset();
    sp=60;
    flag = 1;
    trueLeft=0;
    trueRight=0;
	_2=s[2].read();
    while(flag==1)
    {
        trueLeft += EL.read();
        trueRight += ER.read();
        err = _2 - s[2].read();
        if(s[2].read()>6&&s[2].read()<=24)
        {
            P = err * 2.5;
            I = (lerr + err) * 0;
            D = (lerr - err) * 1.5;
            mot = P+I+D;
            MR(sp + mot);
            ML(sp - mot);
			lerr=err;
            if((475-Math.floor((trueLeft+trueRight)/2))<=0)
            {
                stop();
                valSen()
                //print(sz[0]+" "+sz[1]+" "+sz[2]);
                flag=0;
            }
        }
        else
        {
            MR(-4);
            ML(-4);
            wait(200);
            stop();
            turnForw(60);
            sz[2]=s[2].read();
            if(sz[2] > 20)
                sz[2] = 1;
            else
                sz[2] = 0;

            sz[0]=s[0].read();
            if(sz[0] > 20)
                sz[0] = 1;
            else
                sz[0] = 0;
            if(sz[0]==1)
            {
                turnForw(330);
                stop();
                sz[1]=s[1].read();
                if(sz[1] > 20)
                    sz[1] = 1;
                else
                    sz[1] = 0;
            }
            else
            {
                ER.reset();
                EL.reset();
                erol = abs(ER.read());
                elol = abs(EL.read());
                __0=s[0].read();
                while((erol+elol)/2<325)
                {
                    erol = abs(ER.read());
                    elol = abs(EL.read());
                    err = __0 - s[0].read();
                    P = err * 2.5;
                    I = (lerr + err) * 0.01;
                    D = (lerr - err) * 1.5;
                    mot = P+I+D;
                    MR(sp - mot);
                    ML(sp + mot);
                    lerr = err
                           wait(40);
                }
                MR(-4);
                ML(-4);
                wait(200);
                stop();
                sz[1]=s[1].read();
                if(sz[1] > 20)
                    sz[1] = 1;
                else
                    sz[1] = 0;

            }
            flag=0;
        }
        EL.reset();
        ER.reset();
        wait(50);
    }
    stop();
}
//
function _1to0()
{
    EL.reset();
    ER.reset();
    sp=60;
    flag = 1;
    trueLeft=0;
    trueRight=0;
	while(flag==1)
	{
		trueLeft += EL.read();
		trueRight += ER.read();
		err = 13 - s[0].read();
		if(s[0].read()>20&&s[2].read()>20)
		{
			erol = abs(ER.read());
			elol = abs(EL.read());
			err = (erol) - (elol) ;
			P = err * 1.5;
			I = (lerr + err) * 0;
			D = (lerr - err) * 0.8;
			mot = P+I+D;
			MR(sp - mot);
			ML(sp + mot);
			lerr = err;
			if((475-Math.floor((trueLeft+trueRight)/2))<=0)
			{
				stop();
				valSen()
				//print(sz[0]+" "+sz[1]+" "+sz[2]);
				flag=0;
			}
		}
		else
		{
			MR(-5);
			ML(-5);
			wait(200);
			stop();
			turnForw(135);
			stop();
			ER.reset();
			EL.reset();
			erol = abs(ER.read());
			elol = abs(EL.read());
			err = rasu - s[0].read();
			_0 = s[0].read();
			_2 = s[2].read();
			if(_0<=25)
			{
				while((erol+elol)/2<400)
				{
					err = 13 - s[0].read();
					erol = abs(ER.read());
					elol = abs(EL.read());
					P = err * 2;
					I = (lerr + err) * 0;
					D = (lerr - err) * 5;
					mot = P+I+D;
					MR(sp - mot);
					ML(sp + mot);
					lerr=err;
					wait(50);
				}
			}
			else if(_2<=25)
			{
				while((erol+elol)/2<400)
				{
					err = 13 - s[2].read();
					erol = abs(ER.read());
					elol = abs(EL.read());
					P = err * 3;
					I = (lerr + err) * 0;
					D = (lerr - err) * 1.5;
					mot = P+I+D;
					MR(sp + mot);
					ML(sp - mot);
					lerr=err;
					wait(50);
				}
			}
			MR(-4);
			ML(-4);
			wait(200);
			valSen()
			//print(sz[0]+" "+sz[1]+" "+sz[2]);
			stop();
			flag=0;
		}
		EL.reset();
		ER.reset();
		wait(50);
	}
	stop();
   
}
//
function turnDown(_dist)
{
    ER.reset();
    EL.reset();
    erol = abs(ER.read());
    elol = abs(EL.read());
    sp=-55;
    while((erol+elol)/2<_dist)
    {
        erol = abs(ER.read());
        elol = abs(EL.read());
        err = (elol) - (erol) - 1;
        P = err * 1.5;
        I = (lerr + err) * 0;
        D = (lerr - err) * 0.8;
        mot = P+I+D;
        MR(sp - mot);
        ML(sp + mot);
        lerr = err;
        wait(10);
    }
    ML(8);
    MR(8);
    wait(100);

}
//


function pram1()
{
    EL.reset();
    ER.reset();
    sp=60;
    flag = 1;
    trueLeft=0;
    trueRight=0;
    while(flag==1)
    {
        trueLeft += EL.read();
        trueRight += ER.read();
        err = 14 - s[0].read();
        if(s[0].read()>6&&s[0].read()<=20)
        {
            P = err * 2;
            I = (lerr + err) * 0;
            D = (lerr - err) * 0.8;
            mot = P+I+D;
            MR(sp - mot);
            ML(sp + mot);
			lerr = err;
            if((475-Math.floor((trueLeft+trueRight)/2))<=0)
            {
                stop();
                valSen()
                //print(sz[0]+" "+sz[1]+" "+sz[2]);
                flag=0;
            }
        }
        else
        {
            MR(-4);
            ML(-4);
            wait(200);
            stop();
            turnForw(60);
            sz[0]=s[0].read();
            if(sz[0] > 20)
                sz[0] = 1;
            else
                sz[0] = 0;
			
            sz[2]=s[2].read();
            if(sz[2] > 20)
                sz[2] = 1;
            else
                sz[2] = 0;
            if(sz[2]==1)
            {
				print("sz[0] "+sz[0])
                turnForw(330);
                stop();
                sz[1]=s[1].read();
                if(sz[1] > 20)
                    sz[1] = 1;
                else
                    sz[1] = 0;
				sz[2]=s[2].read();
				if(sz[2] > 20)
					sz[2] = 1;
				else
					sz[2] = 0;
            }
            else
            {
                ER.reset();
                EL.reset();
                erol = abs(ER.read());
                elol = abs(EL.read());
				sp=65;
                while((erol+elol)/2<330)
                {
                    erol = abs(ER.read());
                    elol = abs(EL.read());
                    err = 13 - s[2].read();
                    P = err * 2.5;
                    I = (lerr + err) * 0;
                    D = (lerr - err) * 1.5;
                    mot = P+I+D;
                    MR(sp + mot);
                    ML(sp - mot);
                    lerr = err
                    script.wait(30);
                }
                MR(-8);
                ML(-8);
                wait(200);
                stop();
                sz[1]=s[1].read();
                if(sz[1] > 20)
                    sz[1] = 1;
                else
                    sz[1] = 0;
				sz[0]=s[0].read();
				if(sz[0] > 20)
					sz[0] = 1;
				else
					sz[0] = 0;

				sz[2]=s[2].read();
				if(sz[2] > 20)
					sz[2] = 1;
				else
					sz[2] = 0;

            }
            flag=0;
        }
        EL.reset();
        ER.reset();
        wait(50);
    }
    stop();
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
        _rot=223
	else
		 _rot=223
	while((abs(leftEnc)+abs(rightEnc))/2<_rot)
		{
			rightEnc=ER.read()-erLast;
			leftEnc=EL.read()-elLast;
			_err=(abs(leftEnc)-abs(rightEnc));
			ML((65-_err)*sgn);
			MR((-65-_err)*sgn);
			wait(10);
		}
    ML((-25)*sgn);
    MR((25)*sgn);
    wait(100);
    stop();
}
//
function turnForw(_dist)
{
    ER.reset();
    EL.reset();
    erol = abs(ER.read());
    elol = abs(EL.read());
    sp=60;
    while((erol+elol)/2<_dist)
    {
        erol = abs(ER.read());
        elol = abs(EL.read());
        err = (erol) - (elol) - 0;
        P = err * 1.5;
        I = (lerr + err) * 0;
        D = (lerr - err) * 0.7;
        mot = P+I+D;
        MR(sp - mot);
        ML(sp + mot);
        lerr = err;
        wait(10);
    }
    ML(-8);
    MR(-8);
    wait(75);

}
//


function forward()
{
	
	valSen();
	newInfo();
	print(sz[0]+" "+sz[1]+" "+sz[2])
	if(sz[0]==0)
		pram1();
	else
		if(sz[0]==1&&sz[2]==0)
			extra_1to0();
	else
		if(sz[0]==1&&sz[2]==1)
			_1to0();
		
	if(rot == 0)
		point-=h;
	else if(rot == 1)
		point+=1;
	else if(rot == 2)
		point+=h;
	else if(rot == 3)
		point-=1;
}
//
rotcont = 1;


function newInfo()
{
    //valSen();
    //print(sz[0]+" "+sz[1]+" "+sz[2]);
    for(var _i = 0; _i < 3; _i++)
    {
        var curre = (rot + _i - 1);
        //print(curre);
        curre = cuboid(curre);
		for(var _j = 0;_j<4;_j++)
			map[point][_j] = sz[_i];
        if(curre == 0)
        {
            if(map[(point - h)][2] == -1 && sz[_i] == 1)
            {
				for(var _j = 0;_j<4;_j++)
					map[(point - h)][_j] = sz[_i];
                nonplace.push(point-h);
            }
        }
        else if(curre == 1)
        {
            if(map[(point + 1)][3] == -1 && sz[_i] == 1)
            {
				for(var _j = 0;_j<4;_j++)
					map[(point + 1)][_j] = sz[_i];
                nonplace.push(point+1);
            }
        }
        else if(curre == 2)
        {
            if(map[(point+ h)][0] == -1 && sz[_i] == 1)
            {
				for(var _j = 0;_j<4;_j++)
					map[(point + h)][_j] = sz[_i];
                nonplace.push(point+h);
            }
        }
        else if(curre == 3)
        {
            if(map[(point - 1)][1] == -1 && sz[_i] == 1)
            {
				for(var _j = 0;_j<4;_j++)
					map[(point - 1)][_j] = sz[_i];
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

values = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

iMin = 0, iMax = 0, jMin = 0, jMax = 0;

k1Min = 0, k1Max = 0, k2Min = 0, k2Max = 0;

iA = 0, jA = 0, iB = 0, jB = 0, iC = 0, jC = 0, iD = 0, jD = 0;


function getData(num)
{
    var raw = script.readAll("input.txt");
    var mn;
    if(num==0)
    {

        raw = raw[0].split(" ");
    }
    else if(num==1)
    {

        raw = raw[1].split(" ");
    }

    for (i = 0; i < height; ++i)
    {
        image[i] = [];
        for (j = 0; j < width; ++j)
        {
            color = raw[i * width + j];
            color='0x'+color;
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
    for (i = 0; i < width; ++i)
    {
        for (j = 0; j < 4; j++)
        {
            image[j][i] = 255 + 255 + 255;
        }

    }

    for (i = height - 8; i < height; ++i)
        for (j = 0; j < width; ++j)
            image[i][j] = 255 + 255 + 255;
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
            str += ".#ABCD*0123456789"[image[i][j]] + " ";//".#ABCD*"
        print(str);
    }
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

    W1 = intersect2(M[0], M[1], E[0], E[1], B[0], B[1], D[0], D[1]);

    W2 = intersect2(E[0], E[1], L[0], L[1], A[0], A[1], C[0], C[1]);
    W3 = intersect2(K[0], K[1], L[0], L[1], B[0], B[1], D[0], D[1]);
    W4 = intersect2(M[0], M[1], K[0], K[1], A[0], A[1], C[0], C[1]);
    //print(W1+" "+W2+" "+W3+" "+W4)
    H1 = intersect2(W1[0], W1[1], W2[0], W2[1], K[0], K[1], E[0], E[1]);
    H2 = intersect2(W2[0], W2[1], W3[0], W3[1], L[0], L[1], M[0], M[1]);
    H3 = intersect2(W3[0], W3[1], W4[0], W4[1], K[0], K[1], E[0], E[1]);
    H4 = intersect2(W4[0], W4[1], W1[0], W1[1], L[0], L[1], M[0], M[1]);

    Z1 = intersect2(O[0], O[1], W1[0], W1[1], H4[0], H4[1], H1[0], H1[1]);
    Z2 = intersect2(O[0], O[1], W2[0], W2[1], H1[0], H1[1], H2[0], H2[1]);
    Z3 = intersect2(O[0], O[1], W3[0], W3[1], H2[0], H2[1], H3[0], H3[1]);
    Z4 = intersect2(O[0], O[1], W4[0], W4[1], H3[0], H3[1], H4[0], H4[1]);
    //print(Z1+" "+Z2+" "+Z3+" "+Z4)
    //T1 = intersect2(H4[0], H4[1], W1[0], W1[1], Z1[0], Z1[1], Z2[0], Z2[1]);
    //T2 = intersect2(W1[0], W1[1], H1[0], H1[1], Z1[0], Z1[1], Z4[0], Z4[1]);
    //T3 = intersect2(H1[0], H1[1], W2[0], W2[1], Z2[0], Z2[1], Z3[0], Z3[1]);
    //T4 = intersect2(W2[0], W2[1], H2[0], H2[1], Z2[0], Z2[1], Z1[0], Z1[1]);
    //T5 = intersect2(H2[0], H2[1], W3[0], W3[1], Z3[0], Z3[1], Z4[0], Z4[1]);
    //T6 = intersect2(W3[0], W3[1], H3[0], H3[1], Z3[0], Z3[1], Z2[0], Z2[1]);
    //T7 = intersect2(H3[0], H3[1], W4[0], W4[1], Z4[0], Z4[1], Z1[0], Z1[1]);
    //T8 = intersect2(W4[0], W4[1], H4[0], H4[1], Z4[0], Z4[1], Z3[0], Z3[1]);


    values[0][0] = image[W4[0]][W4[1]];
    //print(image[W1[0]][W1[1]]);
    values[0][1] = image[H4[0]][H4[1]];
    values[0][2] = image[W1[0]][W1[1]];
    values[1][0] = image[H3[0]][H3[1]];
    values[1][1] = image[O[0]][O[1]];
    values[1][2] = image[H1[0]][H1[1]];
    values[2][0] = image[W3[0]][W3[1]];
    values[2][1] = image[H2[0]][H2[1]];
    values[2][2] = image[W2[0]][W2[1]];

    image[W4[0]][W4[1]]=7;//0
    image[H4[0]][H4[1]]=8;//1
    image[W1[0]][W1[1]]=9;//2
    image[H3[0]][H3[1]]=10;//3
    image[O[0]][O[1]]=11;//4
    image[H1[0]][H1[1]]=12;//5
    image[W3[0]][W3[1]]=13;//6
    image[H2[0]][H2[1]]=14;//7
    image[W2[0]][W2[1]]=15;//8
}

function rotate_clockwise(times)
{
    for (i = 0; i < times; i = i + 1)
    {
        values_temp = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (j = 0; j < 3; j = j + 1)
        {
            for (z = 0; z < 3; z = z + 1)
            {
                values_temp[z][2-j] = values[j][z]
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
    //printSelectedImage();
    //printImage();
    //X = -1;
    //Y = -1;
    //NUM = -1;
    //print(values[0][0]+" "+values[0][1]+" "+values[0][2]);
    //print(values[1][0]+" "+values[1][1]+" "+values[1][2]);
    //print(values[2][0]+" "+values[2][1]+" "+values[2][2]);
    if (values[0][0] == 0 && values[0][2] == 1 && values[2][2] == 1 && values[2][0] == 1)
    {
        rotate_clockwise(2);
    }
    else if (values[0][2] == 0 && values[0][0] == 1 && values[2][2] == 1 && values[2][0] == 1)
    {
        rotate_clockwise(1);
    }
    else if (values[2][2] == 0 && values[0][2] == 1 && values[0][0] == 1 && values[2][0] == 1)
    {
    }
    else if (values[2][0] == 0 && values[0][2] == 1 && values[2][2] == 1 && values[0][0] == 1)
    {
        rotate_clockwise(3)
    }
    //else
    //{
    //print("Error: Incorrect ARTag\n");
    //    return [X, Y, NUM];
    //}
    //print(values[0][0]+" "+values[0][1]+" "+values[0][2]);
    //print(values[1][0]+" "+values[1][1]+" "+values[1][2]);
    //print(values[2][0]+" "+values[2][1]+" "+values[2][2]);
    //code ="";
    code=(values[0][1]*8+values[1][0]*4+values[1][2]*2+values[2][1]);
    //print(code);
    //if(code>=8)
    //	code=code-8;
    //X = values[1][3] * 4 + values[2][0] * 2 + values[2][2];
    //Y = values[2][3] * 4 + values[3][1] * 2 + values[3][2];
    //NUM = values[1][0] * 2 + values[1][2];
    // string = "" + X + " " + Y + " " + NUM;

    // brick.display().addLabel(string,10,10);
    return code;
}
