import { writable, get } from 'svelte/store'
import Notify from '../models/Notify'

export const user = writable()
export const openInvite = writable(false)
export const invitation = initInvitation()
export const redirects = initRedirects()
export const notifications = initNotifications()

function initRedirects() {
  const { subscribe, update, set } = writable([])

  return {
    subscribe,
    init: redirects => set(redirects),
    add: redirect => {
      update(redirects => [...redirects, redirect])
    },
    remove: redirect => {
      update(rs => rs = rs.filter(r => r.data.code !== redirect.code))
    }
  }
}

function initInvitation() {
  const { subscribe, update } = writable(false)

  return {
    subscribe,
    toggle: () => update(open => open = !open)
  }
}

function initNotifications() {
  const { subscribe, update } = writable([])

  return {
    subscribe,
    add: (message, state) => {
      if (get(notifications)
            .findIndex(i => i.message === message) !== -1) {
        return
      }
      update(n => [...n, new Notify(message, state)])
    },
    remove: (messageToRemove) => update(n => n = n.filter(({message}) => message !== messageToRemove ))
  }
}