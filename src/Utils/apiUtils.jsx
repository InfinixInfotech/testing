import React from 'react'

export async function apiCallWithoutAuth(endpoint, params) {
    console.log(endpoint)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        return data;
      } else {
        console.error('Error:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);  
      return null;
    }
  }


  export async function apiGetCallWithoutAuth(endpoint) {
    console.log(endpoint)
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        return data;
      } else {
        console.error('Error:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);  
      return null;
    }
  }


  export async function apiDeleteCallWithoutAuth(endpoint) {
    console.log(endpoint);
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE', // Standard HTTP method (uppercase)
            headers: {
                'Content-Type': 'application/json',
                
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
            return data; // Return the response data
        } else {
            const errorData = await response.json(); // Capture server-side error message
            console.error('Error:', response.status, response.statusText, errorData);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}



export async function apiPutCallWithoutAuth(endpoint, data) {
  console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),  // Sending the updated data as the request body
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data; // Return the response data
      } else {
          const errorData = await response.text();
          console.error('Error:', response.status, response.statusText, errorData);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}


export async function apiPostCallWithAuthFormData(endpoint, formData, token) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, 
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response:', data);
      return data;
    } else {
      console.error('Error:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}


export async function apiPostCallWithAuth(endpoint, params, token) {
  try {
    console.log(params)
      const response = await fetch(endpoint,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${token}`, // Add Bearer token
          },
          body: JSON.stringify(params),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data;
      } else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}

export async function apiGetCallWithAuth(endpoint, token) {
  console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data;
      } else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}

export async function apiDeleteCallWithAuth(endpoint, token) {
  console.log(endpoint);
  try {
      const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Add Bearer token
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Response:', data);
          return data;
      } else {
          console.error('Error:', response.status, response.statusText);
          return null;
      }
  } catch (error) {
      console.error('Fetch error:', error);
      return null;
  }
}

export async function apiPutCallWithAuth(endpoint, data, token) {
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, // Add Bearer token
      },
      body: data, // Directly pass FormData object
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response:', data);
      return data;
    } else {
      console.error('Error:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}




export default function apiUtils() {
    
  return (
    <div>apiUtils</div>
  )
}


