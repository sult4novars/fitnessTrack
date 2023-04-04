import { Resolver } from 'type-graphql';

import extender from '~/helpers/extender';

// sub resolvers
import changePassword from './changePassword';
import forgotPassword from './forgotPassword';
import getSession from './getSession';
import login from './login';
import logout from './logout';
import register from './register';

@Resolver()
export default class AuthResolver extends extender(
  register,
  login,
  logout,
  changePassword,
  forgotPassword,
  getSession,
) {}
