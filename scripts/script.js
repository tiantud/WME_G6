$(document).on(
		'click',
		'i',
		function() {
			var table = $(this).parents('table').eq(0);
			var rows = table.find('tr:gt(0)').toArray().sort(
					comparer($(this).parents('th').index()));
			if ($(this).index() % 2 != 0)
				rows = rows.reverse();
			table.children('tbody').empty().html(rows);
		});

function comparer(index) {
	return function(a, b) {
		var valA = getCellValue(a, index), valB = getCellValue(b, index);
		var result;
		result = $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA
				.localeCompare(valB);
		if (result == 0) {
			var IDA = getCellValue(a, 0);
			var IDB = getCellValue(b, 0);
			result = $.isNumeric(IDA) && $.isNumeric(IDB) ? IDA - IDB : IDA
					.localeCompare(IDB);
		}
		return result;
	};
}

function getCellValue(row, index) {
	return $(row).children('td').eq(index).text();
}
$(document).ready(function() {

	$("#cross").hide();
	$("#menu").hide();
	$("#hamburger").click(function() {
		$("#menu").slideDown("normal", function() {
			$("#hamburger").hide();
			$("#cross").show();
		});
	});

	$("#cross").click(function() {
		$("#menu").slideUp("normal", function() {
			$("#cross").hide();
			$("#hamburger").show();
		});
	});

});

$(function() {
	var collection = $(".showOrHide");
	$.each(collection, function() {
		$(this).addClass("originTag");
	});
});

function beClicked(Button) {
	var collection = $(".showOrHide");
	//Calcu;ate the index in table header.
	var buttonIndex = ($(Button).index() + 1) / 2 + 1;
	if ($(Button).hasClass("originTag")) {
		$(Button).removeClass("originTag");
		$(Button).addClass("grayTag");
		showHideSwitch(buttonIndex, "hidedTd");
	} else {
		$(Button).removeClass("grayTag");
		$(Button).addClass("originTag");
		showHideSwitch(buttonIndex, "");
	}
}

function showHideSwitch(index, clName) {
	$("#tbBody").find('tr').each(function() {
		$(this).children('td').eq(index).removeClass();
		if (clName != "")
			//If clName not empty, then clName is "hidedTd".
			$(this).children('td').eq(index).addClass(clName);
	});

	$("#tbHead").children('tr').eq(0).children('th').eq(index).removeClass();
	if (clName != "")
		$("#tbHead").children('tr').eq(0).children('th').eq(index).addClass(
				clName);
}