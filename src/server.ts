import { config } from './config';
import createApp from './app';

const app = createApp();
const { port, origin } = config.node;

app.listen(port, () => {
  console.log(`Server running on ${origin}`);
});
