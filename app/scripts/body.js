


for (var a = 0; a <= 4; a++) {
    document.write('<div class="row">');
    for (var b = 0; b <= 5; b++) {
        document.write('<div class="col-xs-2 shit" id="t' + ((6 * a) + b) + '"></div>');
    }
    document.write('<\/div>');
}
document.write('<\/div>');