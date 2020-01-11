import { auth } from '../utils/auth' 
import { wrap } from 'svelte-spa-router'

import Home from '../views/Home.svelte'
import Shortener from '../views/Shortener.svelte'

export const routes = {
  '/': Home,
  '/shortener': wrap(Shortener, () => !!auth.currentUser()),
  '*': Home
}