const DBConfig = {
    host        : process.env.DB_HOST       ?? 'localhost',
    database    : process.env.DB_DATABASE   ?? 'Provincias',
    user        : process.env.DB_USER       ?? 'postgres',
    password    : process.env.DB_PASSWORD   ?? 'root',
    port        : process.env.DB_PORT       ?? 5432
}

export default DBConfig;
