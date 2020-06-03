function finish(startX, startY, mapW, mapH){
	mapW = mapW == undefined ? 8 : mapW
	mapH = mapH == undefined ? 4 : mapH
	
	var finishX = startX, finishY = startY
	if (startX >= mapW || startX < 0)
		throw 'Координата X старта должна быть в пределах [0, ' + mapW + ']'
	else if (startY >= mapH || startY < 0)
		throw 'Координата Y старта должна быть в пределах [0, ' + mapH + ']'
	else {
		while (Math.abs(startX - finishX) + Math.abs(startY - finishY) < 5){
			finishX = script.random(0, mapW-1)
			finishY = script.random(0, mapH-1)
		}
		return [finishX, finishY]
	}
}

/*

ПРИМЕР псевдокода использования функции генерации секции финиша:

Повторять пока (истина):
    XY_секции_финиша = finish((4, 2))
    номер_секции_финиша = переводXY_в_номер_секции(XY_секции_финиша) // секция с координатами (4, 2) имеет номер 20

    Если (функция_составления_пути_между_двумя_секциями(секция_старта, секция_финиша) == Истина), то 
        прервать цикл				// роботом можно проехать из секции старта в секцию финиша
    иначе
        print(XY_секции_финиша, ' -1')

*/