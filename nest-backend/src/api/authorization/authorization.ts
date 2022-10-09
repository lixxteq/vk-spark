import {
  DirectAuthorization,
  officialAppCredentials,
} from '@vk-io/authorization';
import { VK, CallbackService } from 'vk-io';

// replace with env!!!
const tempOptions = {
  login: '',
  password: '',
};

const runDirectAuthorization = async () => {
  const cbHandler = new CallbackService();

  const auth = new DirectAuthorization({
    callbackService: cbHandler,
    ...officialAppCredentials.windows,
    apiVersion: '5.131',

    login: tempOptions.login,
    password: tempOptions.password,
    scope: process.env.REACT_APP_VK_SCOPE,
  });

  const authResponse = await auth.run();
  console.log(authResponse);
};

export { runDirectAuthorization };
