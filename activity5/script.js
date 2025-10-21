document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("ItemInput");
  const list = document.getElementById("List");

  if (input.value.trim() === "") return alert("Please type something!");
  const li = document.createElement("li");
  li.textContent = input.value;
  list.appendChild(li);
  input.value = "";
});
