// Get
document.getElementById("load-data").addEventListener("click", function () {
    fetch("https://script.google.com/macros/s/AKfycbxSgOGkWd4KnGSuqyko4VvREvqGlJZWNdH9AhohmvSoIAbdoN5szTGdBum7L4sMjvwff/exec")
        .then(response => response.json())
        .then(data => {
            const tableHead = document.querySelector("#data-table thead");
            const tableBody = document.querySelector("#data-table tbody");

            // Limpa cabeçalhos e linhas existentes
            tableHead.innerHTML = "";
            tableBody.innerHTML = "";

            // Define cabeçalhos da tabela personalizados
            const headerTitles = ["Data", "Nome", "Convidado do", "Presença", "Mensagem"];
            const headerRow = document.createElement("tr");
            headerTitles.forEach(title => {
                const th = document.createElement("th");
                th.textContent = title;
                headerRow.appendChild(th);
            });
            tableHead.appendChild(headerRow);

            // Adiciona as linhas de dados
            data.slice(1).forEach(row => {
                const tr = document.createElement("tr");

                // Formata a data
                const date = new Date(row[0]);
                const formattedDate = formatDate(date);

                // Adiciona as células
                const cells = [formattedDate, ...row.slice(1)];
                cells.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            document.querySelector("#data-table tbody").innerHTML = "Ocorreu um erro: " + error.message;
        });

});

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
}
