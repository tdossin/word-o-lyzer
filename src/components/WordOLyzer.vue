<template>
	<div>
		<h3>
			untitled word app project thingy
			<span id="version"></span>
		</h3>
		<div class="leftBox">
			<textarea
				v-model="rawInputText"
				id="toAnalyze"
				name="toAnalyze"
				placeholder="[type or paste text here with ctrl+v]"
				style="width: 600px; height: 150px; display: block; margin: 0 auto;"
				readonly
				trim
			></textarea
			><br />
			<div class="rightBox">
				<button id="reset" @click="rawInputText = ''">Clear</button>
				<button id="sample" @click="addDemoText()">
					+[demo data]
				</button>
				<input
					id="fileInput"
					type="file"
					accept="text/plain"
					@change="getFile($event)"
					style="width: 150px;"
				/>
			</div>
			<br />
			<div class="looky-box">
				<label>decapicalize</label>
				{{ rawInputText | deCapitalize }}
			</div>
			<div class="looky-box">
				<label>removePunctuation</label>
				{{ rawInputText | removePunctuation }}
			</div>
			<div class="looky-box">
				<label>arrayOlyzer</label>
				{{ rawInputText | arrayOlyzer }}
			</div>
			<div class="looky-box">
				<label>arrayOlyzer</label>
				{{ rawInputText | arrayOlyzer }}
			</div>
		</div>

		<br />
		<button class="bigButton" disabled>
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
		<span id="wordCount">
			about
			<p>--------------[rawInputText | arrayOlyzer]----------------</p>
			{{ rawInputText | arrayOlyzer }}
			words in
		</span>
		<br />
		<span id="wordTable" style="display: none;">
			<table id="wordObjectTable" style="margin: 30px auto;">
				<thead>
					<tr>
						<th>word</th>
						<th>count</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</span>
	</div>
</template>

<script>
export default {
	name: "WordOLyzer",
	data() {
		return {
			rawInputText: new String(), // set to empty string
			array: null,
			boringWordsArray: ["fart", "of", "all"],
			excitingWordsArray: new Array(),
			demoText:
				"?!><F1RST..first FIRST fIrSt FiRsT.!. of all fart fart fart fart fart fart THIS IS AN ALLLLLL CAAAAPS MESSSSAAAAAAGE! ME SO ANGRY! demo text that you can add when you can't think of anything to write, like right now. Fart! This fart is not a fart very exciting fart."
		};
	},
	methods: {
		getFile(event) {
			// reads local .txt files
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = e => this.$emit((this.text = e.target.result));
			reader.readAsText(file);
		},
		addDemoText(rawInputText, demoText) {
			//console.warn("addDemoText()");
			this.rawInputText += this.demoText;
		}
	},
	filters: {
		removePunctuation(text) {
			//remove punctuation
			try {
				let punctuationFilter = text.replace(
					/[.,\/#!$%\^&\*;:{}—=\-_`~()]/g,
					""
				);
				let returned = text.replace(/\s{2,}/g, " ");
				return returned.toString();
			} catch (error) {
				console.log("removePunctuation() fail.", error);
				return;
			}
		},
		deCapitalize(text) {
			return text.toLowerCase();
		},
		arrayOlyzer(text) {
			if (!text) return new Array();
			return new Array(text.split(" "));
		}
	},
	computed: {
		boringFilter(rawInputText, boringWordsArray) {
			// filter out [boringWordsArray] from [text]
			let array1 = rawInputText.arrayOlyzer();
			let array2 = this.boringWordsArray;

			if (array1.length != 0) {
				var tempArr = array2.filter(function(item) {
					return !array1.includes(item);
				});
				array1 = array1.filter(function(item) {
					return !array2.includes(item);
				});
				array2 = tempArr;
				// if you touch anything above here you are doing it wrong......
				return new Array().array2;
			} else {
				// return empty array if error to keep all data working blah blah
				return new Array();
			}
		},
		wordCount(string) {
			// count the words by splitting them by spaces (hacky)

			if (!string.length != 0) {
				//console.warn("ain got no straaaaaaang");
				return [];
			} else {
				return string.split(" ");
			}
		}
	},
	mounted() {
		//console.log("i m mounted() yo");

		// adding demo text
		this.rawInputText += this.demoText; // DEV
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
.looky-box > label {
	background-color: rgba(255, 127, 80, 0.5);
	color: #000;
	position: relative;
	top: -10px;
	left: 0;
	padding: 1px;
}
.looky-box {
	width: 100px;
	height: 100px;
	overflow: hidden;
	font-size: 0.75em;
	display: inline-block;
	margin: 10px;
	padding: 10px;
	text-justify: none;
	$border: 1px dashed navy;
}
</style>
