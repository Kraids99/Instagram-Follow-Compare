function getTable(tableId, data) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  tbody.innerHTML = ""; // reset isi lama

  data.forEach((username, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${username}</td>
    `;

    tbody.appendChild(tr);
  });
}

export{
    getTable
};