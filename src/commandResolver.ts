import {Message} from "discord.js";

type TypeResolver = (message: Message) => void;

type TypeResolvers = {
    [key: string]: TypeResolver;
};

const resolvers: TypeResolvers = {
    
};

export default resolvers;
