#!/usr/bin/env node
"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const path = require("path");
const Ora = require("ora");

clear();

//! importing User Data from data.json
const res = fs.readFileSync(path.resolve(__dirname, "data.json"));
const user_data = JSON.parse(res);
const {
    name,
    email,
    twitter,
    linkedin,
    github,
    website,
    npx_card_handle,
    job_title,
    workplace
} = user_data;

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            // Share Your profile Card
            {
                name: `Share Your ${chalk.cyanBright.bold("Profile Card")} and Tell Others: `,
                value: () => {
                    open(`https://twitter.com/intent/tweet?text=I created my Profile Card. Run npx ${npx_card_handle} to view. Make Your own at: https://github.com/${github}/ProfileCard Made with Love by @${npx_card_handle}` );
                    console.log("\nRedirecting You...\n");
                },
            },
            // Send an email
            {
                name: `Say 👋, on my ${chalk.green.bold("Email")}?`,
                value: () => {
                    open(`mailto:${email}`);
                    console.log("\nOpening your Email application. See you at my Inbox\n");
                },
            },
            
            // Here you can add your Projects or Portfolio.
            {
                name: `Open ${chalk.yellow.bold("My Personal Portfolio")}?`,
                value: () => {
                    open(website);
                    console.log("\nLoading my Portfolio...\n");
                },
            },
            //// Quit
            {
                name: "Quit.",
                value: () => {
                    console.log(" Have a nice Day. Although You can support the project by giving a Star ⭐.\n");
                },
            },
        ],
    },
];

const data = {
    name: chalk.bold.green(`                  ${name} / ${npx_card_handle}`),
    // You can Style the Job titile if You can, As I did.
    // You can also keep it simple by replacing the Line 65 by:
    
    work:  `${chalk.white(job_title)} @ ${chalk.bold.hex("#2b82b2").bold(workplace)}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.yellowBright(twitter),
    github: chalk.gray("https://github.com/") + chalk.green(github),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blueBright(linkedin),
    Website: chalk.redBright(website),
    npx: chalk.green("npx") + " " + chalk.white(npx_card_handle),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWebsite: chalk.white.bold("    Website:"),
    labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
    [
        data.name,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWebsite}  ${data.Website}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        chalk.italic(`Hey! I'm ${name}, I am working with ${workplace} as a ${job_title}`),
        chalk.italic("I love to connect with new people, Say 'Hii' via Social Media or E-mail")
    ].join("\n"),
    {
        margin: 1,
        float: "center",
        padding: 1,
        borderStyle: "singleDouble",
        borderColor: "blue",
        align:"left",
        backgroundColor: "#660033",
      
    }
);
const CardPrinter = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log(me));
      }, 12000);
    });
}

// Animation 
const Loaded = () => {
    const spinner = Ora(`Welcome to ${npx_card_handle}'s CLI World`).start();

    setTimeout(() => {
        spinner.indent = 30;
        spinner.spinner = 'soccerHeader';
        spinner.text = `${chalk.green('Support Project by giving a Star ⭐ ')}`;
    }, 2000);
    
    setTimeout(() => {
        spinner.indent = 30;
        spinner.spinner = 'soccerHeader';
        spinner.text = `${chalk.yellow('Card sent to Press...')}`; 
    }, 4000);
    
    setTimeout(() => {
        spinner.indent = 30;
        spinner.spinner = 'soccerHeader';
        spinner.text = `${chalk.magentaBright('Card is Ready for Printing...')}`; 
    }, 6000);
    
    setTimeout(() => {
        spinner.indent = 30;
        spinner.spinner = 'soccerHeader';
        spinner.text = 'Your Card is About to Ready...'; 
    }, 8000);
    
    setTimeout(() => {
        spinner.indent = 30;
        spinner.spinner = 'soccerHeader';
        spinner.text = chalk.blueBright('Printing Done, Here We go:'); 
    }, 10000);
    
    setTimeout(() => {
        spinner.succeed(chalk.greenBright(`Congratulations, Now you are in ${npx_card_handle} in CLI World.😄`));
    }, 12000);
};

const Card = async() => {
    Loaded();
    const card = await CardPrinter();
    prompt(questions).then(answer => answer.action());
}
Card();