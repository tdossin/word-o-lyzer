<template>
	<div id="app">
		<WordOLyzer />
	</div>
</template>

<script>
import WordOLyzer from "./components/WordOLyzer.vue";
import $ from "jquery";
import _ from "lodash";

export default {
	name: "App",
	components: {
		WordOLyzer
	}
};
</script>

<style>
#app {
	font-family: "Courier New", Courier, monospace;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
