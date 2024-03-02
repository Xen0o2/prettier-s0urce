// ==UserScript==
// @name         prettier-s0urce
// @namespace    http://tampermonkey.net/
// @version      2024-03-02
// @description  Get a prettier s0urce.io environment!
// @author       Xen0o2
// @match        https://s0urce.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=s0urce.io
// @grant        none
// @downloadURL https://raw.githubusercontent.com/Xen0o2/prettier-s0urce/main/prettier-s0urce.user.js
// @updateURL   https://raw.githubusercontent.com/Xen0o2/prettier-s0urce/main/prettier-s0urce.user.js
// ==/UserScript==

(function() {
    'use strict';
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const hacksInProgress = [];
    let currentlyHacking = null;
    
    const logIcons = {
        VALID: "icons/check.svg",
        HACK: "icons/hack-red.svg"
    }
    
    const manageMessagesToDelete = (message) => {
        const deleteSample = [
            "Hack successful",
            "You've reached",
            "has received"
        ]
        if (deleteSample.some(sample => message.innerText.includes(sample)))
            message.remove();
    }
    
    const manageLevelProgressBar = (message) => {
        const currentXP = message.innerText.match(/\d{0,5}\//)[0].slice(0, -1);
        const XPToReach = message.innerText.match(/\/\d{3,5}/)[0].slice(1);
        const LevelToReach = message.innerText.match(/\d+\./)[0];
        document.querySelector("#progressBarValue").style.width = currentXP / XPToReach * 100 + "%";
        document.querySelector("#progressBarLabel").innerText = "Level " + (parseInt(LevelToReach) - 1) + " - " + currentXP + " / " + XPToReach + " - " + (currentXP / XPToReach * 100).toFixed(2) + "%";
        message.remove();
    }
    
    const counterHack = (hackInProgress) => {
        hackInProgress.footer?.remove();
        const terminalProgressBar = document.querySelector(".target-bar-progress");
        if (!terminalProgressBar)
            return;
        const counterLabel = document.createElement("span");
        const counterProgressBar = document.createElement("div");
        const counterProgressBarValue = document.createElement("div");
    
        counterLabel.innerText = "Counter hack progression (0%)";
    
        counterProgressBar.style.width = "100%";
        counterProgressBar.style.height = "15px";
        counterProgressBar.style.background = "var(--color-grey)";
        counterProgressBar.style.borderRadius = "4px";
        counterProgressBar.style.margin = "5px 0 5px 0";
        counterProgressBar.style.display = "flex";
        counterProgressBar.style.justifyContent = "space-between";
        counterProgressBar.style.alignItems = "center";
        
        counterProgressBarValue.style.width = terminalProgressBar.style.width;
        counterProgressBarValue.style.height = "15px";
        counterProgressBarValue.style.background = "var(--color-red)";
        counterProgressBarValue.style.borderRadius = "4px";
        counterProgressBarValue.style.transitionDuration = "0.3s";
    
        hackInProgress.message.append(counterLabel);
        hackInProgress.message.append(counterProgressBar);
        counterProgressBar.append(counterProgressBarValue);
    
        hackInProgress.counterLabel = counterLabel;
        hackInProgress.counterProgressBar = counterProgressBar;
        hackInProgress.counterProgressBarValue = counterProgressBarValue;
    
        const hackObserver = new MutationObserver(function(mutations) {
            const value = parseInt(mutations[0].target.style.width.slice(0, -1));
            counterLabel.innerText = counterLabel.innerText.replace(/\d{1,3}%/, value + "%");
            counterProgressBarValue.style.width = value + "%";
        });
        hackObserver.observe(terminalProgressBar, { attributes: true, attributeFilter: ["style"] });
        hackInProgress.hackObserver = hackObserver;
    }
    
    const manageBeingHacked = (message) => {
        const hacker = message.querySelectorAll(".tag")[0]?.innerText || message.innerText.match(/by .+ on/)[0].slice(3, -3);
        const already = hacksInProgress.find(e => e.hacker == hacker);
        const progression = parseInt((message.innerText.match(/\d{1,3}(\.\d{1,2})?%/) || ["100%"])[0].slice(0, -1));
        if (already) {
            if (progression == 100) {
                already.hackLabel.innerText = already.hackLabel.innerText.replace(/is hacking you \(\d+%\)/, "has hacked you")
                already.message.style.backgroundColor = "transparent";
                already.message.onclick = null;
                already.message.onmouseenter = null;
                already.message.onmouseleave = null;
                hacksInProgress.splice(hacksInProgress.indexOf(already), 1);
                already.progressBar.remove();
                already.counterLabel?.remove();
                already.counterProgressBar?.remove();
                already.footer.remove();
            } else {
                already.hackLabel.innerText = already.hackLabel.innerText.replace(/\d+%/, progression + "%");
                already.progressBarValue.style.width = progression + "%";
            }
    
            message.remove();
        } else {
            const redButtons = message.querySelectorAll(".tag");
            redButtons[0].remove();
            message.innerText = ""
    
            const iconElement = document.createElement("img");
            const hackLabel = document.createElement("span");
            const progressBar = document.createElement("div");
            const progressBarValue = document.createElement("div");
            const separator = document.createElement("div");
            
            iconElement.classList.add("icon")
            iconElement.style.marginRight = "9px"
            iconElement.src = logIcons.HACK
            
            hackLabel.innerText = hacker + " is hacking you (" + progression + "%)"
            
            progressBar.style.width = "100%";
            progressBar.style.height = "15px";
            progressBar.style.background = "var(--color-grey)";
            progressBar.style.borderRadius = "4px";
            progressBar.style.margin = "5px 0 5px 0";
            progressBar.style.display = "flex";
            progressBar.style.justifyContent = "space-between";
            progressBar.style.alignItems = "center";
            
            progressBarValue.style.width = progression + "%";
            progressBarValue.style.height = "15px";
            progressBarValue.style.background = "var(--color-red)";
            progressBarValue.style.borderRadius = "4px";
            progressBarValue.style.transitionDuration = "0.3s";
            
            
            separator.classList.add("line", "svelte-182ewru")
            separator.style.margin = "10px 0px";
            
            message.append(iconElement);
            message.append(hackLabel);
            message.append(progressBar);
            progressBar.append(progressBarValue);
    
            const alreadyCounterHacking = hacker == currentlyHacking;
            if (alreadyCounterHacking) {
                hacksInProgress.push({
                    hacker: hacker,
                    counterButton: redButtons[1],
                    message,
                    hackLabel,
                    progression,
                    progressBar,
                    progressBarValue
                })
                counterHack(hacksInProgress[hacksInProgress.length - 1])
            } else {
                const footer = document.createElement("span");
                footer.innerText = "Click to counter";
                footer.style.fontSize = "0.7rem";
                footer.style.color = "var(--color-lightgrey)";
                message.append(footer);
    
                hacksInProgress.push({
                    hacker: hacker,
                    counterButton: redButtons[1],
                    message,
                    footer,
                    hackLabel,
                    progression,
                    progressBar,
                    progressBarValue
                })
            }
    
            message.parentNode.append(separator);
    
            message.style.cursor = "pointer";
            message.style.padding = " 5px 5px 5px 0";
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
    
    const logObserver = new MutationObserver(function(mutations) {
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
            if (message.innerText.includes("to reach level"))
                manageLevelProgressBar(message);
            if (message.innerText.includes("being hacked") || message.innerText.includes("been hacked"))
                manageBeingHacked(message);
        })
    });
    
    const windowCloseObserver = new MutationObserver(function(mutations) {
        const windowClosed = mutations.find(e => {
            return e.target == document.querySelector("main") &&
                   e.removedNodes.length == 1 &&
                   e.removedNodes[0].classList.contains("window", "svelte-1hjm43z")
        })
        if (!windowClosed)
            return;
        const wasHackingSomeone = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']");
        if (wasHackingSomeone) {
            const currentHackingBy = hacksInProgress.find(e => e.hacker == currentlyHacking);
            if (currentHackingBy) {
                const footer = document.createElement("span");
                footer.innerText = "Click to counter";
                footer.style.fontSize = "0.7rem";
                footer.style.color = "var(--color-lightgrey)";
                currentHackingBy.counterLabel?.remove();
                currentHackingBy.counterProgressBar?.remove();
                currentHackingBy.message.append(footer);
                currentHackingBy.footer = footer;
            }
            currentlyHacking = null;
        }
    })
    
    const windowOpenObserver = new MutationObserver(function(mutations) {
        const newWindow = mutations.find(e => {
            return e.target == document.querySelector("main") &&
                   e.addedNodes.length == 1 &&
                   e.addedNodes[0].classList.contains("window", "svelte-1hjm43z")
        })
        if (!newWindow)
            return;
        const isHackingSomeoneWindow = newWindow.addedNodes[0].querySelector(".window-content > #wrapper > #section-target")
        if (isHackingSomeoneWindow) {
            const hacked = isHackingSomeoneWindow.querySelector(".username")?.innerText;
            if (hacked)
                currentlyHacking = hacked;
            const isHackingYou = hacksInProgress.find(e => e.hacker == hacked);
            if (!isHackingYou)
                return;
            counterHack(isHackingYou);
        }
        const hasHackedSomeoneWindow = newWindow.addedNodes[0].querySelectorAll(".window-content > div > .el").length == 4;
        if (hasHackedSomeoneWindow) {
            const hacked = newWindow.addedNodes[0].querySelector(".window-content > div > .el:nth-child(1) > .wrapper > .username")?.innerText
            const wasHackingYou = hacksInProgress.find(e => e.hacker === hacked);
            if (!wasHackingYou)
                return;
            wasHackingYou.hackLabel.innerText = "Successfully counter " + wasHackingYou.hackLabel.innerText.replace(/is hacking you \(\d+%\)/, "")
            wasHackingYou.message.style.backgroundColor = "transparent";
            wasHackingYou.message.onclick = null;
            wasHackingYou.message.onmouseenter = null;
            wasHackingYou.message.onmouseleave = null;
            hacksInProgress.splice(hacksInProgress.indexOf(wasHackingYou), 1);
            wasHackingYou.progressBar.remove();
            wasHackingYou.counterLabel.remove();
            wasHackingYou.counterProgressBar.remove();
            wasHackingYou.counterProgressBarValue.remove();
            wasHackingYou.footer.remove();
            wasHackingYou.hackObserver.disconnect();
        }
    });
        
    let buildProgressBar = () => {
        const topbarButton = (document.querySelectorAll("#topbar > :not(.topbar-value)") || [])[1];
        if (topbarButton) {
            topbarButton.querySelector("div")?.remove();
            topbarButton.querySelector("button > span")?.remove();
            topbarButton.querySelector("button").style.height = "100%"
            topbarButton.style = null;
            topbarButton.style.display = "flex";
            topbarButton.style.alignItems = "center";
            topbarButton.style.height = "40px";
            topbarButton.style.gap = "10px";
            topbarButton.querySelector("img:nth-child(2)").style.transform = "translateY(-2px)";
        }
        const topbar = document.querySelector("#topbar");
        const progressBar = document.createElement("div");
        const progressBarValue = document.createElement("div");
        const progressBarLabel = document.createElement("span");
        progressBar.id = "progressBar";
        progressBarValue.id = "progressBarValue";
        progressBarLabel.id = "progressBarLabel";
        
        progressBar.style.resize = "horizontal";
        progressBar.style.position = "relative";
        progressBar.style.overflow = "auto";
        progressBar.style.width = "45vw";
        progressBar.style.minWidth = "250px";
        progressBar.style.height = "40px";
        progressBar.style.marginLeft = "10px";
        progressBar.style.marginRight = "10px";
        progressBar.style.borderRadius = "4px";
        progressBar.style.display = "flex";
        progressBar.style.alignItems = "center";
        progressBar.style.backgroundColor = "var(--color-dark)";
    
        progressBarValue.style.width = "0%";
        progressBarValue.style.height = "38px";
        progressBarValue.style.borderRadius = "4px";
        progressBarValue.style.position = "relative";
        progressBarValue.style.transitionDuration = "0.3s";
        progressBarValue.style.background = "var(--color-green)";
        progressBarValue.style.opacity = "0.6";
    
        progressBarLabel.innerText = "Waiting for data...";
        progressBarLabel.style.fontFamily = "IBM Plex Mono,monospace";
        progressBarLabel.style.width = "100%";
        progressBarLabel.style.textAlign = "center";
        progressBarLabel.style.position = "absolute";
    
        topbar.insertBefore(progressBar, topbar.querySelectorAll("#topbar > :not(.topbar-value)")[1]);
        progressBar.append(progressBarValue);
        progressBar.append(progressBarLabel);
    }
    
    (async () => {
        while (document.querySelector("#login-top"))
            await sleep(1000);
        const logWindow = document.querySelector(".window-title > img[src='icons/log.svg']").closest(".window.svelte-1hjm43z").querySelector(".window-content > #wrapper");
        logObserver.observe(logWindow, {attributes: false, childList: true, characterData: false, subtree: true});
        windowOpenObserver.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
        windowCloseObserver.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
        buildProgressBar();
    })()

    document.onkeydown = function(e) {
        if (e.code !== "Space") return;
        if (document.querySelector("form.svelte-1fdvo7g > div:nth-child(1) > div:nth-child(1) > input:nth-child(1)") !== document.querySelector(":focus")) return;
    
        const enter = document.querySelector("button.terminal")
        if (!enter) return;
    
        e.preventDefault();
        enter.click();
    }    
})();