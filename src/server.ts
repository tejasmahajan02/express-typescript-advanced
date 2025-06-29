import { config } from './config';
import createApp from './app';
import { logRoutes } from './common/utils';

const { port, origin } = config.node;
const app = createApp();

logRoutes(app);

app.listen(port, () => {
  console.log(`Server running on ${origin}`);
});
