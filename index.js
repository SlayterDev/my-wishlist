// Read a JSON file
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const mustache = require('mustache');

function writeJSONToTemplate() {
    const filePath = path.join(__dirname, './data/data.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const dataJson = JSON.parse(data);

    // use mustache to render the template
    const template = fs.readFileSync(path.join(__dirname, './templates/index.mustache'), 'utf-8');
    const rendered = mustache.render(template, dataJson);

    // write the rendered template to index.html in the docs folder
    const outputPath = path.join(__dirname, './docs/index.html');
    fs.writeFileSync(outputPath, rendered);
}

// get command line arguments
const args = process.argv.slice(2);

// if args contains '-b' or '--build' then generate the page
if (args.includes('-b') || args.includes('--build')) {
    writeJSONToTemplate();
    // exit the process
    process.exit(0);
}

// Ask the user for an item name, description, price, url, and image
const questions = [
    {
        type: 'input',
        name: 'itemName',
        message: 'What is the name of the item?',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a name for the item.';
            }
        }
    },
    {
        type: 'input',
        name: 'itemDescription',
        message: 'What is the description of the item?',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a description for the item.';
            }
        }
    },
    {
        type: 'input',
        name: 'itemPrice',
        message: 'What is the price of the item?',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a price for the item.';
            }
        }
    },
    {
        type: 'input',
        name: 'itemUrl',
        message: 'What is the URL of the item?',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a URL for the item.';
            }
        }
    },
    {
        type: 'input',
        name: 'itemImage',
        message: 'What is the URL of the image?',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a URL for the image.';
            }
        }
    }
];

// async main function
(async () => {
    // ask the user for the item information
    inquirer.prompt(questions).then(function (answers) {
        // read the data.json file
        const filePath = path.join(__dirname, './data/data.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const dataJson = JSON.parse(data);

        // add the new item to the data
        dataJson.items.push({
            name: answers.itemName,
            description: answers.itemDescription,
            price: answers.itemPrice,
            url: answers.itemUrl,
            image: answers.itemImage
        });

        // write the new data back to the data.json file
        fs.writeFileSync(filePath, JSON.stringify(dataJson, null, 4));

        // write the new data to the template
        writeJSONToTemplate();
    });
})();
