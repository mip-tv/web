// function drawmap() {
//     $.ajax({
//         type: 'GET',
//         url: '/v1/stats/servers?date='+Date.now(),
// 		dataType: 'json',
//         success: incomingData,
//     });
//
// }
//
// function incomingData(data) {
// 	console.log(data);
// }

$(document).ready(function () {
	// drawmap();
    var headings = ["IP", "Country", "Location", "Timestamp", "URI"];
    var size = headings.length;
    var dataset = [["218.31234.213424.1", "Germany", "Berlin", "today", "Blaaaaa"],
                   ["218.31234.213424.1", "Germany", "Berlin", "today", "Blaaaaa"],
                   ["218.31234.213424.1", "Germany", "Berlin", "today", "Blaaaaa"],
                   ["218.31234.213424.1", "Germany", "Berlin", "today", "Blaaaaa"],
                   ["218.31234.213424.1", "Germany", "Berlin", "today", "Blaaaaa"],
                   ["218.31234.213424.1", "Germany", "Berlin", "today", "Blaaaaa"]
                  ];
    var rowsToAdd = dataset.length;

    var tableToAdd = $('#dataTable');
    tableToAdd.add("<thead><tr>");
    var tableHeadings = "";
    for (i = 0; i < size; i++) {
        tableHeadings += "<td>" + headings[i] + "</td>";
    }
    tableToAdd.append("<thead><tr>" + tableHeadings + "</tr></thead>");

    var bodyToAdd = "";

    for (i = 0; i < rowsToAdd; i++) {
        var tempRowToAdd = "";
        for (j = 0; j < size; j++) {
            tempRowToAdd += "<td>" + dataset[i][j] + "</td>";
        }
        bodyToAdd += "<tr>" + tempRowToAdd + "</tr>";

    }

    tableToAdd.append("<tfoot>" + bodyToAdd + "</tfoot>");


    /**
    var card = document.getElementsByClassName("card-body"),
        tbl = document.createElement('table-responsive');
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';

        for (i = 0; i < rowsToAdd; i++) {
            var tr = tbl.insertRow();
            for (j = 0; j < size; j++) {
                if (i == rowsToAdd - 1 && j == size - 1) {
                    break;
                } else {
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode('Cell'));
                    td.style.border = '1px solid black';
                    if (i == 1 && j == 1) {
                        td.setAttribute('rowSpan', '2');
                    }
                }
            }
        }
        $(card).append(tbl); **/
});
