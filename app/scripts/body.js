


for (var rows = 0; rows <= 4; rows++) {
    document.write('<div class="row">');
    for (var columns = 0; columns <= 5; columns++) {
        document.write('<div class="col-xs-2" id="t' + ((6 * rows) + columns) + '"></div>');
    }
    document.write('<\/div>');
}
document.write('<\/div>');

