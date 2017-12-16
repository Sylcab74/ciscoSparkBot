var express = require('express');
var Botkit = require('botkit');

var app = express();



var controller = Botkit.sparkbot({
	debug: true,
	public_address: "https://956fd9f5.ngrok.io",
	hostname: "localhost",
	ciscospark_access_token: "NzJkYTJhNWUtOTFmMS00NTY3LThkMmYtMDc2MTZmNjJmZjUzMDJkOWM0ZmMtZTBl",
});


console.log(process.env);

var bot = controller.spawn();

var helperText = '#Helper \n ###Bienvenue dans l\'helper, voici la liste des commandes disponibles:###\n - **Une Commande :** L\'action exécutée par la commande\n - **Commande 2:** Une deuxième commande\n ';

// Start Webserver to process incoming webhooks
controller.setupWebserver(3000, function (err, webserver) {
	controller.createWebhookEndpoints(controller.webserver, bot);
});

// Process incoming messages
controller.hears('help', 'direct_message,direct_mention', function (bot, message) {
	bot.reply(message, helperText);
});

controller.hears('kaba', 'direct_message,direct_mention', function (bot, message) {
	bot.reply(message, "Kaba ma famille ♥");
});

controller.on('bot_space_join', function (bot, message) {
	bot.reply(message, helperText);
});

controller.hears('', 'direct_message,direct_mention', function(bot, message) {
	bot.reply(message, 'Oupssss!!! \n\n Je n\'ai pas compris ton message " '+message.text+' " \n\nEnvoie "Help" si tu es perdu :)' );
});

