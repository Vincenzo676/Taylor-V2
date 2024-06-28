import {
  areJidsSameUser
} from "@whiskeysockets/baileys";
const handler = async (m, {
  conn,
  participants
}) => {
  let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id));
  for (let user of users)
    if (user.endsWith("@s.whatsapp.net") && !(participants.find(v => areJidsSameUser(v.id, user)) || {
        admin: !0
      }).admin) {
      await conn.groupParticipantsUpdate(m.chat, [user], "promote");
      await delay(1e3);
    }
  m.reply("Succes");
};
handler.help = ["opromote @tag"], handler.tags = ["owner"], handler.command = /^(opromote)$/i,
  handler.owner = !0, handler.group = !0, handler.botAdmin = !0;
export default handler;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));