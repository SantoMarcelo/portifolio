import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`API em http://localhost:${env.PORT} | docs em http://localhost:${env.PORT}/api/docs`);
});
