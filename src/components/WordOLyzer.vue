<template>
	<div>
		<h3>
			untitled word app project thingy
			<div src=""></div>
			<span id="version"></span>
		</h3>
		<div class="leftBox">
			<textarea
				id="toAnalyze"
				name="toAnalyze"
				placeholder="[type or paste text here with ctrl+v]"
				style="width: 400px; height: 200px;"
			></textarea>
		</div>
		<div class="rightBox">
			<button id="reset">Clear</button>
			<button id="sample">+[demo data]</button>
			<input
				id="fileInput"
				type="file"
				accept="text/plain"
				onchange="getFile(event)"
				style="width: 150px;"
			/>
			<button id="punctuation">&lt; clean &gt;</button>
		</div>
		<br />
		<button @click="getWordCount" class="bigButton">
			Word-o-lyze&reg; it!
		</button>
		<hr />
		<br />

		<label>filter these words:</label><br />
		<textarea id="filterWords" name="filterWords"></textarea>
		<br />
		<span id="wordCount"></span>
		<br />
		<span id="wordTable"></span>
	</div>
</template>

<script>
import $ from "jquery";

export default {
	name: "WordOLyzer",
	data() {
		return {
			words: "one two three"
		};
	},
	methods: {
		doTheThing() {
			console.log("aw farts");
		},
		getWordCount() {
			console.log("yo i be processing...");

			// get the text from the value of the textarea by ID
			var rawText = $("#toAnalyze").val();
			//console.log('rawText: ', rawText);	// DEV

			// trim spaces on either side of string
			var textTrimmed = rawText.trim();

			// count the words by splitting them by spaces (hacky)
			var wordCount = textTrimmed.split(" ").length;
			//console.log('wordCount: ', wordCount);

			return wordCount;
		},
		mounted() {
			console.log("i m mounted yo");

			//TODO: move all this shiz to methods

			var tableTemplate =
				' \
			<table id="wordObjectTable" style="margin:30px auto;">  \
				<thead> \
					<tr> \
						<th>word</th> \
						<th class="wordcount">count</th> \
					</tr> \
				</thead> \
				<tbody></tbody> \
			</table>';
			var resetForm = function() {
				//console.log('reset that form, yo')
				$("#toAnalyze").val("");
				$("#wordCount").html("");
				$("#wordTable").html(tableTemplate);
				var countedWordArray = [];
				var wordArrayObject = {};
			};

			// get text from whitehouse.gov (eventually)
			//var title = $('.page-content__content').text()

			// set the host URL to wherever we are being hosted
			//var LOCAL = window.location.href;

			var trimSpaces = function(text) {
				var remSpacesOnFrontAndBack = text.trim();
				var trimmed = remSpacesOnFrontAndBack.replace(/\s\s+/g, " ");
				return trimmed;
			};

			var filterShittyWords = function(word) {
				var wordsToFilter = $("#filterWords").val();
				return !wordsToFilter.includes(word);
			};

			var removePunctuation = function(text) {
				//remove punctuation
				var punctuationFilter = text.replace(
					/[.,\/#!$%\^&\*;:{}—=\-_`~()]/g,
					""
				);
				var punctuationRemoved = punctuationFilter.replace(/\s{2,}/g, " ");
				return punctuationRemoved;
			};

			var words = function(array) {
				return array.reduce(function(count, word) {
					count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
					return count;
				}, {});
			};

			var getFile = function(event) {
				// reads local .txt files
				var input = event.target;
				var reader = new FileReader();
				reader.onload = function() {
					var text = reader.result;
					$("#toAnalyze").val(text);
				};
				reader.readAsText(input.files[0]);

				// TODO ajax for cross-site file transfer
				// $.ajax({
				// 	method: "GET",
				// 	url: LOCAL + 'data.txt',
				// 	success: function(data){
				// 		console.info('ok USA');
				// 		// do some stuff with that data, yo!
				// 	},
				// 	error: function(response){
				// 		console.error('whooomp:', response.statusText);
				// 	},
				// 	complete: function(response){
				// 		console.warn('complete beep boop beep!');
				// 		//console.log(response.statusText);
				// 	}
				// });
			};

			var buildWordTable = function() {
				console.time("building table");
				// reset table
				$("#wordTable").html(tableTemplate);

				// get the text from the value of the textarea by ID
				var rawText = $("#toAnalyze").val();
				//console.log('rawText: ', rawText);	// DEV

				// trim spaces
				var textTrimmed = trimSpaces(rawText);

				// transform to lower case
				var lowerCase = textTrimmed.toLowerCase();

				// remove punctuation
				var finalString = removePunctuation(lowerCase);

				// split into array
				var finalStringArray = finalString.split(" ");

				// filter out the words we don't want
				var filteredArray = finalStringArray.filter(filterShittyWords);

				// create word object
				var wordObject = words(filteredArray);

				// cycle through object and build table rows
				for (var [key, value] of Object.entries(wordObject)) {
					//console.log('not in there (so add it to the table)')
					$("#wordObjectTable > TBODY").append(
						"<tr><td>" + key + "</td><td>" + value + "</td></tr>"
					);
				}

				console.timeEnd("building table");

				//init datatable jQuery plugin
				$("#wordObjectTable").datatable({
					sort: "*",
					sortKey: 1,
					sortDir: "desc",
					pageSize: 500000
				});

				// hacky clicking headers:
				$("table th.wordcount").trigger("click");
				$("table th.wordcount").trigger("click");
			};

			var displayResults = function() {
				$("#wordCount").html(
					'about <span style="font-size:2em;font-weight:bold;">' +
						"[getWordCount()]" +
						"</span> words"
				);

				buildWordTable();
			};
		}
	},
	props: {
		msg: String
	}
};
</script>
		

<style scoped>
body {
	font-family: "Courier New", Courier, monospace;
	text-align: center;
}
#version {
	font-size: 0.7em;
}
th {
	min-width: 100px;
}
td {
	padding: 3px;
}
tbody tr:nth-child(odd) {
	background-color: coral;
}
tbody tr:nth-child(even) {
	background-color: lightblue;
}
label {
	font-size: 0.7em;
}
.bigButton {
	padding: 20px 100px;
	border-radius: 3px;
}
</style>
