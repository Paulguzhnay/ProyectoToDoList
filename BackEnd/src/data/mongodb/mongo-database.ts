import mongoose from "mongoose";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect( options: Options ) {

        const { mongoUrl, dbName } = options;
        try {
            // Connect to the database
            mongoose.connect(mongoUrl, {
                dbName: dbName,
            });

            console.log('Connected to the mongo database');
        } catch (error) {
            console.log('Error connecting to the mongo database');
            throw error;
        }
    }
}