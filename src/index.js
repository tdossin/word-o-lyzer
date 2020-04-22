    // do all the requires
		// var $ = require("jquery");
		// var d3 = require("d3");

    import $ from './node_modules/jquery';
    import _ from './node_modules/lodash';

		var tableTemplate = ' \
		<table id="wordObjectTable" style="margin:30px auto;">  \
			<thead> \
				<tr> \
					<th>word</th> \
					<th class="wordcount">count</th> \
				</tr> \
			</thead> \
			<tbody></tbody> \
		</table>'
		var resetForm = function(){
			//console.log('reset that form, yo')
			$('#toAnalyze').val('');
			$('#wordCount').html('');
			$('#wordTable').html(tableTemplate);
			var countedWordArray = [];
			var wordArrayObject = {};
		}

		// get text from whitehouse.gov (eventually)
		//var title = $('.page-content__content').text()

		// set the host URL to wherever we are being hosted
		//var LOCAL = window.location.href;

		var trimSpaces = function(text){
			var remSpacesOnFrontAndBack = text.trim();
			var trimmed = remSpacesOnFrontAndBack.replace(/\s\s+/g, ' ');
			return trimmed;
		}
		
		var filterShittyWords = function(word){
			var wordsToFilter = $('#filterWords').val();
			return !wordsToFilter.includes(word);
		}

		var getWordCount = function(){
			//console.log('yo i be processing...')
			
			// get the text from the value of the textarea by ID
			var rawText = $('#toAnalyze').val();
			//console.log('rawText: ', rawText);	// DEV
			
			// trim spaces on either side of string
			var textTrimmed = rawText.trim();

			// count the words by splitting them by spaces (hacky)
			var wordCount = textTrimmed.split(" ").length;
			//console.log('wordCount: ', wordCount);

			return wordCount;
		}

		var removePunctuation = function(text){
			//remove punctuation
			var punctuationFilter = text.replace(/[.,\/#!$%\^&\*;:{}—=\-_`~()]/g,"");
			var punctuationRemoved = punctuationFilter.replace(/\s{2,}/g," ");
			return punctuationRemoved;
		}

		var countedWordArray = [];
		var wordArrayObject = {};

		var words = function(array) { 
			return array.reduce(function(count, word) {
			count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
			return count;
			}, {});
		}

		var getFile = function(event){

			// reads local .txt files
			var input = event.target;
			var reader = new FileReader();
			reader.onload = function(){
				var text = reader.result;
				$('#toAnalyze').val(text)
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
		}


		var buildWordTable = function(){
			
			console.time('building table');
			// reset table
			$('#wordTable').html(tableTemplate);

			// get the text from the value of the textarea by ID
			var rawText = $('#toAnalyze').val();
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
				$('#wordObjectTable > TBODY').append('<tr><td>' + key + '</td><td>' + value + '</td></tr>')
			}

			console.timeEnd('building table');
			

			//init datatable jQuery plugin
			$('#wordObjectTable').datatable({
				sort: '*',
				sortKey: 1, 
				sortDir: 'desc',
				pageSize: 500000
			});

			// hacky clicking headers:
			$('table th.wordcount').trigger('click');
			$('table th.wordcount').trigger('click');
		}



		var displayResults = function(){
			$('#wordCount').html('about <span style="font-size:2em;font-weight:bold;">' + getWordCount() + '</span> words')
			
			buildWordTable();
		}
		

















		// jQuery shizz down here
		$(function() {
			var version = '0.01';
			$("#version").html('v' + version);
			// if version displays we are in good shape

			

			// init
			resetForm();
			
			var initialFilters = ['a', 'the', 'it', 'and']
			$('#filterWords').val(initialFilters);




			// // CONFIG DB
			// require.config({
			// 	baseUrl: 'node_modules',
			// 	paths: {
			// 		'mysql': 'mysql/index'
			// 	}
			// });
			// require( ["mysql"],
			// 	function(mySql) {
			// 		console.warn('mySql loaded!!!')
			// 	}
			// );

			// // DATABASE stuff
			// var dbConnect = function(){
			// 	var mysql = require('mysql');
			// 	var connection = mysql.createConnection({
			// 		host: 'www.tobydossin.com',
			// 		user: 'tobyd1_admin',
			// 		password: 'hxL14FnBQjA8',
			// 		database: 'tobyd1_wordolyzer'
			// 	});

			// 	connection.connect(function(err) {
			// 		if (err) {
			// 			console.error('Error connecting: ' + err.stack);
			// 			return;
			// 		}
			// 		console.log('Connected as id ' + connection.threadId);
			// 	});
			// 	connection.end();
			// }

			// dbConnect();
















			///////////----------BUTTON HANDLERS----------///////////

			// run when "return/enter" on KB
			$('#words-app').keypress(function(event){
				// return key is '13'
				if(event.which == '13'){
					displayResults();
				}
			});
			
			$('#toAnalyze').on('keyup', function(event){
				setTimeout(function(){
					var toTrim = $('#toAnalyze').val();
					var trimmedSpaces = trimSpaces(toTrim);
					$('#toAnalyze').val(trimmedSpaces);}, 1500)		
			});

			$('#filterWords').on('keyup', function(event){
				// refresh word-o-lyzer 
				setTimeout(function(){
					console.log('time')
					displayResults();					
				}, 1500)		
			})

			$('#processButton').on('click', function(){
				// display results
				displayResults();
			});

			$('#sample').on('click', function(){
				// add demo text
				var sample = "And we saved — building a hospital in New York, we did a — I think, just a spectacular job at the Javits Center.  And even sending the ship up became — we brought it into COVID, but they didn’t — they didn’t really need it.  It didn’t get much use, but it was there and ready.  It wasn’t supposed to be used for that purpose; we changed it into that purpose.  And it was there — ready, willing, and able.  Same with Javits, but they didn’t quite need the rooms that we — the beds that we — we produced. ";
				var currentVal = $('#toAnalyze').val();
				$('#toAnalyze').val(currentVal + sample)
			});

			$('#punctuation').on('click', function(){
				var inputText = $('#toAnalyze').val();
				var puncRemoved = removePunctuation(inputText);
				$('#toAnalyze').val(puncRemoved)
			});

			$('#reset').on('click', function(){
				resetForm();
			});
		});

console.warn("index loaded, y'all!")

function component(webpack) {
    const element = document.createElement('div');

    var today  = new Date();
    element.innerHTML = _.join(['wp: ', today.toLocaleString()], ' ');
  
    return element;
  }

document.body.appendChild(component());