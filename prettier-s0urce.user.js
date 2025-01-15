// ==UserScript==
// @name         prettier-s0urce
// @namespace    http://tampermonkey.net/
// @version      2024-11-8
// @description  Get a prettier s0urce.io environment!
// @author       Xen0o2
// @match        https://s0urce.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=s0urce.io
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/Xen0o2/prettier-s0urce/main/prettier-s0urce.user.js
// @updateURL    https://raw.githubusercontent.com/Xen0o2/prettier-s0urce/main/prettier-s0urce.user.js
// ==/UserScript==


(function () {
	'use strict';

	const themes = {
		"No Theme": ":root{--color-terminal:#85ff49;--color-darkgreen:#85ff492f;--color-midgreen:#85ff4980} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #85ff49} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #85ff4926 123%)} #themes{border: 1px solid #85ff49} .target-bar{outline: 1px solid #85ff49 !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(76%) sepia(48%) saturate(591%) hue-rotate(49deg) brightness(104%) contrast(108%);}",
		"Atom One": ":root{--color-terminal:#b270ff;--color-darkgreen:#b270ff2f;--color-midgreen:#b270ff80} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #b270ff} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #b270ff26 123%)} #themes{border: 1px solid #b270ff} .target-bar{outline: 1px solid #b270ff !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(24%) sepia(96%) saturate(3188%) hue-rotate(262deg) brightness(97%) contrast(114%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#abb2bf;}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_{color:#e6c07b}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}",
		"Monokai": ":root{--color-terminal:#ff3838;--color-darkgreen:#ff38382f;--color-midgreen:#ff383880} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #ff3838} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #ff383826 123%)} #themes{border: 1px solid #ff3838} .target-bar{outline: 1px solid #ff3838 !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(41%) sepia(76%) saturate(5001%) hue-rotate(341deg) brightness(114%) contrast(118%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#f8f8f2}.hljs-subst,.hljs-tag{color:#f8f8f2}.hljs-emphasis,.hljs-strong{color:#a8a8a2}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ae81ff}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#a6e22e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#f92672}.hljs-attribute,.hljs-symbol{color:#66d9ef}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#f8f8f2}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#e6db74}.hljs-comment,.hljs-deletion,.hljs-meta{color:#75715e}",
		"Github": ":root{--color-terminal:#2f2ee2;--color-darkgreen:#2f2ee22f;--color-midgreen:#2f2ee280} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #2f2ee2} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #2f2ee226 123%)} #themes{border: 1px solid #2f2ee2} .target-bar{outline: 1px solid #2f2ee2 !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(19%) sepia(89%) saturate(6281%) hue-rotate(244deg) brightness(88%) contrast(101%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#c9d1d9;}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#ff7b72}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#d2a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#79c0ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#a5d6ff}.hljs-built_in,.hljs-symbol{color:#ffa657}.hljs-code,.hljs-comment,.hljs-formula{color:#8b949e}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#7ee787}.hljs-subst{color:#c9d1d9}.hljs-section{color:#1f6feb;font-weight:700}.hljs-bullet{color:#f2cc60}.hljs-emphasis{color:#c9d1d9;font-style:italic}.hljs-strong{color:#c9d1d9;font-weight:700}.hljs-addition{color:#aff5b4;background-color:#033a16}.hljs-deletion{color:#ffdcd7;background-color:#67060c}",
		"The Deep": ":root{--color-terminal:#3d8566;--color-darkgreen:#3d85662f;--color-midgreen:#3d856680} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #3d8566} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #3d856626 123%)} #themes{border: 1px solid #3d8566} .target-bar{outline: 1px solid #3d8566 !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(47%) sepia(9%) saturate(1983%) hue-rotate(102deg) brightness(92%) contrast(88%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#3d8566}.hljs-keyword{color:#3d8566;font-style:italic}.hljs-built_in{color:#3d8566;font-style:italic}.hljs-type{color:#3d8566}.hljs-literal{color:#3d8566}.hljs-number{color:#3d8566}.hljs-regexp{color:#3d8566}.hljs-string{color:#3d8566}.hljs-subst{color:#3d8566}.hljs-symbol{color:#3d8566}.hljs-class{color:#3d8566}.hljs-function{color:#3d8566}.hljs-title{color:#3d8566;font-style:italic}.hljs-params{color:#3d8566}.hljs-comment{color:#3d8566;font-style:italic}.hljs-doctag{color:#3d8566}.hljs-meta,.hljs-meta .hljs-keyword{color:#3d8566}.hljs-meta .hljs-string{color:#3d8566}.hljs-section{color:#3d8566}.hljs-attr,.hljs-name,.hljs-tag{color:#3d8566}.hljs-attribute{color:#3d8566}.hljs-variable{color:#3d8566}.hljs-bullet{color:#3d8566}.hljs-code{color:#3d8566}.hljs-emphasis{color:#3d8566;font-style:italic}.hljs-strong{color:#3d8566;font-weight:700}.hljs-formula{color:#3d8566}.hljs-link{color:#3d8566}.hljs-quote{color:#3d8566;font-style:italic}.hljs-selector-tag{color:#3d8566}.hljs-selector-id{color:#3d8566}.hljs-selector-class{color:#3d8566;font-style:italic}.hljs-selector-attr,.hljs-selector-pseudo{color:#3d8566;font-style:italic}.hljs-template-tag{color:#3d8566}.hljs-template-variable{color:#3d8566}.hljs-addition{color:#3d8566;font-style:italic}.hljs-deletion{color:#3d8566;font-style:italic}",
		"Light Mode": ":root{--color-terminal:#ffffff;--color-darkgreen:#ffffff2f;--color-midgreen:#ffffff80} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #ffffff} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #ffffff26 123%)} #themes{border: 1px solid #ffffff} .target-bar{outline: 1px solid #ffffff !important} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#ffffff}.hljs-keyword{color:#ffffff;font-style:italic}.hljs-built_in{color:#ffffff;font-style:italic}.hljs-type{color:#ffffff}.hljs-literal{color:#ffffff}.hljs-number{color:#ffffff}.hljs-regexp{color:#ffffff}.hljs-string{color:#ffffff}.hljs-subst{color:#ffffff}.hljs-symbol{color:#ffffff}.hljs-class{color:#ffffff}.hljs-function{color:#ffffff}.hljs-title{color:#ffffff;font-style:italic}.hljs-params{color:#ffffff}.hljs-comment{color:#ffffff;font-style:italic}.hljs-doctag{color:#ffffff}.hljs-meta,.hljs-meta .hljs-keyword{color:#ffffff}.hljs-meta .hljs-string{color:#ffffff}.hljs-section{color:#ffffff}.hljs-attr,.hljs-name,.hljs-tag{color:#ffffff}.hljs-attribute{color:#ffffff}.hljs-variable{color:#ffffff}.hljs-bullet{color:#ffffff}.hljs-code{color:#ffffff}.hljs-emphasis{color:#ffffff;font-style:italic}.hljs-strong{color:#ffffff;font-weight:700}.hljs-formula{color:#c792ea}.hljs-link{color:#ffffff}.hljs-quote{color:#ffffff;font-style:italic}.hljs-selector-tag{color:#ffffff}.hljs-selector-id{color:#ffffff}.hljs-selector-class{color:#ffffff;font-style:italic}.hljs-selector-attr,.hljs-selector-pseudo{color:#ffffff;font-style:italic}.hljs-template-tag{color:#ffffff}.hljs-template-variable{color:#ffffff}.hljs-addition{color:#ffffff;font-style:italic}.hljs-deletion{color:#ffffff;font-style:italic}",
		"Mythic Myer": ":root{--color-terminal:#05a8ff;--color-darkgreen:#05a8ff2f;--color-midgreen:#05a8ff80} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #05a8ff} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #05a8ff26 123%)} #themes{border: 1px solid #05a8ff} .target-bar{outline: 1px solid #05a8ff !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(74%) sepia(70%) saturate(5861%) hue-rotate(171deg) brightness(100%) contrast(101%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#05a8ff;}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#05a8ff}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#05a8ff}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#05a8ff}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#05a8ff}.hljs-built_in,.hljs-symbol{color:#05a8ff}.hljs-code,.hljs-comment,.hljs-formula{color:#05a8ff}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#05a8ff}.hljs-subst{color:#05a8ff}.hljs-section{color:#05a8ff;font-weight:700}.hljs-bullet{color:#05a8ff}.hljs-emphasis{color:#05a8ff;font-style:italic}.hljs-strong{color:#05a8ff;font-weight:700}.hljs-addition{color:#05a8ff;background-color:#05a8ff}.hljs-deletion{color:#05a8ff;background-color:#05a8ff}",
		"Ethereal Enjoyer": ":root{--color-terminal:#ffb74e;--color-darkgreen:#ffb74e2f;--color-midgreen:#ffb74e80} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #ffb74e} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #ffb74e26 123%)} #themes{border: 1px solid #ffb74e} .target-bar{outline: 1px solid #ffb74e !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(80%) sepia(56%) saturate(665%) hue-rotate(324deg) brightness(101%) contrast(102%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#ffb74e}.hljs-subst,.hljs-tag{color:#ffb74e}.hljs-emphasis,.hljs-strong{color:#ffb74e}.hljs-bullet,.hljs-link,.hljs-literal,.hljs-number,.hljs-quote,.hljs-regexp{color:#ffb74e}.hljs-code,.hljs-section,.hljs-selector-class,.hljs-title{color:#ffb74e}.hljs-strong{font-weight:700}.hljs-emphasis{font-style:italic}.hljs-attr,.hljs-keyword,.hljs-name,.hljs-selector-tag{color:#ffb74e}.hljs-attribute,.hljs-symbol{color:#ffb74e}.hljs-class .hljs-title,.hljs-params,.hljs-title.class_{color:#ffb74e}.hljs-addition,.hljs-built_in,.hljs-selector-attr,.hljs-selector-id,.hljs-selector-pseudo,.hljs-string,.hljs-template-variable,.hljs-type,.hljs-variable{color:#ffb74e}.hljs-comment,.hljs-deletion,.hljs-meta{color:#ffb74e}",
		"Night Owl": ":root{--color-terminal:#825f00;--color-darkgreen:#825f002f;--color-midgreen:#825f0080} .window:has(.window-title > img[src='icons/terminal.svg']){border-color: #825f00} .window:has(.window-title > img[src='icons/terminal.svg']) .wrapper{border: 1px solid var(--color-terminal); background-color: transparent} #section-code{background: linear-gradient(180deg, #000000 3%, #825f0026 123%)} #themes{border: 1px solid #825f00} .target-bar{outline: 1px solid #825f00 !important} .target-bar-progress{filter: brightness(0) saturate(100%) invert(27%) sepia(88%) saturate(1363%) hue-rotate(32deg) brightness(99%) contrast(101%);} pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#d6deeb}.hljs-keyword{color:#c792ea;font-style:italic}.hljs-built_in{color:#addb67;font-style:italic}.hljs-type{color:#82aaff}.hljs-literal{color:#ff5874}.hljs-number{color:#f78c6c}.hljs-regexp{color:#5ca7e4}.hljs-string{color:#ecc48d}.hljs-subst{color:#d3423e}.hljs-symbol{color:#82aaff}.hljs-class{color:#ffcb8b}.hljs-function{color:#82aaff}.hljs-title{color:#dcdcaa;font-style:italic}.hljs-params{color:#7fdbca}.hljs-comment{color:#637777;font-style:italic}.hljs-doctag{color:#7fdbca}.hljs-meta,.hljs-meta .hljs-keyword{color:#82aaff}.hljs-meta .hljs-string{color:#ecc48d}.hljs-section{color:#82b1ff}.hljs-attr,.hljs-name,.hljs-tag{color:#7fdbca}.hljs-attribute{color:#80cbc4}.hljs-variable{color:#addb67}.hljs-bullet{color:#d9f5dd}.hljs-code{color:#80cbc4}.hljs-emphasis{color:#c792ea;font-style:italic}.hljs-strong{color:#addb67;font-weight:700}.hljs-formula{color:#c792ea}.hljs-link{color:#ff869a}.hljs-quote{color:#697098;font-style:italic}.hljs-selector-tag{color:#ff6363}.hljs-selector-id{color:#fad430}.hljs-selector-class{color:#addb67;font-style:italic}.hljs-selector-attr,.hljs-selector-pseudo{color:#c792ea;font-style:italic}.hljs-template-tag{color:#c792ea}.hljs-template-variable{color:#addb67}.hljs-addition{color:#addb67ff;font-style:italic}.hljs-deletion{color:#ef535090;font-style:italic}",
	}

	const targets = {
		npcs: [],
		players: [],
		anons: []
	}

	class Command {

		name;
		args;
		requiredWindows;
		#run;

		// configuration = {
		//		name: string;
		//		args?: {
		//			name: string;
		//			options?: string[];
		//			required: boolean;
		//		}[],
		//		requiredWindows?: string[];
		//		run: (args: string[]) => void;
		//}
		constructor(configuration) {
			this.name = configuration.name;
			this.args = configuration.args;
			this.requiredWindows = configuration.requiredWindows;
			this.#run = configuration.run;
		}

		setArgOptions = (argName, options) => {
			const arg = this.args.find(e => e.name === argName);
			if (!arg) return;
			arg.options = options;
		}

		run = (args) => {
			if (this.requiredWindows && this.requiredWindows.some(name => !windowManager.isWindowOpen(name)))
				return sendErrorLog((this.requiredWindows.length > 1 ? "These windows" : "This window") + ` must be open: ${this.requiredWindows.join(", ")}`);
			this.#run(args);
		}
	}

	class PromptManager {
		#currentInput = "";
		#element = null;
		#autocompleteElement = null;
		#currentIndex = -1;
		#currentArgsIndex = 0;
		#possibleWords = [];
		#isCommandTyped = false;
		#wasATab = false;

		#reset = () => {
			document.querySelector(".command-input-container")?.remove();
			this.onChange("");
			this.#element = null;
			this.#currentIndex = -1;
			this.#currentArgsIndex = 0;
			this.#possibleWords = [];
			this.#isCommandTyped = false;
		}

		onChange = (value) => {
			if (value === " ") return this.setValue("");
			this.#currentInput = value;
			if (value === "") return this.removeErrorPlaceholders(), this.setAutocompletePlaceholder("");
			if (this.#wasATab) return this.#wasATab = false, console.log("tab");
			this.#isCommandTyped = !!commands.find(e => e.name === this.getCommand())
			this.#currentIndex = -1;
			const command = commands.find(e => e.name === this.getCommand());
			if (command)
				this.#currentArgsIndex = this.getArgs().filter((arg, i) => command.args?.[i]?.options?.includes(arg)).length;
			if (!commands.find(e => e.name.toLowerCase().startsWith(this.getCommand().toLowerCase()))
				|| ((this.getValue()[this.getValue().length - 1] === " " || this.getArgs().length) && !command))
				this.generateErrorPlaceholder(0);
			else
				this.removeErrorPlaceholders();

			this.#manageAutocompletePlaceholder();
		};
		getValue = () => this.#currentInput;
		getCommand = () => this.getValue().split(" ")[0];
		getArgs = () => this.getValue().split(" ").slice(1).filter(e => e !== "");
		setElement = (element) => this.#element = element;
		getElement = () => this.#element;
		setAutocompleteElement = (element) => this.#autocompleteElement = element;
		getAutocompleteElement = () => this.#autocompleteElement;
		setAutocompletePlaceholder = (value) => this.getAutocompleteElement().innerHTML = value.replace(/ /g, "<div style='width: 15px; height: 33px'></div>");
		setPossibleWords = (possibilities) => { this.#possibleWords = possibilities; console.log(possibilities) };
		getPossibleWords = () => this.#possibleWords;
		setValue = (value) => {
			this.onChange(value.replace(/  /g, " "));
			this.#element.value = value.replace(/  /g, " ");
		}

		#manageAutocompletePlaceholder = () => {
			if (this.#isCommandTyped) {
				const argsValue = this.getArgs()[this.#currentArgsIndex];
				const command = commands.find(e => e.name === this.getCommand())
				if (!command) return this.#isCommandTyped = false;
				this.setPossibleWords(command?.args[this.#currentArgsIndex]?.options?.filter(e => argsValue ? e.toLowerCase().startsWith(argsValue.toLowerCase()) : e) || []);
				const first = this.getPossibleWords()[0];
				if (!first) {
					this.setAutocompletePlaceholder("");
					if (!command.args[this.#currentArgsIndex]?.options) return;
					return this.generateErrorPlaceholder(this.#currentArgsIndex + 1);
				}
				this.removeErrorPlaceholders();
				const rest = first.slice(argsValue?.length);
				this.getAutocompleteElement().style.left = `calc(50% + ${(command.name.length + 1) * 15 + (this.getArgs().join("").length + this.#currentArgsIndex) * 15}px)`
				this.setAutocompletePlaceholder(rest);
			} else {
				const currentValue = this.getValue();
				this.setPossibleWords(commands.filter(e => e.name.toLowerCase().startsWith(currentValue)).map(e => e.name));
				const first = this.getPossibleWords()[0];
				if (!first) return this.setAutocompletePlaceholder("");
				const rest = first.slice(currentValue.length);
				this.getAutocompleteElement().style.left = `calc(50% + ${currentValue.length * 15}px)`
				this.setAutocompletePlaceholder(rest);
			}
		}

		autoComplete = () => {
			this.#wasATab = true;
			if (this.#isCommandTyped) {
				const possibilites = this.getPossibleWords();
				if (this.#currentIndex >= possibilites.length - 1 && !player.input.isShiftDown) this.#currentIndex = -1;
				if (player.input.isShiftDown) this.#currentIndex--;
				else this.#currentIndex++;
				if (this.#currentIndex === -1) this.#currentIndex = possibilites.length - 1;
				const word = possibilites[this.#currentIndex];
				if (!word) return;
				this.setValue(this.getCommand() + (this.getArgs().length ? " " : "") + this.getArgs().slice(0, -((this.#currentArgsIndex - 1) < 0 ? 0 : -this.#currentArgsIndex)).join(" ") + " " + word);
				this.setAutocompletePlaceholder("");
			} else {
				const possibilites = this.getPossibleWords();
				if (this.#currentIndex >= possibilites.length - 1 && !player.input.isShiftDown) this.#currentIndex = -1;
				if (player.input.isShiftDown) this.#currentIndex--;
				else this.#currentIndex++;
				if (this.#currentIndex === -1) this.#currentIndex = possibilites.length - 1;
				const word = possibilites[this.#currentIndex];
				if (!word) return;
				this.setValue(word);
				this.setAutocompletePlaceholder("");
			}
		}

		generateErrorPlaceholder = (index) => {
			const value = this.getValue().split(" ");
			const inError = value[index];
			const beforeError = value.slice(0, index).join(" ");

			if (!inError) return;

			const already = document.querySelector(`.command-error-${index}`);
			if (already)
				already.innerText = inError
			else {
				const error = new Component("div", {
					classList: ["command-error", `command-error-${index}`],
					style: {
						position: "absolute", display: "inline-flex",
						top: "50%", zIndex: "10000",
						translate: "-421px -50%",
						fontSize: "25px", fontFamily: "var(--font-family-2)", color: "var(--color-red)",
						left: `calc(50% + ${(beforeError.length + (index > 0)) * 15}px)`
					},
					innerText: inError
				})

				document.querySelector(".command-input-container").append(error.element);
			}
		}

		removeErrorPlaceholders = () => {
			document.querySelectorAll(`.command-error`).forEach(e => e.remove());
		}

		createPrompt = async () => {
			const already = document.querySelector(".command-input-container");
			if (already) return;
			const input = new Component("div", {
				classList: ["command-input-container"],
				style: { height: "100%", width: "100%", backgroundColor: "#00000080", position: "absolute", top: 0, left: 0, zIndex: "10000" },
				children: [
					new Component("input", {
						classList: ["command-input"],
						style: {
							position: "absolute",
							width: "50%",
							top: "50%", left: "25%", zIndex: "10000",
							translate: "0 -50%",
							padding: "10px",
							borderRadius: "4px", border: "1px solid var(--color-lightgrey)", outline: "none",
							backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset",
							fontSize: "25px", fontFamily: "var(--font-family-2)"
						},
						placeholder: "Enter a command...",
						oninput: (e) => this.onChange(e.currentTarget.value),
						// onblur: () => this.cancel(),
					}),
					new Component("div", {
						classList: ["command-autocomplete"],
						style: {
							position: "absolute", display: "inline-flex",
							top: "50%", zIndex: "10000",
							translate: "-421px -50%",
							fontSize: "25px", fontFamily: "var(--font-family-2)", color: "var(--color-lightgrey)"
						}
					})
				]
			})
			this.setElement(input.element.querySelector(".command-input"));
			this.setAutocompleteElement(input.element.querySelector(".command-autocomplete"));
			document.body.append(input.element);
			this.getElement().focus();
			this.setValue("");
			this.setPossibleWords(commands.map(e => e.name));
			await loadTargets();
			const hackCommand = commands.find(e => e.name === "hack");
			if (hackCommand) hackCommand.setArgOptions("target", [
				...targets.npcs,
				...targets.players,
				...targets.anons,
			])
			const counterCommand = commands.find(e => e.name === "counter");
			if (counterCommand) counterCommand.setArgOptions("hacker", player.hacksInProgress.map(e => e.hacker))
			const shredCommand = commands.find(e => e.name === "shred");
			if (shredCommand) shredCommand.setArgOptions("index", Array.from(windowManager.getWindow("inventory")?.querySelectorAll(".item") || []).map((_, index) => (index * 1 + 1).toString()))
		}

		cancel = () => {
			this.#reset();
		}

		execute = () => {
			if (document.querySelector(".command-error")) return;
			if (this.getValue() === "") return this.#reset();
			const command = commands.find(e => e.name === this.getCommand());
			if (!command) return

			if (this.getArgs().length < command.args.filter(e => e.required).length) return

			command.run(this.getArgs());
			this.#reset();
		}
	}

	class WindowManager {
		#windows = {
			"computer": { className: "Computer", iconName: "computer" },
			"inventory": { className: "Inventory", iconName: "inventory" },
			"target_list": { className: "Target-List", iconName: "targetList" },
			"terminal": { className: "Terminal", iconName: "terminal" },
			"season_pass": { className: "Season-Pass", iconName: "seasonpass" },
			"friends": { className: "Friends", iconName: "friends" },
			"log": { className: "Log", iconName: "log" },
			"item_seller": { className: "Item-Seller", iconName: "itemSeller" },
			"premium": { className: "Premium", iconName: "premium" },
			"shop": { className: "Shop", iconName: "shop" },
			"leaderboard": { className: "Leaderboard", iconName: "leaderboard" },
			"country_wars": { className: "Country-Wars", iconName: "countryWars" },
			"task_manager": { className: "Task-Manager", iconName: "taskManager" },
			"upgrader": { className: "Upgrader", iconName: "upgrader" },
			"spotify": { className: "Spotify", iconName: "spotify" },
			"vpn": { className: "VPN", iconName: "vpn" },
			"filament": { className: "Filament", iconName: "filament" },
			"printer": { className: "\\33 D-Printer", iconName: "printer" },
			"chat": { className: "Global-Chat", iconName: "chat" },
			"agents": { className: "Agents", iconName: "agents" },
			"mail": { className: "Mail", iconName: "mail" },
			"settings": { iconName: "settings" },
		}

		getWindowsNames = () => Object.keys(this.#windows);

		isValidWindow = (name) => {
			return !!this.#windows[name];
		}

		isWindowOpen = (name) => {
			const data = this.#windows[name];
			if (!data) return false;

			return !!document.querySelector(`.window-title > img[src='icons/${data.iconName}.svg']`)?.parentNode.parentNode;
		}

		openWindow = async (name, openInSilent = false) => {
			const data = this.#windows[name];
			if (!data) return;
			if (openInSilent && !player.configuration.openInSilent.includes(data))
				player.configuration.openInSilent.push(data)
			if (name === "settings")
				document.querySelector("button.topbar-clickable")?.click();
			else
				document.querySelector(`.${data.className}-Desktop-Icon`)?.click();

			await sleep(300);
			const window = document.querySelector(`.window-title > img[src='icons/${data.iconName}.svg']`)?.parentNode.parentNode;
			return window;
		}

		getWindow = (name) => {
			const data = this.#windows[name];
			if (!data) return;
			const window = document.querySelector(`.window-title > img[src='icons/${data.iconName}.svg']`)?.parentNode.parentNode;
			return window;
		}

		closeWindow = (name, onlyIfSilent = false) => {
			const data = this.#windows[name];
			if (!data) return;
			player.configuration.openInSilent = player.configuration.openInSilent.filter(e => e.name !== data.name);

			const windowToClose = document.querySelector(`.window-title > img[src='icons/${data.iconName}.svg']`)?.parentNode.parentNode;
			if (!windowToClose) return;

			if (!onlyIfSilent || (onlyIfSilent && windowToClose.classList.contains("openInSilent")))
				windowToClose.querySelector(".window-close")?.click();
		}
	}

	const windowManager = new WindowManager();
	const promptManager = new PromptManager();

	class Component {
		prepend;
		element;
		constructor(type, options) {
			this.prepend = options.prepend;
			const element = document.createElement(type);
			if (options.classList)
				element.classList.add(...options.classList);

			// create a copy because we don't want to modify the original object, because that could cause weird side effects
			// basically don't change what you don't own
			const propertiesToAssign = {
				...options
			};
			delete propertiesToAssign.children;
			delete propertiesToAssign.style;
			delete propertiesToAssign.classList;
			Object.assign(element, propertiesToAssign);
			Object.assign(element.style, options.style);

			options.children?.filter(child => !!child).forEach(child => child.prepend ? element.prepend(child.element) : element.append(child.element))
			this.element = element;
			return this;
		}
	}

	const removeContextMenu = (removeSelection) => {
		document.querySelector(".context-menu-container")?.remove();
		const selectedItem = document.querySelectorAll(".item-selected")
		selectedItem.forEach(item => {
			item.style.outline = null;
			item.classList.remove("item-selected")
		})
		if (removeSelection)
			player.selectedItems = [];
	}

	class Popup {
		#popup;
		#dimensions = {
			width: 150,
			height: 0,
		}
		#pointer;
		constructor(pointer) {
			this.#pointer = pointer;
			const popup = new Component("div", {
				classList: ["context-menu", "context-menu-container"],
				style: {
					position: "absolute", width: `${this.#dimensions.width}px`,
					backgroundColor: "#000000E6", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "5px", zIndex: "1000", padding: "5px",
					boxShadow: "5px 5px 15px 5px #000000",
					border: "1px solid #ffffff66"
				},
				children: [
					new Component("div", {
						classList: ["context-menu", "context-menu-title"],
						style: { color: "white", padding: "7px", order: 0, fontSize: "16px", fontWeight: 600, borderBottom: "1px solid var(--color-lightgrey)", display: "none" }
					}),
					new Component("div", {
						classList: ["context-menu", "context-menu-footer"],
						style: { color: "var(--color-lightgrey)", padding: "7px", order: 1, fontSize: "10px", borderTop: "1px solid var(--color-lightgrey)", display: "none" }
					})
				]
			})
			this.#popup = popup.element;
			return this;
		}

		#getPosition = (pointer, dimensions) => {
			const finalPosition = { ...pointer };
			const windowDimensions = { height: document.body.clientHeight, width: document.body.clientWidth };

			if (pointer.clientY > windowDimensions.height - (dimensions.height + 20))
				finalPosition.clientY -= (dimensions.height + 10);
			else
				finalPosition.clientY += 10;
			if (pointer.clientX > windowDimensions.width - (dimensions.width + 20))
				finalPosition.clientX -= (dimensions.width + 10);
			else
				finalPosition.clientX += 10;
			return finalPosition;
		}

		setTitle(text) {
			this.#popup.querySelector(".context-menu-title").innerText = text;
			this.#popup.querySelector(".context-menu-title").style.display = "flex";
			return this;
		}

		setFooter(text) {
			this.#popup.querySelector(".context-menu-footer").innerText = text;
			this.#popup.querySelector(".context-menu-footer").style.display = "flex";
			return this;
		}

		addAction(text, action, option = { isDangerous: false, selectionLimit: 0 }) {
			const component = new Component("div", {
				classList: [
					"context-menu",
					"context-menu-option",
					"context-menu-option-" + (this.#dimensions.height / 40 + 1),
					"context-menu-option-limit-" + option.selectionLimit,
				],
				innerText: text,
				style: { width: "100%", borderRadius: "4px", padding: "5px", cursor: "pointer", color: option.isDangerous ? "var(--color-red)" : "#ffffffe6" },
				onmouseenter: (e) => e.target.style.backgroundColor = "var(--color-midgreen)",
				onmouseleave: (e) => e.target.style.backgroundColor = "unset",
				onclick: async (e) => {
					removeContextMenu();
					if (action)
						await action(e);
					player.selectedItems = [];
				},
			})
			this.#popup.appendChild(component.element);
			this.#dimensions.height += 40;
			return this;
		}

		create() {
			const position = this.#getPosition(this.#pointer, this.#dimensions);
			this.#popup.style.top = `${position.clientY}px`;
			this.#popup.style.left = `${position.clientX}px`,
				document.body.appendChild(this.#popup);
		}
	}

	const rarities = ["common", "uncommon", "rare", "epic", "legendary", "mythic", "ethereal"];

	const lootRarity = [
		{ name: "common", color: "linear-gradient(211deg, #585d66 0%, #7d848f 100%)" },
		{ name: "uncommon", color: "linear-gradient(211deg, #007c37 0%, #83b200 100%)" },
		{ name: "rare", color: "linear-gradient(211deg, #00427c 0%, #0092ed 100%)" },
		{ name: "epic", color: "linear-gradient(211deg, #5c045a 0%, #a90052 100%)" },
		{ name: "legendary", color: "linear-gradient(112deg, #a95300 4%, #ff9605 34%, #a95300 66%, #ff9605 100%)" },
		{ name: "mythic", color: "linear-gradient(112deg, #40f5ff 4%, #05a8ff 34%, #40f5ff 66%, #05a8ff 100%)" },
		{ name: "ethereal", color: "linear-gradient(112deg, #ffb74e 4%, #ffe6a2 34%, #ffb74e 66%, #ffe6a2 100%)" },
	];

	const raritiesVariables = {
		"var(--color-SSS)": "ethereal",
		"var(--color-SS)": "mythic",
		"var(--color-S)": "legendary",
		"var(--color-A)": "epic",
		"var(--color-B)": "rare",
		"var(--color-C)": "uncommon",
		"var(--color-D)": "common"
	}

	const lootButtons = {
		"take": "button > img[src='icons/inventory.svg']",
		"sell": "button > img[src='icons/btc.svg']",
		"shred": "button > img[src='icons/filament.svg']"
	}

	const staffRoles = ["JMOD", "MOD", "ADMIN"];
	let evilStaffFeaturesActivated = false;

	const capitalize = text => text[0].toUpperCase() + text.slice(1).toLowerCase();

	const defaultColors = {
		windowBorder: "#91aabd3b",
		windowTabLight: "#242429",
		windowTabDark: "#383943",
	}

	const player = {
		username: document.querySelector("img[src='icons/online.svg']")?.parentNode?.innerText?.trim(),
		hacksInProgress: [],
		currentlyHacking: null,
		lastHacked: null,
		configuration: {
			keyboardNavigation: true,
			openInSilent: [],
			displayCustomFilament: "ethereal",
			desktopIconColor: localStorage.getItem("prettier-desktopIconColor") || "#ffffff",
			currentTheme: localStorage.getItem("prettier-currentTheme") || Object.keys(themes)[0],
			codeSyntaxing: !!localStorage.getItem("prettier-codeSyntaxing"),
			windowColors: localStorage.getItem("prettier-windowColors") ?
				JSON.parse(localStorage.getItem("prettier-windowColors")) :
				defaultColors
		},
		input: {
			isShiftDown: false,
		},
		staffRole: localStorage.getItem("prettier-staff-role"),
		selectedItems: [],
		autoloot: localStorage.getItem("prettier-autoloot") ?
			JSON.parse(localStorage.getItem("prettier-autoloot")) :
			{
				common: { cpu: "take", gpu: "take", psu: "take", firewall: "take", other: "take" },
				uncommon: { cpu: "take", gpu: "take", psu: "take", firewall: "take", other: "take" },
				rare: { cpu: "take", gpu: "take", psu: "take", firewall: "take", other: "take" },
				epic: { cpu: "take", gpu: "take", psu: "take", firewall: "take", other: "take" },
				legendary: { cpu: "take", gpu: "take", psu: "take", firewall: "take", other: "take" },
				mythic: { cpu: "take", gpu: "take", psu: "take", firewall: "take", other: "take" },
			},
		tradePricing: localStorage.getItem("prettier-tradePricing") ?
			JSON.parse(localStorage.getItem("prettier-tradePricing")) :
			{
				common: { cpu: 0.01, gpu: 0.01, psu: 0.01, firewall: 0.01, other: 0.01 },
				uncommon: { cpu: 0.03, gpu: 0.03, psu: 0.03, firewall: 0.03, other: 0.03 },
				rare: { cpu: 0.1, gpu: 0.1, psu: 0.1, firewall: 0.1, other: 0.1 },
				epic: { cpu: 0.3, gpu: 0.3, psu: 0.3, firewall: 0.3, other: 0.3 },
				legendary: { cpu: 1.5, gpu: 1.5, psu: 1.5, firewall: 1.5, other: 1.5 },
				mythic: { cpu: 4.5, gpu: 4.5, psu: 4.5, firewall: 4.5, other: 4.5 },
				ethereal: { cpu: 67.5, gpu: 67.5, psu: 67.5, firewall: 67.5, other: 67.5 },
			},

	}

	const stats = {
		cpu: [
			{ hack: [8, 18], trueDam: [0, 0], pen: [0, 0], chance: [0, 0], dam: [0, 0] },
			{ hack: [18.5, 33.5], trueDam: [0, 10], pen: [0, 5], chance: [0, 2.5], dam: [1, 5] },
			{ hack: [34, 54], trueDam: [0, 20], pen: [0, 15], chance: [2.5, 3.25], dam: [5, 7.5] },
			{ hack: [55, 64.25], trueDam: [0, 30], pen: [0, 20], chance: [4, 6.25], dam: [8.25, 15] },
			{ hack: [68.75, 84.75], trueDam: [0, 40], pen: [13, 25], chance: [6.5, 7.5], dam: [17, 25] },
			{ hack: [91, 105], trueDam: [43, 50], pen: [19.5, 30], chance: [8.25, 10], dam: [19.5, 30] },
			{ hack: [125.5, 135.5], trueDam: [55, 60], pen: [32.5, 35], chance: [11.25, 12.5], dam: [32.5, 35] }
		],
		firewall: [
			{ hp: [22, 62], rd: [0, 0], regen: [0, 0], medium: [0, 0], long: [0, 0] },
			{ hp: [64, 114], rd: [0, 7.5], regen: [0, 2.5], medium: [0, 0], long: [0, 0] },
			{ hp: [116, 166], rd: [0, 10], regen: [0, 5], medium: [0, 30], long: [0, 0] },
			{ hp: [172, 217], rd: [0, 12.5], regen: [0, 7.5], medium: [22, 40], long: [0, 25] },
			{ hp: [234, 269], rd: [0, 15], regen: [8, 10], medium: [34, 0], long: [22, 30] },
			{ hp: [285, 320], rd: [11.5, 15], regen: [10.75, 12.5], medium: [65, 47.5], long: [28, 35] },
			{ hp: [372, 397], rd: [16.25, 17.5], regen: [13.75, 15], medium: [80, 70], long: [37.5, 45] }
		],
		gpu: [
			{ idle: [0.000010, 0.000014], bart: [0, 0], crip: [0, 0], },
			{ idle: [0.000011, 0.000024], bart: [0, 10], crip: [2.5, 10], },
			{ idle: [0.000016, 0.000033], bart: [0, 12.5], crip: [2.5, 12.5], },
			{ idle: [0.0000223, 0.000043], bart: [0, 15], crip: [6, 15], },
			{ idle: [0.0000348, 0.000054], bart: [0, 20], crip: [10, 20], },
			{ idle: [0.0000516, 0.000074], bart: [16.25, 25], crip: [16.25, 25], },
			{ idle: [0.000077, 0.000094], bart: [22.5, 30], crip: [22.5, 30], }
		],
		psu: [
			{ boost: [1, 5], },
			{ boost: [5, 10], },
			{ boost: [10, 15], },
			{ boost: [16, 25], },
			{ boost: [27, 35], },
			{ boost: [36.5, 40], },
			{ boost: [50, 55], },
		],
		port: [
			{ hp: 1000 + 3 * 60, rd: 0 },
			{ hp: 1000 + 3 * 114, rd: 3 * 0.075 },
			{ hp: 1000 + 3 * 166, rd: 3 * 0.1 },
			{ hp: 1000 + 3 * 217, rd: 3 * 0.125 },
			{ hp: 1000 + 3 * 269, rd: 3 * 0.15 },
			{ hp: 1000 + 3 * 320, rd: 3 * 0.15 },
			{ hp: 1000 + 3 * 397, rd: 3 * 0.175 }
		],
		cputerm: [
			3, 3.5, 4, 4.25, 4.75, 5, 5.5
		],
		fireterm: [
			12, 14, 16, 17, 19, 20, 22
		],
		gpu_term: [
			0.0000042 * 0.6, 0.0000042 * 0.7, 0.0000042 * 0.8, 0.0000042 * 0.85, 0.0000042 * 0.95, 0.0000042, 0.0000042 * 1.1
		],
		psu_term: [
			1.2, 1.4, 1.6, 1.7, 1.9, 2, 2.2
		],
		// Last updated as of 7/4/2024
		filament_price: [
			0.01, 0.03, 0.1, 0.3, 1.5, 4.5, 67.5
		],
	};

	const sleep = (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const editProgressBar = () => {
		const progressBar = (document.querySelectorAll(".topbar-value") || [])[2]
		if (!progressBar)
			return;
		progressBar.style.resize = "horizontal";
		if (progressBar.querySelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"))
			progressBar.querySelector("div:nth-child(1) > div:nth-child(1) > div:nth-child(1)").style.background = "var(--color-darkgreen)";
	}

	const prettierLoadFails = (code) => {
		alert(`Prettier-s0urce loading failed, please contact Xen0o2 on Discord (error code: ${code})`);
	}

	const sendLog = async (HTMLContent) => {
		const wrapper = document.querySelector("#wrapper.svelte-182ewru");
		if (!wrapper)
			return;

		const message = new Component("div", {
			innerHTML: HTMLContent,
			style: { padding: "5px 0" },
			classList: ["message"],
		})

		const separator = new Component("div", {
			style: { margin: "10px 0" },
			classList: ["line", "svelte-182ewru"]
		})

		wrapper.append(message.element);
		wrapper.append(separator.element);
		await sleep(100);
		wrapper.scrollTop = wrapper.scrollHeight;
	}

	const sendErrorLog = (message) => {
		sendLog(`<div style="color: var(--color-red);">${message}</div>`)
	}

	const manageMessagesToDelete = (message) => {
		const deleteSample = [
			"Hack successful",
			"to reach level",
			"earned",
		]
		if (deleteSample.some(sample => message.innerText.includes(sample)))
			message.remove();
	}

	function sendChatMessage(message) {
		const chatWindowForm = document.querySelector(".window-title > img[src='icons/chat.svg']")?.parentNode?.parentNode.querySelector(".window-content > div:nth-child(1) > div:nth-child(2) > form");
		if (!chatWindowForm) return void alert("Please open the global chat first");

		const textArea = chatWindowForm.querySelector("div > .wrapper > .textarea");
		const submitButton = chatWindowForm.querySelector("a > button");

		const oldMessage = textArea.textContent;
		textArea.textContent = message;
		textArea.dispatchEvent(new Event("input"));
		submitButton.click();
		textArea.textContent = oldMessage;
	}

	function tryCheckStaffStatus(rootElement) {
		const computerWindow = rootElement.querySelector(".window-title > img[src='icons/computer.svg']")?.parentNode?.parentNode;
		const staffRole = computerWindow?.querySelector(".badge")?.innerText || localStorage.getItem("prettier-staff-role");
		localStorage.setItem("prettier-staff-role", staffRole || "")
		if (staffRoles.includes(staffRole) && !evilStaffFeaturesActivated) {
			evilStaffFeaturesActivated = true;
			player.staffRole = staffRole;
			sendLog(`
                <div style="color: #9cf7ff; text-shadow: 0 0 2px #0fa, 0 0 3px #9cf7ff; letter-spacing: 0.3px; font-weight: lighter">
                    <img class="icon" src="https://www.svgrepo.com/download/67990/legal-hammer-symbol.svg" style="filter: drop-shadow(50px 0px 100px #9cf7ff) invert(96%) sepia(95%) saturate(7486%) hue-rotate(143deg) brightness(100%) contrast(94%);">
                    Bro really is ${staffRole === "ADMIN" ? "an" : "a"} <span class="badge" style="background: var(--color-${staffRole}); font-family: var(--font-family-1);">${staffRole}</span> 💀
                </div>
                <span style='font-size: 0.8rem; color: var(--color-lightgrey);'>Activating evil staff features 😈</span>
            `);
		}
	}

	const colorizeTerminal = async () => {
		const codeElement = document.querySelector("#code-list");
		const codeSection = document.querySelector("#section-code");
		if (!codeElement || !codeSection || !player.configuration.codeSyntaxing) return;
		document.querySelector("#highlighted")?.remove();

		codeElement.style.display = "none";
		const codeContent = codeElement.innerHTML
			.replace(/<br(\/)?>/g, "\n")
			.replace(/<span style="margin-left: 30px;">/g, "\t");

		const highlighted = new Component("pre", {
			id: "highlighted",
			children: [
				new Component("code", {
					innerHTML: codeContent,
					classList: ["language-python"],
					style: { tabSize: "30px" }
				})
			]
		})
		codeSection.appendChild(highlighted.element);
		hljs.highlightAll();
		await sleep(100);
		codeSection.scrollTop = codeSection.scrollHeight;
	}

	const customTerminal = () => {
		const wrapper = document.querySelector("#section-target > div");
		if (!wrapper) return;

		const component = new Component("div", {
			classList: ["svelte-1fdvo7g"],
			style: { height: "30px", width: "100%", display: "flex", alignItems: "center", marginTop: "10px", gap: "20px" },
			children: [
				new Component("div", {
					style: { display: "flex", gap: "67px", height: "100%", alignItems: "center" },
					children: [
						new Component("span", {
							innerText: "Theme",
						}),
						new Component("div", {
							style: { textAlign: "left", position: "relative", height: "100%", width: "150px", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid var(--color-terminal)", borderRadius: "2px", fontFamily: "var(--font-family-2)", color: "var(--color-terminal)", fontWeight: 500 },
							children: [
								new Component("div", {
									style: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "85%" },
									children: [
										new Component("span", {
											id: "selected-theme",
											innerText: player.configuration.currentTheme,
											style: { textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "85%" }
										}),
										new Component("img", {
											src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Chevron-icon-drop-down-menu-WHITE.png",
											style: { height: "10px", opacity: "0.8" }
										}),
									]
								}),
								new Component("select", {
									style: { position: "absolute", left: 0, height: "100%", width: "100%", opacity: "0" },
									onchange: (e) => {
										player.configuration.currentTheme = e.target.value;
										localStorage.setItem("prettier-currentTheme", e.target.value);
										document.querySelector("#selected-theme").innerText = e.target.value;
										updateThemeStyle();
									},
									children: Object.keys(themes).map(theme => {
										return new Component("option", {
											value: theme,
											innerText: theme,
											selected: theme === player.configuration.currentTheme
										})
									})
								})
							]
						})
					]
				}),
				new Component("div", {
					style: { display: "flex", height: "100%", alignItems: "center", gap: "20px" },
					children: [
						new Component("span", {
							innerText: "Code Syntaxing",
						}),
						new Component("div", {
							classList: ["toggle-button"],
							style: {
								height: "100%",
								width: "55px",
								backgroundColor: "var(--color-darkgreen)",
								borderRadius: "100px",
								position: "relative",
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								border: (player.configuration.codeSyntaxing ? "1px solid var(--color-terminal)" : "1px solid var(--color-subText-silver)")
							},
							children: [
								new Component("div", {
									classList: ["toggle-button-pointer"],
									style: {
										position: "absolute",
										height: "90%",
										width: "26px",
										backgroundColor: (player.configuration.codeSyntaxing ? "var(--color-terminal)" : "var(--color-subText-silver)"),
										borderRadius: "100px",
										left: (player.configuration.codeSyntaxing ? "25px" : "2px"),
										transitionDuration: "0.2s"
									}
								})
							],
							onclick: (e) => {
								const target = e.target.classList.contains("toggle-button-pointer") ? e.target.parentNode : e.target;
								if (player.configuration.codeSyntaxing) {
									target.style.border = "1px solid var(--color-subText-silver)";
									target.querySelector(".toggle-button-pointer").style.left = "2px";
									target.querySelector(".toggle-button-pointer").style.backgroundColor = "var(--color-subText-silver)";
									localStorage.removeItem("prettier-codeSyntaxing");
								} else {
									target.style.border = "1px solid var(--color-terminal)";
									target.querySelector(".toggle-button-pointer").style.left = "25px";
									target.querySelector(".toggle-button-pointer").style.backgroundColor = "var(--color-terminal)";
									localStorage.setItem("prettier-codeSyntaxing", "true");
								}
								player.configuration.codeSyntaxing = !player.configuration.codeSyntaxing
							}
						})
					]
				})
			]
		})

		wrapper.appendChild(component.element);
	}

	const counterHack = (hackInProgress) => {
		hackInProgress.footer?.remove();
		const terminalProgressBar = document.querySelector(".target-bar-progress");
		const wrapper = document.querySelector("#wrapper.svelte-182ewru");
		if (!terminalProgressBar || !wrapper)
			return;

		const counterLabel = new Component("span", {
			innerText: "Counter hack progression (0%)",
		})
		const counterProgressBar = new Component("div", {
			style: { width: "100%", height: "15px", background: "var(--color-grey)", borderRadius: "4px", margin: "5px 0", display: "flex", justifyContent: "space-between", alignItems: "center" },
		})

		const counterProgressBarValue = new Component("div", {
			style: { width: terminalProgressBar.style.width, height: "15px", background: "var(--color-terminal)", borderRadius: "4px", transitionDuration: "0.3s" }
		})

		hackInProgress.message?.append(counterLabel.element);
		hackInProgress.message?.append(counterProgressBar.element);
		counterProgressBar.element.append(counterProgressBarValue.element);

		wrapper.scrollTop = wrapper.scrollHeight;

		hackInProgress.counterLabel = counterLabel.element;
		hackInProgress.counterProgressBar = counterProgressBar.element;
		hackInProgress.counterProgressBarValue = counterProgressBarValue.element;

		const hackObserver = new MutationObserver(function (mutations) {
			const value = parseInt(mutations[0].target.style.width.slice(0, -1));
			counterLabel.element.innerText = counterLabel.element.innerText.replace(/\d{1,3}%/, value + "%");
			counterProgressBarValue.element.style.width = value + "%";
		});
		hackObserver.observe(terminalProgressBar, { attributes: true, attributeFilter: ["style"] });
		hackInProgress.hackObserver = hackObserver;
	}

	const manageBeingHacked = (message) => {
		const hacker = message.querySelectorAll(".tag")[0]?.innerText || (message.innerText.match(/by .+ on/) || [])[0]?.slice(3, -3);
		const port = (message.innerText.match(/on port \d+\./) || [])[0]?.slice(8, -1);
		const already = player.hacksInProgress.find(e => e.hacker == hacker);
		const progression = parseInt((message.innerText.match(/\d{1,3}(\.\d{1,2})?%/) || ["100%"])[0].slice(0, -1));
		if (already) {
			if (progression == 100) {
				already.separator?.remove();
				already.message?.remove();
				player.hacksInProgress.splice(player.hacksInProgress.indexOf(already), 1);
			} else {
				already.hackLabel.innerText = already.hackLabel.innerText.replace(/\d+%/, progression + "%");
				already.progressBarValue.style.width = progression + "%";
			}
			message.remove();
		} else if (port) {
			const redButtons = message.querySelectorAll(".tag");
			redButtons[0].remove();
			message.innerText = ""

			const iconElement = new Component("img", {
				src: "icons/hack-red.svg",
				classList: ["icon"],
				style: { marginRight: "9px" }
			})
			const hackLabel = new Component("span", {
				innerText: `${hacker} is hacking you (${progression}%) on port ${port}`,

			})
			const progressBar = new Component("div", {
				style: { width: "100%", height: "15px", background: "var(--color-grey)", borderRadius: "4px", margin: "5px 0", display: "flex", justifyContent: "space-between", alignItems: "center" },

			})
			const progressBarValue = new Component("div", {
				style: { width: `${progression}%`, height: "15px", background: "var(--color-terminal)", borderRadius: "4px", transitionDuration: "0.3s" },
			})
			const separator = new Component("div", {
				style: { margin: "10px 0" },
				classList: ["line", "svelte-182ewru"]
			})

			message.append(iconElement.element);
			message.append(hackLabel.element);
			message.append(progressBar.element);
			progressBar.element.append(progressBarValue.element);

			const alreadyCounterHacking = hacker == player.currentlyHacking;
			if (alreadyCounterHacking) {
				player.hacksInProgress.push({
					hacker: hacker,
					counterButton: redButtons[1],
					message,
					hackLabel: hackLabel.element,
					progression,
					progressBar: progressBar.element,
					progressBarValue: progressBarValue.element,
					separator: separator.element,
				})
				counterHack(player.hacksInProgress[player.hacksInProgress.length - 1])
			} else {
				const footer = new Component("span", {
					innerText: "Click to counter",
					style: { fontSize: "0.7rem", color: "var(--color-lightgrey)" }
				})
				message.append(footer.element);

				player.hacksInProgress.push({
					hacker: hacker,
					counterButton: redButtons[1],
					message,
					hackLabel: hackLabel.element,
					progression,
					progressBar: progressBar.element,
					progressBarValue: progressBarValue.element,
					separator: separator.element,
					footer: footer.element
				})
			}

			message.parentNode.append(separator.element);

			message.style.cursor = "pointer";
			message.style.padding = "5px 5px 5px 0";
			message.style.borderRadius = "4px";
			message.onclick = async () => {
				redButtons[1].click();
				await sleep(300);
				counterHack(message);
			};
			message.onmouseenter = () => message.style.backgroundColor = "#ffffff1a";
			message.onmouseleave = () => message.style.backgroundColor = "transparent";
		}
	}

	const hasBeenHacked = (window) => {

		const username = window.querySelector("#wrapper > div > div > span")?.innerText;
		const message = window.querySelector("#message")?.innerText;
		const ascii = window.querySelector(".code")?.innerText;
		if (!username || !message || !ascii)
			return;
		window.remove();
		document.querySelector(".taskbar-item > img[src='icons/hack.svg']")?.parentNode?.remove();

		const hackedWindow = new Component("div", {
			id: "hacked-window",
			classList: ["window", "svelte-1hjm43z", "window-selected"],
			style: { zIndex: "56", top: "60px", right: "10px" },
			children: [
				new Component("div", {
					id: "to-drag",
					classList: ["window-title", "svelte-1hjm43z"],
					innerText: "Hacked",
					children: [
						new Component("img", {
							prepend: true,
							src: "icons/hack-red.svg",
							classList: ["icon", "icon-in-text"]
						}),
						new Component("button", {
							onclick: () => document.getElementById("hacked-window")?.remove(),
							classList: ["window-close", "svelte-1hjm43z"],
							children: [
								new Component("img", {
									src: "icons/close.svg",
									classList: ["icon"]
								})
							]
						})
					]
				}),
				new Component("div", {
					classList: ["window-content", "svelte-1hjm43z"],
					style: { width: "calc(300px)", height: "calc(350px)", padding: "10px" },
					children: [
						new Component("div", {
							id: "content",
							style: { display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" },
							children: [
								new Component("div", {
									innerText: username,
									style: { fontSize: "14px", marginBottom: "4px", fontFamily: "var(--font-family-2)", fontWeight: "500" },
								}),
								new Component("div", {
									id: "message",
									innerText: message,
									classList: ["svelte-w2dcq9"],
									style: { fontFamily: "var(--font-family-2)" }
								}),
								new Component("div", {
									id: "monitor",
									style: { width: "100%" },
									classList: ["svelte-w2dcq9"],
									children: [
										new Component("div", {
											id: "bezel",
											style: { position: "relative", height: "100%", width: "100%" },
											children: [
												new Component("div", {
													id: "crt",
													classList: ["off", "svelte-w2dcq9"],
													style: { height: "100%" },
													children: [
														new Component("div", {
															classList: ["scanline", "svelte-w2dcq9"]
														}),
														new Component("div", {
															classList: ["terminal", "svelte-w2dcq9"],
															children: [
																new Component("div", {
																	id: "ascii",
																	classList: ["svelte-w2dcq9"],
																	children: [
																		new Component("pre", {
																			children: [
																				new Component("div", {
																					style: { fontSize: "8px" },
																					classList: ["code", "svelte-1uaaqnw"],
																					innerText: ascii
																				})
																			]
																		})
																	]
																})
															]
														})
													]
												})
											]
										})
									]
								})
							]
						})
					]
				}),
				new Component("div", {
					id: "hacked-progress",
					style: { position: "absolute", backgroundColor: "var(--color-terminal)", height: "3px", width: "100%", borderRadius: "4px", transform: "translateY(-1px)", transitionDuration: "0.3s" }
				})
			]
		})

		document.querySelector("main").append(hackedWindow.element);

		const duration = 5000;
		const interval = 50;
		let loop;
		loop = setInterval(() => {
			const progressbar = document.getElementById("hacked-progress");
			if (!progressbar) return;
			const current = progressbar.style.width.slice(0, -1);
			progressbar.style.width = (current - 100 / (duration / interval)).toFixed(1) + "%";
			if (progressbar.style.width.slice(0, -1) <= 0) {
				hackedWindow.element.remove();
				if (loop)
					clearInterval(loop);
			}
		}, interval);
	}

	const editTradeWindow = (tradeWindow) => {
		const button = new Component("button", {
			innerText: "Auto",
			classList: ["green", "svelte-ec9kqa"],
			style: { height: "36.5px", padding: "6px 14px", fontSize: "16px", boxShadow: "0 10px 15px var(--color-shadow)" },
			onclick: async () => {
				const items = Array.from(tradeWindow.querySelectorAll(".offer-wrapper")[1].querySelectorAll(".item"));
				const price = items.reduce((a, item) => {
					const background = item.style.background;
					const rarity = raritiesVariables[background] || raritiesVariables[background + ")"];
					const type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7);
					return a + (player.tradePricing[rarity][type] || player.tradePricing[rarity]["other"]);
				}, 0)
				const currentBTC = Number(document.querySelector(".topbar-value > div").textContent.slice(0, -4));
				if (currentBTC < price)
					return sendErrorLog(`You don't have enough BTC !`)
				tradeWindow.querySelector("button.grey")?.click();
				await sleep(200);
				const input = tradeWindow.querySelector("input");
				input.value = price.toString();
				input.dispatchEvent(new Event("input"));
				await sleep(200);
				tradeWindow.querySelectorAll("button.green")[1]?.click();
				await sleep(200);
			}
		})
		tradeWindow.querySelector("#wrapper").parentNode.append(button.element);
	}

	const logObserver = new MutationObserver(function (mutations) {
		const messages = mutations.filter(e =>
			e.target.id == "wrapper"
			&& (!e.nextSibling || !e.nextSibling[0])
			&& e.addedNodes
			&& e.addedNodes[0]?.classList?.contains("message"))
		if (!messages.length)
			return;
		messages.forEach(messageElement => {
			const message = messageElement.addedNodes[0];
			manageMessagesToDelete(message);
			if (message.innerText.includes("being hacked") || message.innerText.includes("been hacked"))
				manageBeingHacked(message);
		})
	});

	const windowCloseObserver = new MutationObserver(async function (mutations) {
		const windowClosed = mutations.find(e => {
			return e.target == document.querySelector("main") &&
				e.removedNodes.length == 1 &&
				e.removedNodes[0]?.classList?.contains("window", "svelte-1hjm43z")
		})
		if (!windowClosed)
			return;

		const isLogWindow = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/log.svg']")
		if (isLogWindow)
			logObserver.disconnect();

		const wasHackingSomeone = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']");
		if (wasHackingSomeone) {
			const currentHackingBy = player.hacksInProgress.find(e => e.hacker == player.currentlyHacking);
			if (currentHackingBy) {
				const footer = new Component("span", {
					innerText: "Click to counter",
					style: { fontSize: "0.7rem", color: "var(--color-lightgrey)" }
				})

				currentHackingBy.counterLabel?.remove();
				currentHackingBy.counterProgressBar?.remove();
				currentHackingBy.message.append(footer.element);
				currentHackingBy.footer = footer.element;
			}
			player.lastHacked = player.currentlyHacking
			player.currentlyHacking = null;
		}
	})

	const firewallEncryption = (hp, rd, regen, ad, ms) => {
		rd /= 100;
		const cShort = [3.7027, 100];
		const cMed = [8.2857, ad * 3];
		const cLong = [13.421, ms * 3];

		return [1000 + hp * 3, rd * 3, regen * 3 * .3, (cShort[0] * cShort[1] + cMed[0] * cMed[1] + cLong[0] * cLong[1]) / (cShort[1] + cMed[1] + cLong[1])];
	}

	const penTest = (port, cpu, aTPH) => {
		let t = 0;
		const damage = cpu[0] * (1 + cpu[1] - port[1]) + cpu[2];

		while (port[0] - damage + port[2] * aTPH > 0) {
			port[0] -= damage;
			port[0] += port[2] * aTPH;
			t += aTPH;
		}
		return t + aTPH * (port[0] + port[2] * aTPH) / damage;
	}

	const netBTCperHour = (idle, barter, crypto) => {
		const npcsPerHour = 27.69;
		idle *= 3600;
		barter /= 100;
		barter = ((1 + barter) * 0.00864000 - 0.00864000) * npcsPerHour;
		crypto /= 100;
		crypto = ((1 + crypto) * 0.00180000 - 0.00180000) * npcsPerHour;

		return idle + barter + crypto;
	}

	const dPS = (dTI, level, rarity, type) => {
		let basePrice = stats.filament_price[rarity];
		const value = (level - 1) * 3 * basePrice + basePrice;
		if (type != "cpu" && type != "router") basePrice /= 2
		if (rarity < 5) {
			if (dTI < 7) return (value).toFixed(4);
			else if (dTI < 8) return "~" + (value + (dTI - 7) * basePrice / 3).toFixed(4);
			else if (dTI < 9) return "~" + (value + (dTI - 8) * basePrice / 3 * 2 + basePrice / 3).toFixed(4);
			else if (dTI < 9.9) return "~" + (value + (dTI - 9) * basePrice + basePrice).toFixed(4);
		} else if (rarity < 6) {
			if (dTI < 5) return (value).toFixed(4);
			else if (dTI < 6) return "~" + (value + (dTI - 5) * basePrice / 3).toFixed(4);
			else if (dTI < 7) return "~" + (value + (dTI - 6) * basePrice / 3 * 2 + basePrice / 3).toFixed(4);
			else if (dTI < 8) return "~" + (value + (dTI - 7) * basePrice + basePrice).toFixed(4);
			else if (dTI < 9) return "~" + (value + (dTI - 7) * basePrice * 5 / 3 + basePrice * 2).toFixed(4);
			else if (dTI < 9.7) return "~" + (value + (dTI - 7) * basePrice * 10 / 3 + basePrice * 11 / 3).toFixed(4);
		} else {
			if (dTI < 5) return (value).toFixed(4);
			else if (dTI < 6) return "~" + (value + (dTI - 5) * basePrice / 3).toFixed(4);
			else if (dTI < 7) return "~" + (value + (dTI - 6) * basePrice / 2 + basePrice / 3).toFixed(4);
			else if (dTI < 8) return "~" + (value + (dTI - 7) * basePrice + basePrice * 5 / 6).toFixed(4);
			else if (dTI < 9) return "~" + (value + (dTI - 8) * basePrice * 2 + basePrice * 11 / 6).toFixed(4);
			else if (dTI < 9.5) return "~" + (value + (dTI - 8) * basePrice * 5 + basePrice * 23 / 6).toFixed(4);

		}
		return "Invaluable";
	}

	const dGI = (idle, barter, crypto, level, rarity) => {
		const item = stats.gpu[rarity];
		const bestGPU = netBTCperHour(item.idle[1] + stats.gpu_term[rarity] * level, item.bart[1], item.crip[1]);
		const worstGPU = netBTCperHour(item.idle[0] + stats.gpu_term[rarity] * level, item.bart[0], item.crip[0]);
		const actualGPU = netBTCperHour(idle, barter, crypto);
		const qualityRange = bestGPU - worstGPU;
		const actualRange = actualGPU - worstGPU;
		let gpuRank = 1 + ((actualRange / qualityRange) * 9);
		if (gpuRank < 1) gpuRank = 1;

		return gpuRank;
	}

	const boostBTCperHour = (boost, rarity) => {
		const idle = (stats.gpu[rarity].idle[1] + stats.gpu_term[rarity]) * 3600
		boost /= 100;

		return idle * (1 + boost) - idle;
	}

	const dPI = (boost, level, rarity) => {
		const item = stats.psu[rarity];
		const bestPSU = boostBTCperHour(item.boost[1] + stats.psu_term[rarity] * level, rarity)
		const worstPSU = boostBTCperHour(item.boost[0] + stats.psu_term[rarity] * level, rarity)
		const actualPSU = boostBTCperHour(boost, rarity)
		const qualityRange = bestPSU - worstPSU;
		const actualRange = actualPSU - worstPSU;
		let psuRank = 1 + ((actualRange / qualityRange) * 9);
		if (psuRank < 1) psuRank = 1;

		return psuRank;
	}

	const dFI = (hp, rd, rg, enc, level, rarity) => {
		const item = stats.firewall[rarity];
		const cpu = stats.cpu[rarity];
		const cpuV = hackPower(cpu.hack[1] + stats.cputerm[rarity] * (level - 1), cpu.trueDam[1], cpu.pen[1], cpu.chance[1], cpu.dam[1]);
		const cpsAverage = 5;
		const bestPort = firewallEncryption(item.hp[1] + stats.fireterm[rarity] * (level - 1), item.rd[1], item.regen[1], item.medium[1], item.long[1]);
		const worstPort = firewallEncryption(item.hp[0] + stats.fireterm[rarity] * (level - 1), item.rd[0], item.regen[0], item.medium[0], item.long[0]);
		const bestHoldout = penTest(bestPort, cpuV, bestPort[3] / cpsAverage + .3);
		const worstHoldout = penTest(worstPort, cpuV, worstPort[3] / cpsAverage + .3);
		const actualHoldout = penTest([hp, rd, rg], cpuV, enc / cpsAverage + .3);
		const qualityRange = worstHoldout - bestHoldout;
		const qualityActually = worstHoldout - actualHoldout;
		let fireRank = 1 + (qualityActually / qualityRange * 9);
		if (fireRank < 1) fireRank = 1;

		return fireRank;
	}

	const hackPower = (hack, trueDam, pen, chance, dam) => {
		pen /= 100;
		chance /= 100;
		dam /= 100;
		return [(100 + hack) + (0.05 + chance) * (100 + hack) * (0.3 + dam), pen, trueDam];
	}

	const dCI = (raw, pen, trueDam, level, rarity) => {
		const item = stats.cpu[rarity];
		const port = stats.port[rarity];
		const bestHackPower = hackPower(item.hack[1] + stats.cputerm[rarity] * (level - 1), item.trueDam[1], item.pen[1], item.chance[1], item.dam[1]);
		const worstHackPower = hackPower(item.hack[0] + stats.cputerm[rarity] * (level - 1), item.trueDam[0], item.pen[0], item.chance[0], item.dam[0]);
		const best = port.hp / (bestHackPower[0] * (1 + bestHackPower[1] - port.rd) + bestHackPower[2])
		const worst = port.hp / (worstHackPower[0] * (1 + worstHackPower[1] - port.rd) + worstHackPower[2])
		const actual = port.hp / (raw * (1 + pen - port.rd) + trueDam)
		const qualityRange = worst - best;
		const qualityActually = worst - actual;
		let cpuRank = 1 + ((qualityActually / qualityRange) * 9);
		if (cpuRank < 1) cpuRank = 1;

		return cpuRank;
	}

	const getItemGrade = (type, level, index, effects) => {
		switch (type) {
			case "cpu":
				const hack = effects["Hack Damage"];
				const trueDam = effects["True Damage"] || 0;
				const pen = effects["Hack Armor Penetration"] || 0;
				const chance = effects["Hack Critical Damage Chance"] || 0;
				const dam = effects["Hack Critical Damage Bonus"] || 0;
				const [raw, penV, trueDamV] = hackPower(hack, trueDam, pen, chance, dam);
				return dCI(raw, penV, trueDamV, level, index).toFixed(4);
			case "gpu":
				const idle = effects["Idle Crypto Mining"]
				const bart = effects["More Crypto Reward"] || 0
				const crip = effects["Better Barter"] || 0
				return dGI(idle, bart, crip, level, index).toFixed(4);
			case "psu":
				const boost = effects["Crypto Mining Power"]
				return dPI(boost, level, index).toFixed(4)
			case "router":
				const hp = effects["Firewall Health"];
				const rd = effects["Firewall Damage Reduction"] || 0;
				const rg = effects["Firewall Regeneration"] || 0;
				const ad = effects["Firewall Advanced Encryption"] || 0;
				const ms = effects["Firewall Master Encryption"] || 0;
				const [hpP, rdP, rgP, encryption] = firewallEncryption(hp, rd, rg, ad, ms);
				return dFI(hpP, rdP, rgP, encryption, level, index).toFixed(4);
			default:
				return -1;
		}
	}

	const itemHoverObserver = new MutationObserver(function (mutations) {
		const description = mutations.find(e => {
			return e.addedNodes.length == 1 && e.addedNodes[0].id == "desc"
				&& e.addedNodes[0].classList?.contains("svelte-181npts")
		})?.addedNodes[0]
		if (!description)
			return;
		description.style.zIndex = 1001;
		const type = (description.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -5);
		const rarity = description.querySelector(".rarity")?.innerText;
		const level = (description.querySelector(".level")?.innerText.match(/\d+/) || [])[0];
		const effects = {};
		Array.from(description.querySelectorAll(".effect")).forEach(effect => {
			effect.style.width = "100%";
			const name = effect.querySelector("div > div")?.innerText.split("  ")[1].trim();
			const value = effect.querySelector("div > span > span")?.innerText;
			effects[name] = Number(value);
		});
		if (!type || !level || effects.length == 0)
			return;

		const index = rarities.indexOf(rarity.toLowerCase());
		const grade = getItemGrade(type, level, index, effects);
		if (grade == -1)
			return

		const unitiesByType = {
			"cpu": "dCI",
			"gpu": "dGI",
			"psu": "dPI",
			"router": "dFI",
		}

		const gradeComponent = new Component("div", {
			id: "grade",
			classList: ["attribute", "svelte-181npts"],
			innerText: `${grade} / 10 ${unitiesByType[type]}`,
			style: { paddingBlock: "4px", paddingInline: "9px", borderRadius: "2px", backgroundColor: "black" }
		})
		description.querySelector(".level")?.parentNode.insertBefore(gradeComponent.element, description.querySelector(".effect"));
		description.style.width = "300px";

		const price = dPS(grade, level, index, type);
		const priceStandard = new Component("div", {
			id: "price",
			classList: ["attribute", "svelte-181npts", "estimated-price"],
			innerHTML: `<img class="icon icon-in-text" src="icons/btc.svg" alt="Bitcoin Icon">${price}`,
			style: { paddingBlock: "4px", paddingInline: "9px", borderRadius: "2px", background: "linear-gradient(112deg, #edca3d 4%, #ffdf81 34%, #edca3d 66%, #ffdf81 100%)" }
		})
		description.querySelector(".level")?.parentNode.insertBefore(priceStandard.element, description.querySelector(".effect"));
		description.style.width = "300px";

	});

	let manageLoot = async () => {
		const item = document.querySelector(".window-loot > div > div > div > div > div > .item")
		let type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7).replace("router", "firewall");
		if (item && type) {
			let background = item.style.background
			let rarity = raritiesVariables[background];
			if (!rarity) rarity = raritiesVariables[background + ")"];
			if (!player.autoloot[rarity][type]) type = "other";
			let color = getComputedStyle(item).getPropertyValue(background.toString().slice(4, background.endsWith(")") ? -1 : background.length))
			if (rarity) {
				await sleep(200);
				const action = player.autoloot[rarity][type];
				if (action === "nothing")
					return;
				if (action === "take")
					await windowManager.openWindow("inventory", true);
				const button = document.querySelector(lootButtons[player.autoloot[rarity][type]])
				button?.click();
				sendLog(`
                    <img class="icon" src="icons/check.svg"/>
                    Successfully ${action.replace("take", "took").replace("sell", "sold").replace("shred", "shredded")} ${["uncommon", "epic", "ethereal"].includes(rarity) ? "an" : "a"}
                    <span style='background: ${color}; border-radius: 5px; padding: 2px 5px 2px 5px;'>${rarity}</span>
                    item
                `);
				await sleep(100);
				windowManager.closeWindow("inventory", true);
				await sleep(500);
			}
		}
	}

	const allEqual = (array) => {
		return array.every(value => value === array[0]);
	}

	const getItemRarityScore = (item) => {
		const background = item.style.background;
		return rarities.indexOf(raritiesVariables[background] || raritiesVariables[background + ")"]);
	}

	const getItemNameScore = (item) => {
		return item.textContent.trim().charCodeAt(0);
	}

	const getItemPrice = async (item) => {
		await item.dispatchEvent(new MouseEvent("mouseover"));
		await sleep(100);
		const price = Number(document.querySelector(".estimated-price")?.textContent.trim().replace("~", "") || 0)
		await item.dispatchEvent(new MouseEvent("mouseleave"));
		return price;
	}
	const getItemdTI = async (item) => {
		await item.dispatchEvent(new MouseEvent("mouseover"));
		await sleep(100);
		const price = Number(document.querySelector("#grade")?.textContent.split(" / ")[0] || 0)
		await item.dispatchEvent(new MouseEvent("mouseleave"));
		return price;
	}

	const getItemTypeScore = (item) => {
		const types = ["cpu", "gpu", "psu", "router"]
		const type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7);
		const score = types.indexOf(type);
		return score == -1 ? types.length : score;
	}

	const getItemToMove = async (order, scores) => {
		const inventoryWindow = document.querySelector(".window-title > img[src='icons/inventory.svg']").closest(".window");
		const inventory = Array.from(inventoryWindow.querySelectorAll(".item"))
		return inventory.find((_, index) => (order === "asc" ? scores[index] > scores[index + 1] : scores[index] < scores[index + 1]))
	}

	const sortItem = async (item, itemSellerWindow) => {
		const slot = itemSellerWindow.querySelector(".item-slot");
		moveItem(item, slot);
		await sleep(110);
		itemSellerWindow.querySelector(".item")?.parentNode.dispatchEvent(new MouseEvent("dblclick"));
	}

	const sortInventory = async (order, getScore) => {
		const itemSellerWindow = await windowManager.openWindow("item_seller", true);
		const inventoryWindow = document.querySelector(".window-title > img[src='icons/inventory.svg']").closest(".window");
		let inventory = Array.from(inventoryWindow.querySelectorAll(".item"))
		const scores = [];
		for (let item of inventory) {
			const result = await getScore(item);
			scores.push(result);
		}
		let nextItem = await getItemToMove(order, scores);
		while (nextItem) {
			await sortItem(nextItem, itemSellerWindow);
			inventory = Array.from(inventoryWindow.querySelectorAll(".item"))
			const index = inventory.indexOf(nextItem);
			scores.push(scores[index]);
			scores.splice(index, 1);
			await sleep(110);
			nextItem = await getItemToMove(order, scores);
		}
		windowManager.closeWindow("item_seller");
	}

	const customSort = async () => {
		const inventory = await windowManager.openWindow("inventory");
		const items = Array.from(inventory.querySelectorAll(".item"));
		items.forEach((item, index) => item.id = `inventory${index}`);
		let mode = "insert";
		const e = new Component("div", {
			id: "customSort",
			style: {
				position: "absolute",
				zIndex: 1000,
				height: "100vh",
				width: "100vw",
				top: 0,
				left: 0,
				backgroundColor: "#000000cc",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: "20px",
			},
			children: [
				new Component("h1", {
					innerText: "Drag to sort"
				}),
				new Component("div", {
					style: { display: "flex", border: "1px solid var(--color-terminal)", borderRadius: "8px", fontSize: "20px", fontFamily: "var(--font-family-2)" },
					children: [
						new Component("span", {
							classList: ["customSort-insert"],
							style: { width: "200px", padding: "5px 15px", color: "white", backgroundColor: "var(--color-midgreen)", borderRadius: "8px", textAlign: "center", cursor: "pointer" },
							innerText: "Insert",
							onclick: (e) => {
								mode = "insert";
								e.target.style.backgroundColor = "var(--color-midgreen)";
								document.querySelector(".customSort-replace").style.backgroundColor = "unset";
							}
						}),
						new Component("span", {
							classList: ["customSort-replace"],
							style: { width: "200px", padding: "5px 15px", color: "white", borderRadius: "8px", textAlign: "center", cursor: "pointer" },
							innerText: "Replace",
							onclick: (e) => {
								mode = "replace";
								e.target.style.backgroundColor = "var(--color-midgreen)";
								document.querySelector(".customSort-insert").style.backgroundColor = "unset";
							}
						}),
					]
				}),
				new Component("ul", {
					id: "draggable-menu",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "5px",
						padding: 0,
						listStyleType: "none",
						overflow: "auto",
						height: "70vh",
						// width: "90%",
						width: (325 * Math.ceil(items.length / 15)) + "px",
						flexWrap: "wrap",
						alignItems: "center",
					},
					children: items.map((item, index) => (
						new Component("div", {
							style: { display: "flex", gap: "10px", alignItems: "center" },
							children: [
								(items.length > 15 && new Component("span", {
									classList: ["indexes"],
									innerText: (Number(index) + 1).toString() + ".",
									style: { width: "20px" }
								})),
								new Component("li", {
									classList: ["draggable"],
									draggable: true,
									style: {
										width: "290px",
										height: "35px",
										minHeight: "35px",
										backgroundColor: "red",
										cursor: "move",
										borderRadius: "3px",
										overflow: "hidden"
									},
									innerHTML: item.parentNode.innerHTML,
									onmouseenter: async (e) => {
										e.target.style.outline = "1px solid white";
										const item = document.querySelector(`#${e.target.querySelector(".item").id}`);
										item.dispatchEvent(new MouseEvent("mouseover"))
										await sleep(20);
										const hoverWindow = document.querySelector("#desc");
										if (hoverWindow) {
											hoverWindow.style.top = (e.clientY < 450 ? 450 : e.clientY) + "px";
											hoverWindow.style.left = (e.clientX + 20) + "px";
										}
									},
									onmouseleave: (e) => {
										e.target.style.outline = "unset";
										item.dispatchEvent(new MouseEvent("mouseleave"))
									},
								})
							]
						})
					))
				}),
				new Component("div", {
					style: { display: "flex", gap: "20px" },
					children: [
						new Component("button", {
							style: { width: "100px", height: "40px", fontSize: "20px" },
							classList: ["red", "svelte-ec9kqa"],
							innerText: "Cancel",
							onclick: () => document.querySelector("#customSort")?.remove(),
						}),
						new Component("button", {
							style: { width: "100px", height: "40px", fontSize: "20px" },
							classList: ["green", "svelte-ec9kqa"],
							innerText: "Sort",
							onclick: async () => {
								const list = Array.from(document.querySelectorAll(".draggable > div"))
								document.querySelector("#customSort")?.remove();
								await sortInventory("asc", (item) => list.findIndex(e => e.id == item.id));
							}
						}),
					]
				})
			]
		})

		document.body.append(e.element);
		await sleep(100);

		let dragSrcEl = null;
		let insertIndicator = document.createElement('div');
		insertIndicator.className = 'insert-indicator';
		function dragStart(e) {
			document.getElementById("desc")?.remove();
			this.style.opacity = '0.5';
			dragSrcEl = this;
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/html', this.innerHTML);
		};

		function dragEnter() {
			Array.from(document.querySelectorAll(".over")).forEach(el => el.classList.remove("over"));
			if (mode == "insert")
				this.parentNode.parentNode.insertBefore(insertIndicator, this.parentNode);
			else
				this.classList.add('over');
		}

		function dragOver(e) {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'move';
			return false;
		}

		function dragDrop(e) {
			e.stopPropagation();
			if (dragSrcEl != this) {
				if (mode == "insert") {
					let list = document.getElementById('draggable-menu');
					let items = Array.from(list.querySelectorAll('.draggable'));

					let draggedIndex = items.indexOf(dragSrcEl);
					let targetIndex = items.indexOf(this);

					if (draggedIndex < targetIndex)
						this.parentNode.insertAdjacentElement('afterend', dragSrcEl.parentNode);
					else
						this.parentNode.insertAdjacentElement('beforebegin', dragSrcEl.parentNode);
					Array.from(document.querySelectorAll(".indexes")).forEach((e, index) => e.innerText = (Number(index) + 1) + ".")
				} else {
					dragSrcEl.innerHTML = this.innerHTML;
					this.innerHTML = e.dataTransfer.getData('text/html');
				}
			}
			return false;
		}

		function dragEnd() {
			const listItems = Array.from(document.querySelectorAll('.draggable'));
			listItems.forEach(item => {
				item.classList.remove('over');
				item.style.opacity = '1';
				document.querySelector(".insert-indicator")?.remove();
			});
		}

		const addEventsDragAndDrop = (el) => {
			el.addEventListener('dragstart', dragStart, false);
			el.addEventListener('dragenter', dragEnter, false);
			el.addEventListener('dragover', dragOver, false);
			el.addEventListener('drop', dragDrop, false);
			el.addEventListener('dragend', dragEnd, false);
		}

		Array.from(document.querySelectorAll('.draggable')).forEach((item) => addEventsDragAndDrop(item));
	}

	const editInventoryWindow = (inventoryWindow = document.querySelector(".window-title > img[src='icons/inventory.svg']")?.closest(".window")) => {
		if (!inventoryWindow) return;
		const sortButton = new Component("button", {
			classList: ["green", "svelte-ec9kqa"],
			style: { padding: "10px", fontSize: "16px", width: "35px" },
			children: [
				new Component("img", {
					src: "https://www.svgrepo.com/show/2287/sort.svg",
					style: { filter: "invert(1)" },
					classList: ["icon"]
				})
			],
			onclick: (e) => {
				const position = e.target.getBoundingClientRect();
				new Popup({ clientY: position.y, clientX: position.x })
					.setTitle("Sort by")
					.addAction("Custom", customSort)
					.addAction("Type", async () => await sortInventory("asc", getItemTypeScore))
					.addAction("Rarity", async () => {
						new Popup({ clientY: position.y, clientX: position.x })
							.setTitle("Rarity")
							.addAction("Descendant", async () => await sortInventory("desc", getItemRarityScore))
							.addAction("Ascendant", async () => await sortInventory("asc", getItemRarityScore))
							.create();
					})
					.addAction("Price", async () => {
						new Popup({ clientY: position.y, clientX: position.x })
							.setTitle("Price")
							.addAction("Descendant", async () => await sortInventory("desc", getItemPrice))
							.addAction("Ascendant", async () => await sortInventory("asc", getItemPrice))
							.create();
					})
					.addAction("dTI", async () => {
						new Popup({ clientY: position.y, clientX: position.x })
							.setTitle("dTI")
							.addAction("Descendant", async () => await sortInventory("desc", getItemdTI))
							.addAction("Ascendant", async () => await sortInventory("asc", getItemdTI))
							.create();
					})
					.addAction("Alphabet", async () => {
						new Popup({ clientY: position.y, clientX: position.x })
							.setTitle("Alphabet")
							.addAction("A - Z", async () => await sortInventory("asc", getItemNameScore))
							.addAction("Z - A", async () => await sortInventory("desc", getItemNameScore))
							.create();
					})
					.create();
			}
		})

		const items = inventoryWindow.querySelectorAll(".name");
		Array.from(items).forEach((item, index) => {
			const indexElement = new Component("div", {
				classList: ["attribute", "svelte-1sdpiuc"],
				style: { marginLeft: "auto", backgroundColor: "#00000038" },
				innerText: index + 1
			});
			item.append(indexElement.element);
		})

		const div = inventoryWindow.querySelector(".window-content > div > div:not([id])");
		div.style.display = "flex";
		div.style.justifyContent = "space-between";
		div.style.alignItems = "center";
		div.append(sortButton.element);
	}

	const windowOpenObserver = new MutationObserver(async function (mutations) {
		const newWindow = mutations.find(e => {
			return e.target == document.querySelector("main") &&
				e.addedNodes.length == 1 &&
				e.addedNodes[0]?.classList?.contains("window", "svelte-1hjm43z")
		})
		if (!newWindow)
			return;

		const src = newWindow.addedNodes[0].querySelector(".window-title > img").src
		const name = src.split("/")[src.split("/").length - 1].slice(0, -4);
		if (player.configuration.openInSilent.find(e => e.iconName === name)) {
			newWindow.addedNodes[0].style.display = "none";
			newWindow.addedNodes[0].classList.add("openInSilent");
		}
		const isItem = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/loot.svg']")
		if (isItem)
			await manageLoot();

		const isInventoryWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/inventory.svg']")?.parentNode?.parentNode;
		if (isInventoryWindow)
			editInventoryWindow(isInventoryWindow);

		const isTradeWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/trade.svg']")?.parentNode?.parentNode;
		if (isTradeWindow)
			editTradeWindow(isTradeWindow);

		const isFilamentWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/filament.svg']")?.parentNode?.parentNode;
		if (isFilamentWindow) {
			const upgrader = isFilamentWindow.querySelectorAll("h3")[1];
			if (!upgrader)
				return;
			let isAnyGreen = Array.from(isFilamentWindow.querySelectorAll("button.green:not(.cantClick)")).slice(1).length
			const container = new Component("a", {
				style: { width: "311px", display: "inline-block", margin: "0", marginTop: "10px", flex: "0 1 auto" },
				children: [
					new Component("button", {
						innerText: "Trade all",
						classList: ["green", "svelte-ec9kqa", (isAnyGreen ? "can" : "cantClick")],
						style: { height: "auto", padding: "6px 14px", fontFamily: "var(--font-family-1)", fontSize: "16px", boxShadow: "0 10px 15px var(--color-shadow)" }
					})
				],
				onclick: async (event) => {
					for (let i = 0; i < 6; i++) {
						let button = Array.from(isFilamentWindow.querySelectorAll("button.green")).filter(e => e.innerText == "Max")[i];
						button?.click();
						await sleep(100);
					}
				        isAnyGreen = Array.from(isFilamentWindow.querySelectorAll("button.green:not(.cantClick)")).filter(e => e.innerText !== "Trade all").slice(1).length
				        event.target.classList = [`green svelte-ec9kqa ${isAnyGreen ? "can" : "cantClick"}`];
				}
			})

			upgrader.after(container.element);
		}

		const isTerminalWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']");
		if (isTerminalWindow) {
			const terminalProgressBar = document.querySelector(".target-bar-progress");
			if (!terminalProgressBar) return
			customTerminal();
			if (player.configuration.currentTheme !== Object.keys(themes)[0]) {
				const hackObserver = new MutationObserver(function (_) {
					colorizeTerminal();
				});
				hackObserver.observe(terminalProgressBar, { attributes: true, attributeFilter: ["style"] });
			}
		}

		const isParamWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/settings.svg']")?.parentNode?.parentNode;
		if (isParamWindow) {
			isParamWindow.querySelector(".slider[min='70']").onchange = (e) =>
				localStorage.setItem("prettier-desktopIconSize", e.target.value);
			isParamWindow.querySelector(".window-content").style.width = "600px"
			let currImage = localStorage.getItem("prettier-backgroundImage");
			const wrapper = isParamWindow.querySelector(".window-content > div");
			const shredder = wrapper.querySelector("div:nth-child(4)");
			shredder.querySelectorAll("button.green").forEach(button => button.click());
			shredder.style.display = "none";
			wrapper.querySelector("div:nth-child(1)").innerHTML = wrapper.querySelector("div:nth-child(1)").innerHTML.replace(/You're currently logged in as .+\./, "");
			wrapper.querySelector("div:nth-child(1) > div > div").style.marginTop = 0;
			wrapper.querySelector("button.red").style.height = "30px"

			function updateBackground() {
				document.querySelector("body").style.backgroundImage = currImage || "url(../../../img/bg-tile.png),radial-gradient(at center bottom,#273541,#0b0b0c)";
				if (currImage && currImage !== "url()")
					localStorage.setItem("prettier-backgroundImage", currImage)
				else
					localStorage.removeItem("prettier-backgroundImage")
			}

			const borderColor = "transparent"
			const autolootSetting = new Component("table", {
				classList: ["item-manager-content"],
				children: [
					new Component("thead", {
						children: [
							new Component("th", {
								innerText: "",
								style: { borderBottom: `1px solid ${borderColor}` }
							}),
							...["cpu", "gpu", "psu", "firewall", "other"].map((type, index) => (
								new Component("th", {
									style: { width: "100px" },
									children: [
										new Component("div", {
											innerText: type.toUpperCase(),
											style: {
												textAlign: "center", fontSize: "14px", fontWeight: 600, backgroundColor: "#ffffff33", padding: "3px",
												borderTopLeftRadius: index == 0 ? "5px" : 0,
												borderBottomLeftRadius: index == 0 ? "5px" : 0
											},
										})
									]
								})
							)),
							new Component("th", {
								style: { width: "100px" },
								children: [
									new Component("div", {
										innerText: "ALL",
										style: {
											textAlign: "center", fontSize: "14px", fontWeight: 600, backgroundColor: "#ffffff33", padding: "3px",
											borderTopRightRadius: "5px",
											borderBottomRightRadius: "5px",
										},
									})
								]
							})
						]
					}),
					new Component("tbody", {
						children: lootRarity.slice(0, -1).map(rarity => (
							new Component("tr", {
								children: [
									new Component("th", {
										style: { borderBottom: `1px solid ${borderColor}` },
										children: [
											new Component("div", {
												innerText: rarity.name[0].toUpperCase() + rarity.name.slice(1),
												style: { background: rarity.color, color: "white", fontWeight: 600, padding: "5px", borderRadius: "5px", fontSize: "12px", textAlign: "center" }
											})
										]
									}),
									...["cpu", "gpu", "psu", "firewall", "other"].map(type => (
										new Component("td", {
											style: { position: "relative", borderBottom: `1px solid ${borderColor}`, cursor: "pointer" },
											onmouseenter: () => document.querySelector(`.${rarity.name}${type}`).style.backgroundColor = "#ffffff33",
											onmouseleave: () => document.querySelector(`.${rarity.name}${type}`).style.backgroundColor = "#ffffff11",
											children: [
												new Component("select", {
													classList: [`${rarity.name}${type}select`],
													style: { position: "absolute", top: 0, left: 0, height: "100%", width: "100%", opacity: 0 },
													onchange: (e) => {
														player.autoloot[rarity.name][type] = e.target.value;
														document.querySelector(`.${rarity.name}${type}`).innerText = e.target.value;
														document.querySelector(`.${rarity.name}all`).innerText = allEqual(Object.values(player.autoloot[rarity.name])) ? player.autoloot[rarity.name].cpu : "-";
														player.autoloot[rarity.name][type] = e.target.value;
														save("prettier-autoloot", player.autoloot);
													},
													children: ["take", "shred", "sell", "nothing"].map(action => (
														new Component("option", {
															value: action,
															innerText: action,
															selected: action === player.autoloot[rarity.name][type]
														})
													))
												}),
												new Component("div", {
													classList: [`${rarity.name}${type}`],
													innerText: player.autoloot[rarity.name][type],
													style: { textAlign: "center", fontSize: "14px", fontWeight: 400, padding: "4px", backgroundColor: "#ffffff11", borderRadius: "5px" },
												}),
											]
										})
									)),
									new Component("td", {
										style: { position: "relative", borderBottom: `1px solid ${borderColor}`, borderLeft: "2px solid #ffffff33" },
										onmouseenter: () => document.querySelector(`.${rarity.name}all`).style.backgroundColor = "#ffffff33",
										onmouseleave: () => document.querySelector(`.${rarity.name}all`).style.backgroundColor = "#ffffff11",
										children: [
											new Component("select", {
												style: { position: "absolute", top: 0, left: 0, height: "100%", width: "100%", opacity: 0 },
												value: "take",
												onchange: (e) => {
													for (let type of ["cpu", "gpu", "psu", "firewall", "other"]) {
														document.querySelector(`.${rarity.name}${type}select`).value = e.target.value;
														document.querySelector(`.${rarity.name}${type}`).innerText = e.target.value;
														document.querySelector(`.${rarity.name}all`).innerText = e.target.value;
														player.autoloot[rarity.name][type] = e.target.value;
														save("prettier-autoloot", player.autoloot);
													}
												},
												children: ["take", "shred", "sell", "nothing"].map(action => (
													new Component("option", {
														value: action,
														innerText: action,
														selected: allEqual(Object.values(player.autoloot[rarity.name])) && action === player.autoloot[rarity.name].cpu
													})
												))
											}),
											new Component("div", {
												innerText: allEqual(Object.values(player.autoloot[rarity.name])) ? player.autoloot[rarity.name].cpu : "-",
												classList: [`${rarity.name}all`],
												style: { textAlign: "center", fontSize: "14px", fontWeight: 400, padding: "4px", backgroundColor: "#ffffff11", borderRadius: "5px" }
											}),
										]
									})
								]
							})
						))
					})
				]
			})

			const tradePriceSetting = new Component("table", {
				classList: ["item-manager-content"],
				children: [
					new Component("thead", {
						children: [
							new Component("th", {
								innerText: "",
								style: { borderBottom: `1px solid ${borderColor}` }
							}),
							...["cpu", "gpu", "psu", "firewall", "other"].map((type, index) => (
								new Component("th", {
									style: { width: "100px" },
									children: [
										new Component("div", {
											innerText: type.toUpperCase(),
											style: {
												textAlign: "center", fontSize: "14px", fontWeight: 600, backgroundColor: "#ffffff33", padding: "3px",
												borderTopLeftRadius: index == 0 ? "5px" : 0,
												borderBottomLeftRadius: index == 0 ? "5px" : 0
											},
										})
									]
								})
							)),
							new Component("th", {
								style: { width: "100px" },
								children: [
									new Component("div", {
										innerText: "ALL",
										style: {
											textAlign: "center", fontSize: "14px", fontWeight: 600, backgroundColor: "#ffffff33", padding: "3px",
											borderTopRightRadius: "5px",
											borderBottomRightRadius: "5px",
										},
									})
								]
							})
						]
					}),
					new Component("tbody", {
						children: lootRarity.map(rarity => (
							new Component("tr", {
								children: [
									new Component("th", {
										style: { borderBottom: `1px solid ${borderColor}` },
										children: [
											new Component("div", {
												innerText: rarity.name[0].toUpperCase() + rarity.name.slice(1),
												style: { background: rarity.color, color: "white", fontWeight: 600, padding: "5px", borderRadius: "5px", fontSize: "12px", textAlign: "center" }
											})
										]
									}),
									...["cpu", "gpu", "psu", "firewall", "other"].map(type => (
										new Component("td", {
											style: { borderBottom: `1px solid ${borderColor}`, width: "100px" },
											children: [
												new Component("input", {
													classList: [`${rarity.name}${type}`],
													style: { padding: "4px", borderRadius: "5px", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", width: "70px" },
													value: player.tradePricing[rarity.name][type],
													onblur: (e) => {
														let value = e.target.value;
														if (value == "")
															return e.target.style.border = "1px solid var(--color-red)"
														if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100000)
															return e.target.style.border = "1px solid var(--color-red)"
														if (value.includes(".")) {
															const before = value.split(".")[0];
															const after = value.split(".")[1];
															if (after.length > 5)
																value = `${before}.${after.slice(0, 4)}${after.split("").find(e => e != "0")}`;
														}
														e.target.value = value;
														player.tradePricing[rarity.name][type] = Number(value);
														save("prettier-tradePricing", player.tradePricing);
														e.target.style.border = "1px solid var(--color-lightgrey)";

														if (allEqual(Object.values(player.tradePricing)))
															document.querySelector(`.${rarity.name}all`).value = value;
														else
															document.querySelector(`.${rarity.name}all`).value = "";

													}
												})
											]
										})
									)),
									new Component("td", {
										style: { borderBottom: `1px solid ${borderColor}`, borderLeft: "2px solid #ffffff33" },
										children: [
											new Component("input", {
												classList: [`${rarity.name}all`],
												style: { padding: "4px", borderRadius: "5px", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", width: "70px" },
												value: allEqual(Object.values(player.tradePricing[rarity.name])) ? player.tradePricing[rarity.name].cpu.toString() : "",
												onblur: (e) => {
													let value = e.target.value;
													if (value == "")
														return e.target.style.border = "1px solid var(--color-red)"
													if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100000)
														return e.target.style.border = "1px solid var(--color-red)"
													if (value.includes(".")) {
														const before = value.split(".")[0];
														const after = value.split(".")[1];
														if (after.length > 5)
															value = `${before}.${after.slice(0, 4)}${after.split("").find(e => e != "0")}`;
													}
													e.target.value = value;
													for (let type of ["cpu", "gpu", "psu", "firewall", "other"]) {
														player.tradePricing[rarity.name][type] = Number(value);
														document.querySelector(`.${rarity.name}${type}`).value = value;
													}
													save("prettier-tradePricing", player.tradePricing);
													e.target.style.border = "1px solid var(--color-lightgrey)";
												}
											})
										]
									})
								]
							})
						))
					})
				]
			})

			const itemManager = new Component("div", {
				classList: ["el", "svelte-176ijne"],
				style: { display: "flex", flexDirection: "column", gap: "10px" },
				children: [
					new Component("h4", {
						innerText: "Item Manager"
					}),
					new Component("div", {
						classList: ["item-manager-tabs"],
						style: { display: "flex", justifyContent: "center", position: "relative" },
						children: [
							new Component("div", {
								classList: ["tab-slider"],
								style: { position: "absolute", bottom: 0, left: 0, height: "2px", width: "50%", backgroundColor: "white", transitionDuration: "0.3s", transform: "translateX(0)" }
							}),
							new Component("span", {
								innerText: "Auto Loot",
								classList: ["item-manager-loot"],
								style: { padding: "7px", width: "100%", cursor: "pointer", borderBottom: "2px solid #ffffff33" },
								onmouseenter: (e) => e.target.style.backgroundColor = "#ffffff33",
								onmouseleave: (e) => e.target.style.backgroundColor = null,
								onclick: () => {
									const slider = document.querySelector(".tab-slider");
									if (slider.style.transform === "translateX(0)") return
									slider.style.transform = "translateX(0)";
									document.querySelector(".item-manager-content")?.remove();
									document.querySelector(".item-manager-body")?.append(autolootSetting.element);
								}
							}),
							new Component("span", {
								innerText: "Trade Pricing",
								classList: ["item-manager-pricing"],
								style: { padding: "7px", width: "100%", cursor: "pointer", borderBottom: "2px solid #ffffff33" },
								onmouseenter: (e) => e.target.style.backgroundColor = "#ffffff33",
								onmouseleave: (e) => e.target.style.backgroundColor = null,
								onclick: () => {
									const slider = document.querySelector(".tab-slider");
									if (slider.style.transform === "translateX(100%)") return
									slider.style.transform = "translateX(100%)";
									document.querySelector(".item-manager-content")?.remove();
									document.querySelector(".item-manager-body")?.append(tradePriceSetting.element);
								}
							})
						]
					}),
					new Component("div", {
						classList: ["item-manager-body"],
						children: [autolootSetting]
					})
				]
			})

			const halfColor = (hexColor) => {
				return "#" + hexColor.match(/[^#]{2}/g).map(e => ('00' + (Math.floor(parseInt(e, 16) / 2).toString(16))).slice(-2)).join("")
			}

			const iconColorSetting = new Component("div", {
				classList: ["el", "svelte-176ijne"],
				children: [
					new Component("h4", {
						innerText: "Desktop Icon Color",
					}),
					new Component("div", {
						style: { marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" },
						children: [
							new Component("input", {
								type: "color",
								classList: ["color-picker"],
								style: { height: "35px", width: "60px", border: "none", borderRadius: "2px", cursor: 'pointer', paddingInline: "2px" },
								value: player.configuration.desktopIconColor,
								onchange: async (e) => {
									document.querySelector(".color-input").value = e.target.value;
									document.querySelectorAll(".desktop-icon").forEach(image => image.style.backgroundColor = e.target.value);
									document.querySelectorAll(".desktop-title").forEach(title => title.style.color = e.target.value);
									player.configuration.desktopIconColor = e.target.value;
									localStorage.setItem("prettier-desktopIconColor", e.target.value);
								}
							}),
							new Component("input", {
								type: "text",
								classList: ["color-input"],
								placeholder: "Ex: #ffffff",
								value: player.configuration.desktopIconColor,
								style: { width: "150px", padding: "10px", borderRadius: "2px", textAlign: "left", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", zIndex: "60" },
								onblur: (e) => {
									if (!e.target.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
										return
									document.querySelector(".color-picker").value = e.target.value;
									document.querySelectorAll(".desktop-icon").forEach(image => image.style.backgroundColor = e.target.value);
									document.querySelectorAll(".desktop-title").forEach(title => title.style.color = e.target.value);
									player.configuration.desktopIconColor = e.target.value;
									localStorage.setItem("prettier-desktopIconColor", e.target.value);
								}
							}),
						]
					})
				]
			})
			const tabColorSetting = new Component("div", {
				classList: ["el", "svelte-176ijne"],
				style: { display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center" },
				children: [
					new Component("h4", {
						innerText: "Window Color",
					}),
					new Component("div", {
						style: { marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" },
						children: [
							new Component("input", {
								type: "color",
								classList: ["tab-color-picker"],
								style: { height: "35px", width: "60px", border: "none", borderRadius: "2px", cursor: 'pointer', paddingInline: "2px" },
								value: player.configuration.windowColors.windowTabLight,
								onchange: async (e) => {
									document.querySelector(".tab-color-input").value = e.target.value;
									player.configuration.windowColors = {
										windowBorder: e.target.value,
										windowTabLight: e.target.value,
										windowTabDark: halfColor(e.target.value),
									}
									save("prettier-windowColors", player.configuration.windowColors);
									loadStyle();
								}
							}),
							new Component("input", {
								type: "text",
								classList: ["tab-color-input"],
								placeholder: "Ex: #ffffff",
								value: player.configuration.windowColors.windowTabLight,
								style: { width: "150px", padding: "10px", borderRadius: "2px", textAlign: "left", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", zIndex: "60" },
								onblur: (e) => {
									if (!e.target.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/))
										return
									document.querySelector(".tab-color-picker").value = e.target.value;
									player.configuration.windowColors = {
										windowBorder: e.target.value,
										windowTabLight: e.target.value,
										windowTabDark: halfColor(e.target.value),
									}
									save("prettier-windowColors", player.configuration.windowColors);
									loadStyle();
								}
							}),
						]
					}),
					new Component("button", {
						innerText: "Reset",
						classList: ["red", "svelte-ec9kqa"],
						style: { height: "35px", width: "85px" },
						onclick: () => {
							player.configuration.windowColors = defaultColors;
							save("prettier-windowColors", player.configuration.windowColors);
							document.querySelector(".tab-color-picker").value = defaultColors.windowTabLight;
							document.querySelector(".tab-color-input").value = defaultColors.windowTabLight;
							loadStyle();
						}
					})
				]
			})

			const backgroundSetting = new Component("div", {
				classList: ["el", "svelte-176ijne"],
				children: [
					new Component("h4", {
						innerText: "Edit background image",
					}),
					new Component("div", {
						style: { marginTop: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "5px" },
						children: [
							new Component("button", {
								innerText: "Upload",
								classList: ["grey", "svelte-ec9kqa"],
								style: { height: "35px", width: "85px" },
								onclick: () => {
									const input = new Component("input", {
										type: "file",
										onchange: (e) => {
											const file = e.target.files[0];
											const fileReader = new FileReader();
											fileReader.onload = function () {
												currImage = `url(${fileReader.result})`;
												document.querySelector("body").style.backgroundSize = "cover";
												updateBackground();
											}
											fileReader.readAsDataURL(file)
										}
									})
									input.element.click();
								}
							}),
							new Component("div", {
								innerText: "or"
							}),
							new Component("input", {
								type: "text",
								placeholder: "Import from url",
								style: { width: "200px", padding: "10px", borderRadius: "2px", textAlign: "left", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", zIndex: "60" },
								onblur: (e) => {
									if (e.target.value === "") return;
									currImage = `url(${e.target.value})`;
									e.target.value = "";
									document.querySelector("body").style.backgroundSize = "cover";
									updateBackground();
								}
							}),
							new Component("button", {
								innerText: "Reset",
								classList: ["red", "svelte-ec9kqa"],
								style: { height: "35px", width: "85px" },
								onclick: () => {
									currImage = null;
									document.querySelector("body").style.backgroundSize = "auto";
									updateBackground();
								}
							})
						]
					})
				]
			})

			wrapper.insertBefore(backgroundSetting.element, wrapper.querySelector("div:nth-child(2)"));
			wrapper.insertBefore(tabColorSetting.element, wrapper.querySelector("div:nth-child(2)"));
			wrapper.insertBefore(iconColorSetting.element, wrapper.querySelector("div:nth-child(2)"));
			wrapper.insertBefore(itemManager.element, wrapper.querySelector("div:nth-child(1)"));
			// wrapper.insertBefore(autolootSetting.element, wrapper.querySelector("div:nth-child(2)"));
		}

		const targetWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/target.svg']")?.parentNode?.parentNode;
		ifTargetWindow: if (targetWindow) {
			// useful to check whether it's an actual player
			const reportButton = targetWindow.querySelector("#report");

			const elementWithUsername = targetWindow.querySelector(`#top-wrapper > div > div:nth-child(2) > div:nth-child(${reportButton ? 2 : 1}) > div`);
			const elementWithID = targetWindow.querySelector(`#top-wrapper > div > div:nth-child(2) > div:nth-child(${reportButton ? 4 : 3})`);
			const getTargetID = () => elementWithID.innerText.replace("ID: ", "");
			const getTargetUsername = () => elementWithUsername.innerText;

			elementWithID.onclick = () => {
				navigator.clipboard.writeText(getTargetID())
					.then(() => sendLog(`<img class="icon" src="icons/check.svg"/> Succesfully copied target ID to clipboard`))
					.catch(() => sendLog(`<img class="icon" src="icons/close.svg"/> Could not copy target ID to clipboard`))
			}

			// if (!evilStaffFeaturesActivated || !reportButton) break ifTargetWindow;

			const punishButton = new Component("div", {
				style: {
					position: "absolute",
					right: "26px",
					top: "2px",
					padding: "2px 4px",
					borderRadius: "2px",
				},
				id: "punish",
				children: [
					new Component("img", {
						classList: ["icon"],
						src: "https://www.svgrepo.com/download/67990/legal-hammer-symbol.svg",
						alt: "Punish",
						style: {
							filter: "invert(60%)"
						},
					}),
				],
				onclick: () => {
					for (const comment of targetWindow.querySelectorAll(".comment-wrapper")) comment.remove();
					const lines = targetWindow.querySelectorAll(".line");
					if (lines.length === 2) lines[1].remove();

					const buttonsContainer = targetWindow.querySelector(".section-content > div:nth-child(2)");
					buttonsContainer.querySelector("div > a > button > img[src='icons/hack.svg']")?.parentNode?.parentNode?.parentNode?.remove();
					buttonsContainer.querySelector("div > a > button > img[src='icons/trade.svg']")?.parentNode?.parentNode?.parentNode?.remove();
					targetWindow.querySelector(".window-content").style.height = "fit-content";

					const punishOptionsContainer = new Component("div", {
						style: {
							marginTop: "5px",
							display: "flex",
						},
					});
					buttonsContainer.appendChild(punishOptionsContainer.element);

					let selectedPunishCommand = "";
					const createPunishOption = (buttonText, punishCommand, color, iconSrc, iconAlt) => {
						const punishOption = new Component("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								flex: "1",
							},
							children: [new Component("a", {
								style: {
									width: "100%",
									display: "inline-block",
									margin: "0px",
									flex: "0 1 auto",
								},
								children: [new Component("button", {
									classList: [color, "svelte-ec9kqa"],
									style: {
										height: "auto",
										padding: "6px 0",
										fontFamily: "var(--font-family-1)",
										fontSize: "16px",
										boxShadow: "0 10px 15px var(--color-shadow)",
										//fontSize: "clamp(1rem, 1vw + 1rem, 2rem)",
									},
									innerHTML: `<img class="icon icon-in-text" src="${iconSrc}" alt="${iconAlt}">${buttonText}`,
									onclick: () => {
										selectedPunishCommand = punishCommand;
										updateOutputBox();
									},
								})],
							})],
						});
						punishOptionsContainer.element.appendChild(punishOption.element);
					}

					createPunishOption("Mute", "mute", "green", "emojis/zipper-mouth-face.svg", "Zipper Mouth Face");
					createPunishOption("Ban", "ban", "yellow", "https://www.svgrepo.com/download/67990/legal-hammer-symbol.svg", "Legal Hammer");
					createPunishOption("IP Ban", "ip-ban", "red", "emojis/pile-of-poo.svg", "Pile Of Poo");

					const durationFormats = {
						minutes: 1,
						hours: [60, "minutes"],
						days: [24, "hours"],
						weeks: [7, "days"],
						months: [30, "days"],
						quarters: [3, "months"],
						years: [365, "days"],
						decades: [10, "years"],
						centuries: [100, "years"],
						millenia: [1000, "years"],
					};
					function calculateDurationInMinutes(duration, durationFormat) {
						const durationFormatInfo = durationFormats[durationFormat];
						if (Array.isArray(durationFormatInfo)) return calculateDurationInMinutes(durationFormatInfo[0] * duration, durationFormatInfo[1]);
						return durationFormatInfo * duration;
					}

					const durationInput = new Component("input", {
						id: "punishDuration",
						type: "number",
						min: 1,
						value: 60,
						size: 5,
						style: { padding: "4px", borderRadius: "3px", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", width: "100%", outline: "none" },
						oninput: () => updateOutputBox(),
						onwheel: event => {
							event.preventDefault();
							const valueToAdd = event.deltaY < 0 ? 1 : -1;
							event.target.value = Number(event.target.value) + valueToAdd;
							updateOutputBox();
						}
					});
					const durationFormat = new Component("select", {
						id: "punishDurationFormat",
						children: Object.keys(durationFormats)
							.map(durationFormat => new Component("option", {
								value: durationFormat,
								innerText: capitalize(durationFormat),
							})),
						onchange: () => updateOutputBox(),
						style: { width: "100%" }
					});
					const durationContainer = new Component("div", {
						children: [durationInput, durationFormat],
						style: {
							marginTop: "5px",
							display: "flex",
						},
					});
					buttonsContainer.appendChild(durationContainer.element);

					const outputCommandBox = new Component("input", {
						id: "punishOutputCommand",
						style: { padding: "4px", borderRadius: "3px", backgroundColor: "var(--color-grey)", boxShadow: "0 10px 20px var(--color-shadow) inset", border: "1px solid var(--color-lightgrey)", fontFamily: "var(--font-family-2)", width: "100%", outline: "none" },
					});
					const sendOutputCommandButton = new Component("button", {
						innerText: "Send",
						classList: ["blue", "svelte-ec9kqa"],
						style: { padding: "6px 0", width: "51%" },
						onclick: () => sendChatMessage(outputCommandBox.element.value),
					});
					const outputContainer = new Component("div", {
						children: [outputCommandBox, sendOutputCommandButton],
						style: {
							marginTop: "5px",
							display: "flex",
							height: "36px"
						},
					});
					buttonsContainer.appendChild(outputContainer.element);

					function updateOutputBox() {
						const sendDmButton = buttonsContainer.querySelector("div > a > button > img[src='icons/friends.svg']");
						const usernameOrId = sendDmButton ? getTargetUsername() : getTargetID();
						const durationInMinutes = calculateDurationInMinutes(durationInput.element.value, durationFormat.element.value);
						outputCommandBox.element.value = `/${selectedPunishCommand} ${usernameOrId} ${durationInMinutes}`;
					}
				},
			});
			reportButton?.parentNode.appendChild(punishButton.element);
		}

		const hasBeenHackedWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/hack.svg']") && newWindow.addedNodes[0].querySelector(".window-title")?.innerText?.trim() == "Hacked"
		if (hasBeenHackedWindow)
			hasBeenHacked(newWindow.addedNodes[0]);

		const isLogWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/log.svg']")
		if (isLogWindow) {
			editWelcomeMessage();
			logObserver.observe(isLogWindow?.closest(".window.svelte-1hjm43z")?.querySelector(".window-content > #wrapper"), { attributes: false, childList: true, characterData: false, subtree: true });
		}


		const isHackingSomeoneWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']")?.parentNode?.parentNode
		if (isHackingSomeoneWindow) {
			const hacked = isHackingSomeoneWindow.querySelector(".username")?.innerText;
			if (hacked)
				player.currentlyHacking = hacked;
			const isHackingYou = player.hacksInProgress.find(e => e.hacker == hacked);
			if (!isHackingYou)
				return;
			counterHack(isHackingYou);
		}

		const hasHackedSomeoneWindow = newWindow.addedNodes[0].querySelectorAll(".window-content > div > .el").length == 4;
		if (hasHackedSomeoneWindow) {
			const hacked = newWindow.addedNodes[0].querySelector(".window-content > div > .el:nth-child(1) > .wrapper > .username")?.innerText
			const wasHackingYou = player.hacksInProgress.find(e => e.hacker === hacked);
			if (!wasHackingYou)
				return;
			wasHackingYou.hackLabel.innerText = "Successfully counter " + wasHackingYou.hackLabel.innerText.replace(/is hacking you \(\d+%\) on port \d+/, "")
			wasHackingYou.message.style.backgroundColor = "transparent";
			wasHackingYou.message.onclick = null;
			wasHackingYou.message.onmouseenter = null;
			wasHackingYou.message.onmouseleave = null;
			player.hacksInProgress.splice(player.hacksInProgress.indexOf(wasHackingYou), 1);
			wasHackingYou.progressBar.remove();
			wasHackingYou.counterLabel.remove();
			wasHackingYou.counterProgressBar.remove();
			wasHackingYou.counterProgressBarValue.remove();
			wasHackingYou.footer.remove();
			wasHackingYou.hackObserver.disconnect();
		}

		tryCheckStaffStatus(newWindow.addedNodes[0]);
	});

	const editWelcomeMessage = () => {
		const message = document.querySelector(".window-title > img[src='icons/log.svg']")?.parentNode.parentNode.querySelector("#wrapper > div");
		if (!message)
			return;
		message.innerHTML = message.innerHTML
			.replace("System started.<br>", "")
			.replace("s0urceOS 2023", "✨ Prettier s0urce ✨")
			.replace(">.", ">. <br><span style='font-size: 0.8rem; color: var(--color-lightgrey);'>Made with ❤️ by <span style='color: pink; text-shadow: 0 0 3px pink'>Xen0o2</span>.</span>");
		sendLog(`
			<div style="letter-spacing: 0.3px; font-family: var(--font-family-2)">
                <svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 960c-243.2 0-448-198.4-448-448 0-243.2 198.4-448 448-448 243.2 0 448 198.4 448 448s-204.8 448-448 448zM512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z" fill="" /><path d="M460.8 307.2c0 25.6 19.2 51.2 51.2 51.2s51.2-19.2 51.2-51.2S537.6 256 512 256s-51.2 19.2-51.2 51.2zM512 768c-19.2 0-32-12.8-32-32V448c0-19.2 12.8-32 32-32s32 12.8 32 32v288c0 19.2-12.8 32-32 32z" fill="" /></svg>
                Try out <span class="keytouch">shift</span> + <span class="keytouch">space</span>
            </div>
		`)

		sendLog(`
            <div style="color: #52e7f7; text-shadow: 0 0 2px #0fa, 0 0 3px #52e7f7; letter-spacing: 0.3px; font-weight: lighter">
                <img class="icon" src="https://www.svgrepo.com/show/523341/cpu.svg" style="filter: drop-shadow(50px 0px 100px #52e7f7) invert(96%) sepia(95%) saturate(7486%) hue-rotate(143deg) brightness(100%) contrast(94%);">
                Running d0t's Indexes (dTI)
            </div>
        `)
	}

	const filamentObserver = new MutationObserver(function (mutations) {
		if (mutations.length == 1 && !mutations[0].target.id && player.configuration.displayCustomFilament != "default")
			updateFilaments();
	})

	const formulas = {
		"common": "cf",
		"uncommon": "uf + (cf / 3)",
		"rare": "rf + (uf / 3) + (cf / 9)",
		"epic": "ef + (rf / 3) + (uf / 9) + (cf / 27)",
		"legendary": "lf + (ef / 5) + (rf / 15) + (uf / 45) + (cf / 135)",
		"mythic": "mf + (lf / 3) + (ef / 15) + (rf / 45) + (uf / 145) + (cf / 405)",
		"ethereal": "etf + (mf / 5) + (lf / 15) + (ef / 75) + (rf / 225) + (uf / 675) + (cf / 2025)",
	}

	const updateFilaments = () => {
		try {
			const filaments = document.querySelectorAll(".filament-el");
			const [cf, uf, rf, ef, lf, mf, etf] = Array.from(filaments).map(e => parseInt(e.innerText.trim()));
			const total = eval(formulas[player.configuration.displayCustomFilament]).toFixed(4);
			const element = document.querySelector("#customFilament");
			if (element)
				element.innerHTML = element.innerHTML.replace(/^\d+\.\d+/, total);
			return total;
		} catch (e) {
			console.log(e);
			prettierLoadFails("7");
		}

	}

	const editFilaments = () => {
		try {
			const filaments = document.querySelectorAll(".filament-el");
			const parent = filaments[0].parentNode;
			const container = parent.parentNode;
			container.style.rowGap = null;
			container.style.position = "relative";
			filaments.forEach(e => e.style.display = "none");

			const total = updateFilaments();
			const totalFilament = new Component("div", {
				id: "customFilament",
				innerText: total.toString(),
				classList: ["filament-el", "svelte-1azjldn"],
				style: { height: "100%", width: "auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", fontSize: "1.5rem", paddingLeft: "10px" },
				children: [
					new Component("img", {
						src: `icons/filament-${player.configuration.displayCustomFilament}.svg`,
						classList: ["icon", "icon-in-text", "totalFilamentIcon"],
						style: { transform: "translateY(-1px)" }
					})
				]
			})

			const select = new Component("select", {
				style: { position: "absolute", height: "100%", width: "100%", opacity: 0 },
				children: ["Default", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic", "Ethereal"].map(rarity => (
					new Component("option", {
						value: rarity.toLowerCase(),
						innerText: rarity,
						selected: player.configuration.displayCustomFilament === rarity.toLowerCase(),
					})
				)),
				onchange: (e) => {
					player.configuration.displayCustomFilament = e.target.value;
					if (e.target.value === "default") {
						totalFilament.element.style.display = "none";
						filaments.forEach(e => e.style.display = "block");
					} else {
						totalFilament.element.style.display = "flex";
						filaments.forEach(e => e.style.display = "none");
						document.querySelector(".totalFilamentIcon").src = `icons/filament-${e.target.value}.svg`
						updateFilaments();
					}
				}
			})

			container.append(totalFilament.element);
			container.append(select.element);

			filamentObserver.disconnect();
			filamentObserver.observe(container, { subtree: true, characterData: true, childList: true });
		} catch (e) {
			console.log(e);
			prettierLoadFails("6")
		}
	}

	const loadingScreen = (action, text) => {
		switch (action) {
			case "create":
				const display = new Component("div", {
					id: "display-delete",
					style: { position: "absolute", zIndex: "100", top: "0", height: "100vh", width: "100vw", backgroundColor: "black", opacity: "0.8", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
					children: [
						new Component("span", {
							innerText: text,
							style: { color: "pink", textShadow: "0 0 3px pink", fontFamily: "var(--font-family-2)", fontWeight: "500", fontSize: "3rem", opacity: "1" }
						}),
						new Component("span", {
							innerText: "Made with ❤️ by Xen0o2",
							style: { color: "var(--color-lightgrey)", fontFamily: "var(--font-family-2)", fontWeight: "500", fontSize: "2rem", marginTop: "20px" }
						})
					]
				})

				document.querySelector("html").append(display.element);
				break;
			case "delete":
				document.getElementById("display-delete")?.remove();
				break;
		}
	}

	const createObserver = () => {
		const logWindow = document.querySelector(".window-title > img[src='icons/log.svg']")?.closest(".window.svelte-1hjm43z")?.querySelector(".window-content > #wrapper");
		if (logWindow)
			logObserver.observe(logWindow, { attributes: false, childList: true, characterData: false, subtree: true });
		windowOpenObserver.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
		windowCloseObserver.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
		itemHoverObserver.observe(document.querySelector("main"), { attributes: false, childList: true, characterData: false, subtree: true });
	}

	const updateThemeStyle = () => {
		const styleElement = document.getElementById('customStyles');
		const css = themes[localStorage.getItem("prettier-currentTheme") || Object.keys(themes)[0]];
		if (styleElement) {
			styleElement.textContent = css;
		} else {
			const newStyleElement = document.createElement('style');
			newStyleElement.id = 'customStyles';
			newStyleElement.textContent = css;
			document.head.appendChild(newStyleElement);
		}
	}

	const save = (key, value, isJson = true) => localStorage.setItem(key, isJson ? JSON.stringify(value) : value)

	const loadLocalStorage = () => {
		if (localStorage.getItem("prettier-backgroundImage")) {
			document.querySelector("body").style.backgroundImage = localStorage.getItem("prettier-backgroundImage");
			document.querySelector("body").style.backgroundSize = "cover";
		} else
			document.querySelector("body").style.backgroundSize = "auto";
		document.querySelector("body").style.backgroundAttachment = "fixed";
		document.querySelector("body").style.backgroundPosition = "center";

		if (!localStorage.getItem("prettier-autoloot"))
			save("prettier-autoloot", player.autoloot)
		if (!localStorage.getItem("prettier-windowColors"))
			save("prettier-windowColors", player.configuration.windowColors)
		if (!localStorage.getItem("prettier-currentTheme"))
			localStorage.setItem("prettier-currentTheme", Object.keys(themes)[0])
	}

	const loadScripts = async () => {
		const scripts = [
			"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/languages/python.min.js",
		];
		for (let script of scripts) {
			await new Promise((resolve) => {
				fetch(script)
					.then(response => response.text())
					.then(scriptText => {
						const scriptElement = document.createElement('script');
						scriptElement.textContent = scriptText;
						document.head.appendChild(scriptElement);
						resolve();
					})
					.finally(() => resolve());
			})
		}

		const styleSheet = document.createElement('style');
		styleSheet.textContent = `
            #punish:hover {
                cursor: pointer;
                background-color: var(--color-grey);
            }
        `;
		document.head.appendChild(styleSheet);
	}

	const moveItem = async (item, slot) => {
		item.dispatchEvent(new MouseEvent("mousedown"));
		item.parentNode.dispatchEvent(new MouseEvent("dragstart"));
		slot.parentNode.dispatchEvent(new MouseEvent("drop"));
		await sleep(50);
	}

	const shredFromContextMenu = async () => {
		const rarities = player.selectedItems.map(item => raritiesVariables[item.style.background] || raritiesVariables[item.style.background + ")"]);
		if (
			rarities.some(rarity => ["legendary", "mythic", "ethereal"].includes(rarity)) &&
			!confirm(`You're about to shred a Legendary, Mythic or Ethereal item ! Are you sure about that ?`)
		) return;
		const filamentWindow = await windowManager.openWindow("filament", true);
		if (!filamentWindow) return;
		for (let index in player.selectedItems) {
			const item = player.selectedItems[index];
			const background = item.style.background;
			const rarity = raritiesVariables[background] || raritiesVariables[background + ")"];
			const slot = filamentWindow.querySelectorAll(".item-slot")[index % 5];
			const color = lootRarity.find(e => e.name === rarity)?.color;
			await moveItem(item, slot);
			await sleep(50);
			sendLog(`
                <img class="icon" src="icons/check.svg"/>
                Successfully shredded ${["uncommon", "epic", "ethereal"].includes(rarity) ? "an" : "a"}
                <span style='background: ${color}; border-radius: 5px; padding: 2px 5px 2px 5px;'>${rarity}</span>
                item
            `);
			if ((Number(index) + 1) % 5 == 0) {
				filamentWindow.querySelector("button.green")?.click();
				await sleep(300);
			}
		}
		await sleep(200);
		filamentWindow.querySelector("button.green")?.click();
		windowManager.closeWindow("filament", true);
	}

	const sellFromContextMenu = async () => {
		const rarities = player.selectedItems.map(item => raritiesVariables[item.style.background] || raritiesVariables[item.style.background + ")"]);
		if (
			rarities.some(rarity => ["legendary", "mythic", "ethereal"].includes(rarity)) &&
			!confirm(`You're about to sell a Legendary, Mythic or Ethereal item ! Are you sure about that ?`)
		) return;
		const itemSellerWindow = await windowManager.openWindow("item_seller", true);
		if (!itemSellerWindow) return;
		for (let item of player.selectedItems) {
			const slot = itemSellerWindow.querySelector(".item-slot");
			await moveItem(item, slot);
			await sleep(100);
			itemSellerWindow.querySelector("button.green")?.click();
			await sleep(400);
		}
		windowManager.closeWindow("item_seller", true);
	}

	const unequipItem = async (item) => {
		await windowManager.openWindow("inventory", true);
		item.parentNode.dispatchEvent(new MouseEvent("dblclick"));
		await sleep(100);
		windowManager.closeWindow("inventory", true);
	}

	const equipBasicItem = async (item) => {
		await windowManager.openWindow("computer", true);
		item.parentNode.dispatchEvent(new MouseEvent("dblclick"));
		await sleep(100);
		windowManager.closeWindow("computer", true);
	}

	const manageRightClickOnItem = (item, pointer) => {
		const src = item.closest(".window").querySelector(".window-title > img")?.src
		const windowName = src?.split("/")[src.split("/").length - 1].slice(0, -4);
		if (!windowName) return;

		if (!player.selectedItems.includes(item)) {
			removeContextMenu();
			player.selectedItems = [item]
		}

		item.parentNode.parentNode.classList.add("item-selected");
		item.parentNode.parentNode.style.outline = "3px solid var(--color-terminal)";
		const popup = new Popup(pointer);
		const type = (item.querySelector("img")?.src?.match(/[^\/]+\.webp/) || [])[0]?.slice(0, -7);
		if (player.selectedItems.length > 1)
			popup.setFooter(`${player.selectedItems.length} items selected`)
		if (["cpu", "gpu", "psu"].includes(type) && player.selectedItems.length == 1) {
			if (windowName === "computer")
				popup.addAction("Unequip", () => unequipItem(item), { selectionLimit: 1 });
			else
				popup.addAction("Equip", () => equipBasicItem(item), { selectionLimit: 1 });
		}
		const tradeWindow = document.querySelector(".window:has(.window-title > img[src='icons/trade.svg']");
		if (tradeWindow) {
			const alreadyInTrade = tradeWindow.querySelector(".offer-wrapper")?.querySelectorAll(".item").length;
			popup.addAction("Trade", async () => {
				const slots = tradeWindow.querySelector(".offer-wrapper").querySelectorAll(".item-slot:not(.item-slot-hasitem");
				for (let index in player.selectedItems) {
					const item = player.selectedItems[index];
					const slot = slots[index];
					moveItem(item, slot);
					await sleep(1000);
				}
			}, { selectionLimit: 6 - alreadyInTrade });
		}
		popup
			.addAction("Shred", shredFromContextMenu, { isDangerous: true })
			.addAction("Sell", sellFromContextMenu, { isDangerous: true })
			.create();
	}

	const manageRightClickOnDesktop = (pointer) => {
		new Popup(pointer)
			.addAction("Edit background", async () => {
				document.querySelectorAll(".topbar-clickable")[1].click()
				await sleep(150);
				const settings = document.querySelector(".window-title > img[src='icons/settings.svg']").parentNode.parentNode;
				settings.querySelector(".window-content > div").scrollTop = 300
			})
			.create();
	}

	const manageRightClickOnPlayer = (player, pointer) => {
		new Popup(pointer)
			.addAction("Send message", async () => {
				player.click();
				await sleep(100);
				document.querySelector("button.blue")?.click();
				document.querySelector(".window-title > img[src='icons/target.svg']")?.parentNode.querySelector(".window-close")?.click();
			})
			.addAction("Trade", async () => {
				player.click();
				await sleep(100);
				document.querySelector("button.yellow")?.click();
				document.querySelector(".window-title > img[src='icons/target.svg']")?.parentNode.querySelector(".window-close")?.click();
			})
			.create();
	}

	const manageRightClick = (target, pointer) => {
		if (document.querySelector(".context-menu"))
			removeContextMenu();
		const windowClicked = target.closest(".window")
		if (target.parentNode
			&& target.parentNode.classList.contains("item")
			&& ["Computer", "Inventory"].includes(windowClicked?.querySelector(".window-title > img")?.alt))
			manageRightClickOnItem(target.parentNode, pointer);
		if (target.id == "desktop-container" || target.classList.contains("empty"))
			manageRightClickOnDesktop(pointer);
		if (target.classList.contains("message-name"))
			manageRightClickOnPlayer(target, pointer);
	}

	const manageItemSelection = (item) => {
		if (player.input.isShiftDown) {
			player.selectedItems.push(item);
			document.querySelectorAll(`.context-menu-option-limit-${player.selectedItems.length + 1}`).forEach(e => e.remove());

			if (document.querySelector(".context-menu")) {
				document.querySelector(".context-menu-footer").innerText = `${player.selectedItems.length} items selected`;
				document.querySelector(".context-menu-footer").style.display = "flex";
			}
		} else player.selectedItems = [item]
		item.parentNode.parentNode.classList.add("item-selected");
		item.parentNode.parentNode.style.outline = "3px solid var(--color-terminal)";
		player.selectedItems.sort((b, a) => {
			return ([...a.parentNode?.parentNode?.parentNode?.parentNode.children].indexOf(a.parentNode?.parentNode?.parentNode) || 0) -
				([...b.parentNode?.parentNode?.parentNode?.parentNode.children].indexOf(b.parentNode?.parentNode?.parentNode) || 0)
		})
	}

	const sumPx = (a, b) => {
		return Number((a.match(/\d+px/) || [""])[0].slice(0, -2)) + Number((b.match(/\d+px/) || [""])[0].slice(0, -2));
	}

	const pxToInt = (a) => {
		return (a.match(/\d+/) || [])[0];
	}

	const findClosestValue = (arr, target) => {
		return arr.reduce((closest, num) =>
			Math.abs(num - target) < Math.abs(closest - target) ? num : closest
		);
	}

	const manageWindowDragged = () => {
		const windowDragged = document.querySelector(".window-selected");
		const content = windowDragged?.querySelector(".window-content");
		if (!windowDragged || !content) return;

		if (windowDragged.querySelector(".window-title > img[src='icons/settings.svg']"))
			windowDragged.querySelector(".window-content").style.width = "600px";

		const getPxValue = (style) => Number(style.match(/\d+/)[0]);
		const top = getPxValue(windowDragged.style.top);
		const bottom = sumPx(windowDragged.style.top, content.style.height) + 41;
		const left = getPxValue(windowDragged.style.left);
		const right = sumPx(windowDragged.style.left, content.style.width) + 2;

		const allPositions = Array.from(document.querySelectorAll(".window"))
			.filter(e => e !== windowDragged)
			.map(e => {
				const content = e.querySelector(".window-content");
				return {
					name: e.querySelector(".window-title").textContent,
					top: getPxValue(e.style.top),
					bottom: sumPx(e.style.top, content.style.height) + 42,
					left: getPxValue(e.style.left),
					right: sumPx(e.style.left, content.style.width) + 1,
				};
			});

		const sensitivity = 10;
		const findMatching = (pos, key1, key2) =>
			allPositions.find(e =>
				(pos >= e[key1] - sensitivity && pos <= e[key1] + sensitivity) ||
				(pos >= e[key2] - sensitivity && pos <= e[key2] + sensitivity)
			);

		const topMatching = findMatching(top, 'top', 'bottom');
		const bottomMatching = findMatching(bottom, 'top', 'bottom');
		const rightMatching = findMatching(right, 'right', 'left');
		const leftMatching = findMatching(left, 'right', 'left');

		const createLine = (style) => {
			const line = new Component("div", {
				classList: ["sticky-line"],
				style: {
					position: "absolute", backgroundColor: "var(--color-terminal)", zIndex: 1000, ...style
				}
			});
			document.body.append(line.element);
		};

		document.querySelectorAll(".sticky-line").forEach(e => e.remove());

		if (topMatching) {
			const value = findClosestValue([topMatching.top, topMatching.bottom], top);
			windowDragged.style.top = `${value}px`;
			createLine({ top: `${value}px`, height: "2px", width: "100vw" });
		}
		if (bottomMatching) {
			const value = findClosestValue([bottomMatching.top, bottomMatching.bottom], bottom);
			windowDragged.style.top = `${value - pxToInt(content.style.height) - 42}px`;
			createLine({ top: `${value}px`, height: "2px", width: "100vw" });
		}
		if (rightMatching) {
			const value = findClosestValue([rightMatching.right, rightMatching.left], right);
			windowDragged.style.left = `${value - pxToInt(content.style.width) - 2}px`;
			createLine({ top: "0px", height: "100vh", width: "2px", left: `${value}px` });
		}
		if (leftMatching) {
			const value = findClosestValue([leftMatching.right, leftMatching.left], left);
			windowDragged.style.left = `${value}px`;
			createLine({ top: "0px", height: "100vh", width: "2px", left: `${value}px` });
		}
	};

	const loadUserInputManager = () => {
		document.body.addEventListener("mousedown", (e) => {
			if (e.buttons != 1) return;
			const windowClicked = e.target.closest(".window");
			if ((e.target.classList.contains("window-close") || e.target.parentNode?.classList.contains("window-close")) && windowClicked.querySelector(".window-title").textContent.trim() == "Settings")
				windowClicked.querySelector(".window-close")?.click();
			if (!e.target.classList.contains("context-menu") && !player.input.isShiftDown)
				removeContextMenu();
			if (e.target.parentNode
				&& e.target.parentNode.classList.contains("item")
				&& ["Computer", "Inventory", "Trade"].includes(windowClicked?.querySelector(".window-title > img")?.alt)
			)
				manageItemSelection(e.target.parentNode);
			if (e.target.classList.contains("window-title"))
				window.addEventListener("mousemove", manageWindowDragged);
		})
		document.body.addEventListener("mouseup", () => {
			document.querySelectorAll(".sticky-line").forEach(e => e.remove());
			window.removeEventListener("mousemove", manageWindowDragged);
		})
		document.body.oncontextmenu = (e) => {
			e.preventDefault();
			manageRightClick(e.target, { clientX: e.clientX, clientY: e.clientY });
		}
		document.body.onkeydown = (e) => {
			if (e.key === "Shift")
				player.input.isShiftDown = true;
			if (e.key === "Escape")
				promptManager.cancel();
			if (e.key === "Tab" && document.querySelector(".command-input"))
				e.preventDefault(), promptManager.autoComplete();
			if (e.key === " " && player.input.isShiftDown)
				promptManager.createPrompt();
			if (e.key === "Enter" && document.querySelector(".command-input"))
				promptManager.execute();
		}
		document.body.onkeyup = (e) => {
			if (e.key === "Shift")
				player.input.isShiftDown = false;
		}
	}

	const editDesktopIcons = async () => {
		if (localStorage.getItem("prettier-desktopIconSize")) {
			const settings = await windowManager.openWindow("settings", true);
			if (!settings) return;
			const slider = settings.querySelector(".slider[min='70']");
			if (slider) {
				slider.value = Number(localStorage.getItem("prettier-desktopIconSize"));
				slider.dispatchEvent(new Event("input"));
			}
			windowManager.closeWindow("settings");
		}
		const wrappers = document.getElementById("desktop-container").querySelectorAll(".wrapper");
		for (let wrapper of wrappers) {
			const container = wrapper.querySelector("div");
			const image = wrapper.querySelector("img");
			const title = wrapper.querySelector("div.svelte-1ye0fc6");
			const mask = new Component("div", {
				classList: ["desktop-icon"],
				style: {
					maskSize: "100%", maskRepeat: "100%", maskPosition: "center", height: "100%", aspectRatio: "1/1",
					maskImage: `url(${image.src})`, backgroundColor: player.configuration.desktopIconColor, marginLeft: "35%"
				}
			})
			title.classList.add("desktop-title", image.alt.replace(/ /g, "-"));
			title.style.color = player.configuration.desktopIconColor;
			image?.remove();
			container.append(mask.element);
		}

		if (player.configuration.keyboardNavigation) {
			// document.querySelectorAll("#desktop-container > div").forEach(e => e.style.display = "none");
		}
	}

	const loadStyle = () => {
		const css = `
			.keytouch {background-color: #333; color: #eee; border-radius: 3px; border: 1px solid #b4b4b4; box-shadow: 0 1px 1px rgba(255,255,255, 0.7), 0 2px 0 0 rgba(0, 0, 0, 0.2) inset; padding: 2px 4px;}
            .over {transform: scale(1.1, 1.1); border: 2px solid var(--color-terminal);}
            .insert-indicator {height: 3px;background-color: var(--color-terminal);width: 320px;margin-left:15px;border-radius:10px;}
            ${player.configuration.windowColors.windowTabDark != defaultColors.windowTabDark && `
                .svelte-pu3iit {background: ${player.configuration.windowColors.windowTabDark} !important;}
                .svelte-81yxrq {background: ${player.configuration.windowColors.windowTabDark} !important;}
                .svelte-16rukbq {background: ${player.configuration.windowColors.windowTabDark} !important;}
                .svelte-1ff1jo {background: ${player.configuration.windowColors.windowTabDark} !important;}
                .svelte-1p12gtw:not(.npc):not(.timer) {background-color: unset !important;}
                .section.svelte-1ti1fiv {background: linear-gradient(188deg, ${player.configuration.windowColors.windowTabLight} 60%, ${player.configuration.windowColors.windowTabDark} 100%) !important;}
                .window:not(:has(.window-title > img[src='icons/terminal.svg'])) {
                    border-color: ${player.configuration.windowColors.windowTabLight} !important;
                    background: linear-gradient(200deg, #1f1e23 0%, ${player.configuration.windowColors.windowTabLight} 100%) !important;
                }
                .window-title:not(:has(img[src='icons/terminal.svg'])) {border-top-left-radius: 2px !important; border-top-right-radius: 2px !important; background: linear-gradient(200deg, ${player.configuration.windowColors.windowTabLight} 0%, ${player.configuration.windowColors.windowTabDark} 100%) !important;}
                `
			}
        `;
		const already = document.getElementById("globalCustomStyles")
		if (already)
			already.textContent = css;
		else {
			const newStyleElement = document.createElement('style');
			newStyleElement.id = 'globalCustomStyles';
			newStyleElement.textContent = css;
			document.head.appendChild(newStyleElement);
		}
	}

	const openCommand = new Command({
		name: "open",
		args: [
			{
				name: "windowName",
				options: windowManager.getWindowsNames(),
				required: true,
			}
		],
		run: (args) => {
			const windowName = args.join(" ").toLowerCase();
			if (!windowManager.isValidWindow(windowName)) return sendErrorLog("Unknown window name !");

			windowManager.openWindow(windowName);
		}
	})

	const closeCommand = new Command({
		name: "close",
		args: [
			{
				name: "windowName",
				options: windowManager.getWindowsNames(),
				required: true,
			}
		],
		run: (args) => {
			const windowName = args.join(" ").toLowerCase();
			if (!windowManager.isValidWindow(windowName)) return sendErrorLog("Unknown window name !");

			windowManager.closeWindow(windowName);
		}
	})

	const hackCommand = new Command({
		name: "hack",
		args: [
			{
				name: "target",
				options: [
					...targets.npcs,
					...targets.players,
					...targets.anons,
				],
				required: true,
			},
			{
				name: "port",
				options: ["21", "22", "23"],
				required: true
			}
		],
		requiredWindows: ["target_list"],
		run: async (args) => {
			const username = args[0].replace(/_/g, " ");
			const port = args[1];

			const element = Array.from(document.querySelectorAll(".username")).filter(e => e.textContent.trim() === username);
			if (!element.length) return sendErrorLog(`User ${username} not found!`)
			const withoutCooldown = element.find(e => !e.parentNode.querySelector(".timer"));
			if (!withoutCooldown) return sendErrorLog(`${username} is under cooldown`);

			withoutCooldown.click();
			await sleep(200);
			const targetWindow = document.querySelector(".window-title > img[src='icons/target.svg']").parentNode.parentNode;
			const hackButton = targetWindow?.querySelector("button.red");
			if (!targetWindow || !hackButton) return;
			hackButton.click();
			await sleep(200);
			const ports = targetWindow.querySelectorAll("button.red");
			const portButton = ports[Number(port) - 21];
			if (!portButton) return;
			portButton.click();
		}
	})

	const refreshCommand = new Command({
		name: "refresh",
		args: [],
		requiredWindows: ["target_list"],
		run: () => {
			const targetList = windowManager.getWindow("target_list");
			const button = targetList.querySelector("button.green");
			if (button.classList.contains("cantClick")) return sendErrorLog("Refresh is under cooldown");
			button?.click();
		}
	})

	const counterCommand = new Command({
		name: "counter",
		args: [
			{
				name: "hacker",
				options: player.hacksInProgress.map(e => e.hacker),
				required: true,
			}
		],
		requiredWindows: [],
		run: async (args) => {
			const hacker = args[0];
			const isHackingYou = player.hacksInProgress.find(e => e.hacker == hacker);
			if (!isHackingYou) return sendErrorLog("This player is not hacking you");
			isHackingYou.counterButton.click();
			counterHack(isHackingYou);
		}
	})

	const chatCommand = new Command({
		name: "chat",
		args: [],
		requiredWindows: [],
		run: async () => {
			const chat = await windowManager.openWindow("chat");
			if (!chat) return sendErrorLog("Something went wrong, please try again!");
			const input = chat.querySelector("div[contenteditable]");
			input?.focus();
		}
	})

	const shredCommand = new Command({
		name: "shred",
		args: [
			{
				name: "index",
				options: Array.from(windowManager.getWindow("inventory")?.querySelectorAll(".item") || []).map((_, index) => (index * 1 + 1).toString()),
				required: true
			}
		],
		requiredWindows: ["inventory"],
		run: async (args) => {
			const index = args[0];
			const item = windowManager.getWindow("inventory").querySelectorAll(".item")[index * 1 - 1];
			const rarity = raritiesVariables[item.style.background] || raritiesVariables[item.style.background + ")"];
			if (
				["legendary", "mythic", "ethereal"].includes(rarity) &&
				!confirm(`You're about to shred ${["uncommon", "epic", "ethereal"].includes(rarity) ? "an" : "a"} ${rarity} item ! Are you sure about that ?`)
			) return;
			const filamentWindow = await windowManager.openWindow("filament", true);
			if (!filamentWindow) return;

			const slot = filamentWindow.querySelectorAll(".item-slot")[0];
			const color = lootRarity.find(e => e.name === rarity)?.color;
			await moveItem(item, slot);
			await sleep(50);
			sendLog(`
				<img class="icon" src="icons/check.svg"/>
				Successfully shredded ${["uncommon", "epic", "ethereal"].includes(rarity) ? "an" : "a"}
				<span style='background: ${color}; border-radius: 5px; padding: 2px 5px 2px 5px;'>${rarity}</span>
				item
			`);
			await sleep(200);
			filamentWindow.querySelector("button.green")?.click();
			windowManager.closeWindow("filament", true);
		}
	})
	const agentsCommand = new Command({
		name: "agents",
		args: [
			{
				name: "action",
				options: ["grab", "shred"],
				required: true
			}
		],
		requiredWindows: ["agents"],
		run: async (args) => {
			const action = args[0];
			const agents = windowManager.getWindow("agents");
			const buttons = Array.from(agents.querySelectorAll("button.green"));
			if (action === "shred") {
				const shredButton = buttons.find(e => e.textContent.toLowerCase().includes("shred"));
				shredButton?.click();
			}
			const grabButtons = buttons.filter(e => e.textContent.toLowerCase().includes("grab"));
			grabButtons.forEach(button => button.click());
		}
	})

	const commands = [openCommand, closeCommand, hackCommand, refreshCommand, counterCommand, chatCommand, shredCommand, agentsCommand];
	promptManager.setPossibleWords(commands.map(e => e.name));

	const loadTargets = async () => {
		await windowManager.openWindow("target_list", true);
		targets.npcs = Array.from(document.querySelectorAll(".npc, .npc-premium")).map(e => e.querySelector(".timer") ? null : e.querySelector(".username").textContent.trim().replace(/ /g, "_")).filter(e => e !== null)
		targets.players = Array.from(document.querySelectorAll("#list .wrapper:not(.npc):not(.npc-premium) .username:not(.username-noauth)")).slice(0, -1).map(e => e.textContent.trim())
		targets.anons = Array.from(new Set(Array.from(document.querySelectorAll(".username-noauth")).map(e => e.textContent.trim())))
		windowManager.closeWindow("target_list", true);
	}

	(async () => {
		while (document.querySelector("#login-top") || window.location.href !== "https://s0urce.io/")
			await sleep(500);
		loadingScreen("create", "Prettier s0urce");
		editFilaments();
		customTerminal();
		createObserver();
		editProgressBar();
		loadLocalStorage();
		updateThemeStyle();
		loadStyle();
		await loadScripts();
		editWelcomeMessage();
		await editDesktopIcons();
		tryCheckStaffStatus(document.querySelector("main"));
		loadUserInputManager();
		await loadTargets();
 		editInventoryWindow();
		await sleep(1000);
		loadingScreen("delete");
	})();
})();
