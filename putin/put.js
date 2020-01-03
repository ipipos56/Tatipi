
var marker_size = 5;
var total_width = 320 / 2;
var total_height = 240 / 2;
var prob = 25 * 5 * 5;

function getColor(pic, x, y)
{
    return pic[y * total_width + x];
}

function squareAverage(pic, x, y, diam)
{
    var sum = 0;
    var start_row = y * total_width;
    var end_row = start_row + diam * total_width;

    for (var index = start_row + x; index < end_row; index += total_width)
        for (var j = 0; j < diam; j += 1)
            sum += pic[index + j];

    return sum;
}

var pic = [];
var scale = 1;
var histogram = [];
var histSize = 256;

function calculateHistogram()
{
    for (var i = 0; i < histSize; i += 1)
        histogram[i] = 0;

    var curPixelLine = 0;
    for (var i = 0; i < total_height; i += 1)
    {
        curPixelLine = i * total_width;
        for (var j = 0; j < total_width; j += 1)
            histogram[Math.floor(pic[curPixelLine + j])] += 1;
    }
}

var raw=[];
function getARTagValue()
{
   
// init pic, grayscale mode
    for (var i = 0; i < total_height; i += 1)
    {
        for (var j = 0; j < total_width; j += 1)
        {
            var x = (j + i * scale * total_width) * scale;
            var p = raw[x];
			p='0x'+p;
            p = (((p & 0xff0000) >> 16) + ((p & 0xff00) >> 8) + ((p & 0xff)));
			print(j + i * total_width);
            pic[j + i * total_width] = p;
			
        }
    }
    calculateHistogram();
    getRange();
    initMapColorToLetter();

    var thresh = threshold2(rangeBins[1], pic, total_height, total_width);
    var corners = findCorners(thresh, 9);
    var grid_corners = findGridCorners(corners, marker_size)
                       var values = detectCode(thresh, grid_corners, 3);

    var ans = 0;
    if (values[1][1] == 0)
        ans = 8 * values[3][2] + 4 * values[2][3] + 2 * values[2][1] + values[1][2];
    else if (values[1][3] == 0)
        ans = 8 * values[2][1] + 4 * values[3][2] + 2 * values[1][2] + values[2][3];
    else if (values[3][3] == 0)
        ans = 8 * values[1][2] + 4 * values[2][1] + 2 * values[2][3] + values[3][2];
    else if (values[3][1] == 0)
        ans = 8 * values[2][3] + 4 * values[2][3] + 2 * values[3][2] + values[2][1];
    else
        print("Error: Incorrect ARTag");
    return ans;
};


var grayscale = "@#ao|-. ";
var numOfBins = grayscale.length;
var rangeBins = [];
var binCapacity = total_height * total_width / numOfBins;

function getRange()
{
    for (var i = 0; i < numOfBins; i += 1)
        rangeBins[i] = 0;

    var curBin = 0;
    var curSum = 0;
    var i = 0;
    var lastIndexBin = numOfBins - 1;

    for (;
            (i < histSize) && (curBin < lastIndexBin); i += 1)
    {
        var diff = binCapacity - curSum;

        if (Math.abs(diff) < Math.abs(diff - histogram[i]))
        {
            curBin++;
            curSum = 0;
        }

        curSum += histogram[i];
        rangeBins[curBin] = i;
    }

    for (; curBin <= lastIndexBin; curBin += 1)
        rangeBins[curBin] = histSize;
}

var mapColorToLetter = [];

function initMapColorToLetter()
{
    var curBin = 0;
    for (var i = 0; i < histSize; i += 1)
    {
        if (rangeBins[curBin] <= i)
        {
            curBin += 1;
        }
        mapColorToLetter[i] = grayscale[curBin];
    }
}

