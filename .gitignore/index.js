const Discord = require('discord.js');
const { Client, Util } = require('discord.js');
const ce = require("embed-creator");
var Themeparks = require("themeparks");
var opus = require('opusscript')
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
var prefix = "!";
const PREFIX = "!";
const client = new Client({ disableEveryone: true });
const GOOGLE_API_KEY = (process.env.APIKEY);
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
client.login(process.env.DISNEY);

// Lancement
client.on('ready', () => {
	console.log('Bot en ligne!');
  client.user.setActivity('🏰 !aide')});
client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => { 
  const channel = client.channels.get("499964668719136779");
  if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
    console.log("Successfully connected.");
}).catch(e => {
  console.error(e);
})});
// Messages d'informations
client.on('guildMemberAdd', member => {
  var role = member.guild.roles.find("name", "Guest");
  member.addRole(role)
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#00FF00", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
    [{"name": "Passez un agréable moment en notre compagnie!", "value": member.user.tag }],
    {"text": "", "icon_url": member.guild.iconURL}, 
    {"thumbnail": member.user.displayAvatarURL}, true
  ));
});
client.on('guildMemberRemove', member => {
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#FF0000", {"name": member.guild.name, "icon_url": member.guild.iconURL}, "", "",
    [{"name": "A bientôt!", "value": member.user.tag }],
    {"text": "", "icon_url": member.guild.iconURL}, 
    {"thumbnail": member.user.displayAvatarURL}, true
  ));
});
client.on('guildBanAdd', (guild, user) => {
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#010101", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
    [{"name": user.tag, "value": "est désormais banni." }],
    {"text": "", "icon_url": guild.iconURL}, 
    {"thumbnail": user.displayAvatarURL}, true
  ));
});
client.on('guildBanRemove', (guild, user) => {
  var channel = client.channels.get('487657315579854848');
  if (!channel) return;
  channel.send(ce(
    "#EE82EE", {"name": guild.name, "icon_url": guild.iconURL}, "", "",
    [{"name": user.tag, "value": "est autorisé à nous rejoindre de nouveau."}],
    {"text": "", "icon_url": guild.iconURL}, 
    {"thumbnail": user.displayAvatarURL}, true
  ));
});

// Liste de tout les parcs supportés par la library
for (var park in Themeparks.Parks)
// Accès à un parc
var disneyMagicKingdom = new Themeparks.Parks.DisneylandParisMagicKingdom();

// Informations sur le parc
client.on('message', message => {
  if (message.content === prefix + 'fastpass') {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    disneyMagicKingdom.GetRideObject().then(function(fastpass) {
      for(var i=0, ride; ride=rides[i++];) {
        var channel = client.channels.get('487596220479438848');
        if (!channel) return;
        channel.send(fastpass.Available);
        channel.send("===============================")
      }
    }, console.error)}});
client.on('message', message => {
  if (message.content === prefix + 'debug') {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const chateau = client.emojis.find("name", "chateau")
    channel.send(`${chateau}`);
  }});
