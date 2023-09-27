const express = require('express');
const app = express();
const PORT = 4090;

app.use(express.json());

const plaidRouter = require('./plaidRouter');
app.use('/api', plaidRouter.router);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
