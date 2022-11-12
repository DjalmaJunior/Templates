import app from './app'
import config from './config';

const host = config.HOST || 'localhost';
const port = config.PORT || 3000;

app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
