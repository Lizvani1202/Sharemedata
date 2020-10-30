/* globals gauge*/
"use strict";
const { openBrowser, write, closeBrowser, goto, press, screenshot, text, focus, textBox, toRightOf,$,click } = require('taiko');
const assert = require("assert");
const path = require("path");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'], `screenshot-${process.hrtime.bigint()}.png`);
    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};


step("Page", async () => {
    await goto('http://beta.sharemedata.com/#/login');
});

step("Email <query>", async (query) => {
    await focus(textBox({name:"email"}))
    await write(query);
});
step("Password <query>", async (query) => {
    await focus(textBox({placeholder:"Introduce tu contraseña"}))
    await write(query);
});

step("Ingresar",async function(){
    await click("Entrar")
});
step("Paciente", async () => {
    await goto('https://beta.sharemedata.com/#/account/patient/5f578db8ad8f0400061ec3f1');
});

step("Peso", async function() {
    await click($('//app-vital-sign/div[@id="@vitalSignLabel.weight"]//span[@id="vital-sign-edit"]')) 
});

step("Ingresar peso", async function() {
    await write("69", into(textBox({id:"_input-number-1"})))
});
