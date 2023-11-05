let container = document.getElementById('container');
let table = document.getElementById("table");
let painter = document.createElement('span');
let body = document.querySelector('body');
var pixelSize = 10;
var thick = 30;
var mouseX,
    mouseY;

if(sessionStorage.length > 1) {
    pixelSize = Number(sessionStorage.getItem('pixel-size'));
    thick = Number(sessionStorage.getItem('thickness'));
    document.querySelector('input.size').value = pixelSize;
    document.querySelector('input.thick').value = thick;
} else {
    sessionStorage.setItem('pixel-size', 10);
    sessionStorage.setItem('thickness', 30);
}

painter.className = 'painter';
painter.id = 'painter';
body.append(painter);

window.onload = function() {
    for(i = 0; i < table.clientHeight; i += pixelSize) {
        let line = document.createElement("tr");
        line.setAttribute('id', `line_${i}`);
        line.setAttribute('class', `line`);
        line.style['height'] = pixelSize + 'px';
        for(j = 0; j < table.clientWidth; j += pixelSize) {
            let squ = document.createElement("td");
            squ.setAttribute('id', `squ_${i}_${j}`);
            squ.setAttribute('onmouseenter', 'changeColor(this)');
            squ.setAttribute('class', 'squ');
            squ.setAttribute('backG', '0');
            squ.style['width'] = pixelSize + 'px';
            squ.style['height'] = pixelSize + 'px';
            line.append(squ);
        }
        table.append(line);
    }
}
function upd() {
    // Thickness
    thick = document.querySelector('input.thick').value;

    // Texto
    document.getElementById('thi').textContent = thick;
    document.getElementById('siz').textContent = pixelSize;

    // Preview
    document.getElementById('prev_thi').style['width'] = thick + 'px';
    document.getElementById('prev_thi').style['height'] = thick + 'px';
    document.getElementById('prev_siz').style['width'] = pixelSize + 'px';
    document.getElementById('prev_siz').style['height'] = pixelSize + 'px';
    requestAnimationFrame(upd);
}
function overlapping() {
    for(i = 0; i < thick; i += 5) {
        for(j = 0; j < thick; j += 5) {
            var x = Math.floor((painter.getBoundingClientRect().left - table.getBoundingClientRect().left) / 10)*10 + i;
            var y = Math.floor((painter.getBoundingClientRect().top - table.getBoundingClientRect().top) / 10)*10 + j;
            changeColor(document.getElementById(`squ_${y}_${x}`));
        }
    }
};
function changeColor(squ) {
    if(document.body.contains(squ)) {
        let backG = squ.getAttribute('backG');
        squ.style['background-color'] = `rgb(${Number(backG) + 2},${Number(backG) + 2},${Number(backG) + 2})`;
        squ.setAttribute('backG', Number(backG) + 2);
    }
};

container.addEventListener('mousemove', function(e) {
    overlapping();
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(thick > 10) {
        painter.style['top'] = mouseY - thick / 2 + 'px';
        painter.style['left'] = mouseX - thick / 2 + 'px';
    }
});
upd();