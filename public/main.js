
  // Function to add a new quote
  const addPost= () => {
    const id = prompt('Your name:');
    const qoute = prompt('Your Qoute of The Day:');

    // Send a POST request to the server
    fetch('/Qadd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title, author }),
    })
    .then(response => response.json())
    .then(book => {
      // Add the new book to the table
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const authorCell = document.createElement('td');
      const actionCell = document.createElement('td');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');
  
      idCell.textContent = qoute.id;
      nameCell.textContent = qoute.title;
      authorCell.textContent = qoute.author;
      editButton.textContent = 'Edit';
      deleteButton.textContent = 'Delete';
  
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(actionCell);
  
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);
  
      qouteTableBody.appendChild(row);
  
      // Event listener for the edit button
      editButton.addEventListener('click', () => editBook(qoute.id));
  
      // Event listener for the delete button
      deleteButton.addEventListener('click', () => deleteBook(qoute.id));
    })
    .catch(error => console.error('Error:', error));
  };
  
  // Function to edit a book
  const editQuote = (QouteId) => {
    const title = prompt('Enter the new Quote:');
  
    // Send a PUT request to the server
    fetch('/Quoteedit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: bookId, title, author }),
    })
    .then(response => response.json())
    .then(updatedQoute => {
      // Find the table row corresponding to the book and update its data
      const rows =  qouteTableBody.getElementsByTagName('tr');
  
      for (let i = 0; i < rows.length; i++) {
        const idCell = rows[i].getElementsByTagName('td')[0];
  
        if (parseInt(idCell.textContent) === updatedBook.id) {
          const titleCell = rows[i].getElementsByTagName('td')[1];
          const authorCell = rows[i].getElementsByTagName('td')[2];
  
          titleCell.textContent = updatedBook.title;
          authorCell.textContent = updatedBook.author;
  
          break;
        }
      }
    })
    .catch(error => console.error('Error:', error));
  };
  
  // Function to delete a book
  const deleteBook = (bookId) => {
    // Send a DELETE request to the server
    fetch('/qoutedelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: QouteId }),
    })
    .then(response => {
      if (response.status === 204) {
        // Remove the corresponding table row
        const rows =  qouteTableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
          const idCell = rows[i].getElementsByTagName('td')[0];
          if (parseInt(idCell.textContent) === bookId) {
            rows[i].remove();
            break;
          }
        }
      } else {
        console.error('Error:', response.status);
      }
    })
    .catch(error => console.error('Error:', error));
  };
  
  // Event listener for the create qoute button
  createNewPostButton.addEventListener('click', qoute);
  
  // Fetch book list from the server
  fetch('/qlist')
    .then(response => response.json())
    .then(data => {
      // Loop through the book list and create table rows
      data.forEach(qoute => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        const qouteCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
  
        idCell.textContent = qoute.id;
        qouteCell.textContent = qoute.Cell;
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';
  
        row.appendChild(idCell);
        row.appendChild(qouteCell);
        row.appendChild(actionCell);
  
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
  
        qouteTableBody.appendChild(row);
  
        // Event listener for the edit button
        editButton.addEventListener('click', () => qoute((qoute).id));
  
        // Event listener for the delete button
        deleteButton.addEventListener('click', () => deleteQoute(qoute.id));
      });
    })
    .catch(error => console.error('Error:', error));