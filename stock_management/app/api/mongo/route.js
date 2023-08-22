const { MongoClient } = require("mongodb");
import { NextResponse } from "next/server";


export async function GET(request) {

    const uri = process.env.MONGODB_URI;


    const client = new MongoClient(uri);
    try {
        const database = client.db('stock_management');
        const movies = database.collection('stocks');
        const query = {};
        const movie = await movies.findOne(query);
        return NextResponse.json({ a: 34, movie })
        console.log(movie);
    } finally {
        await client.close();
    }
}