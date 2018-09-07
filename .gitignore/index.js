var Themeparks = require("themeparks");
const Discord = require('discord.js');
const ce = require("embed-creator");
var prefix = "!";
const { Client, Util } = require('discord.js');
const PREFIX = "!";
const client = new Client({ disableEveryone: true });

client.on('ready', () => {
	console.log('Bot en ligne!');
  client.user.setActivity('🏰 !temps')});
  
  
  
client.on('warn', console.warn);
client.on('error', console.error);


client.on('message', message => {
  if (message.content === prefix + 'ping') {
    const then = Date.now();
    message.channel.send('Pinging... ').then(m => {
      m.edit(`Pong! Cela a pris ${Date.now() - then}ms pour envoyer ce message`);
    })};
  if (message.content === prefix + 'info') {
  message.channel.send(ce(
    "#EE82EE", {"name": "Informations", "icon_url": client.user.avatarURL}, "", "",
    [{"name": "Membres :", "value": "undefined" }],
    {"text": "", "icon_url": ""}, 
    {"thumbnail": "https://i.imgur.com/XZnP15K.png"}, true
  ));
  }
});

client.on('guildMemberAdd', member => {
  var channel = client.channels.get('387188744207335425');
  if (!channel) return;
  channel.send(ce(
    "#00FF00", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
    [{"name": "Bienvenue sur le serveur!", "value": member.user.username }],
    {"text": "", "icon_url": member.guild.iconURL}, 
    {"thumbnail": member.user.displayAvatarURL}, true
  ));
});

client.on('guildMemberRemove', member => {
  var channel = client.channels.get('387188744207335425');
  if (!channel) return;
  channel.send(ce(
    "#FF0000", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
    [{"name": "A bientôt!", "value": member.user.username }],
    {"text": "", "icon_url": member.guild.iconURL}, 
    {"thumbnail": member.user.displayAvatarURL}, true
  ));
});

client.on('guildBanAdd', (guild, user) => {
  var channel = client.channels.get('387188744207335425');
  if (!channel) return;
  channel.send(ce(
    "#010101", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
    [{"name": "Ce joueur vient d'être banni!", "value": user.username }],
    {"text": "", "icon_url": guild.iconURL}, 
    {"thumbnail": user.displayAvatarURL}, true
  ));
});

client.on('guildBanRemove', (guild, user) => {
  var channel = client.channels.get('387188744207335425');
  if (!channel) return;
  channel.send(ce(
    "#EE82EE", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
    [{"name": "Ce joueur est désormais débanni", "value": user.username }],
    {"text": "", "icon_url": guild.iconURL}, 
    {"thumbnail": user.displayAvatarURL}, true
  ));
});

client.login('NDg3NTg2NTExNzc3MzAwNDgw.DnP1jA.4yGi9FIoIaLrj5pv6d6RLp0cRGc');

// list all the parks supported by the library
for (var park in Themeparks.Parks)

// access a specific park
var disneyMagicKingdom = new Themeparks.Parks.DisneylandParisMagicKingdom();

// access wait times by Promise
client.on('message', message => {
	if (message.content === prefix + 'temps') {
    var channel = client.channels.get('487596220479438848');
		if (!channel) return;
    channel.send("Disneyland Paris - temps d'attentes:")
    disneyMagicKingdom.GetWaitTimes().then(function(rides) {
			// print each wait time
      for(var i=0, ride; ride=rides[i++];) {
        channel.send(ride.name + ": " + ride.waitTime + " minutes.");
        channel.send("-------------------")
      }
      const chateau = client.emojis.find("name", "chateau")
      channel.send(`${chateau} Bonne séjour à Disneyland Paris!`)
    }, console.error)}});
    
    client.on('message', message => {
      if (message.content === prefix + 'fastpass') {
        disneyMagicKingdom.GetRideObject().then(function(FastPass) {
          // print each wait time
          for(var i=0, ride; ride=rides[i++];) {
            var channel = client.channels.get('487596220479438848');
            if (!channel) return;
            channel.send(fastPass.Available);
            channel.send("===============================")
          }
        }, console.error)}});


client.on('message', message => {
  if (message.content === prefix + 'blabla') {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const chateau = client.emojis.find("name", "chateau")
    channel.send(`${chateau}`);
  }});
