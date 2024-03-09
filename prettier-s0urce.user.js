    // ==UserScript==
    // @name         prettier-s0urce
    // @namespace    http://tampermonkey.net/
    // @version      2024-03-09
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
        
        let hideOnOpen = false;
        const player = {
            username: document.querySelector("img[src='icons/online.svg']")?.parentNode?.innerText?.trim(),
            hacksInProgress: [],
            currentlyHacking: null,
            lastHacked: null,
            countryWars: {
                countryPoint: 0,
                playerPoint: 0
            },
            currentCountry: {
                code: null,
                name: null
            }
        }
        
        const icons = {
            VALID: "icons/check.svg",
            HACK: "icons/hack-red.svg"
        }

        const sendLog = async (HTMLContent, toDelete) => {
            const wrapper = document.querySelector("#wrapper.svelte-182ewru");
            if (!wrapper)
                return;

            const message = document.createElement("div")
            const separator = document.createElement("div")

            message.innerHTML = HTMLContent
            message.style.padding = "5px 0 5px 0"
            message.classList.add("message")
            
            separator.classList.add("line", "svelte-182ewru")
            separator.style.margin = "10px 0px";
            
            wrapper.append(message);
            wrapper.append(separator);
            await sleep(100);
            wrapper.scrollTop = wrapper.scrollHeight;

            setTimeout(() => {
                message?.remove();
                separator?.remove();
            }, 60 * 1000);
        }
        
        const manageMessagesToDelete = (message) => {
            const deleteSample = [
                "Hack successful",
                "has received",
                "to reach level"
            ]
            if (deleteSample.some(sample => message.innerText.includes(sample)))
                message.remove();
        }
        
        const counterHack = (hackInProgress) => {
            hackInProgress.footer?.remove();
            const terminalProgressBar = document.querySelector(".target-bar-progress");
            const wrapper = document.querySelector("#wrapper.svelte-182ewru");
            if (!terminalProgressBar || !wrapper)
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

            wrapper.scrollTop = wrapper.scrollHeight;
        
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
            const already = player.hacksInProgress.find(e => e.hacker == hacker);
            const progression = parseInt((message.innerText.match(/\d{1,3}(\.\d{1,2})?%/) || ["100%"])[0].slice(0, -1));
            if (already) {
                if (progression == 100) {
                    already.hackLabel.innerText = already.hackLabel.innerText.replace(/is hacking you \(\d+%\)/, "has hacked you")
                    already.message.style.backgroundColor = "transparent";
                    already.message.onclick = null;
                    already.message.onmouseenter = null;
                    already.message.onmouseleave = null;
                    player.hacksInProgress.splice(player.hacksInProgress.indexOf(already), 1);
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
                iconElement.src = icons.HACK
                
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
        
                const alreadyCounterHacking = hacker == player.currentlyHacking;
                if (alreadyCounterHacking) {
                    player.hacksInProgress.push({
                        hacker: hacker,
                        counterButton: redButtons[1],
                        message,
                        hackLabel,
                        progression,
                        progressBar,
                        progressBarValue
                    })
                    counterHack(player.hacksInProgress[player.hacksInProgress.length - 1])
                } else {
                    const footer = document.createElement("span");
                    footer.innerText = "Click to counter";
                    footer.style.fontSize = "0.7rem";
                    footer.style.color = "var(--color-lightgrey)";
                    message.append(footer);
        
                    player.hacksInProgress.push({
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

        const manageCountryWarPoints = (message) => {
            const pointGained = (message.innerText.match(/\d+/) || [0])[0];
            player.countryWars.countryPoint += parseInt(pointGained);
            player.countryWars.playerPoint += parseInt(pointGained);
            updateCountryWarsPoint(pointGained);
            message.remove();
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
                if (message.innerText.includes("being hacked") || message.innerText.includes("been hacked"))
                    manageBeingHacked(message);
                if (message.innerText.includes("earned"))
                    manageCountryWarPoints(message);
            })
        });

        const targetObserver = new MutationObserver(function(mutations) {
            const botAvailable = mutations.find(e => 
                e.removedNodes.length == 1 &&
                e.removedNodes[0]?.classList?.contains("timer") &&
                e.target.textContent.includes("NPC  "))
            if (!botAvailable)
                return;
            sendLog(`
                <div style="color: #fdd81f">
                    <img class="icon" src="icons/loot.svg" style="filter: brightness(0) saturate(100%) invert(90%) sepia(93%) saturate(2593%) hue-rotate(334deg) brightness(100%) contrast(99%);">
                    New
                    <div class='badge'>NPC</div>
                    appeared
                </div>
            `)
        });
        
        const windowCloseObserver = new MutationObserver(async function(mutations) {
            const windowClosed = mutations.find(e => {
                return e.target == document.querySelector("main") &&
                    e.removedNodes.length == 1 &&
                    e.removedNodes[0]?.classList?.contains("window", "svelte-1hjm43z")
            })
            if (!windowClosed)
                return;

            const isVPNWindow = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/vpn.svg']")
            if (isVPNWindow && !hideOnOpen) {
                vpnChangeObserver.disconnect();
                await getCountryWarsPlayerInformation();
                updateCountryWarsPoint();
            }

            const isLogWindow = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/log.svg']")
            if (isLogWindow)
                logObserver.disconnect();

            const isTargetWindow = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/targetList.svg']")
            if (isTargetWindow)
                targetObserver.disconnect();

            const wasHackingSomeone = windowClosed.removedNodes[0].querySelector(".window-title > img[src='icons/terminal.svg']");
            if (wasHackingSomeone) {
                const currentHackingBy = player.hacksInProgress.find(e => e.hacker == player.currentlyHacking);
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
                player.lastHacked = player.currentlyHacking
                player.currentlyHacking = null;
            }
        })

        const updateCountryWarsCountry = () => {
            const countryName = document.querySelector("#countryName");
            countryName.innerHTML = countryName.innerHTML
                .replace(/\/\w+\.svg/, `/${player.currentCountry.code}.svg`)
                .replace(/>.+$/, `>${player.currentCountry.name}`);
        }

        const updateCountryWarsPoint = (pointGained) => {
            const countryPoint = document.querySelector("#countryPoint");
            countryPoint.innerHTML = countryPoint.innerHTML.replace(/\d+$/, player.countryWars.countryPoint);
            
            const playerPoint = document.querySelector("#playerPoint");
            playerPoint.innerHTML = playerPoint.innerHTML.replace(/\d+$/, player.countryWars.playerPoint);
            
            if (pointGained) {
                const lastHackName = document.querySelector("#lastHackName");
                lastHackName.innerHTML = lastHackName.innerHTML.replace(/>.+$/, `>${player.currentlyHacking}`);
                
                const lastHackPoint = document.querySelector("#lastHackPoint");
                lastHackPoint.innerHTML = lastHackPoint.innerHTML.replace(/\d+$/, pointGained);
            }
        }

        const vpnChangeObserver = new MutationObserver(function(mutations) {
            const [code, name] = document.querySelector(".element > div:nth-child(2) > div:nth-child(2)")?.innerText?.split(" • ") || [];
            if (!code || !name)
                return;
            player.currentCountry.code = code;
            player.currentCountry.name = name;
            updateCountryWarsCountry();
        })
        
        const windowOpenObserver = new MutationObserver(function(mutations) {
            const newWindow = mutations.find(e => {
                return e.target == document.querySelector("main") &&
                    e.addedNodes.length == 1 &&
                    e.addedNodes[0]?.classList?.contains("window", "svelte-1hjm43z")
            })
            if (!newWindow)
                return;

            const isCountryWarsWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/countryWars.svg']")
            if (isCountryWarsWindow && hideOnOpen)
                isCountryWarsWindow.parentNode.parentNode.style.display = "none";

            const isVPNWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/vpn.svg']")
            const target = document.querySelector(".element > div:nth-child(2) > div");
            if (isVPNWindow && hideOnOpen)
                isVPNWindow.parentNode.parentNode.style.display = "none";
            if (isVPNWindow && target && !hideOnOpen)
                vpnChangeObserver.observe(target, { attributes: true, childList: true, characterData: false, subtree: true });

            const hasBeenHacked = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/hack.svg']") && newWindow.addedNodes[0].querySelector(".window-title")?.innerText?.trim() == "Hacked"
            if (hasBeenHacked)
                newWindow.addedNodes[0].remove();

            const isLogWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/log.svg']")
            if (isLogWindow)
                logObserver.observe(isLogWindow?.closest(".window.svelte-1hjm43z")?.querySelector(".window-content > #wrapper"), {attributes: false, childList: true, characterData: false, subtree: true});

            const isTargetWindow = newWindow.addedNodes[0].querySelector(".window-title > img[src='icons/targetList.svg']")
            if (isTargetWindow)
                targetObserver.observe(isTargetWindow.closest(".window.svelte-1hjm43z")?.querySelector(".window-content > div > #list"), { attributes: false, childList: true, characterData: false, subtree: true });


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
                wasHackingYou.hackLabel.innerText = "Successfully counter " + wasHackingYou.hackLabel.innerText.replace(/is hacking you \(\d+%\)/, "")
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
        });
            
        const editProgressBar = () => {
            const progressBar = (document.querySelectorAll(".topbar-value") || [])[2]
            if (!progressBar)
                return;
            progressBar.style.resize = "horizontal";
        }

        const getCountryPlayerInformation = () => {
            return new Promise(async resolve => {
                hideOnOpen = true;
                const vpnButton = document.querySelector("#desktop-container > div > div > div > img[src='icons/vpn.svg']")?.parentNode?.parentNode?.parentNode
                if (!vpnButton)
                    return;
                vpnButton.click();
                await sleep(200);
                const [code, name] = document.querySelector(".element > div:nth-child(2) > div:nth-child(2)")?.innerText?.split(" • ") || [];
                if (!code || !name)
                    return;
                player.currentCountry.code = code;
                player.currentCountry.name = name;
                document.querySelector(".window-title > img[src='icons/vpn.svg']")?.parentNode?.querySelector(".window-close")?.click()
                hideOnOpen = false;
                resolve();
            })
        }

        const getCountryWarsPlayerInformation = () => {
            return new Promise(async resolve => {
                hideOnOpen = true;
                const countryWarsButton = document.querySelector("#desktop-container > div > div > div > img[src='icons/countryWars.svg']")?.parentNode?.parentNode?.parentNode
                if (!countryWarsButton)
                    return;
                countryWarsButton.click();
                await sleep(300);
                const countryTab = document.querySelectorAll(".selection")[0];
                if (!countryTab)
                    return;
                countryTab.click();
                await sleep(500);
                const countryLine = document.querySelector(`.list > div > div > div:nth-child(2) > img[src='flags/${player.currentCountry.code}.svg']`)?.parentNode?.parentNode;
                const countryPoint = countryLine?.querySelector("div > img[src='icons/countryWars.svg']")?.parentNode?.innerText || "0";
                if (!countryPoint)
                    return;
                player.countryWars.countryPoint = parseInt(countryPoint);
                const playerTab = document.querySelectorAll(".selection")[1];
                if (!playerTab)
                    return;
                playerTab.click();
                await sleep(300);
                const playerPoint = document.querySelectorAll(".username")[20]?.parentNode?.querySelector("span > img")?.parentNode?.innerText
                if (!playerPoint)
                    return;
                player.countryWars.playerPoint = parseInt(playerPoint);
                document.querySelector(".window-title > img[src='icons/countryWars.svg']")?.parentNode?.querySelector(".window-close")?.click()
                hideOnOpen = false;
                resolve();
            })
        }

        const editCountryWarWindow = async () => {
            await getCountryPlayerInformation();
            await getCountryWarsPlayerInformation();
            const window = document.querySelector("body > div > main > div:nth-child(4)");
            if (!window)
                return;
            window.classList.add("window", "svelte-1hjm43z");
            window.style.height = "380px";
            window.style.padding = null;

            const countryWarTitle = window.querySelector("div");
            if (!countryWarTitle)
                return;
            countryWarTitle.classList.add("window-title", "svelte-1hjm43z");
                
            const countryWarChart = window.querySelector("div:nth-child(2)");
            if (!countryWarChart)
                return;
            countryWarChart.style.height = "200px";
            countryWarChart.style.borderLeftWidth = null;
            countryWarChart.style.borderLeftStyle = null;
            countryWarChart.style.borderLeftColor = null;
            countryWarChart.style.borderBottomWidth = null;
            countryWarChart.style.borderBottomStyle = null;
            countryWarChart.style.borderBottomColor = null;

            const separator = document.createElement("div");
            separator.classList.add("line");
            separator.style.width = "260px";
            separator.style.margin = "10px";
            window.append(separator);

            const infoContainer = document.createElement("div");
            infoContainer.style.fontFamily = "IBM Plex Mono,monospace";
            infoContainer.style.display = "flex";
            infoContainer.style.flexDirection = "column";
            infoContainer.style.margin = "10px";
            infoContainer.style.gap = "15px";

            const countryInfo = document.createElement("div");
            const countryName = document.createElement("div");
            const countryIcon = document.createElement("img");
            const playerInfo = document.createElement("div");
            const playerName = document.createElement("div");
            const playerIcon = document.createElement("img");
            const lastHackInfo = document.createElement("div");
            const lastHackName = document.createElement("div");
            const lastHackIcon = document.createElement("img");

            countryIcon.src = `flags/${player.currentCountry.code}.svg`;
            countryIcon.style.height = "13px";
            countryIcon.style.marginInline = "2px 5px";
            playerIcon.src = `icons/countryWars.svg`;
            playerIcon.style.height = "20px";
            playerIcon.style.marginRight = "3px";
            lastHackIcon.src = `icons/hack-red.svg`;
            lastHackIcon.style.height = "16px";
            lastHackIcon.style.marginInline = "2px 6px";
            
            countryInfo.innerText = player.countryWars.countryPoint;
            countryInfo.id = "countryPoint";
            countryInfo.style.color = "var(--color-lightgrey)";
            countryInfo.style.display = "flex";
            countryInfo.style.justifyContent = "space-between";
            countryName.innerText = player.currentCountry.name;
            countryName.id = "countryName";
            countryName.style.fontWeight = "bold";
            countryName.style.display = "flex";
            countryName.style.alignItems = "center";
            
            playerInfo.innerText = player.countryWars.playerPoint;
            playerInfo.id = "playerPoint";
            playerInfo.style.color = "var(--color-lightgrey)";
            playerInfo.style.display = "flex";
            playerInfo.style.justifyContent = "space-between";
            playerName.innerText = player.username;
            playerName.style.fontWeight = "bold";
            playerName.style.display = "flex";
            playerName.style.alignItems = "center";
            
            lastHackInfo.innerText = `+0`;
            lastHackInfo.id = `lastHackPoint`;
            lastHackInfo.style.color = "var(--color-midgreen)";
            lastHackInfo.style.display = "flex";
            lastHackInfo.style.justifyContent = "space-between";
            lastHackName.innerText = `No hack yet`;
            lastHackName.id = `lastHackName`;
            lastHackName.style.fontWeight = "bold";
            lastHackName.style.display = "flex";
            lastHackName.style.alignItems = "center";
            
            countryName.prepend(countryIcon);
            countryInfo.prepend(countryName);
            playerName.prepend(playerIcon);
            playerInfo.prepend(playerName);
            lastHackName.prepend(lastHackIcon);
            lastHackInfo.prepend(lastHackName);

            infoContainer.append(countryInfo);
            infoContainer.append(playerInfo);
            infoContainer.append(lastHackInfo);
            
            window.append(infoContainer);
        }

        const editWelcomeMessage = () => {
            const message = document.querySelector(".window-title > img[src='icons/log.svg']").parentNode.parentNode.querySelector("#wrapper > div");
            if (!message)
                return;
            message.innerHTML = message.innerHTML
                .replace("System started.<br>", "")
                .replace("s0urceOS 2023", "✨ prettier s0urceOS 2023 ✨")
                .replace(">.", ">. <br><span style='font-size: 0.8rem; color: var(--color-lightgrey);'>Made with ❤️ by <span style='color: pink;'>Xen0o2</span>.</span>")
        }
        
        (async () => {
            while (document.querySelector("#login-top"))
                await sleep(1000);
            editWelcomeMessage();
            const logWindow = document.querySelector(".window-title > img[src='icons/log.svg']").closest(".window.svelte-1hjm43z").querySelector(".window-content > #wrapper");
            logObserver.observe(logWindow, {attributes: false, childList: true, characterData: false, subtree: true});
            windowOpenObserver.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
            windowCloseObserver.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
            editProgressBar();
            editCountryWarWindow();
        })()    
    })();
