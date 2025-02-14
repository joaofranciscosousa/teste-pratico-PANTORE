const getEnv = (env: string) => {
  const environment = process.env[env];

  if (!environment) throw `Environment variable '${env}' not found`;

  return environment;
};

export { getEnv };
