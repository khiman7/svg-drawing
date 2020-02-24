window.onload = () => {
	const svg = d3.select('#svg');
	const clearButton = document.querySelector('.btn-clear');
	const colorPicker = document.querySelector('.color-picker');
	const brushSize = document.querySelector('.brush-size');

	let drawing = false;
	let coords, prevCoords;
	let size = brushSize.value;
	let color = 'black';

	function draw_point() {
		if (drawing) {
			if (coords) {
				prevCoords = coords.slice();
			}
			
			coords = d3.mouse(this);
			
			if (prevCoords) {
				svg.append('line')
					.attr('x1', prevCoords[0])
					.attr('y1', prevCoords[1])
					.attr('x2',	coords[0])
					.attr('y2', coords[1])
					.style('stroke', color)
					.style('stroke-width', size);
			}
		
			svg.append('circle')
				.attr('cx', coords[0])
				.attr('cy', coords[1])
				.attr('r', size / 2)
				.style('fill', color);
		}
	}


	function clear() {
		svg.selectAll('*').remove();
	}

	svg.on('mousemove', draw_point);
	svg.on('mousedown', () => {
		drawing = true;
	});
	svg.on('mouseup', () => {
		drawing = false;
		coords = prevCoords = null;
	});
	clearButton.addEventListener('click', clear);
	colorPicker.addEventListener('change', () => {
		color = colorPicker.value;
	});
	brushSize.addEventListener('change', () => {
		document.querySelector('.size').innerText = brushSize.value;
		size = brushSize.value;
	});
}