function getCenterColor(pic, lu, ld, ru, rd, diam)
{
    var x = (lu[0] + ld[0] + ru[0] + rd[0]) >> 2;
    var y = (lu[1] + ld[1] + ru[1] + rd[1]) >> 2;
    var color = squareAverage(pic, x - diam, y - diam, diam << 1);
	print(color);
    return color;
}
function findGridCorners(corners, marker_size)
{
    var grid_corners = [];

    var vertical_lines = [];
    var upper_line_x1 = corners[0][0];
    var upper_line_y1 = corners[0][1];
    var upper_line_x2 = corners[2][0];
    var upper_line_y2 = corners[2][1];
    var down_line_x1 = corners[1][0];
    var down_line_y1 = corners[1][1];
    var down_line_x2 = corners[3][0];
    var down_line_y2 = corners[3][1];

    var mks = 1.0 / marker_size;
    var k_ux = (upper_line_x2 - upper_line_x1) * mks;
    var k_uy = (upper_line_y2 - upper_line_y1) * mks;
    var k_dx = (down_line_x2 - down_line_x1) * mks;
    var k_dy = (down_line_y2 - down_line_y1) * mks;

    for (var i = 0; i < marker_size + 1; i += 1)
    {

        var up_x = upper_line_x1 + k_ux * i;
        var up_y = upper_line_y1 + k_uy * i;

        var down_x = down_line_x1 + k_dx * i;
        var down_y = down_line_y1 + k_dy * i;
        var k_x = (down_x - up_x) * mks;
        var k_y = (down_y - up_y) * mks;

        for (j = 0; j <= marker_size; j += 1)
        {

            var point_x = up_x + k_x * j;
            var point_y = up_y + k_y * j;

            grid_corners.push([Math.floor(point_x), Math.floor(point_y)]);
        }
    }
    return grid_corners;
}
function detectCode(pic, grid_corners, diam)
{
    var calculated_colors = []
                            var markerSizePlusOne = marker_size + 1;
    var shiftedDiam = diam << 8;

    for (var i = 0; i < marker_size; i += 1)
    {
        for (var j = 0; j < marker_size; j += 1)
        {
            lu_index = i * (markerSizePlusOne) + j;
            ld_index = i * (markerSizePlusOne) + j + 1;
            ru_index = (i + 1) * (markerSizePlusOne) + j;
            rd_index = (i + 1) * (markerSizePlusOne) + j + 1;

            var lu = grid_corners[lu_index];
            var ld = grid_corners[ld_index];
            var ru = grid_corners[ru_index];
            var rd = grid_corners[rd_index];

            grid_color = getCenterColor(pic, lu, ld, ru, rd, diam);
            if (grid_color < shiftedDiam)
            {
                
				calculated_colors.push(0)
            }
            else
            {
                calculated_colors.push(1);
            }
        }
    }
    return calculated_colors;
}
function findULCorner(pic, diam)
{
    var color = 1;
    for (var i = 0; i < total_height; i += 1)
    {
        for (var j = 0; j <= i; j += 1)
        {
            var x = j;
            var y = i - j;
            if (getColor(pic, x, y) == 0)
            {
                color = squareAverage(pic, x, y, diam);
                if (color < prob)
                {
                    return [x, y];
                }
            }
        }
    }
}
function findDLCorner(pic, diam)
{
    var color = 1;
    for (var i = 0; i < total_height; i += 1)
    {
        for (var j = 0; j <= i; j += 1)
        {
            var x = j;
            var y = total_height - (i - j);
            if (getColor(pic, x, y) == 0)
            {
                color = squareAverage(pic, x, y - diam + 1, diam);
                if (color < prob)
                {
                    return [x, y];
                }
            }
        }
    }
}
function findURCorner(pic, diam)
{
    for (var i = 0; i < total_height; i += 1)
    {
        for (var j = 0; j <= i; j += 1)
        {
            var x = total_width - j;
            var y = i - j;
            if (getColor(pic, x, y) == 0)
            {
                var color = squareAverage(pic, x - diam + 1, y, diam);
                if (color < prob)
                {
                    return [x, y];
                }
            }
        }
    }
}
function findDRCorner(pic, diam)
{
    for (var i = 0; i < total_height; i += 1)
    {
        for (var j = 0; j <= i; j += 1)
        {
            var x = total_width - j;
            var y = total_height - (i - j);
            if (getColor(pic, x, y) == 0)
            {
                var color = squareAverage(pic, x - diam + 1, y - diam + 1, diam);
                if (color < prob)
                {
                    return [x, y];
                }
            }
        }
    }
}
function findCorners(pic, diam)
{
    return [findULCorner(pic, diam), findDLCorner(pic, diam), findURCorner(pic,diam), findDRCorner(pic, diam)];
}
function threshold2(level, pic, height, width)
{
    var length = pic.length;
    for (var i = 0; i < length; i += 1)
    {
        var color = pic[i];
        if (color < level)
        {
            pic[i] = 0;
        }
        else
        {
            pic[i] = 255;
        }
    }
    return pic;
}


function printImage()
{
    for (i = 0; i < total_height; ++i) 
	{
		str = "";
        for (j = 0; j < total_width; ++j)
			str += [pic[i][j]] + " ";//".#ABCD*"
        print(str);
    }
}
var main = function()
{
	 ins = script.readAll("input.txt");
     raw = ins[0].split(" ");
	var g=getARTagValue();
	printImage();
	//var t=getColor(pic, x, y);
}