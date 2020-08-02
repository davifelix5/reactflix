export function setAuthCookie(access, refresh) {
    localStorage.setItem('access', access)
    localStorage.setItem('resfresh', refresh)
}

export function clearAuthCookie() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}

export function getTokens() {
    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')
    return {access, refresh}
}