client.on('message', message => {
  if (message.content === prefix + 'disneyland') {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const chateau = client.emojis.find("name", "chateau")
    channel.send(ce(
      "#010101", {"name": "", "icon_url": ""}, "", "",
      [{"name": `${chateau} Disneyland Paris`, "value": "Temps d'attentes"}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, false
    ));
    disneyMagicKingdom.GetWaitTimes().then(function(rides) {
    for(var i=0, ride; ride=rides[i++];) {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    channel.send(ce(
    "#010101", {"name": "", "icon_url": ""}, "", "",
    [{"name": ride.name, "value": ride.waitTime + " minutes."}],
    {"text": "", "icon_url": ""}, 
    {"thumbnail": "", "image": ""}, true
    ))}});
}});

var disneyWaltDisneyStudios = new Themeparks.Parks.DisneylandParisWaltDisneyStudios();

client.on('message', message => {
  if (message.content === prefix + 'studios') {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    const wd = client.emojis.find("name", "wd")
    channel.send(ce(
      "#010101", {"name": "", "icon_url": ""}, "", "",
      [{"name": `${wd} Walt Disney Studios`, "value": "Temps d'attentes"}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, false
    ));
    disneyWaltDisneyStudios.GetWaitTimes().then(function(rides) {
    for(var i=0, ride; ride=rides[i++];) {
    var channel = client.channels.get('487596220479438848');
    if (!channel) return;
    channel.send(ce(
    "#010101", {"name": "", "icon_url": ""}, "", "",
    [{"name": ride.name, "value": ride.waitTime + " minutes."}],
    {"text": "", "icon_url": ""}, 
    {"thumbnail": "", "image": ""}, true
    ))}});
}});

//Modération
client.on('message', async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(PREFIX) !== 0) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "purge") {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Impossible de supprimer les messages en raison de: ${error}`));
  };
});
var bannedwords = "pute,p ute,p u t e,pu te,put e,putain,p utain,pu tain,put ain,puta in,putai n,putaclic,clickbait,click bait,attention whore,,whore,fdp, fils de put,fille de pute,fils de pute,fils de puterie,fille de p ute,fils de p ute,f d p,fd p,f dp,bordel,catin,schizo,schizophrène,schiso,drogué,droguée,gouine,goudou,pédé,pd,p d,,enculé,enculer,enculée,enculés,enculées,tantouze,tafiole,tapette,con,c on,co n,c onne,co nne,con ne,conn e,conne,salope,s alope,salop,salo,allumeuse,chaudasse,mégère,pimbêche,connasse,connard,pétasse,niquer,nique,poufiasse,pisseuse,couillon,bite,nazi,beurette,rebeu,travelo,transsexuel,trans,hermaphrodite,casos,ksos,clodo,plouc,anal,anus,ass,a s s,a ss,bitch,b itch,bastard,boob,butt,blowjob,blow job,buttplug,clitoris,cock,crap,dick,dildo,fuck,f u c k,penis,pussy,scrotum,sex,s e x,sexe,s e x e,s ex,se x,slut,vagina".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;
  if (!msg.content.toLowerCase().startsWith(prefix)) return;
    msg.delete();
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {
    if (!msg.member.hasPermission("KICK_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!kick @test#1234)');
    if (!mc)
      return msg.reply('Veuillez ajouter une raison. (!kick @test#1234 test)');
    mem.kick(mc).then(() => {
      msg.channel.send(mem.user.tag + " a été kick pour " + mc + "." + " (par " + msg.author.tag + ")");
    }).catch(e => {
      msg.channel.send("Une erreur s'est produite!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!ban @test#1234 test)');
    if (!mc)
      return msg.reply('Veuillez ajouter une raison. (!ban @test#1234 test)');
    mem.ban(mc).then(() => {
      msg.channel.send(mem.user.tag + " a été banni pour " + mc + "." + " (par " + msg.author.tag + ")");
    }).catch(e => {
      msg.channel.send("Une erreur s'est produite!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "mute")) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!mute @test#1234 test)');
    if (mem.hasPermission("MUTE_MEMBERS")) return;
    if (!mc)
      return msg.reply('Veuillez ajouter une raison. (!mute @test#1234 test)');
    if (msg.guild.roles.find("name", "Muet")) {
      mem.addRole(msg.guild.roles.find("name", "Muet")).then(() => {
        msg.channel.send(mem.user.tag + " est désormais muet pour " + mc + "." + " (par " + msg.author.tag + ")");
      }).catch(e => {
        msg.channel.send("Une erreur s'est produite!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return;
    var mem = msg.mentions.members.first();
    if (!mem)
      return msg.reply('Veuillez mentionner un utilisateur. (!unmute @test#1234)');
    if (msg.guild.roles.find("name", "Muet")) {
      mem.removeRole(msg.guild.roles.find("name", "Muet")).then(() => {
        msg.channel.send(mem.user.tag + " n'est plus muet.");
      }).catch(e => {
        msg.channel.send("Une erreur s'est produite");
        console.log(e);
      });

    }
  }
});

//Utilitaire
client.on('message', message => {
  if (message.content === prefix + 'aide') {
    var channel = client.channels.get('487596220479438848');
    channel.send(ce(
      "#010101", {"name": `Aide`, "icon_url": ""}, "", "",
      [{"name": "!disneyland", "value": "Afficher les temps d'attentes du parc Disneyland Paris."},
      {"name": "!studios", "value": "Afficher les temps d'attentes du parc Walt Disney Studios."},
      {"name": "!play <youtube-url>", "value": "Ajouter une musique à la file d'attente."},
      {"name": "!file", "value": "Afficher la liste des musiques en file d'attente."},
      {"name": "!info", "value": "Afficher le titre de la musique en cours de lecture."},
      {"name": "!castmember", "value": "Afficher les commandes de modération."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});
client.on('message', message => {
  if (message.content === prefix + 'castmember') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
    var channel = client.channels.get('487596220479438848');
    channel.send(ce(
      "#010101", {"name": `Aide CastMember`, "icon_url": ""}, "", "",
      [{"name": "!purge <2-100>", "value": "Supprimer des messages dans un salon textuel."},
      {"name": "!kick <@guest#1234> <raison>", "value": "Expulser un guest du serveur discord."},
      {"name": "!ban <@guest#1234> <raison>", "value": "Bannir un guest du serveur discord."},
      {"name": "!mute <@guest#1234> <raison>", "value": "Rendre muet un guest."},
      {"name": "!unmute <@guest#1234>", "value": "Redonner la parole à un guest."},
      {"name": "!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>", "value": "Lancer un sondage."},
      {"name": "!volume <1-5>", "value": "Régler le volume."},
      {"name": "!suivant", "value": "Passer à la musique suivante dans la file d'attente."},
      {"name": "!pause", "value": "Mettre en pausse la musique en cours."},
      {"name": "!reprise", "value": "Reprendre la lecture de la musique."},
      {"name": "!stop", "value": "Stopper la lecture de musique."}],
      {"text": "", "icon_url": ""}, 
      {"thumbnail": "", "image": ""}, true
    ))
  }
});

client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(';');
  const command = args.shift().toLowerCase();
  if (command === "sondage") {
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    let question = args[0];
    let choix1 = args[1];
    let choix2 = args[2];
    let choix3 = args[3];
    if (args.length === 0)
      return message.reply('**Mauvais format:** `!sondage;<Question>;<Choix1>;<Choix2>;<Choix3>`')
  var channel = client.channels.get('499918358263889920');
  channel.send("~~-----------~~" + '\n' + '\n' + ":question:" + `**__${question}__**` + '\n'  + '\n' + "" + ":one:" + ` **${choix1}**` +  '\n' + ":two:" + ` **${choix2}**` +  '\n' + ":three:" + ` **${choix3}**` + '\n' + '\n' + "*(Créer par: " + message.author.username + ")*")
  .then(function (message) {
    message.react('1⃣').then(() => message.react('2⃣')).then(() => message.react('3⃣'));
    })}});


//Musique
client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(msg.guild.id);
  var channel = client.channels.get('500237741032996865');

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return channel.send(`✅ Playlist: **${playlist.title}** ajouté à la file d'attente!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					channel.send(`

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Veuillez écrire une valeur allant de 1 à 10 pour sélectionner l'un des résultats de la recherche.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return channel.send('❌ Aucune valeur ou valeur invalide entrée, annulant la sélection de vidéo.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return channel.send('❌ Aucun résultat de recherche obtenu.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'suivant') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
    if (!serverQueue) return channel.send("❌ Aucune musique suivante dans la file d'attente.");
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
		if (!serverQueue) return channel.send('❌ Aucune musique à stopper.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
		if (!serverQueue) return channel.send('❌ Aucune musique en cours de lecture.');
		if (!args[1]) return channel.send(`Volume actuel: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return channel.send(`Volume réglé à: **${args[1]}**`);
	} else if (command === 'info') {
		if (!serverQueue) return channel.send('❌ Aucune musique en cours de lecture.');
		return channel.send(`🎶 Lecture en cours: **${serverQueue.songs[0].title}**`);
	} else if (command === 'file') {
		if (!serverQueue) return channel.send('❌ Aucune musique en cours de lecture.');
		return channel.send(`
__**File d'attente:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

🎶 **Lecture en cours:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return channel.send('⏸ Musique en pause');
		}
		return channel.send('❌ Aucune musique en cours de lecture.');
	} else if (command === 'reprise') {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return;
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return channel.send('▶ Reprise de la lecture.');
		}
		return channel.send('❌ Aucune musique en cours de lecture.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Erreur lors de la connexion au salon vocal: ${error}`);
			queue.delete(msg.guild.id);
			return channel.send(`Erreur lors de la connexion au salon vocal: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return channel.send(`✅ **${song.title}** a été ajouté à la file d'attente`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Lecture en cours: **${song.title}**`);
}
