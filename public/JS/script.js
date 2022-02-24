var doc = new jsPDF();
var specialElementHandlers = {
  '#editor': function (element, renderer) {
    return true;
  },
};

$('#cmd').click(function () {
  doc.fromHTML($('#content').html(), 30, 15, {
    width: 170,
    elementHandlers: specialElementHandlers,
  });
  doc.save('invoice.pdf');
});
