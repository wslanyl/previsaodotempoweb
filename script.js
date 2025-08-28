  const API_KEY = "78f217d6e1ac7671e30844b14051db36";

    document.getElementById("buscar-btn").addEventListener("click", () => {
      const cidade = document.getElementById("cidade-input").value;
      if (!cidade) return alert("Digite uma cidade!");

      document.getElementById("cidade-nome").innerText = "";
  document.getElementById("previsoes-container").innerHTML = "";

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.cod !== "200") {
            alert("Cidade não encontrada!");
            return;
          }

          document.getElementById("cidade-nome").innerText = data.city.name;

          const container = document.getElementById("previsoes-container");
          container.innerHTML = "";

          data.list.slice(0, 5).forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
              <p><b>${new Date(item.dt_txt).toLocaleString("pt-BR")}</b></p>
              <p>${item.weather[0].description}</p>
              <p>🌡 ${item.main.temp}°C</p>
            `;
            container.appendChild(card);
          });
        })
        .catch(err => console.error("Erro:", err));
    });

