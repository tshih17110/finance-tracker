const express = require('express');
const app = express();
const PORT = 4090;

app.use(express.json());

const plaidRouter = require('./plaidRouter');
app.use('/api', plaidRouter.router);

//Production server
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, '../client/build', 'index.html'));
    });
}


app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
