
// // export async function refreshToken() {
// //   const refresh = localStorage.getItem('refreshToken');
// //   if (!refresh) {
// //     throw new Error('No refresh token available');
// //   }

// //   const response = await fetch('http://localhost:5000/api/refresh', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //       Authorization: `Bearer ${refresh}`,
// //     },
// //   });

// //   if (!response.ok) {
// //     throw new Error('Failed to refresh token');
// //   }

// //   const data = await response.json();
// //   return data.access_token;
// // }
// export async function refreshToken() {
//   const refresh = localStorage.getItem('refreshToken');

//   if (!refresh) {
//     throw new Error('No refresh token available');
//   }

//   const response = await fetch('http://localhost:5000/api/refresh', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${refresh}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to refresh token');
//   }

//   const data = await response.json();
//   return data.access_token;
// }
export async function refreshToken() {
  const refresh = localStorage.getItem('refreshToken');

  if (!refresh) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch('http://localhost:5000/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Refresh error response:', errorData);
      throw new Error(errorData.message || 'Failed to refresh token');
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('Invalid refresh response');
    }

    localStorage.setItem('token', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Token refresh error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    throw error;
  }
}