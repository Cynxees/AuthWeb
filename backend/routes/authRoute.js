const express = require('express');
const router = express.Router();
const connectDB = require('../config/mongoConnection');

router.post('/login', async (req, res) => {

    console.log('/login called');

    try {

        const db = await connectDB();
        const collection = db.collection('users');
        
        const username = req.body.username;
        const password = req.body.password;
        
        const user = await collection.findOne({ username, password });

        if (user) {

            console.log('login successful');
            res.json({ message: 'Login successful', username: user.username });

        } else {
            
            console.log('login failed');
            res.status(401).json({ message: 'Invalid credentials' });

        }

    } catch (error) {

        console.error('Error login: ', error);
        res.status(500).json({ error: 'Failed to login' });

    }

});

router.post('/register', async (req, res) => {

    console.log('/register called');

    try {

        const db = await connectDB();
        const collection = db.collection('users');
        
        const username = req.body.username;
        const password = req.body.password;
        
        if(!username || !password){

            console.log('incomplete data');
            res.status(401).json({ message: 'Incomplete Data' });
            return;

        }
        
        const user = await collection.findOne({ username: username });

        if (user) {

            console.log('user exists');
            res.status(401).json({ message: 'User Existed' });
            return;

        } 

        const result = await collection.insertOne({username, password});

        if(result){

            res.json({ message: 'Register successful' });

        }
        



    } catch (error) {

        console.error('Error login: ', error);
        res.status(500).json({ error: 'Failed to login' });

    }

});

module.exports = router;
