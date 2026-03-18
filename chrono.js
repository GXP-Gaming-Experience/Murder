// Tim et mathis sont passé par la 

let segment;
let interval;
let start = false;
let mode = "countDown";
let h = 1,
	m = 0,
	s = 0;

function getTime() {
	const today = new Date();
	h = today.getHours();
	m = checkTime(today.getMinutes());
	s = checkTime(today.getSeconds());

	segment.value(h + "." + m + "." + s);
}

function countUp() {
	++s;
	m += parseInt(s / 60);
	s = s % 60;
	h += parseInt(m / 60);
	m = m % 60;
	h = h % 24;
	segment.value(h + "." + checkTime(m) + "." + checkTime(s));
}

function countDown() {
	--s;

	if (s < 0) {
		s = 59;
		m--;
	}
	if (m < 0) {
		m = 59;
		h--;
	}
	if (h < 0) {
		h = 0;
	}
	if (s == 0 && m == 0 && h == 0) {
		start = false;
		clearInterval(interval);
		alert("Time's Up!");
	}

	segment.value(h + "." + checkTime(m) + "." + checkTime(s));
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function tick() {
	if (mode == "time") {
		getTime();
	} else if (mode == "countUp") {
		countUp();
	} else if (mode == "countDown") {
		countDown();
	}
}




$(document).ready(function () {
	segment = $("#segContainer").segmentDisplay({
		digits: 6,
		value: "10000",
		displayType: "seven-seg",
		colorTheme: "Red"
	});

    $("#setTimeBtn").on("click", function() {
        $("#timeModal").removeClass("hidden");
    });

    $("#cancelTime").on("click", function() {
        $("#timeModal").addClass("hidden");
    });

    $("#confirmTime").on("click", function() {
        h = parseInt($("#hour").val(), 10) || 0;
        m = parseInt($("#min").val(), 10) || 0;
        s = parseInt($("#sec").val(), 10) || 0;
        $("#timeModal").addClass("hidden");
        segment.value(h + "." + checkTime(m) + "." + checkTime(s));
    });


	$("#start").on("click", function () {
		if (start == false) {
			start = true;
			interval = setInterval(function () {
				tick();
			}, 1000);
		}
	});
	$("#stop").on("click", function () {
		if (start) {
			start = false;
			clearInterval(interval);
		}
	});

	$("#pause").on("click", function () {
		start = false;
		clearInterval(interval);
	});

	$("#reset").on("click", function () {
        if (mode == "countDown" || mode == "countUp") {
				h = parseInt($("#hour").val(), 10) || 0;
			    m = parseInt($("#min").val(), 10) || 0;
			    s = parseInt($("#sec").val(), 10) || 0;
			}
        segment = $("#segContainer").segmentDisplay({
            digits: 6,
            value: h.toString() + checkTime(m)  + checkTime(s), 
            displayType: "seven-seg",
            colorTheme: "Red"
	    });
		start = false;
		clearInterval(interval);
	});

	$("#extraOptionsCB").on("change", function () {
		if (this.checked) {
			$("#extraOptionsSection").css("display", "block");
		} else {
			$("#extraOptionsSection").css("display", "none");
		}
	});

	$("#displayType").on("change", function () {
		segment.displayType($(this).val());
	});

	$("#displayTheme").on("change", function () {
		segment.changeTheme($(this).val());
	});

	$("#countMode").on("change", function () {
		mode = $(this).val();
		start = false;
		clearInterval(interval);
		segment.value("0");
		h = 0;
		m = 0;
		s = 0;
		if (mode == "countDown" || mode == "countUp") {
			$("#timeSetSection").css("display", "block");
		} else {
			$("#timeSetSection").css("display", "none");
		}
	});
});
/*
 * Version 0.0.2
 * Last update: 09/11/2024
 */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		define(["jquery"], factory);
	} else if (typeof module !== "undefined" && module.exports) {
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
})(function ($, undefined) {
	let defaultSettings = {
		digits: 0,
		value: 0,
		colorTheme: "Red",
		slant: 0,
		displayType: "seven-seg"
	};

	$.fn.segmentDisplay = function (settings) {
		settings = $.extend({}, defaultSettings, settings || {});
		let xmlns = "http://www.w3.org/2000/svg";
		let xlinkns = "http://www.w3.org/1999/xlink";
		let colorThemes = {
			Red: {
				colorOn: "Red",
				colorOff: "#1b0101"
			},
			Lime: {
				colorOn: "Lime",
				colorOff: "#003200"
			},
			Yellow: {
				colorOn: "Yellow",
				colorOff: "#353405"
			},
			Blue: {
				colorOn: "Blue",
				colorOff: "#052535"
			}
		};

		let sevenSegValues = {
			0: "1111110",
			1: "0110000",
			2: "1101101",
			3: "1111001",
			4: "0110011",
			5: "1011011",
			6: "1011111",
			7: "1110000",
			8: "1111111",
			9: "1111011",
			"-": "0000001",
			"": "0000000"
		};

		let sevenSegValuesFull = {
			0: "1111110",
			1: "0110000",
			2: "1101101",
			3: "1111001",
			4: "0110011",
			5: "1011011",
			6: "1011111",
			7: "1110000",
			8: "1111111",
			9: "1111011",
			a: "1110111",
			b: "0011111",
			c: "1001110",
			d: "0111101",
			e: "1001111",
			f: "1000111",
			g: "1111011",
			h: "0110111",
			i: "0110000",
			j: "0111100",
			l: "0001110",
			n: "0010101",
			o: "1111110",
			p: "1100111",
			q: "1110011",
			r: "0000101",
			s: "1011011",
			t: "0001111",
			u: "0111110",
			x: "0110111",
			y: "0111011",
			z: "1101101",
			"-": "0000001",
			A: "1110111",
			B: "0011111",
			C: "1001110",
			D: "0111101",
			E: "1001111",
			F: "1000111",
			G: "1111011",
			H: "0110111",
			I: "0110000",
			J: "0111100",
			L: "0001110",
			N: "0010101",
			O: "1111110",
			P: "1100111",
			Q: "1110011",
			R: "0000101",
			S: "1011011",
			T: "0001111",
			U: "0111110",
			X: "0110111",
			Y: "0111011",
			Z: "1101101"
		};

		let fourteenSegValues = {
			0: "11111100000000",
			1: "01100000000100",
			2: "11011011000000",
			3: "11110001000000",
			4: "01100111000000",
			5: "10110111000000",
			6: "10111111000000",
			7: "10000000010100",
			8: "11111111000000",
			9: "11100111000000",
			"-": "00000011000000"
		};

		let fourteenSegValuesFull = {
			0: "11111100000000",
			1: "01100000000100",
			2: "11011011000000",
			3: "11110001000000",
			4: "01100111000000",
			5: "10110111000000",
			6: "10111111000000",
			7: "10000000010100",
			8: "11111111000000",
			9: "11100111000000",
			"-": "00000011000000",
			a: "11111011000000",
			b: "00011110000010",
			c: "00011011000000",
			d: "01110001000001",
			e: "10011110000000",
			f: "10001110000000",
			g: "11110001001000",
			h: "00101111000000",
			i: "00000000100000",
			j: "01111000000000",
			k: "00000000110110",
			l: "00000000110000",
			m: "00101011010000",
			n: "00001010000010",
			o: "00111011000000",
			p: "10001110000100",
			q: "11000111000010",
			r: "00001010000000",
			s: "10110001001000",
			t: "00011110000000",
			u: "00111000000000",
			v: "00001000000001",
			w: "00101000000011",
			x: "00000000001111",
			y: "01110001100000",
			z: "10010000000101",
			A: "11101111000000",
			B: "11110001110000",
			C: "10011100000000",
			D: "11110000110000",
			E: "10011111000000",
			F: "10001111000000",
			G: "10111101000000",
			H: "01101111000000",
			I: "10010000110000",
			J: "01111000000000",
			K: "00001110000110",
			L: "00011100000000",
			M: "01101100001100",
			N: "01101100001010",
			O: "11111100000000",
			P: "11001111000000",
			Q: "11111100000010",
			R: "11001111000010",
			S: "10110001001000",
			T: "10000000110000",
			U: "01111100000000",
			V: "00001100000101",
			W: "01101100000011",
			X: "00000000001111",
			Y: "00000000011100",
			Z: "10010000000101"
		};

		let sixteenSegValues = {
			0: "1111111100000101",
			1: "0011000000000100",
			2: "1110111011000000",
			3: "1111110001000000",
			4: "0011000111000000",
			5: "1101110111000000",
			6: "1001111111000000",
			7: "1111000000000000",
			8: "1111111111000000",
			9: "1111100111000000",
			"-": "0000000011000000"
		};

		let sixteenSegValuesFull = {
			0: "1111111100000101",
			1: "0011000000000100",
			2: "1110111011000000",
			3: "1111110001000000",
			4: "0011000111000000",
			5: "1101110111000000",
			6: "1001111111000000",
			7: "1111000000000000",
			8: "1111111111000000",
			9: "1111100111000000",
			"-": "0000000011000000",
			a: "0000011010011000",
			b: "0000011110010000",
			c: "0000011010000000",
			d: "0000011010110000",
			e: "0000111010000001",
			f: "0100000011110000",
			g: "1000010110110000",
			h: "0000001110010000",
			i: "0000000000010000",
			j: "0000011000110000",
			k: "0000000000110110",
			l: "0000000000110000",
			m: "0001001011010000",
			n: "0000001010010000",
			o: "0000011010010000",
			p: "1000001110100000",
			q: "1000000110110000",
			r: "0000001010000000",
			s: "1000010110010000",
			t: "0000000011110000",
			u: "0000011000010000",
			v: "0000001000000001",
			w: "0001001000000011",
			x: "0000000000001111",
			y: "0000000000011100",
			z: "0000010010000001",
			A: "1111001111000000",
			B: "1111110001110000",
			C: "1100111100000000",
			D: "1111110000110000",
			E: "1100111110000000",
			F: "1100001110000000",
			G: "1101111101000000",
			H: "0011001111000000",
			I: "1100110000110000",
			J: "0011111000000000",
			K: "0000001110000110",
			L: "0000111100000000",
			M: "0011001100001100",
			N: "0011001100001010",
			O: "1111111100000000",
			P: "1110001111000000",
			Q: "1111111100000010",
			R: "1110001111000010",
			S: "1101110111000000",
			T: "1100000000110000",
			U: "0011111100000000",
			V: "0000001100000101",
			W: "0011001100000011",
			X: "0000000000001111",
			Y: "0010000111010000",
			Z: "1100110000000101"
		};

		this.value = function (val) {
			updateValue(val);
		};

		this.displayType = function (val) {
			updateDisplayType(val);
		};

		this.changeTheme = function (val) {
			updateColorTheme(val);
		};

		return this.each(function () {
			var elem = $(this);
			settings.id = elem[0].id;
			settings.mainDisplayElement = document.getElementById(settings.id);
			settings.displayElements = [];

			if (settings.digits === undefined) {
				settings.digits = 5;
			}

			if (settings.colorTheme === undefined) {
				settings.colorTheme = "Red";
			}

			updateValue(settings.value);
		});

		function updateValue(value) {
			settings.value = value.toString();

			redraw();
		}

		function updateColorTheme(value) {
			settings.colorTheme = value.toString();

			redraw();
		}

		function updateDisplayType(displayType) {
			if (displayType == "seven-seg") {
				settings.displayType = "seven-seg";
			} else if (displayType == "seven-seg-full") {
				settings.displayType = "seven-seg-full";
			} else if (displayType == "14-segment") {
				settings.displayType = "14-segment";
			} else if (displayType == "14-segment-full") {
				settings.displayType = "14-segment-full";
			} else if (displayType == "16-segment") {
				settings.displayType = "16-segment";
			} else if (displayType == "16-segment-full") {
				settings.displayType = "16-segment-full";
			}

			redraw();
		}

		function redraw() {
			while (settings.mainDisplayElement.firstChild) {
				settings.mainDisplayElement.removeChild(
					settings.mainDisplayElement.firstChild
				);
			}

			for (var i = 0; i < settings.digits; i++) {
				var displayDigit = {
					digit: "",
					hasDecimal: false,
					code: "00000000000000"
				};
				settings.displayElements[i] = displayDigit;
			}

			var j = settings.displayElements.length - 1;
			for (var i = settings.value.length - 1; i >= 0; i--) {
				var d = settings.value[i];
				var hasDecimal = false;
				if (d == ".") {
					i--;
					d = settings.value[i];
					hasDecimal = true;
				}

				var displayCode = "";
				if (settings.displayType == "seven-seg") {
					displayCode = sevenSegValues[d];
				} else if (settings.displayType == "seven-seg-full") {
					displayCode = sevenSegValuesFull[d];
				} else if (settings.displayType == "14-segment") {
					displayCode = fourteenSegValues[d];
				} else if (settings.displayType == "14-segment-full") {
					displayCode = fourteenSegValuesFull[d];
				} else if (settings.displayType == "16-segment") {
					displayCode = sixteenSegValues[d];
				} else if (settings.displayType == "16-segment-full") {
					displayCode = sixteenSegValuesFull[d];
				}

				if (hasDecimal) {
					displayCode = displayCode + "1";
				} else {
					displayCode = displayCode + "0";
				}

				var displayDigit = {
					digit: d,
					hasDecimal: hasDecimal,
					code: displayCode
				};

				settings.displayElements[j] = displayDigit;
				j--;
			}
			var colorOn = colorThemes[settings.colorTheme].colorOn;
			var colorOff = colorThemes[settings.colorTheme].colorOff;

			for (var i = 0; i < settings.displayElements.length; i++) {
				var block = createSegmentBlock(
					settings.digits,
					settings.displayType,
					settings.slant,
					colorOff,
					colorOn,
					settings.displayElements[i].code,
                    i
				);
				settings.mainDisplayElement.appendChild(
					block,
					settings.mainDisplayElement.firstChild
				);
			}
		}

		function createSegmentBlock(
			digits,
			displayType,
			slant,
			offColor,
			onColor,
			displayCode,
            id
		) {
			var container;
			if (displayType == "seven-seg") {
				container = createSevenSeg(digits, slant, offColor, onColor, displayCode,id);
			} else if (displayType == "seven-seg-full") {
				//sevenSegValuesFull
				container = createSevenSeg(digits, slant, offColor, onColor, displayCode,id);
			} 

			return container;
		}

		function createSevenSeg(digits, slant, offColor, onColor, displayCode,id) {
			var decimalX = 52;
			// Initilize all the elements
			var container = document.createElement("div");
			var svg = document.createElementNS(xmlns, "svg");
			var defs = document.createElementNS(xmlns, "defs");
			var hline = document.createElementNS(xmlns, "polyline");
			var vline = document.createElementNS(xmlns, "polyline");
			var displayGroup = document.createElementNS(xmlns, "g");
			var s0 = document.createElementNS(xmlns, "use");
			var s1 = document.createElementNS(xmlns, "use");
			var s2 = document.createElementNS(xmlns, "use");
			var s3 = document.createElementNS(xmlns, "use");
			var s4 = document.createElementNS(xmlns, "use");
			var s5 = document.createElementNS(xmlns, "use");
			var s6 = document.createElementNS(xmlns, "use");
			var c = document.createElementNS(xmlns, "circle");
            var c1 = document.createElementNS(xmlns, "circle");

			// Create all the element attributes
			var width = 100 / digits;
			container.setAttribute(
				"style",
				"display: inline-block; height: 100%; width: " + width + "%;"
			);

			svg.setAttributeNS(null, "id", "svgT");
			svg.setAttribute("class", "seg-svg");
			svg.setAttributeNS(null, "viewBox", "0 0 57 80");
			svg.setAttributeNS(null, "version", "1.1");
			svg.setAttribute("xmlns", xmlns);
			svg.setAttribute("xmlns:xlink", xlinkns);
			svg.setAttribute("style", "fill: " + offColor);

			hline.setAttributeNS(null, "id", "hSeg");
			hline.setAttributeNS(null, "points", "11 0, 37 0, 42 5, 37 10, 11 10, 6 5");

			vline.setAttributeNS(null, "id", "vSeg");
			vline.setAttributeNS(null, "points", "0 11, 5 6, 10 11, 10 34, 5 39, 0 39");

			displayGroup.setAttribute("class", "segDisplayDigitGroup");
			if (slant !== undefined && slant != 0) {
				displayGroup.setAttributeNS(null, "transform", "skewX(-" + slant + ")");
				decimalX = decimalX - slant / 2;
			}

			s0.setAttributeNS(xlinkns, "xlink:href", "#hSeg");
			s0.setAttribute("x", "0");
			s0.setAttribute("y", "0");
			if (displayCode[0] == "1") {
				s0.setAttribute("style", "fill: " + onColor);
			}

			s1.setAttributeNS(xlinkns, "xlink:href", "#vSeg");
			s1.setAttributeNS(null, "transform", "scale(-1,1)");
			s1.setAttribute("x", "-48");
			s1.setAttribute("y", "0");
			if (displayCode[1] == "1") {
				s1.setAttribute("style", "fill: " + onColor);
			}

			s2.setAttributeNS(xlinkns, "xlink:href", "#vSeg");
			s2.setAttributeNS(null, "transform", "scale(-1,-1)");
			s2.setAttribute("x", "-48");
			s2.setAttribute("y", "-80");
			if (displayCode[2] == "1") {
				s2.setAttribute("style", "fill: " + onColor);
			}

			s3.setAttributeNS(xlinkns, "xlink:href", "#hSeg");
			s3.setAttribute("x", "0");
			s3.setAttribute("y", "70");
			if (displayCode[3] == "1") {
				s3.setAttribute("style", "fill: " + onColor);
			}

			s4.setAttributeNS(xlinkns, "xlink:href", "#vSeg");
			s4.setAttributeNS(null, "transform", "scale(1,-1)");
			s4.setAttribute("x", "0");
			s4.setAttribute("y", "-80");
			if (displayCode[4] == "1") {
				s4.setAttribute("style", "fill: " + onColor);
			}

			s5.setAttributeNS(xlinkns, "xlink:href", "#vSeg");
			s5.setAttribute("x", "0");
			s5.setAttribute("y", "0");
			if (displayCode[5] == "1") {
				s5.setAttribute("style", "fill: " + onColor);
			}

			s6.setAttributeNS(xlinkns, "xlink:href", "#hSeg");
			s6.setAttribute("x", "0");
			s6.setAttribute("y", "35");
			if (displayCode[6] == "1") {
				s6.setAttribute("style", "fill: " + onColor);
			}

            if (id == 1 || id == 3) {
                c.setAttribute("cx", decimalX+5);
                c.setAttribute("cy", "50");
                c.setAttribute("r", "5");
                if (displayCode[7] == "1") {
                    c.setAttribute("style", "fill: " + onColor);
                }

                c1.setAttribute("cx", decimalX+5);
                c1.setAttribute("cy", "30");
                c1.setAttribute("r", "5");
                if (displayCode[7] == "1") {
                    c1.setAttribute("style", "fill: " + onColor);
                }
            }

			// Add the elements
			defs.appendChild(hline);
			defs.appendChild(vline);
			svg.appendChild(defs);
			svg.appendChild(displayGroup);
			svg.appendChild(c);
            svg.appendChild(c1);

			displayGroup.appendChild(s0);
			displayGroup.appendChild(s1);
			displayGroup.appendChild(s2);
			displayGroup.appendChild(s3);
			displayGroup.appendChild(s4);
			displayGroup.appendChild(s5);
			displayGroup.appendChild(s6);

			container.appendChild(svg);

			return container;
		}

	
	};
});
