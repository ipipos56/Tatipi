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

var s = [0,0,0];
s[0] = brick.sensor(A3);
s[1] = brick.sensor(A1);
s[2] = brick.sensor(A2);

var sz = [0,0,0];

var ML = brick.motor(M4).setPower; 
var MR = brick.motor(M3).setPower; 
var EL = brick.encoder(E4); 
var ER = brick.encoder(E3); 

rotCnt = 0;


var direction = 0;

var x,y;
var h = 16;
var point = 136;
var rot = 1;
var map = new Array(256);

fullRot = 0;

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();

	for(var i = 0; i < map.length; i++)
		map[i] = [-1,-1,-1,-1];


    var otv = getARTagValue(0);//inp[1]);
	if(otv >= 8)
		y = otv-8;
	else
		x=otv;
	var otv = getARTagValue(1);//inp[1]);
	if(otv >= 8)
		y = otv-8;
	else
		x=otv;
    print(x+" "+y);
	
	
	ER.reset()
	EL.reset()
	
	brick.gyroscope().calibrate(4000);
	script.wait(4050);
	moveSmall();
	
	var pa = true;
	
	while(pa)
	{
		valSen();
		pa = false;
		for(i = 0;i<3;i++)
		{
			var pr = point;
			print(sz[0]+" "+sz[1]+" "+sz[2]);
			var curre = rot + i - 1;
			curre = cuboid(curre);
			if(sz[i] == 1 && map[point][curre] == -1)
			{
				pa = true;
				print(point+" "+curre)
				if(i == 0)
				{
					turn_left();
					wait(500);
					forward();
				}
				else if(i == 1)
					forward();
				else if(i == 2)
				{
					turn_right();
					wait(500);
					forward();
				}
				break;
			}
			map[pr][curre] = sz[i];
			if(curre == 0)
				map[pr - h][2] = sz[i];
			else if(curre == 1)
				map[pr + 1][3] = sz[i];
			else if(curre == 2)
				map[pr + h][0] = sz[i];
			else if(curre == 3)
				map[pr - 1][1] = sz[i];
		}
		wait(300);
	}
	
	
    brick.display().addLabel("finish",1,1) //вывод ответа
    brick.display().redraw()
    script.wait(5000)

    script.wait(2000)
    return;
}

function valSen()
{
	for(i = 0;i<3;i++)
	{
		sz[i] = s[i].read();
		if(sz[i] < 50)
			sz[i] = 0;
		else
			sz[i] = 1;
	}
}


function stop(){
	MR(0)
	ML(0)
	wait(50)
}

function forward(robot)
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
	while((EL.read()+ER.read())/2 < deg && s[1].read() > 25 )
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
		ML(50+err*1)
		MR(50-err*1)
		wait(1);
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
	//deg = 280
	ML(-30)
	MR(30)
	while(abs(ER.read()) < deg)
	{
		gyro = brick.gyroscope().read()[6]/1000;
		print(gyro);
		wait(1)
	}
	stop()

	rot-=1; // Вращение робота
	rot = cuboid(rot);
}

function turn_right(robot) 
{
	ER.reset()
	EL.reset()
	
	deg = (174/56)*90;
	ML(30);
	MR(-30);
	while(abs(EL.read()) < deg) 
		script.wait(1);
	stop();
	
	rot+=1; // Вращение робота
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