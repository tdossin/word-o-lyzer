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
				style="width: 600px; height: 150px; display: block; margin: 0 auto;"
				readonly
			></textarea
			><br />
			<div class="looky-box">
				{{ text | deCapitalize }}
			</div>
			<div class="looky-box">
				{{ text | punkFilter }}
			</div>
			<div class="looky-box">
				{{ text | arrayOlyzer }}
			</div>
			<div class="looky-box">
				{{ text | deCapitalize }}
			</div>
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
			v-model="boringWordsArray"
			readonly
		></textarea>
		<br />
		<span id="wordCount" v-if="wordCount">
			about
			<span>{{ wordCount }}</span>
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
import _ from "lodash";

export default {
	name: "WordOLyzer",
	data() {
		return {
			text: "",
			wordCount: 0,
			boringWordsArray: ["first", "of", "all"],
			demoText:
				"?!><F1RST...!. of all fart fart fart fart fart fart THIS IS AN ALLLLLL CAAAAPS MESSSSAAAAAAGE! ME SO ANGRY! demo text that you can add when you can't think of anything to write, like right now. Fart! This fart is not a fart very exciting fart."
		};
	},
	methods: {
		getWordCount(words) {
			// trim spaces on either side of string
			if (!words) return "";
			var textTrimmed = words.trim();
			// count the words by splitting them by spaces (hacky)
			return textTrimmed.split(" ").length;
		},
		removePunctuation(text) {
			//remove punctuation
			if (text.length == 0) {
				text = this.text;
			}
			var punctuationFilter = text
				.toString()
				.replace(/[.,\/#!$%\^&\*;:{}—=\-_`~()]/g, "");
			return text.punctuationFilter.replace(/\s{2,}/g, " ").toString();
		},
		getFile(event) {
			// reads local .txt files
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = e => this.$emit((this.text = e.target.result));
			reader.readAsText(file);
		},
		runWordOlyzer() {
			// starts the whole sha-bang
			var text = this.text;
			// reset table
			$("#wordObjectTable TBODY").html("");

			this.getWordCount(text);
			//this.processText(text);
		},
		filterKeyUp() {
			// hacky for dev only
			var keyup = this;
			setTimeout(function() {
				var text = keyup.text;
				$("#wordObjectTable TBODY").html("");
				keyup.getWordCount(text);
				//keyup.processText(text);
			}, 1500);
		}
	},
	filters: {
		punkFilter(punkyText) {
			// remove punKtuation LMAO
			if (!punkyText) return "";

			var punctuationFilter = punkyText
				.toString()
				.replace(/[.,\/#!$%\^&\*;:{}—=\-_`~()]/g, "");
			return punctuationFilter.replace(/\s{2,}/g, " ").toString();
		},
		deCapitalize(cappyText) {
			return cappyText.toLowerCase();
		},
		arrayOlyzer(stringyText) {
			//if (!stringyText) return [];
			return stringyText.split(" ");
		}
	},
	computed: {
		findTheDiff(a1, a2) {
			// filter out [a2] from [a1]
			//return arr1.filter(x => arr2.includes(x)); //<------maybe when we integrate ES2015?
			//return _(arr1).difference(arr2); // lodash magic

			// clunky but works
			var a = [],
				diff = [];

			for (var i = 0; i < a1.length; i++) {
				a[a1[i]] = true;
			}
			console.log("a2: ", a2);
			for (var j = 0; j < a2.length; j++) {
				if (a[a2[i]]) {
					delete a[a2[i]];
				} else {
					a[a2[i]] = true;
				}
			}

			for (var k in a) {
				diff.push(k);
			}
			// set text to display as the returned array
			return diff;
		}
	},
	mounted() {
		//console.log("i m mounted() yo");
	},
	props: {
		msg: String
	}
};
</script>
		
<style lang="scss">
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
#wordcount > SPAN {
	font-size: 2em;
	font-weight: bold;
}
.looky-box {
	width: 100px;
	height: 100px;
	overflow: hidden;
	font-size: 0.75em;
	display: inline-block;
	margin: 10px;
	padding: 20px;
	text-justify: none;
	$border: 1px dashed navy;
}
</style>
