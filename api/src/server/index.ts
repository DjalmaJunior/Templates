import App from './app'
import config from './config';
import Postgresql from '../databases/sql/postgresql';

const host = config.HOST || 'localhost';
const port = config.PORT || 3000;
const app = App.getApp();

new Postgresql();

app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
