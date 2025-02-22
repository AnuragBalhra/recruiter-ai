interface ConfigType { 
  ENV: string,
}


export const getConfiguration = (): ConfigType => { 
    return {
        ENV: process.env.ENVIRONMENT ?? '',
    };
}