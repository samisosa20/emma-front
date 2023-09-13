export const formatCurrency = new Intl.NumberFormat('es-US', {
  style: 'currency',
  currency: 'USD',
});

export function isLogin() {
  const user = localStorage.getItem('user');
  if (!user) {
    localStorage.clear();
    return false
  }
  return true
}

export function customConfigHeader() {
  const user = localStorage.getItem('user');
  if (user)
    return {
      headers: {
        Authorization: `Bearer ${JSON.parse(user).token}`,
      },
    };
}
