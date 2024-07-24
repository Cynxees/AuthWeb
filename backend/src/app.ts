import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoute'
import { getMongoDB } from './adapters/repositories/mongoClient';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {

    console.log('/ called');
    res.send('Hi');

});

app.get('/test', (req, res) => {

    console.log('/test called');
    res.status(200).json({message : "connected to test!"})

});



app.use('/auth', authRoutes);

getMongoDB().then(() => {
        
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((error) => {

    console.error('Failed to connect to the database', error);
    process.exit(1);

});
