import dotenv from 'dotenv'
import discord, { REST, Routes } from 'discord.js'

dotenv.config()

const client = new discord.Client({ intents: [] })

client.login(process.env.TOKEN).then(async () => {
    const clientId = client.application?.id

    const rest = new REST().setToken(process.env.TOKEN!)

    await rest
        .put(
            Routes.applicationGuildCommands(clientId!, process.env.GUILD_ID!),
            { body: [] },
        )
        .then(() =>
            console.info(
                'Successfully deleted all application guild commands.',
            ),
        )
        .catch(console.error)
        .finally(() => client.destroy())
})
