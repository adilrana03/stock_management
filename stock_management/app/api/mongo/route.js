const { MongoClient } = require("mongodb");
import { NextResponse } from "next/server";


export async function GET(request) {

    const uri = "mongodb+srv://adilrana03:0p5LiREP79mrJbsI@cluster1.u50gzns.mongodb.net/";

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