<template>
	<div>
		<h3>
			untitled word app project thingy
			<span id="version"></span>
		</h3>
		<div class="leftBox">
			<textarea
				v-model="text"
				id="toAnalyze"
				name="toAnalyze"
				placeholder="[type or paste text here with ctrl+v]"
				style="width: 400px; height: 200px;"
			></textarea>
		</div>
		<div class="rightBox">
			<button id="reset" @click="text = ''">Clear</button>
			<button id="sample" @click="text += demoText">+[demo data]</button>
			<input
				id="fileInput"
				type="file"
				accept="text/plain"
				@change="getFile($event)"
				style="width: 150px;"
			/>
			<button @click="removePunctuation">&lt; clean &gt;</button>
		</div>
		<br />
		<button @click="runWordOlyzer" class="bigButton">
			Word-o-lyze&reg; it!
		</button>
		<hr />
		<br />

		<label>filter these words:</label><br />
		<textarea
			id="filterWords"
			name="filterWords"
			v-model="filterWords"
		></textarea>
		<br />
		<span id="wordCount" v-if="wordCount">
			about
			<span style="font-size: 2em; font-weight: bold;">{{ wordCount }}</span>
			words
		</span>
		<br />
		<span id="wordTable">
			<table id="wordObjectTable" style="margin: 30px auto;">
				<thead>
					<tr>
						<th>word</th>
						<th class="wordcount">count</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</span>
	</div>
</template>

<script>
import $ from "jquery";

export default {
	name: "WordOLyzer",
	data() {
		return {
			text: "",
			wordCount: null,
			filterWords: ["we", "and"],
			demoText: "farts we are and cool we",
			version: "1.0.5"
		};
	},
	methods: {
		getWordCount(words) {
			// trim spaces on either side of string
			var textTrimmed = words.trim();
			// count the words by splitting them by spaces (hacky)
			this.wordCount = textTrimmed.split(" ").length;
		},
		removePunctuation(text) {
			//remove punctuation
			if (text.length == 0) {
				text = this.text;
			}
			var punctuationFilter = text.replace(/[.,\/#!$%\^&\*;:{}—=\-_`~()]/g, "");
			return punctuationFilter.replace(/\s{2,}/g, " ");
		},
		getFile(event) {
			// reads local .txt files
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = e => this.$emit((this.text = e.target.result));
			reader.readAsText(file);
		},
		trimSpaces(text) {
			var remSpacesOnFrontAndBack = text.trim();
			var trimmed = remSpacesOnFrontAndBack.replace(/\s\s+/g, " ");
			return trimmed;
		},
		words(array) {
			return array.reduce(function(count, word) {
				count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
				return count;
			}, {});
		},
		buildWordTable(text) {
			console.time("building table");

			console.log("text: ", text);

			if (text.length == 0) {
				text = this.text;
			}

			// trim spaces
			var textTrimmed = this.trimSpaces(text);

			// transform to lower case
			var lowerCase = textTrimmed.toLowerCase(); // native JS

			// remove punctuation

			var finalString = this.removePunctuation(lowerCase);

			// split into array
			var finalStringArray = finalString.split(" ");

			// filter out the words we don't want

			var array = this.filterWords;
			var filteredArray = finalStringArray.filter(function(word) {
				return !array.includes(word);
			});

			// create word object
			var wordObject = this.words(filteredArray);

			// cycle through object and build table rows
			for (var [key, value] of Object.entries(wordObject)) {
				//console.log('not in there (so add it to the table)')
				$("#wordObjectTable > TBODY").append(
					"<tr><td>" + key + "</td><td>" + value + "</td></tr>"
				);
			}

			console.timeEnd("building table");
		},
		runWordOlyzer() {
			// runs the methods based on what's in the <textarea>
			var text = this.text;

			this.getWordCount(text);
			this.buildWordTable(text);
		}
	},
	filters: {
		filterShittyWords(word) {
			console.log("ok we he");
			console.log("word: ", word);
			var wordsToFilter = this.data.filterWords;
			return !wordsToFilter.includes(word);
		},
		capitalize: function(text) {
			return text.replace(/(?:^|\s)\S/g, function(a) {
				return a.toUpperCase();
			});
		}
	},
	computed: {},
	mounted() {
		//console.log("i m mounted() yo");
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
</style>
