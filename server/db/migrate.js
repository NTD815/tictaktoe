import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

import fs from 'node:fs';

//read and import all migrations under the migrations directory
const migrations = fs.readdirSync('./migrations');

console.log(migrations);


//for now we will only be working with sqlite
//open the db or create one if it doesn't exist
//leaving db name configurable 
const dbPath = `tactoe.db`;

const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
});


//create a migrations table if it doesn't exist, it will also initialize the db if it doesn't exist

await db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        batch INTEGER NOT NULL
    );
`);

//now we go through each migration, check if it has not run and then run it while also adding it to migrations table

for(const migration of migrations){

}
