const Discord = require('discord.js')
const client = new Discord.Client()
const fortniteGuildId = "348401698890317834"
const _ = require('lodash')

const prefix = '!'

const groupsId = {
  5: '348403358459232256',
  10: '348403405347225601',
  15: '348436480013893633',
  20: '348437099386634242',
  25: '348437149265297408',
  30: '348437275736277002',
  35: '348437339233845248',
  40: '348437380786683906',
  45: '348437392815947776',
  50: '348437458884493313',
  55: '348437460239384576',
  60: '348437460805615618',
  65: '348437461686419458',
  70: '348437462877732864',
  75: '348437463347494922',
  80: '348437464026710017',
  85: '348437464807112704',
  90: '348437748891516930',
  95: '348437749176729610',
  100: '348437749273198592',
}

client.on('ready', () => {
  console.log('I am ready!')
});

client.on('message', message => {
  if (_.get(message, 'guild.id') === fortniteGuildId) {
    if (message.content.charAt(0) === prefix) {
      if (message.content.indexOf('puissance ') === 1) {
        const power = message.content.split(' ')[1];
        if (power <= 100 && power >= 0) {
          message.member.removeRoles(Object.keys(groupsId).map(lvl => groupsId[lvl]))
          .then(() => {
            return message.member.addRole(groupsId[Math.ceil(power / 5) * 5])
          })
          .then(() => {
            return message.member.createDM()
          })
          .then(channel => {
            return channel.send(`Puissance ${power} ! Impressionant ! Les données ont été mises à jour.`)
          })
          .then(() => {
            return message.delete();
          })
          .catch(error => {
            console.log(error);
          })
        }
      }
    }
  }
});

client.on('guildMemberAdd', member => {
  member.createDM()
    .then(channel => channel.send('Bienvenue dans notre refuge. Utilise !puissance (ta puissance) pour indiquer ou changer ta puissance à tout moment. Ex: !puissance 14'))
})

client.login(process.env.discordToken)
